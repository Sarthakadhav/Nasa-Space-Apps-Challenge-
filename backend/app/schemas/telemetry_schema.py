from typing import List, Optional
from pydantic import BaseModel, Field

class SensorStreamData(BaseModel):
    ecg_lead2_mv: float = Field(..., description="ECG Lead-II potential in millivolts")
    spo2_pct: float = Field(..., ge=0, le=100, description="Blood oxygen saturation percentage")
    heart_rate_bpm: float = Field(..., ge=0, le=300, description="Heart rate in beats per minute")
    skin_temp_c: float = Field(..., description="Skin / core temperature in degrees Celsius")
    imu_accel_g: List[float] = Field(default_factory=lambda: [0.0, 0.0, 0.0], description="3-axis accelerometer readings [x, y, z]")
    impedance_ohms: float = Field(default=480.0, description="Electrode contact impedance")

class TelemetryPacket(BaseModel):
    packet_id: int = Field(..., description="Unique incremental sequence packet ID")
    timestamp_met: str = Field(..., description="Mission Elapsed Time, e.g. 142:04:36:18")
    astronaut_id: str = Field(..., description="Astronaut ID, e.g. AST-01")
    sensor_stream: SensorStreamData
    battery_level_pct: Optional[float] = Field(default=95.0, description="ESP32 battery level")
    crc32_valid: Optional[bool] = Field(default=True, description="CRC32 integrity status")
    device_id: Optional[str] = Field(default="ESP32-BIO-01", description="Hardware device ID")

class IngestResponse(BaseModel):
    status: str
    packet_id: int
    astronaut_id: str
    quality_status: str
    is_anomaly: bool
    anomaly_score: float
    safety_alert: Optional[str] = None
    processed_at_met: str
