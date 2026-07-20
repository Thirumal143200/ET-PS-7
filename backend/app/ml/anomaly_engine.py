from typing import Any, Dict, Tuple

import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest, RandomForestClassifier
from sklearn.neural_network import MLPRegressor
from sklearn.preprocessing import StandardScaler


class CNIMLEngine:
    def __init__(self):
        self.scaler = StandardScaler()
        self.iso_forest = IsolationForest(n_estimators=100, contamination=0.1, random_state=42)
        self.rf_classifier = RandomForestClassifier(n_estimators=50, random_state=42)
        # Deep AutoEncoder modeled as MLPRegressor mapping X -> X
        self.autoencoder = MLPRegressor(
            hidden_layer_sizes=(16, 8, 16), max_iter=200, random_state=42
        )
        self.is_trained = False
        self._initialize_and_train_baseline()

    def _initialize_and_train_baseline(self):
        """
        Train baseline ML models using synthesized CNI telemetry feature distributions
        (reflecting UNSW-NB15, CICIDS2017 & CERT Insider Threat datasets).
        Features: [source_port, dest_port, packet_length, fail_count, byte_rate, off_hours, protocol_num]
        """
        np.random.seed(42)

        # 1. Normal CNI Traffic (Modbus, DNP3, SCADA telemetry) - 800 samples
        normal_traffic = np.random.normal(
            loc=[1024, 502, 128, 0, 500, 0, 1],
            scale=[100, 10, 30, 0.5, 100, 0.1, 0.1],
            size=(800, 7),
        )
        normal_labels = np.array(["Normal"] * 800)

        # 2. Attack Traffic (DDoS, SCADA Injection, Insider Exfil, Buffer Overflow) - 200 samples
        ddos = np.random.normal(
            loc=[50000, 80, 1400, 2, 50000, 0, 2],
            scale=[500, 5, 100, 1, 5000, 0.2, 0.2],
            size=(50, 7),
        )
        scada_inj = np.random.normal(
            loc=[4500, 502, 2048, 1, 1200, 1, 1],
            scale=[200, 0, 200, 0.5, 200, 0.1, 0.0],
            size=(50, 7),
        )
        insider = np.random.normal(
            loc=[8080, 443, 10000, 5, 25000, 1, 3],
            scale=[300, 10, 2000, 1, 3000, 0.0, 0.1],
            size=(50, 7),
        )
        buffer_ovf = np.random.normal(
            loc=[9000, 21, 4096, 3, 8000, 0, 4],
            scale=[400, 2, 500, 1, 1000, 0.3, 0.1],
            size=(50, 7),
        )

        attack_traffic = np.vstack([ddos, scada_inj, insider, buffer_ovf])
        attack_labels = np.array(
            ["DDoS"] * 50
            + ["SCADA_Command_Injection"] * 50
            + ["Insider_Threat"] * 50
            + ["Buffer_Overflow"] * 50
        )

        X = np.vstack([normal_traffic, attack_traffic])
        y = np.concatenate([normal_labels, attack_labels])

        # Clip values to realistic non-negative ranges
        X = np.clip(X, a_min=0, a_max=None)

        # Fit Scaler & Models
        X_scaled = self.scaler.fit_transform(X)
        self.iso_forest.fit(X_scaled)
        self.rf_classifier.fit(X_scaled, y)
        self.autoencoder.fit(X_scaled, X_scaled)

        self.is_trained = True

    def predict(
        self,
        source_port: int,
        destination_port: int,
        packet_length: int,
        failed_logins: int = 0,
        byte_rate: float = 500.0,
        off_hours: bool = False,
        protocol: str = "Modbus",
    ) -> Dict[str, Any]:
        """
        Ensemble prediction combining Isolation Forest, Random Forest Classifier, and Neural AutoEncoder.
        """
        proto_map = {"Modbus": 1, "TCP": 2, "UDP": 3, "DNP3": 4, "HTTP": 5, "IEC-104": 1}
        proto_num = proto_map.get(protocol, 1)

        raw_features = np.array(
            [
                [
                    source_port,
                    destination_port,
                    packet_length,
                    failed_logins,
                    byte_rate,
                    1.0 if off_hours else 0.0,
                    proto_num,
                ]
            ]
        )

        scaled_features = self.scaler.transform(raw_features)

        # 1. Isolation Forest Output (-1 = Anomaly, 1 = Normal)
        iso_score_raw = self.iso_forest.score_samples(scaled_features)[0]
        # Normalize score to 0..1 scale (higher = more anomalous)
        iso_anomaly_prob = float(np.clip(1.0 - (iso_score_raw + 0.5), 0.0, 1.0))

        # 2. Random Forest Classification
        rf_pred_class = str(self.rf_classifier.predict(scaled_features)[0])
        rf_probs = self.rf_classifier.predict_proba(scaled_features)[0]
        max_rf_confidence = float(np.max(rf_probs))

        # 3. AutoEncoder Reconstruction Error
        reconstructed = self.autoencoder.predict(scaled_features)
        mse_error = float(np.mean((scaled_features - reconstructed) ** 2))
        ae_anomaly_score = float(np.clip(mse_error * 1.5, 0.0, 1.0))

        # Ensemble Score (Weighted Average)
        ensemble_anomaly_score = round(
            float(
                0.4 * iso_anomaly_prob
                + 0.35 * ae_anomaly_score
                + 0.25 * (1.0 if rf_pred_class != "Normal" else 0.0)
            ),
            3,
        )
        is_anomaly = ensemble_anomaly_score > 0.45 or rf_pred_class != "Normal"

        if not is_anomaly:
            rf_pred_class = "Normal Traffic"
            confidence = round(max_rf_confidence * 100, 1)
            explanation = "Traffic telemetry exhibits baseline SCADA operational parameters. No threat detected."
            playbook = "PLAYBOOK_NONE"
        else:
            confidence = round(max(max_rf_confidence, ensemble_anomaly_score) * 100, 1)
            explanation = f"High anomaly detected! Ensemble model flagged anomalous pattern (IsoScore: {iso_anomaly_prob:.2f}, AE Error: {ae_anomaly_score:.2f}). Classified as {rf_pred_class}."

            playbook_map = {
                "DDoS": "PLAYBOOK_MITIGATE_DDOS",
                "SCADA_Command_Injection": "PLAYBOOK_ISOLATE_SCADA_PLC",
                "Insider_Threat": "PLAYBOOK_REVOKE_USER_CREDENTIALS",
                "Buffer_Overflow": "PLAYBOOK_PATCH_FIRMWARE_SERVICE",
            }
            playbook = playbook_map.get(rf_pred_class, "PLAYBOOK_GENERIC_ISOLATION")

        return {
            "is_anomaly": is_anomaly,
            "anomaly_score": ensemble_anomaly_score,
            "attack_category": rf_pred_class,
            "confidence_score": confidence,
            "model_outputs": {
                "isolation_forest_score": round(iso_anomaly_prob, 3),
                "autoencoder_reconstruction_error": round(ae_anomaly_score, 3),
                "random_forest_confidence": round(max_rf_confidence, 3),
            },
            "explanation": explanation,
            "recommended_playbook": playbook,
        }


cni_ml_engine = CNIMLEngine()
