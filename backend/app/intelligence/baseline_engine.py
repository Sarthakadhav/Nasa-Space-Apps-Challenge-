from typing import Dict, Any, List

def calculate_baseline_deviations(current_vitals: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Compares current vital readings against individual baseline reference values.
    Returns delta percentage, deviation sign, and clinical interpretation.
    """
    hr = current_vitals.get("heartRate", 70.0)
    hr_base = current_vitals.get("heartRateBaseline", 65.0)
    hr_delta_pct = round(((hr - hr_base) / hr_base) * 100, 1)

    hrv = current_vitals.get("hrv", 50.0)
    hrv_base = current_vitals.get("hrvBaseline", 55.0)
    hrv_delta_pct = round(((hrv - hrv_base) / hrv_base) * 100, 1)

    spo2 = current_vitals.get("spo2", 98.0)
    spo2_base = current_vitals.get("spo2Baseline", 99.0)
    spo2_delta = round(spo2 - spo2_base, 1)

    temp = current_vitals.get("temperature", 36.6)
    temp_base = current_vitals.get("tempBaseline", 36.6)
    temp_delta = round(temp - temp_base, 2)

    sleep_debt = current_vitals.get("sleepDebtHours", 0.0)

    comparisons = [
        {
            "metric": "Resting Heart Rate",
            "current": f"{hr:.0f} bpm",
            "baseline": f"{hr_base:.0f} bpm",
            "delta": f"{'+' if hr_delta_pct > 0 else ''}{hr_delta_pct}%",
            "status": "Elevated (Sympathetic Stress)" if hr_delta_pct > 20 else "Nominal"
        },
        {
            "metric": "Heart Rate Variability (RMSSD)",
            "current": f"{hrv:.0f} ms",
            "baseline": f"{hrv_base:.0f} ms",
            "delta": f"{hrv_delta_pct}%",
            "status": "Critically Depressed" if hrv < 30 else "Nominal"
        },
        {
            "metric": "Oxygen Saturation (SpO₂)",
            "current": f"{spo2:.1f}%",
            "baseline": f"{spo2_base:.1f}%",
            "delta": f"{'+' if spo2_delta > 0 else ''}{spo2_delta}%",
            "status": "Mild Hypoxic Dip" if spo2 < 97 else "Optimal"
        },
        {
            "metric": "Core Body Temperature",
            "current": f"{temp:.1f} °C",
            "baseline": f"{temp_base:.1f} °C",
            "delta": f"{'+' if temp_delta > 0 else ''}{temp_delta} °C",
            "status": "Circadian Drift" if abs(temp_delta) >= 0.4 else "Nominal"
        },
        {
            "metric": "72-Hour Sleep Debt",
            "current": f"{sleep_debt:.1f} hrs",
            "baseline": "< 1.0 hr target",
            "delta": f"+{sleep_debt:.1f}h",
            "status": "Severe Deficit" if sleep_debt >= 4.0 else "Nominal"
        }
    ]
    return comparisons
