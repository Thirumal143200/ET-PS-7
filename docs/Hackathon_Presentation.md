# Hackathon Presentation Deck — ET AI Hackathon 2026

## Slide 1: Title & Problem Statement
- **Title**: AI-Driven Cyber Resilience for Critical National Infrastructure (CNI)
- **Hackathon**: ET AI Hackathon 2026 — Problem Statement 7
- **Mission**: Safeguard power grids, nuclear plants, rail networks, and financial gateways with proactive AI anomaly detection and sub-second SOAR orchestration.

---

## Slide 2: The Challenge in Critical National Infrastructure
- **Legacy OT/ICS Protocols**: Modbus TCP and DNP3 lack built-in encryption or authentication mechanisms.
- **Sophisticated APTs**: Attackers target Purdue Level 1-3 control layers (e.g. Volt Typhoon, APT41, Stuxnet variants).
- **Manual Incident Response Lag**: Traditional SOC operations take hours to isolate compromised PLCs, causing massive physical grid outages.

---

## Slide 3: Our Solution Architecture
1. **Multi-Model Anomaly Engine**: Ensemble of Isolation Forest, Random Forest Classifier, and Neural AutoEncoder.
2. **8 Autonomous AI Agents**: Specialized agents for UEBA, Threat Intel, MITRE Mapping, SOAR, Compliance, and RAG Knowledge Q&A.
3. **Automated SOAR Containment**: Sub-second execution of playbooks isolating compromised SCADA PLCs.
4. **NIST SP 800-82 & CERT-In Compliance**: Automated audit checking with PDF report generation.

---

## Slide 4: Tech Stack
- **Frontend**: React, TypeScript, TailwindCSS, Recharts, Vite, Lucide Icons.
- **Backend**: FastAPI, Python 3.11+, SQLAlchemy ORM, Pydantic V2, Pytest.
- **AI & RAG**: LangChain, ChromaDB Vectorstore, Gemini / OpenAI compatible models.
- **DevOps**: Docker, Docker Compose, GitHub Actions CI/CD pipeline.

---

## Slide 5: Live Demo & Key Takeaways
- Zero-placeholder execution guarantee.
- Standalone out-of-the-box performance with local fallback heuristics and database seeding.
- Instant C-level executive report creation.
