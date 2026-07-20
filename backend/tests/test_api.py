from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ONLINE"


def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "HEALTHY"


def test_login_flow():
    response = client.post(
        "/api/v1/auth/login", json={"username": "admin@cni.gov.in", "password": "admin123"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["user_info"]["role"] == "admin"


def test_dashboard_endpoint():
    response = client.get("/api/v1/dashboard")
    assert response.status_code == 200
    data = response.json()
    assert "total_assets" in data
    assert "overall_cni_risk_index" in data


def test_ml_predict_endpoint():
    response = client.post(
        "/api/v1/predict",
        json={
            "source_ip": "192.168.1.100",
            "destination_ip": "10.240.12.14",
            "source_port": 49152,
            "destination_port": 502,
            "protocol": "Modbus",
            "packet_length": 128,
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert "is_anomaly" in data
    assert "anomaly_score" in data


def test_agents_chat_endpoint():
    response = client.post(
        "/api/v1/agents/chat",
        json={
            "query": "What are the latest CERT-In advisories on SCADA Modbus PLCs?",
            "agent_type": "RAGKnowledge",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert "agent_name" in data
    assert "response" in data
