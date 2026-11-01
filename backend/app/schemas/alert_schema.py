from typing import Optional, List
from pydantic import BaseModel, Field
from datetime import datetime

class AlertCreate(BaseModel):
    astronaut_id: str
    severity: str = Field(..., description="CRITICAL | WARNING | ADVISORY | NOMINAL")
    type: str
    message: str
    source: str = "LOCAL_HEALTH_ENGINE"
    vital_trigger: Optional[dict] = None

class AlertItem(BaseModel):
    id: str
    astronaut_id: str
    severity: str
    type: str
    message: str
    status: str = Field(default="NEW", description="NEW | ACKNOWLEDGED | RESOLVED")
    created_at_met: str
    acknowledged_by: Optional[str] = None
    acknowledged_at_met: Optional[str] = None
    resolved_by: Optional[str] = None
    resolved_at_met: Optional[str] = None
    actions_taken: List[str] = Field(default_factory=list)

class AlertAcknowledgeRequest(BaseModel):
    officer_id: str = "Cmdr. Sarah Chen"
    notes: Optional[str] = None

class AlertResolveRequest(BaseModel):
    officer_id: str = "Dr. Elena Vance"
    resolution_notes: str
