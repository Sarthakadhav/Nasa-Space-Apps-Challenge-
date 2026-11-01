from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class ReadinessBreakdown(BaseModel):
    physical: int
    cognitive: int
    circadian: int
    cardiovascular: int

class AstronautVitals(BaseModel):
    heartRate: float
    heartRateBaseline: float
    spo2: float
    spo2Baseline: float
    temperature: float
    tempBaseline: float
    hrv: float
    hrvBaseline: float
    respiration: float
    respirationBaseline: float
    bloodPressure: str
    bpBaseline: str
    imuActivity: str
    sleepDebtHours: float
    sleepLast24h: float
    deepSleepPercent: int
    circadianPhaseShiftHours: float
    radiationDoseDaily_mSv: float
    radiationCumulative_mSv: float

class SensorReliability(BaseModel):
    overall: int
    leadContact: str
    signalToNoiseRatio: float
    packetLossPercent: float
    hardwareStatus: str

class MLFactor(BaseModel):
    feature: str
    deviation: str
    impact: float

class MLModelSummary(BaseModel):
    anomalyScore: float
    status: str
    primaryFactors: List[MLFactor] = Field(default_factory=list)
    cognitiveLatencyDelta_ms: int
    isolationForestConfidence: float

class Responsibility(BaseModel):
    id: str
    title: str
    priority: str
    canDelegate: bool

class BackupOfficerInfo(BaseModel):
    id: str
    name: str
    qualification: str

class AstronautProfile(BaseModel):
    id: str
    name: str
    callsign: str
    role: str
    dutyCategory: str
    condition: str
    conditionSeverity: str
    photo: str
    avatar: str
    age: int
    bloodType: str
    missionDay: int
    suitId: str
    readinessScore: int
    readinessBreakdown: ReadinessBreakdown
    vitals: AstronautVitals
    sensorReliability: SensorReliability
    mlModel: MLModelSummary
    responsibilities: List[Responsibility]
    backupOfficer: Optional[BackupOfficerInfo] = None
    recommendation: str
    assignedBackupId: Optional[str] = None
    isReassigned: bool = False
    timelineNotes: str

class ReadinessDimension(BaseModel):
    label: str
    value: int
    max: int = 100

class CrewReadinessResponse(BaseModel):
    overallScore: int
    statusDescription: str
    disclaimer: str
    dimensions: List[ReadinessDimension]
    aiRecommendation: str

class WorkloadRedistributionRequest(BaseModel):
    primary_astronaut_id: str = "AST-01"
    backup_astronaut_id: str = "AST-02"
    approved_by: str = "Cmdr. Sarah Chen"
    reason: Optional[str] = "Clinical fatigue threshold exceeded"

class WorkloadRedistributionResponse(BaseModel):
    status: str
    new_crew_readiness_score: int
    primary_astronaut: Dict[str, Any]
    backup_astronaut: Dict[str, Any]
    incident_id: str
    message: str
