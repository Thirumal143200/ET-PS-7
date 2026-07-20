import json
import logging
import os
from typing import Any, Dict, List

from app.core.config import settings

logger = logging.getLogger(__name__)


class CNIKnowledgeStore:
    def __init__(self):
        self.documents = [
            {
                "title": "CERT-In Advisory CNI-2026-088",
                "category": "CERT-In Advisories",
                "content": "CRITICAL: SCADA PLCs and Substation Control Routers operating on IEC 60870-5-104 and Modbus TCP protocols are targeted by APT41 using unauthorized register write commands (T1059.001) causing power grid tripping.",
                "tags": ["SCADA", "Modbus", "CERT-In", "Power Grid"],
            },
            {
                "title": "MITRE ATT&CK Technique T1059 - Command and Scripting Interpreter",
                "category": "MITRE ATT&CK",
                "content": "Adversaries may execute commands, scripts, or binaries to control SCADA master units and alter PLC memory maps.",
                "tags": ["MITRE", "T1059", "Execution"],
            },
            {
                "title": "NIST SP 800-82 Rev 3 - Guide to Industrial Control Systems (ICS) Security",
                "category": "Compliance Standards",
                "content": "Requirement 4.2: Critical CNI substations must enforce strict Network Segmentation (Purdue Model Level 0-3), multi-factor authentication for administrative access, and real-time UEBA anomaly monitoring.",
                "tags": ["NIST", "Compliance", "ICS Security"],
            },
            {
                "title": "CVE-2026-1189 - Substation Modbus Controller Unauthenticated Buffer Overflow",
                "category": "CVE Database",
                "content": "A remote code execution vulnerability in SCADA PLC Firmware v4.2 allows attackers to overwrite instruction registers via crafted port 502 packets.",
                "tags": ["CVE-2026-1189", "Buffer Overflow", "SCADA"],
            },
            {
                "title": "CERT Insider Threat Rule CNI-IT-04",
                "category": "Insider Threat",
                "content": "Detect unauthorized bulk file transfers over 10GB during off-peak hours (22:00-05:00) coupled with administrative credential usage on core substation controllers.",
                "tags": ["Insider Threat", "UEBA", "Off-hours"],
            },
        ]

    def query(self, search_term: str) -> List[Dict[str, Any]]:
        search_lower = search_term.lower()
        results = []
        for doc in self.documents:
            score = 0
            if any(term in doc["title"].lower() for term in search_lower.split()):
                score += 3
            if any(term in doc["content"].lower() for term in search_lower.split()):
                score += 2
            if any(term in tag.lower() for tag in doc["tags"] for term in search_lower.split()):
                score += 4
            if score > 0:
                results.append((score, doc))

        results.sort(key=lambda x: x[0], reverse=True)
        return [doc for score, doc in results] if results else self.documents[:3]


cni_knowledge_store = CNIKnowledgeStore()


class MultiAgentOrchestrator:
    def __init__(self):
        self.knowledge_store = cni_knowledge_store

    def query_agent(
        self, agent_type: str, query: str, context_data: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        agent_type_clean = agent_type.strip()

        if agent_type_clean == "BehaviorAnalysis":
            return self._behavior_analysis_agent(query, context_data)
        elif agent_type_clean == "ThreatIntel":
            return self._threat_intel_agent(query, context_data)
        elif agent_type_clean == "MITREMapping":
            return self._mitre_mapping_agent(query, context_data)
        elif agent_type_clean == "SOARResponse":
            return self._soar_response_agent(query, context_data)
        elif agent_type_clean == "ExecutiveReport":
            return self._executive_report_agent(query, context_data)
        elif agent_type_clean == "Compliance":
            return self._compliance_agent(query, context_data)
        elif agent_type_clean == "Prediction":
            return self._prediction_agent(query, context_data)
        else:  # Default RAG Knowledge Agent
            return self._rag_knowledge_agent(query, context_data)

    def _behavior_analysis_agent(
        self, query: str, context: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        return {
            "agent_name": "Behavior Analysis Agent (UEBA)",
            "response": f"UEBA Engine analyzed user behavior query: '{query}'. Baseline analysis indicates 3 entities displaying deviation above 75%. SCADA Operator account 'op_substation_alpha' performed 14 unauthorized PLC write commands outside maintenance windows.",
            "sources": ["UEBA Baseline Profiler", "CERT Insider Threat Rule CNI-IT-04"],
            "confidence": 94.5,
            "structured_data": {
                "high_risk_users": ["op_substation_alpha", "admin_grid_beta"],
                "anomaly_score": 0.88,
                "recommended_action": "Trigger step-up authentication and restrict Modbus write privileges.",
            },
        }

    def _threat_intel_agent(self, query: str, context: Dict[str, Any] = None) -> Dict[str, Any]:
        return {
            "agent_name": "Threat Intelligence Agent",
            "response": f"Threat Intel correlated query '{query}' against NVD, CERT-In, and MITRE feeds. Identified active targeting of SCADA Port 502 with CVE-2026-1189. IOC matches found across 2 perimeter substation firewalls.",
            "sources": ["CERT-In Advisory CNI-2026-088", "CVE-2026-1189 Database"],
            "confidence": 98.0,
            "structured_data": {
                "cve": "CVE-2026-1189",
                "threat_actor": "APT41 / Volt Typhoon Variant",
                "indicator": "198.51.100.42 (Malicious Command Server)",
                "threat_level": "CRITICAL",
            },
        }

    def _mitre_mapping_agent(self, query: str, context: Dict[str, Any] = None) -> Dict[str, Any]:
        return {
            "agent_name": "MITRE ATT&CK Mapping Agent",
            "response": f"Mapped attack vector '{query}' to MITRE ATT&CK Matrix: Technique T1059.001 (Command & Scripting Interpreter: PowerShell) & T1078 (Valid Accounts). Kill chain stage: Lateral Movement & Execution in Control Layer.",
            "sources": ["MITRE ATT&CK v14.1 for Industrial Control Systems (ICS)"],
            "confidence": 96.2,
            "structured_data": {
                "tactic": "Execution / Lateral Movement",
                "technique_id": "T1059.001",
                "technique_name": "PowerShell Command Execution",
                "mitigation": "Enforce PowerShell Constrained Language Mode on All SCADA HMI Nodes.",
            },
        }

    def _soar_response_agent(self, query: str, context: Dict[str, Any] = None) -> Dict[str, Any]:
        return {
            "agent_name": "SOAR Response Agent",
            "response": f"SOAR Engine formulated automated containment playbook for '{query}'. Step 1: Isolate compromised PLC SCADA-PLC-001. Step 2: Revoke active session tokens for user op_substation_alpha. Step 3: Apply Firewall rule blocking IP 198.51.100.42.",
            "sources": ["SOAR Playbook Auto-Isolate-v2", "CNI Emergency Protocols"],
            "confidence": 99.1,
            "structured_data": {
                "playbook_id": 1,
                "playbook_name": "PLAYBOOK_ISOLATE_SCADA_PLC",
                "estimated_remediation_time_sec": 4.2,
                "status": "READY_TO_EXECUTE",
            },
        }

    def _executive_report_agent(self, query: str, context: Dict[str, Any] = None) -> Dict[str, Any]:
        return {
            "agent_name": "Executive Report Agent",
            "response": "EXECUTIVE SUMMARY: CNI National Cyber Resilience Index is currently at 84/100 (HEALTHY). Over the past 24 hours, 142 total events were analyzed, 3 high-severity anomalies were suppressed by automated SOAR, and zero zero-day breaches occurred. Substation Alpha experienced minor SCADA port scanning which was mitigated.",
            "sources": ["CNI Executive Dashboard Telemetry", "Risk Aggregator Engine"],
            "confidence": 95.0,
            "structured_data": {
                "resilience_index": 84.0,
                "incidents_contained": 3,
                "grid_uptime_percentage": 99.998,
                "compliance_status": "NIST SP 800-82 Compliant",
            },
        }

    def _compliance_agent(self, query: str, context: Dict[str, Any] = None) -> Dict[str, Any]:
        return {
            "agent_name": "CNI Compliance Agent",
            "response": f"Compliance check against NIST SP 800-82 & CERT-In guidelines for '{query}': Passed 18/20 controls. Gap identified in Control 4.2 (Substation Router firmware update pending on Substation Gamma).",
            "sources": ["NIST SP 800-82 Rev 3", "CERT-In Cyber Security Directions 2026"],
            "confidence": 97.4,
            "structured_data": {
                "nist_pass_rate": "90%",
                "cert_in_status": "COMPLIANT",
                "remediation_deadline": "7 Days",
            },
        }

    def _prediction_agent(self, query: str, context: Dict[str, Any] = None) -> Dict[str, Any]:
        return {
            "agent_name": "Attack Prediction Agent",
            "response": f"Predictive model analyzed attack propagation graph for '{query}'. 87% probability of attack attempt migrating from Substation Alpha HMI to Substation Beta Control Server within the next 4 hours if port 502 remains unsegmented.",
            "sources": ["CNI Topological Attack Graph Model", "Graph Neural Predictor"],
            "confidence": 87.2,
            "structured_data": {
                "next_target_asset": "SUBSTATION-BETA-SRV01",
                "attack_vector": "Modbus Protocol Exploitation",
                "time_window_hours": 4,
            },
        }

    def _rag_knowledge_agent(self, query: str, context: Dict[str, Any] = None) -> Dict[str, Any]:
        matching_docs = self.knowledge_store.query(query)
        doc_summaries = "\n".join([f"- **{d['title']}**: {d['content']}" for d in matching_docs])
        return {
            "agent_name": "RAG Knowledge Agent",
            "response": f"Knowledge base search for '{query}' returned {len(matching_docs)} relevant CNI advisories & standards:\n\n{doc_summaries}\n\nKey Recommendation: Ensure Purdue model network segmentation and apply latest SCADA firmware patches.",
            "sources": [d["title"] for d in matching_docs],
            "confidence": 95.5,
            "structured_data": {
                "docs_found": len(matching_docs),
                "top_match": matching_docs[0]["title"] if matching_docs else "None",
            },
        }


agent_orchestrator = MultiAgentOrchestrator()
