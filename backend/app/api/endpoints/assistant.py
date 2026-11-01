import json
from fastapi import APIRouter
from app.schemas.assistant_schema import AssistantQueryRequest, AssistantQueryResponse
from app.ai.gemini_service import ask_orbital_assistant
from app.database.connection import get_db

router = APIRouter()

@router.post("/assistant/ask", response_model=AssistantQueryResponse, summary="Ask Hybrid Flight AI Assistant")
def ask_ai_assistant(req: AssistantQueryRequest):
    """
    Hybrid Clinical Intelligence:
    - When online & GEMINI_API_KEY is configured: Queries Google Gemini for clinical explanations.
    - When offline or internet disconnected: Autonomous local flight medicine SOP engine provides guidance.
    - Never throws 500 or hangs when connectivity drops.
    """
    astronaut_data = None
    vitals_data = None

    if req.astronaut_id:
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM astronauts WHERE id = ?;", (req.astronaut_id,))
            row = cursor.fetchone()
            if row:
                astronaut_data = dict(row)
                if req.include_vitals and row["vitals"]:
                    vitals_data = json.loads(row["vitals"])

    result = ask_orbital_assistant(
        question=req.question,
        astronaut=astronaut_data,
        current_vitals=vitals_data
    )

    return AssistantQueryResponse(
        answer=result["answer"],
        intelligence_mode=result["intelligence_mode"],
        confidence=result.get("confidence", 0.95),
        astronaut_id=req.astronaut_id,
        clinical_indicators=result.get("clinical_indicators", []),
        referenced_protocols=result.get("referenced_protocols", []),
        suggested_actions=result.get("suggested_actions", [])
    )
