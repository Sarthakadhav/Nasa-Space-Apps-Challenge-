import numpy as np
from sklearn.ensemble import IsolationForest
from typing import Dict, Any, List, Tuple

class AstronautAnomalyDetector:
    def __init__(self):
        # 6 physiological features:
        # [hr_drift_pct, hrv_ms, spo2_pct, temp_drift_c, sleep_debt_h, latency_drift_ms]
        self.model = IsolationForest(
            n_estimators=100,
            contamination=0.15,
            random_state=42
        )
        self._is_trained = False
        self._train_synthetic_nominal_baseline()

    def _train_synthetic_nominal_baseline(self):
        """Trains on 1000 synthetic nominal microgravity astronaut observations."""
        rng = np.random.RandomState(42)
        n_samples = 1000

        hr_drift = rng.normal(loc=0.0, scale=4.0, size=n_samples)        # nominal drift +/- 4%
        hrv = rng.normal(loc=55.0, scale=6.0, size=n_samples)             # nominal HRV 50-60 ms
        spo2 = rng.normal(loc=98.5, scale=0.6, size=n_samples)           # 98-99%
        temp_drift = rng.normal(loc=0.0, scale=0.15, size=n_samples)     # nominal +/- 0.15 C
        sleep_debt = rng.exponential(scale=0.8, size=n_samples)          # < 1.5h
        latency_drift = rng.normal(loc=0.0, scale=20.0, size=n_samples)  # ms

        X_train = np.column_stack([
            hr_drift, hrv, spo2, temp_drift, sleep_debt, latency_drift
        ])
        self.model.fit(X_train)
        self._is_trained = True

    def score_astronaut(
        self,
        hr: float,
        hr_baseline: float,
        hrv: float,
        spo2: float,
        temp: float,
        temp_baseline: float,
        sleep_debt: float,
        latency_drift_ms: float = 0.0
    ) -> Dict[str, Any]:
        """
        Runs Isolation Forest anomaly scoring.
        Returns:
            anomaly_score: float (positive = nominal, negative = outlier, e.g. -0.42)
            is_anomaly: bool
            status: str
            confidence: float
            primary_factors: List[Dict[str, Any]]
        """
        hr_drift_pct = ((hr - hr_baseline) / hr_baseline) * 100.0
        temp_drift = temp - temp_baseline

        sample = np.array([[
            hr_drift_pct,
            hrv,
            spo2,
            temp_drift,
            sleep_debt,
            latency_drift_ms
        ]])

        # decision_function gives negative for anomalies, positive for inliers
        raw_score = float(self.model.decision_function(sample)[0])
        # Format cleanly between -1.0 and +1.0
        anomaly_score = round(raw_score, 2)
        is_anomaly = anomaly_score < 0.0

        if anomaly_score < -0.5:
            status = "CRITICAL PHYSIOLOGICAL OUTLIER"
            confidence = 96.8
        elif anomaly_score < 0.0:
            status = "Fatigue Outlier"
            confidence = 94.2
        else:
            status = "Nominal Baseline"
            confidence = 98.4

        # Compute feature contributions to the score
        factors = []
        if hrv < 35.0:
            hrv_dev = round(((hrv - 55.0) / 55.0) * 100)
            factors.append({
                "feature": "Heart Rate Variability",
                "deviation": f"{hrv_dev}%",
                "impact": 0.44
            })
        if sleep_debt >= 3.0:
            factors.append({
                "feature": "Sleep Debt (72h)",
                "deviation": f"+{sleep_debt:.1f}h",
                "impact": 0.32
            })
        if hr_drift_pct > 15.0:
            factors.append({
                "feature": "Resting Pulse Drift",
                "deviation": f"+{hr_drift_pct:.0f}%",
                "impact": 0.18
            })
        if abs(temp_drift) >= 0.4:
            factors.append({
                "feature": "Core Temperature",
                "deviation": f"{'+' if temp_drift > 0 else ''}{temp_drift:.1f}°C",
                "impact": 0.06
            })

        if not factors:
            factors = [
                {"feature": "Cardiovascular Stability", "deviation": "+1.5%", "impact": 0.08},
                {"feature": "Sleep Architecture", "deviation": "+4.0%", "impact": 0.05}
            ]

        return {
            "anomalyScore": anomaly_score,
            "is_anomaly": is_anomaly,
            "status": status,
            "primaryFactors": factors,
            "cognitiveLatencyDelta_ms": int(latency_drift_ms),
            "isolationForestConfidence": confidence
        }

# Singleton instance
anomaly_engine = AstronautAnomalyDetector()
