from typing import Optional, List
from pydantic import BaseModel, Field

class InventoryItem(BaseModel):
    id: str
    category: str
    name: str
    indication: str
    stock: int
    unit: str
    minSafeStock: int
    shelfLifeDays: int
    radiationDegradationRate: str
    vitalUrgency: str
    status: str
    location: str
    contraindications: Optional[str] = None
    batteryChargePercent: Optional[int] = None

class ScenarioSupplies(BaseModel):
    item: str
    qty: str

class EmergencyScenario(BaseModel):
    id: str
    name: str
    description: str
    requiredSupplies: List[ScenarioSupplies]
    predictedRecoveryHours: float
    crewReadinessImpact: str

class ConsumeInventoryRequest(BaseModel):
    item_id: str
    quantity: int = 1
    reason: str = "Clinical emergency consumption"
    authorized_by: str = "Dr. Elena Vance"
