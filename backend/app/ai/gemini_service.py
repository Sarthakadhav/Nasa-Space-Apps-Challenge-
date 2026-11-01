import json
from typing import Dict, Any, Optional
from app.config import settings
from app.core.logging import logger
from app.local_ai.local_retrieval import generate_offline_answer

def ask_orbital_assistant(
    question: str,
    astronaut: Optional[Dict[str, Any]] = None,
    current_vitals: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """
    Hybrid Autonomous AI Assistant:
    1. If GEMINI_API_KEY is available and reachable, queries Google Gemini 2.0 Flash.
    2. If offline, internet lost, or key not configured, immediately falls back
       to local flight standard operating procedures with zero latency and zero disruption.
    """
    api_key = settings.GEMINI_API_KEY.strip()

    if not api_key:
        logger.info("Operating in Autonomous Offline Mode (No GEMINI_API_KEY configured).")
        return generate_offline_answer(question, astronaut, current_vitals)

    try:
        from google import genai
        client = genai.Client(api_key=api_key)

        # Build aerospace clinical context
        ast_name = astronaut.get("name", "Crew Member") if astronaut else "Crew Member"
        ast_role = astronaut.get("role", "Specialist") if astronaut else "Specialist"
        ast_condition = astronaut.get("condition", "Healthy") if astronaut else "Healthy"

        vitals_context = ""
        if current_vitals:
            vitals_context = (
                f"Current Vitals: Heart Rate {current_vitals.get('heartRate')} bpm "
                f"(Normal Baseline: {current_vitals.get('heartRateBaseline')} bpm), "
                f"Blood Oxygen (SpO2) {current_vitals.get('spo2')}%, "
                f"Recovery HRV {current_vitals.get('hrv')} ms, "
                f"Core Temp {current_vitals.get('temperature')}°C, "
                f"Missing Sleep: {current_vitals.get('sleepDebtHours')} hrs."
            )

        prompt = f"""
You are ORBITAL GUARD AI, a friendly, intelligent health assistant aboard a deep-space astronaut mission (Lunar Gateway / Mars Transit).

Context:
- Astronaut: {ast_name} ({ast_role})
- Health Status: {ast_condition}
- {vitals_context}
- Communication delay with Earth: 14 to 24 minutes one-way (onboard autonomous mode).

Question: {question}

Style and Communication Guidelines:
1. Speak in simple, friendly, easy-to-understand language. Do not overwhelm the user with medical jargon or overly complex terms.
2. If you mention medical or space terms, explain them in plain everyday English.
3. Keep your advice calm, reassuring, and practical.
4. Give clear step-by-step guidance on what the crew should do (e.g. resting, sharing workloads, drinking water, or checking supplies).
5. Mention relevant safety guides if appropriate (Fatigue & Rest Guide, Cabin Oxygen Guide, or Heart Rhythm Guide).
6. Note kindly that your suggestions are recommendations for the crew to review and approve together.
"""

        response = client.models.generate_content(
            model=settings.GEMINI_MODEL,
            contents=prompt,
        )

        return {
            "answer": response.text,
            "intelligence_mode": "ONLINE_GEMINI_AI",
            "confidence": 0.98,
            "clinical_indicators": [
                f"Astronaut: {ast_name}",
                f"Status: {ast_condition}",
                f"Health Monitoring: Active"
            ],
            "referenced_protocols": [
                {"protocol_id": "SOP-FATIGUE-01", "title": "Astronaut Fatigue & Rest Protocol", "category": "Sleep & Mental Alertness", "step": None, "instruction": None}
            ],
            "suggested_actions": [
                "Review Crew Matrix workload handover",
                "Check wearable sensor readings"
            ]
        }

    except Exception as exc:
        logger.warning(f"External Gemini API unavailable ({type(exc).__name__}: {exc}). Engaging local flight knowledge fallback.")
        fallback = generate_offline_answer(question, astronaut, current_vitals)
        fallback["offline_fallback_reason"] = f"Gemini connection unavailable: {str(exc)}"
        return fallback
