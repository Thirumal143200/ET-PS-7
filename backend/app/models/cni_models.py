from datetime import datetime

from sqlalchemy import JSON, Boolean, Column, DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from app.db.session import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    username = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(
        String(50), default="analyst", nullable=False
    )  # admin, analyst, executive, auditor
    department = Column(String(100), default="SOC Operations")
    is_active = Column(Boolean, default=True)
    mfa_enabled = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    sessions = relationship("SessionModel", back_populates="user", cascade="all, delete-orphan")
    audit_logs = relationship("AuditLog", back_populates="user")


class Asset(Base):
    __tablename__ = "assets"

    id = Column(Integer, primary_key=True, index=True)
    asset_id = Column(String(100), unique=True, index=True, nullable=False)  # e.g. SCADA-PLC-001
    name = Column(String(255), nullable=False)
    asset_type = Column(
        String(100), nullable=False
    )  # SCADA PLC, Substation Router, Grid Control Center, HMI Unit
    sector = Column(
        String(100), nullable=False
    )  # Power Grid, Nuclear, Water Treatment, Rail Transit, Financial Switch
    ip_address = Column(String(45), nullable=False)
    mac_address = Column(String(50), nullable=True)
    location = Column(String(255), default="Primary Substation Alpha")
    criticality = Column(String(50), default="HIGH")  # CRITICAL, HIGH, MEDIUM, LOW
    status = Column(
        String(50), default="HEALTHY"
    )  # HEALTHY, DEGRADED, CRITICAL, COMPROMISED, ISOLATED
    firmware_version = Column(String(50), default="v4.2.1-sec")
    risk_score = Column(Float, default=15.0)  # 0-100 score
    created_at = Column(DateTime, default=datetime.utcnow)

    logs = relationship("Log", back_populates="asset")
    alerts = relationship("Alert", back_populates="asset")
    incidents = relationship("Incident", back_populates="asset")
    risk_scores = relationship("RiskScore", back_populates="asset")


class Log(Base):
    __tablename__ = "logs"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
    asset_id = Column(Integer, ForeignKey("assets.id", ondelete="CASCADE"), nullable=True)
    source_ip = Column(String(45), nullable=False)
    destination_ip = Column(String(45), nullable=False)
    source_port = Column(Integer, default=0)
    destination_port = Column(Integer, default=0)
    protocol = Column(String(20), default="TCP")  # TCP, UDP, Modbus, DNP3, IEC-60870-5-104, HTTP
    event_type = Column(
        String(100), nullable=False
    )  # SCADA_WRITE, LOGIN_ATTEMPT, NMAP_SCAN, BUFFER_OVERFLOW
    payload_summary = Column(Text, nullable=True)
    packet_length = Column(Integer, default=64)
    anomaly_score = Column(Float, default=0.0)  # From ML model
    is_anomaly = Column(Boolean, default=False)
    severity = Column(String(50), default="INFO")  # INFO, LOW, MEDIUM, HIGH, CRITICAL

    asset = relationship("Asset", back_populates="logs")


class ThreatIntel(Base):
    __tablename__ = "threat_intel"

    id = Column(Integer, primary_key=True, index=True)
    indicator = Column(
        String(255), unique=True, index=True, nullable=False
    )  # IP, Hash, Domain, CVE-ID
    indicator_type = Column(String(50), nullable=False)  # IP, HASH, DOMAIN, CVE, ADVISORY
    threat_type = Column(
        String(100), nullable=False
    )  # APT, Ransomware, SCADA Exploit, Insider Threat
    severity = Column(String(50), default="HIGH")
    description = Column(Text, nullable=False)
    mitre_technique = Column(String(100), nullable=True)  # T1059, T1078
    source = Column(String(100), default="CERT-In / NVD")
    confidence = Column(Float, default=90.0)
    created_at = Column(DateTime, default=datetime.utcnow)


class Incident(Base):
    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True)
    incident_code = Column(String(50), unique=True, index=True, nullable=False)  # INC-2026-001
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    severity = Column(String(50), default="HIGH")  # LOW, MEDIUM, HIGH, CRITICAL
    status = Column(
        String(50), default="ACTIVE"
    )  # OPEN, INVESTIGATING, CONTAINED, RESOLVED, CLOSED
    asset_id = Column(Integer, ForeignKey("assets.id"), nullable=True)
    assigned_to = Column(String(255), default="Tier-2 SOC Analyst")
    root_cause = Column(Text, nullable=True)
    containment_status = Column(String(100), default="IN_PROGRESS")
    created_at = Column(DateTime, default=datetime.utcnow)
    resolved_at = Column(DateTime, nullable=True)

    asset = relationship("Asset", back_populates="incidents")
    alerts = relationship("Alert", back_populates="incident")


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    alert_code = Column(String(50), unique=True, index=True, nullable=False)  # ALT-9041
    title = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False)  # UEBA, Anomaly, SCADA Attack, Network Intrusion
    severity = Column(String(50), default="HIGH")  # LOW, MEDIUM, HIGH, CRITICAL
    asset_id = Column(Integer, ForeignKey("assets.id"), nullable=True)
    incident_id = Column(Integer, ForeignKey("incidents.id"), nullable=True)
    anomaly_score = Column(Float, default=85.0)
    confidence = Column(Float, default=92.0)
    description = Column(Text, nullable=False)
    is_acknowledged = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    asset = relationship("Asset", back_populates="alerts")
    incident = relationship("Incident", back_populates="alerts")


class RiskScore(Base):
    __tablename__ = "risk_scores"

    id = Column(Integer, primary_key=True, index=True)
    asset_id = Column(Integer, ForeignKey("assets.id", ondelete="CASCADE"), nullable=False)
    overall_score = Column(Float, nullable=False)  # 0-100
    behavior_score = Column(Float, default=0.0)
    threat_intel_score = Column(Float, default=0.0)
    vulnerability_score = Column(Float, default=0.0)
    calculated_at = Column(DateTime, default=datetime.utcnow)

    asset = relationship("Asset", back_populates="risk_scores")


class MITREMapping(Base):
    __tablename__ = "mitre_mappings"

    id = Column(Integer, primary_key=True, index=True)
    technique_id = Column(String(50), nullable=False)  # T1059.001
    technique_name = Column(String(255), nullable=False)  # PowerShell Command Execution
    tactic = Column(
        String(100), nullable=False
    )  # Execution, Persistence, Lateral Movement, ICS Impact
    detection_source = Column(String(100), default="UEBA ML Engine")
    hit_count = Column(Integer, default=1)
    severity = Column(String(50), default="HIGH")
    recommendation = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class Playbook(Base):
    __tablename__ = "playbooks"

    id = Column(Integer, primary_key=True, index=True)
    playbook_name = Column(String(255), nullable=False)
    trigger_event = Column(String(255), nullable=False)  # e.g. SCADA_PLC_COMPROMISE
    target_sector = Column(String(100), default="Power Grid")
    status = Column(String(50), default="IDLE")  # IDLE, RUNNING, COMPLETED, FAILED
    execution_steps = Column(JSON, nullable=False)  # List of actions
    last_executed = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    report_title = Column(String(255), nullable=False)
    report_type = Column(
        String(100), nullable=False
    )  # Executive, Technical, NIST-Compliance, CERT-In Audit
    summary = Column(Text, nullable=False)
    key_metrics = Column(JSON, nullable=True)
    file_path = Column(String(500), nullable=True)
    generated_by = Column(String(255), default="Executive Report Agent")
    created_at = Column(DateTime, default=datetime.utcnow)


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    action = Column(String(100), nullable=False)  # LOGIN, PLAYBOOK_EXECUTE, ASSET_ISOLATE
    details = Column(Text, nullable=False)
    ip_address = Column(String(45), default="127.0.0.1")
    timestamp = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="audit_logs")


class SessionModel(Base):
    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True, index=True)
    session_token = Column(String(255), unique=True, index=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    ip_address = Column(String(45), default="127.0.0.1")
    user_agent = Column(String(255), default="Mozilla/5.0")
    created_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime, nullable=False)

    user = relationship("User", back_populates="sessions")
