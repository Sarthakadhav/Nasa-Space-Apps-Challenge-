from typing import Dict, Any, List

def calculate_crew_readiness_metrics(is_redistributed: bool = False, active_drill_id: str | None = None) -> Dict[str, Any]:
    """
    Computes Level 2 Crew Readiness Intelligence across 4 understandable physiological and operational dimensions.
    """
    if active_drill_id == "SCENARIO-02":
        # Cabin Depressurization / DCS emergency drill active
        return {
            "overallScore": 48,
            "statusDescription": "URGENT ALERT: Low Cabin Air Pressure Detected",
            "disclaimer": "Illustrative simulated score, not a clinically validated measurement.",
            "dimensions": [
                {"label": "Physical Energy", "value": 42, "max": 100},
                {"label": "Sleep & Rest", "value": 50, "max": 100},
                {"label": "Backup Readiness", "value": 38, "max": 100},
                {"label": "Living Environment", "value": 45, "max": 100}
            ],
            "aiRecommendation": "Put on oxygen masks right away. Pause all routine work until pressure stabilizes."
        }

    if is_redistributed:
        # Duty transferred from Vance to Chen
        return {
            "overallScore": 82,
            "statusDescription": "Stable — Dr. Vance is resting while Cmdr. Chen covers duties",
            "disclaimer": "Illustrative simulated score, not a clinically validated measurement.",
            "dimensions": [
                {"label": "Physical Energy", "value": 81, "max": 100},
                {"label": "Sleep & Rest", "value": 78, "max": 100},
                {"label": "Backup Readiness", "value": 88, "max": 100},
                {"label": "Living Environment", "value": 89, "max": 100}
            ],
            "aiRecommendation": "Workload transfer complete! Commander Chen is covering medical duties. Dr. Vance will rest for 8 hours."
        }

    # Default state: Vance fatigued, medical redundancy compromised
    return {
        "overallScore": 68,
        "statusDescription": "Needs Attention — Dr. Vance is tired, workload rebalancing advised",
        "disclaimer": "Illustrative simulated score, not a clinically validated measurement.",
        "dimensions": [
            {"label": "Physical Energy", "value": 72, "max": 100},
            {"label": "Sleep & Rest", "value": 58, "max": 100},
            {"label": "Backup Readiness", "value": 74, "max": 100},
            {"label": "Living Environment", "value": 89, "max": 100}
        ],
        "aiRecommendation": "Dr. Vance is showing signs of high fatigue. To keep the crew safe and ready, consider letting Commander Chen cover non-urgent tasks so Dr. Vance can rest."
    }
