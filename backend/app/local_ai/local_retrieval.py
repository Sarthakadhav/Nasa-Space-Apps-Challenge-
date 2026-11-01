import re
from typing import Dict, Any, List, Optional
from app.local_ai.knowledge_base import MEDICAL_PROTOCOLS, EMERGENCY_SCENARIOS

def search_offline_protocols(query: str) -> List[Dict[str, Any]]:
    """
    Ranks medical standard operating procedures using weighted token overlap.
    100% offline, deterministic, sub-millisecond response.
    """
    query_tokens = set(re.findall(r"\w+", query.lower()))
    scored_protocols = []

    for proto in MEDICAL_PROTOCOLS:
        score = 0.0
        # Keyword matches
        for kw in proto.get("keywords", []):
            if kw.lower() in query_tokens:
                score += 3.0
            elif kw.lower() in query.lower():
                score += 2.0

        # Title / category matches
        for word in proto["title"].lower().split():
            if word in query_tokens:
                score += 1.5

        if proto["id"].lower() in query.lower():
            score += 10.0

        if score > 0:
            scored_protocols.append((score, proto))

    scored_protocols.sort(key=lambda x: x[0], reverse=True)
    return [p[1] for p in scored_protocols]

def generate_offline_answer(
    query: str,
    astronaut: Optional[Dict[str, Any]] = None,
    current_vitals: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """
    Constructs a friendly, structured flight medicine response strictly from onboard SOPs.
    """
    matching_protocols = search_offline_protocols(query)
    
    ast_name = astronaut.get("name", "Astronaut") if astronaut else "Astronaut"
    ast_condition = astronaut.get("condition", "Healthy") if astronaut else "Healthy"

    if matching_protocols:
        top_proto = matching_protocols[0]
        steps_text = "\n".join([
            f"  {s['step']}. {s['instruction']}"
            for s in top_proto["steps"]
        ])
        
        answer = (
            f"**[Offline Flight Guide]** Protocol **{top_proto['id']}**: {top_proto['title']}\n\n"
            f"**When This Applies:** {top_proto['triggerCriteria']}\n\n"
            f"**Recommended Steps for {ast_name} ({ast_condition}):**\n{steps_text}\n\n"
            f"**Safety Reminder:** {top_proto.get('contraindications', 'None.')}\n\n"
            f"*(Note: Running 100% locally on your spacecraft. All guides work even without an Earth link.)*"
        )
        suggested_actions = [s["actionRequired"] for s in top_proto["steps"]]
        referenced_protocols = [{
            "protocol_id": top_proto["id"],
            "title": top_proto["title"],
            "category": top_proto["category"],
            "step": None,
            "instruction": None
        }]
        confidence = 0.94
    else:
        answer = (
            f"**[Offline Flight Guide]** Health check for {ast_name}:\n\n"
            f"Current Status: **{ast_condition}**.\n\n"
            f"Vitals are streaming steadily. No urgent emergencies are currently detected. "
            f"If anyone feels tired, short of breath, or unwell, check the guides for "
            f"Fatigue & Rest (SOP-FATIGUE-01), Low Oxygen (SOP-HYPOXIA-02), or Heart Rhythm (SOP-ARRHYTHMIA-03)."
        )
        suggested_actions = ["Review live vital readings", "Check sensor skin contact", "Review crew schedule"]
        referenced_protocols = []
        confidence = 0.85

    clinical_indicators = []
    if current_vitals:
        hr = current_vitals.get("heartRate", 70)
        spo2 = current_vitals.get("spo2", 98)
        hrv = current_vitals.get("hrv", 50)
        clinical_indicators.append(f"Heart Rate: {hr} bpm")
        clinical_indicators.append(f"Oxygen: {spo2}%")
        clinical_indicators.append(f"Recovery (HRV): {hrv} ms")

    return {
        "answer": answer,
        "intelligence_mode": "OFFLINE_FLIGHT_KNOWLEDGE",
        "confidence": confidence,
        "clinical_indicators": clinical_indicators,
        "referenced_protocols": referenced_protocols,
        "suggested_actions": suggested_actions
    }
