from typing import Dict, Any, Optional

class SafetyCheckResult:
    def __init__(self, is_critical: bool, severity: str, alert_type: str, message: str):
        self.is_critical = is_critical
        self.severity = severity
        self.alert_type = alert_type
        self.message = message

def evaluate_physiological_safety(
    hr: float,
    spo2: float,
    temp: float,
    hrv: Optional[float] = None,
    impedance: Optional[float] = None
) -> Optional[SafetyCheckResult]:
    """
    Deterministic safety rules based on NASA Spaceflight Clinical Guidelines.
    Runs locally and synchronously with zero latency.
    """
    # Electrode lead off or bad contact check
    if impedance is not None and impedance > 1200:
        return SafetyCheckResult(
            is_critical=False,
            severity="ADVISORY",
            alert_type="Electrode Contact Fault",
            message="Impedance exceeds 1200 ohms. Please verify sensor gel and chest strap contact."
        )

    # Acute Hypoxia Check
    if spo2 < 88.0:
        return SafetyCheckResult(
            is_critical=True,
            severity="CRITICAL",
            alert_type="Severe Hypoxia Alert",
            message=f"Critical SpO2 drop to {spo2:.1f}%. Immediately don emergency 100% O2 mask (SOP-HYPOXIA-02)."
        )
    elif spo2 < 93.0:
        return SafetyCheckResult(
            is_critical=False,
            severity="WARNING",
            alert_type="Mild Hypoxic Drift",
            message=f"SpO2 decreased to {spo2:.1f}%. Check ECLSS cabin pO2 and breathing regulator."
        )

    # Cardiac Arrhythmia / Extreme Tachycardia / Bradycardia
    if hr > 130.0:
        return SafetyCheckResult(
            is_critical=True,
            severity="CRITICAL",
            alert_type="Acute Sustained Tachycardia",
            message=f"Resting heart rate at {hr:.0f} bpm exceeds critical limit (>130 bpm). Stage AED (SOP-ARRHYTHMIA-03)."
        )
    elif hr < 42.0:
        return SafetyCheckResult(
            is_critical=True,
            severity="CRITICAL",
            alert_type="Severe Bradycardia",
            message=f"Resting heart rate at {hr:.0f} bpm is dangerously depressed (<42 bpm)."
        )

    # Core Temperature Derangement
    if temp > 38.8:
        return SafetyCheckResult(
            is_critical=True,
            severity="CRITICAL",
            alert_type="Hyperthermia / Heat Stress",
            message=f"Core temperature reached {temp:.1f}°C. Initiate active liquid cooling garment."
        )
    elif temp < 35.0:
        return SafetyCheckResult(
            is_critical=True,
            severity="CRITICAL",
            alert_type="Hypothermia Alert",
            message=f"Core temperature dropped to {temp:.1f}°C. Check suit heating circuit."
        )

    # Autonomic Depletion
    if hrv is not None and hrv < 20.0 and hr > 80.0:
        return SafetyCheckResult(
            is_critical=False,
            severity="WARNING",
            alert_type="Sympathetic Exhaustion Outlier",
            message=f"HRV depressed to {hrv:.1f} ms with elevated pulse ({hr:.0f} bpm). Critical fatigue accumulation."
        )

    return None
