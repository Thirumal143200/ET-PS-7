import datetime

from sqlalchemy.orm import Session

from app.core.security import get_password_hash
from app.models.cni_models import (
    Alert,
    Asset,
    AuditLog,
    Incident,
    Log,
    MITREMapping,
    Playbook,
    Report,
    RiskScore,
    ThreatIntel,
    User,
)


def seed_cni_database(db: Session):
    # Check if database is already seeded
    if db.query(User).first():
        return

    # 1. Seed Users (RBAC)
    admin_user = User(
        email="admin@cni.gov.in",
        username="admin_cni",
        hashed_password=get_password_hash("admin123"),
        full_name="Dr. Rajesh Kumar (SOC Director)",
        role="admin",
        department="National Cyber Command",
        is_active=True,
        mfa_enabled=True,
    )
    analyst_user = User(
        email="analyst@cni.gov.in",
        username="analyst_cni",
        hashed_password=get_password_hash("analyst123"),
        full_name="Priya Sharma (Tier-2 SOC Analyst)",
        role="analyst",
        department="Grid Cyber Defense",
        is_active=True,
        mfa_enabled=False,
    )
    exec_user = User(
        email="executive@cni.gov.in",
        username="exec_cni",
        hashed_password=get_password_hash("exec123"),
        full_name="Vikramaditya Singh (Chief Security Officer)",
        role="executive",
        department="CNI Board",
        is_active=True,
        mfa_enabled=True,
    )
    auditor_user = User(
        email="auditor@cni.gov.in",
        username="auditor_cni",
        hashed_password=get_password_hash("auditor123"),
        full_name="Ananya Verma (CERT-In Auditor)",
        role="auditor",
        department="CERT-In Compliance",
        is_active=True,
        mfa_enabled=False,
    )
    db.add_all([admin_user, analyst_user, exec_user, auditor_user])
    db.commit()

    # 2. Seed CNI Assets
    assets = [
        Asset(
            asset_id="SCADA-PLC-001",
            name="Substation Alpha Modbus PLC Controller",
            asset_type="SCADA PLC",
            sector="Power Grid",
            ip_address="10.240.12.14",
            mac_address="00:1A:2B:3C:4D:5E",
            location="Substation Alpha - Northern Corridor",
            criticality="CRITICAL",
            status="HEALTHY",
            firmware_version="v4.2.1-sec",
            risk_score=18.5,
        ),
        Asset(
            asset_id="SUBSTATION-ROUTER-02",
            name="Grid Control High-Speed Core Router",
            asset_type="Substation Router",
            sector="Power Grid",
            ip_address="10.240.12.1",
            mac_address="00:1A:2B:99:88:77",
            location="Central Dispatch Hub",
            criticality="CRITICAL",
            status="HEALTHY",
            firmware_version="v15.2-IOS-XE",
            risk_score=12.0,
        ),
        Asset(
            asset_id="NUCLEAR-COOL-SENSOR-09",
            name="Primary Reactor Cooling Loop Telemetry Node",
            asset_type="ICS Sensor",
            sector="Nuclear Energy",
            ip_address="10.180.4.88",
            mac_address="02:42:AC:11:00:02",
            location="Containment Zone Unit 2",
            criticality="CRITICAL",
            status="HEALTHY",
            firmware_version="v2.1.0-hardened",
            risk_score=5.0,
        ),
        Asset(
            asset_id="RAIL-SIGNAL-SWITCH-44",
            name="Metro Interlocking Signal Control Server",
            asset_type="Rail Controller",
            sector="Rail Transit",
            ip_address="10.90.101.44",
            mac_address="00:50:56:A1:B2:C3",
            location="Central Transit Depot",
            criticality="HIGH",
            status="DEGRADED",
            firmware_version="v3.8.4",
            risk_score=62.0,
        ),
        Asset(
            asset_id="FIN-GATEWAY-SWITCH-01",
            name="National Payment Settlement Gateway Node",
            asset_type="Financial Switch",
            sector="Financial System",
            ip_address="10.50.8.10",
            mac_address="00:0C:29:7E:6F:5A",
            location="Primary Data Center",
            criticality="CRITICAL",
            status="HEALTHY",
            firmware_version="v6.1-enterprise",
            risk_score=14.0,
        ),
    ]
    db.add_all(assets)
    db.commit()

    # 3. Seed Threat Intelligence
    threats = [
        ThreatIntel(
            indicator="198.51.100.42",
            indicator_type="IP",
            threat_type="APT Command & Control Server",
            severity="CRITICAL",
            description="Known C2 node belonging to APT41 targeting industrial control systems in Southern Asia.",
            mitre_technique="T1071.001",
            source="CERT-In Advisory CNI-2026-088",
            confidence=98.5,
        ),
        ThreatIntel(
            indicator="CVE-2026-1189",
            indicator_type="CVE",
            threat_type="SCADA PLC Unauthenticated Buffer Overflow",
            severity="CRITICAL",
            description="Remote code execution flaw in Modbus TCP register processing daemon on port 502.",
            mitre_technique="T1190",
            source="NVD National Vulnerability Database",
            confidence=100.0,
        ),
        ThreatIntel(
            indicator="4a8f9b2c3d1e0f5a6b7c8d9e0f1a2b3c",
            indicator_type="HASH",
            threat_type="Custom SCADA Wiper Malware (BlackEnergy-v4)",
            severity="HIGH",
            description="Sha256 hash of malicious executable targeting DNP3 protocol stacks.",
            mitre_technique="T1565.001",
            source="Global Cyber Threat Exchange",
            confidence=94.0,
        ),
    ]
    db.add_all(threats)
    db.commit()

    # 4. Seed Incidents & Alerts
    inc_1 = Incident(
        incident_code="INC-2026-001",
        title="Unauthorized SCADA Register Modification Attempt on Substation Alpha",
        description="ML Anomaly detector flagged 45 out-of-bounds write commands sent to Modbus PLC register 40001.",
        severity="CRITICAL",
        status="INVESTIGATING",
        asset_id=assets[0].id,
        assigned_to="Priya Sharma (Tier-2 SOC Analyst)",
        containment_status="IN_PROGRESS",
    )
    inc_2 = Incident(
        incident_code="INC-2026-002",
        title="Anomalous Traffic Spike on Rail Signal Switch Controller",
        description="Random Forest & AutoEncoder flagged 50MB burst of encrypted traffic during non-operational hours.",
        severity="HIGH",
        status="OPEN",
        asset_id=assets[3].id,
        assigned_to="Tier-2 SOC Analyst",
        containment_status="PENDING",
    )
    db.add_all([inc_1, inc_2])
    db.commit()

    alerts = [
        Alert(
            alert_code="ALT-9041",
            title="SCADA Command Injection Detected",
            category="SCADA Attack",
            severity="CRITICAL",
            asset_id=assets[0].id,
            incident_id=inc_1.id,
            anomaly_score=0.92,
            confidence=96.5,
            description="Modbus protocol analyzer flagged illegal function code 0x5A targeted at PLC control loop.",
            is_acknowledged=False,
        ),
        Alert(
            alert_code="ALT-9042",
            title="UEBA Insider Baseline Deviation",
            category="UEBA Anomaly",
            severity="HIGH",
            asset_id=assets[3].id,
            incident_id=inc_2.id,
            anomaly_score=0.78,
            confidence=88.4,
            description="Operator account executed bulk config export during 03:00 AM off-peak window.",
            is_acknowledged=True,
        ),
        Alert(
            alert_code="ALT-9043",
            title="NMAP Port Scan on Purdue Level 2 Control Layer",
            category="Network Intrusion",
            severity="MEDIUM",
            asset_id=assets[1].id,
            anomaly_score=0.55,
            confidence=91.0,
            description="Sequential TCP SYN scan detected targeting Modbus port 502 and DNP3 port 20000.",
            is_acknowledged=True,
        ),
    ]
    db.add_all(alerts)
    db.commit()

    # 5. Seed MITRE ATT&CK Mappings
    mitre_items = [
        MITREMapping(
            technique_id="T1059.001",
            technique_name="PowerShell Command Execution",
            tactic="Execution",
            detection_source="UEBA & Host Telemetry",
            hit_count=14,
            severity="HIGH",
            recommendation="Enable Constrained Language Mode and Script Block Logging on all HMI Workstations.",
        ),
        MITREMapping(
            technique_id="T1078.003",
            technique_name="Local Accounts Misuse",
            tactic="Persistence / Privilege Escalation",
            detection_source="Behavior Anomaly Engine",
            hit_count=8,
            severity="MEDIUM",
            recommendation="Rotate all default SCADA maintenance passwords and mandate Hardware MFA.",
        ),
        MITREMapping(
            technique_id="T1190",
            technique_name="Exploit Public-Facing Application",
            tactic="Initial Access",
            detection_source="Threat Intel Engine",
            hit_count=22,
            severity="CRITICAL",
            recommendation="Apply firmware hotfix v4.2.1-sec to all PLC Modbus interfaces.",
        ),
        MITREMapping(
            technique_id="T1565.002",
            technique_name="Transmitted Data Manipulation",
            tactic="Impact (ICS)",
            detection_source="AutoEncoder ML Model",
            hit_count=5,
            severity="CRITICAL",
            recommendation="Deploy cryptographic telemetry signing across DNP3 and IEC 60870-5-104 links.",
        ),
    ]
    db.add_all(mitre_items)
    db.commit()

    # 6. Seed SOAR Playbooks
    playbooks = [
        Playbook(
            playbook_name="PLAYBOOK_ISOLATE_SCADA_PLC",
            trigger_event="SCADA_COMMAND_INJECTION_ALERT",
            target_sector="Power Grid",
            status="IDLE",
            execution_steps=[
                {
                    "step": 1,
                    "action": "REVOKE_ACTIVE_SESSIONS",
                    "target": "Affected PLC Workstation",
                },
                {"step": 2, "action": "BLOCK_PERIMETER_IP", "target": "Core Substation Firewall"},
                {
                    "step": 3,
                    "action": "ISOLATE_NETWORK_SEGMENT",
                    "target": "Substation Alpha Level 1 Switch",
                },
                {
                    "step": 4,
                    "action": "NOTIFY_CERT_IN",
                    "target": "Automated Security Advisory API",
                },
            ],
        ),
        Playbook(
            playbook_name="PLAYBOOK_REVOKE_USER_CREDENTIALS",
            trigger_event="INSIDER_THREAT_ANOMALY",
            target_sector="Cross-Sector",
            status="IDLE",
            execution_steps=[
                {
                    "step": 1,
                    "action": "LOCK_ACTIVE_DIRECTORY_ACCOUNT",
                    "target": "Compromised User Account",
                },
                {"step": 2, "action": "TERMINATE_ACTIVE_VPN_SESSIONS", "target": "VPN Gateway"},
                {
                    "step": 3,
                    "action": "TRIGGER_SOC_AUDIT_LOG_SNAPSHOT",
                    "target": "Security Information Engine",
                },
            ],
        ),
        Playbook(
            playbook_name="PLAYBOOK_MITIGATE_DDOS",
            trigger_event="HIGH_VOLUME_TRAFFIC_SPIKE",
            target_sector="Financial System",
            status="IDLE",
            execution_steps=[
                {"step": 1, "action": "ENABLE_RATE_LIMITING_RULES", "target": "Edge Router"},
                {
                    "step": 2,
                    "action": "ACTIVATE_BGP_BLACKHOLE_FILTER",
                    "target": "Upstream ISP Switch",
                },
            ],
        ),
    ]
    db.add_all(playbooks)
    db.commit()

    # 7. Seed Sample Telemetry Logs
    logs = [
        Log(
            asset_id=assets[0].id,
            source_ip="192.168.1.105",
            destination_ip=assets[0].ip_address,
            source_port=49812,
            destination_port=502,
            protocol="Modbus",
            event_type="SCADA_WRITE_REGISTER",
            payload_summary="Modbus FC 16 (Write Multiple Registers) to register 40001 value=0xFFFF",
            packet_length=128,
            anomaly_score=0.92,
            is_anomaly=True,
            severity="CRITICAL",
        ),
        Log(
            asset_id=assets[1].id,
            source_ip="10.240.12.50",
            destination_ip=assets[1].ip_address,
            source_port=52100,
            destination_port=22,
            protocol="TCP",
            event_type="LOGIN_SUCCESS",
            payload_summary="User analyst_cni authenticated via SSH key",
            packet_length=64,
            anomaly_score=0.05,
            is_anomaly=False,
            severity="INFO",
        ),
        Log(
            asset_id=assets[3].id,
            source_ip="198.51.100.42",
            destination_ip=assets[3].ip_address,
            source_port=443,
            destination_port=10144,
            protocol="TCP",
            event_type="UNAUTHORIZED_EXFIL_ATTEMPT",
            payload_summary="Encrypted payload 15MB burst to external IP",
            packet_length=2048,
            anomaly_score=0.85,
            is_anomaly=True,
            severity="HIGH",
        ),
    ]
    db.add_all(logs)

    # 8. Seed Audit Log entry
    audit = AuditLog(
        user_id=admin_user.id,
        action="SYSTEM_INITIALIZATION",
        details="CNI AI Cyber Resilience System initialized database tables and baseline AI models.",
        ip_address="127.0.0.1",
    )
    db.add(audit)
    db.commit()
