from datetime import datetime
from typing import List, Optional, Any, Dict
from pydantic import BaseModel, EmailStr, Field, ConfigDict

# Auth Schemas
class Token(BaseModel):
    access_token: str
    token_type: str
    user_info: Dict[str, Any]

class TokenPayload(BaseModel):
    sub: Optional[str] = None
    role: Optional[str] = None

class LoginRequest(BaseModel):
    username: str
    password: str

class UserCreate(BaseModel):
    email: str
    username: str
    password: str
    full_name: str
    role: str = "analyst"
    department: str = "SOC Operations"

class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    full_name: str
    role: str
    department: str
    is_active: bool
    mfa_enabled: bool

    model_config = ConfigDict(from_attributes=True)

# Asset Schemas
class AssetResponse(BaseModel):
    id: int
    asset_id: str
    name: str
    asset_type: str
    sector: str
    ip_address: str
    location: str
    criticality: str
    status: str
    risk_score: float
    firmware_version: str

    model_config = ConfigDict(from_attributes=True)

# Log Ingestion & Prediction Schemas
class LogIngestRequest(BaseModel):
    source_ip: str
    destination_ip: str
    source_port: int = 80
    destination_port: int = 502 # Default Modbus port for SCADA
    protocol: str = "Modbus"
    event_type: str = "SCADA_WRITE_REGISTER"
    payload_summary: Optional[str] = "Write coil registers on PLC unit"
    packet_length: int = 128
    asset_id: Optional[str] = "SCADA-PLC-001"

class BehaviorAnalysisRequest(BaseModel):
    user_or_entity: str
    failed_login_count: int
    access_hours_off_peak: bool
    data_exfiltration_mb: float
    privilege_escalation_attempt: bool
    unusual_protocol_used: bool

class BehaviorAnalysisResponse(BaseModel):
    entity: str
    anomaly_score: float # 0.0 - 1.0
    is_anomaly: bool
    risk_level: str # LOW, MEDIUM, HIGH, CRITICAL
    confidence_score: float
    explanation: str
    mitre_technique: str
    recommended_action: str

class MLPredictionResponse(BaseModel):
    is_anomaly: bool
    anomaly_score: float
    attack_category: str # Normal, DDoS, SCADA_Command_Injection, Insider_Threat, Buffer_Overflow
    confidence_score: float
    model_outputs: Dict[str, float] # IsolationForest, RandomForest, AutoEncoder
    explanation: str
    recommended_playbook: str

# Incident & Response Schemas
class IncidentCreate(BaseModel):
    title: str
    description: str
    severity: str = "HIGH"
    asset_id: Optional[int] = None
    root_cause: Optional[str] = None

class IncidentResponse(BaseModel):
    id: int
    incident_code: str
    title: str
    description: str
    severity: str
    status: str
    containment_status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class PlaybookExecuteRequest(BaseModel):
    playbook_id: int
    asset_id: str
    reason: str = "Automated SOAR response triggered by high severity alert"

class PlaybookExecuteResponse(BaseModel):
    playbook_id: int
    playbook_name: str
    status: str
    executed_steps: List[Dict[str, Any]]
    execution_time_ms: float
    message: str

# Alert & Threat Intel Schemas
class AlertResponse(BaseModel):
    id: int
    alert_code: str
    title: str
    category: str
    severity: str
    anomaly_score: float
    confidence: float
    description: str
    is_acknowledged: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class ThreatIntelResponse(BaseModel):
    id: int
    indicator: str
    indicator_type: str
    threat_type: str
    severity: str
    description: str
    mitre_technique: Optional[str] = None
    confidence: float

    model_config = ConfigDict(from_attributes=True)

# Dashboard Overview Schema
class DashboardOverviewResponse(BaseModel):
    total_assets: int
    active_incidents: int
    critical_alerts: int
    overall_cni_risk_index: float # 0-100
    sector_health: Dict[str, float] # Power Grid, Nuclear, etc.
    recent_alerts: List[AlertResponse]
    mitre_coverage_summary: Dict[str, int]
    system_status: str

# Agent Chat RAG Schema
class AgentChatRequest(BaseModel):
    query: str
    agent_type: str = "RAGKnowledge" # UEBA, ThreatIntel, MITRE, SOAR, ExecReport, Compliance, Prediction, RAGKnowledge

class AgentChatResponse(BaseModel):
    agent_name: str
    response: str
    sources: List[str]
    confidence: float
    structured_data: Optional[Dict[str, Any]] = None
