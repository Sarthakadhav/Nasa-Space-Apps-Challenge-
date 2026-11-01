from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field

class AssistantQueryRequest(BaseModel):
    question: str = Field(..., description="Query from astronaut or flight surgeon")
    astronaut_id: Optional[str] = Field(default="AST-01", description="Target astronaut context")
    include_vitals: bool = Field(default=True, description="Inject current physiological state")

class ProtocolReference(BaseModel):
    protocol_id: str
    title: str
    category: str
    step: Optional[int] = None
    instruction: Optional[str] = None

class AssistantQueryResponse(BaseModel):
    answer: str
    intelligence_mode: str = Field(..., description="ONLINE_GEMINI_AI or OFFLINE_FLIGHT_KNOWLEDGE")
    confidence: float
    astronaut_id: Optional[str] = None
    clinical_indicators: List[str] = Field(default_factory=list)
    referenced_protocols: List[ProtocolReference] = Field(default_factory=list)
    safety_disclaimer: str = (
        "FLIGHT DECISION SUPPORT ONLY: Non-diagnostic spaceflight clinical aid. "
        "Adhere to NASA-STD-3001 and consult Flight Surgeon when Earth link is active."
    )
    suggested_actions: List[str] = Field(default_factory=list)
