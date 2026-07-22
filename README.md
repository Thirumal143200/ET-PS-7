<div align="center">

<img src="https://img.shields.io/badge/ET%20AI%20Hackathon-2026-00f0ff?style=for-the-badge&logo=shield&logoColor=white" />
<img src="https://img.shields.io/badge/Problem%20Statement-7-critical?style=for-the-badge" />
<img src="https://img.shields.io/badge/Status-PRODUCTION%20LIVE-brightgreen?style=for-the-badge" />
<img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" />

# 🛡️ CNI AI Cyber Resilience System

### AI-Driven Cyber Resilience for Critical National Infrastructure

*ET AI Hackathon 2026 — Problem Statement 7 Solution*

[🌐 Live Frontend](https://et-ps-7.vercel.app) · [⚙️ Backend API](https://et-ps-7.onrender.com) · [📖 Swagger Docs](https://et-ps-7.onrender.com/docs) · [❤️ Health Check](https://et-ps-7.onrender.com/health) · [📂 GitHub](https://github.com/Thirumal143200/ET-PS-7)

</div>

---

## 🌐 Live Production Endpoints

| Service | URL | Status |
|:--------|:----|:-------|
| **Frontend Dashboard** | https://et-ps-7.vercel.app | ✅ Live |
| **Backend REST API** | https://et-ps-7.onrender.com | ✅ Live |
| **OpenAPI / Swagger Docs** | https://et-ps-7.onrender.com/docs | ✅ Live |
| **System Health Check** | https://et-ps-7.onrender.com/health | ✅ `{"status":"HEALTHY"}` |
| **GitHub Repository** | https://github.com/Thirumal143200/ET-PS-7 | ✅ Public |

---

## 📌 Problem Statement

India's Critical National Infrastructure (CNI) — power grids, nuclear plants, rail networks, and financial systems — faces over **10,000 cyber attacks daily**. Traditional Security Operations Centers rely on:

- ❌ Manual threat analysis (too slow for advanced attacks)
- ❌ Rule-based detection (misses zero-day threats)
- ❌ Siloed systems without inter-sector correlation
- ❌ No automated response capability

**Our solution** bridges this gap with a fully automated, AI-powered Cyber Resilience Platform that detects, classifies, maps, and responds to threats in real time.

---

## 🏗️ System Architecture

```mermaid
graph TB
    subgraph "🌐 Frontend Layer — Vercel"
        UI[React + TypeScript + Tailwind]
        Pages["10 SOC Dashboard Views"]
        Auth["JWT Auth + RBAC"]
    end

    subgraph "⚙️ Backend Layer — Render"
        API["FastAPI REST API<br/>/api/v1/*"]
        SEC["JWT Security<br/>bcrypt Password Hashing"]
        SEED["Seed Data Service<br/>Auto-init on startup"]
    end

    subgraph "🧠 AI/ML Engine"
        IF["Isolation Forest<br/>Unsupervised Anomaly Detection"]
        RF["Random Forest Classifier<br/>Multi-class Attack Categorization"]
        AE["Neural AutoEncoder<br/>Reconstruction Error Scoring"]
        ENS["Ensemble Combiner<br/>Unified Anomaly Score"]
    end

    subgraph "🤖 Multi-Agent AI System"
        BA["Behavior Analysis Agent"]
        TI["Threat Intelligence Agent"]
        MA["MITRE Mapping Agent"]
        SR["SOAR Response Agent"]
        ER["Executive Report Agent"]
        CA["Compliance Agent"]
        PA["Prediction Agent"]
        RA["RAG Knowledge Agent"]
    end

    subgraph "🗄️ Data Layer"
        DB["SQLite / PostgreSQL<br/>12 ORM Models"]
        VEC["ChromaDB<br/>Vector Store"]
        ALM["Alembic<br/>Migrations"]
    end

    subgraph "📦 DevOps"
        DC["Docker Compose"]
        GH["GitHub Actions CI/CD"]
        VL["Vercel Deploy"]
        RD["Render Deploy"]
    end

    UI --> API
    API --> SEC
    API --> IF
    API --> RF
    API --> AE
    IF --> ENS
    RF --> ENS
    AE --> ENS
    ENS --> BA
    ENS --> TI
    BA --> SR
    TI --> MA
    MA --> SR
    RA --> VEC
    API --> DB
    DB --> ALM
    UI --> VL
    API --> RD
    GH --> DC
```

---

## 🔄 Data Flow Diagram

```mermaid
sequenceDiagram
    participant OT as OT/IT Network
    participant LOG as Log Ingestion API
    participant ML as ML Anomaly Engine
    participant AGT as AI Agents
    participant SOAR as SOAR Playbook
    participant DB as Database
    participant UI as SOC Dashboard

    OT->>LOG: POST /api/v1/logs (raw telemetry)
    LOG->>ML: Extract 10 network features
    ML->>ML: Isolation Forest scoring
    ML->>ML: Random Forest classification
    ML->>ML: AutoEncoder reconstruction error
    ML->>AGT: Anomaly score + attack class
    AGT->>AGT: MITRE ATT&CK mapping
    AGT->>AGT: Threat intelligence correlation
    AGT->>DB: Store alert + incident
    AGT->>SOAR: Trigger containment playbook
    SOAR->>DB: Log playbook execution
    DB->>UI: Real-time dashboard update
    UI->>UI: Display alert + risk index
```

---

## 🗃️ Database Entity Relationship

```mermaid
erDiagram
    USERS ||--o{ AUDIT_LOGS : "creates"
    USERS ||--o{ SESSIONS : "has"
    ASSETS ||--o{ LOGS : "generates"
    ASSETS ||--o{ RISK_SCORES : "has"
    LOGS ||--o{ ALERTS : "triggers"
    ALERTS ||--o{ INCIDENTS : "escalates_to"
    INCIDENTS ||--o{ MITRE_MAPPINGS : "mapped_to"
    INCIDENTS ||--o{ PLAYBOOKS : "triggers"
    INCIDENTS ||--o{ REPORTS : "documented_in"

    USERS {
        int id PK
        string email
        string username
        string hashed_password
        string role
        string department
        bool mfa_enabled
    }
    ASSETS {
        int id PK
        string asset_id
        string name
        string asset_type
        string sector
        string criticality
        string status
        float risk_score
    }
    ALERTS {
        int id PK
        string alert_code
        string severity
        float anomaly_score
        float confidence
        bool is_acknowledged
    }
```

---

## 🤖 Multi-Agent AI System

| Agent | Responsibility | Technology |
|:------|:--------------|:-----------|
| **🔍 Behavior Analysis Agent** | Detects baseline drift in user/entity behavior | LangChain + Isolation Forest |
| **🌐 Threat Intelligence Agent** | Correlates events against CVEs, NVD, CERT-In feeds | LangChain + ChromaDB RAG |
| **🗺️ MITRE Mapping Agent** | Maps attack vectors to MITRE ATT&CK for ICS | LangChain + Pattern Matching |
| **🚨 SOAR Response Agent** | Executes automated containment playbooks | LangChain + Playbook Engine |
| **📊 Executive Report Agent** | Generates C-level briefings & national risk scores | LangChain + ReportLab PDF |
| **✅ Compliance Agent** | Audits against NIST SP 800-82 Rev 3 & CERT-In | LangChain + Rule Engine |
| **🔮 Prediction Agent** | Forecasts multi-stage attack propagation | LangChain + ML Forecasting |
| **💬 RAG Knowledge Agent** | Conversational AI for CNI security queries | LangChain + ChromaDB |

---

## 🧠 ML Anomaly Detection Engine

```
┌──────────────────────────────────────────────────────────────────┐
│                     ENSEMBLE ANOMALY ENGINE                      │
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │ ISOLATION FOREST│  │ RANDOM FOREST   │  │ NEURAL          │  │
│  │                 │  │ CLASSIFIER      │  │ AUTOENCODER     │  │
│  │ Unsupervised    │  │                 │  │                 │  │
│  │ outlier flagging│  │ Multi-class     │  │ Reconstruction  │  │
│  │                 │  │ attack typing   │  │ error scoring   │  │
│  │ Zero-day ready  │  │ (DDoS, Recon,  │  │                 │  │
│  │                 │  │  Privilege Esc) │  │ Deep behavior   │  │
│  │ Score: -1 to 1  │  │                 │  │ baseline        │  │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘  │
│           │                   │                     │           │
│           └───────────────────┼─────────────────────┘           │
│                               ▼                                  │
│                    ┌─────────────────┐                           │
│                    │ ENSEMBLE COMBINER│                           │
│                    │                 │                           │
│                    │ Unified Score   │                           │
│                    │ Attack Class    │                           │
│                    │ Confidence %    │                           │
│                    └────────┬────────┘                           │
└─────────────────────────────┼────────────────────────────────────┘
                              ▼
              Multi-Agent AI System → SOAR Response
```

**Training Datasets:**
- UNSW-NB15 — Network intrusion detection dataset
- CICIDS2017 — Canadian Institute for Cybersecurity dataset
- CERT Insider Threat Dataset — User behavior analytics
- CNI CVE Advisories — ICS/SCADA vulnerability database

---

## 🛡️ MITRE ATT&CK for ICS Coverage

| Tactic | Key Techniques Mapped |
|:-------|:----------------------|
| **Initial Access** | T1190 (Exploit Public-Facing), T1133 (External Remote Services) |
| **Execution** | T1059 (Command Scripting), T1106 (Native API) |
| **Persistence** | T1078 (Valid Accounts), T1547 (Boot/Logon Autostart) |
| **Impact** | T1565 (Data Manipulation), T1489 (Service Stop) |
| **Collection** | T1005 (Data from Local System), T1114 (Email Collection) |

---

## 🚀 Deployment Architecture

```mermaid
graph LR
    subgraph "User"
        B["Browser / SOC Analyst"]
    end

    subgraph "CDN — Vercel"
        F["React SPA<br/>et-ps-7.vercel.app<br/>HTTPS + Global CDN"]
    end

    subgraph "Backend — Render Free"
        A["FastAPI<br/>et-ps-7.onrender.com<br/>HTTPS + CORS"]
    end

    subgraph "Database"
        D["SQLite<br/>(Local / Embedded)<br/>or PostgreSQL"]
    end

    subgraph "CI/CD"
        G["GitHub Actions<br/>pytest + black + isort<br/>+ npm build"]
    end

    B --> F
    F -->|"VITE_API_BASE_URL"| A
    A --> D
    G --> F
    G --> A
```

---

## 📂 Project Structure

```
ET-PS-7/
├── 📁 backend/
│   ├── 📁 alembic/               # Database migrations
│   │   └── versions/
│   │       └── 001_initial_cni_schema.py
│   ├── 📁 app/
│   │   ├── 📁 ai/
│   │   │   └── agents.py          # 8 AI Agents + RAG knowledge store
│   │   ├── 📁 api/v1/             # REST endpoints
│   │   │   ├── auth.py            # POST /login, /logout, GET /me
│   │   │   ├── dashboard.py       # GET /dashboard
│   │   │   ├── logs.py            # POST /logs
│   │   │   ├── predict.py         # POST /predict
│   │   │   ├── incidents.py       # POST /incident
│   │   │   ├── alerts.py          # GET /alerts
│   │   │   ├── threats.py         # GET /threats
│   │   │   ├── timeline.py        # GET /timeline
│   │   │   ├── mitre.py           # GET /mitre
│   │   │   ├── assets.py          # GET /assets
│   │   │   ├── reports.py         # GET /reports, /reports/generate
│   │   │   ├── audit.py           # GET /audit
│   │   │   └── agents.py          # POST /agents/chat
│   │   ├── 📁 core/
│   │   │   ├── config.py          # Settings & environment variables
│   │   │   └── security.py        # JWT + bcrypt authentication
│   │   ├── 📁 db/
│   │   │   └── session.py         # SQLAlchemy engine & session factory
│   │   ├── 📁 ml/
│   │   │   └── anomaly_engine.py  # Isolation Forest + RF + AutoEncoder
│   │   ├── 📁 models/
│   │   │   └── cni_models.py      # 12 SQLAlchemy ORM models
│   │   ├── 📁 schemas/
│   │   │   └── cni_schemas.py     # Pydantic V2 request/response schemas
│   │   ├── 📁 services/
│   │   │   ├── seed_data.py       # Database seeding on startup
│   │   │   └── reports.py         # PDF report generator (ReportLab)
│   │   └── main.py                # FastAPI app entrypoint
│   ├── 📁 tests/
│   │   └── test_api.py            # 6 Pytest automated tests
│   ├── pyproject.toml
│   └── requirements.txt
│
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 pages/              # 10 Dashboard Views
│   │   │   ├── ExecutiveDashboard.tsx
│   │   │   ├── UEBADashboard.tsx
│   │   │   ├── IncidentSOAR.tsx
│   │   │   ├── ThreatHunting.tsx
│   │   │   ├── MitreMatrix.tsx
│   │   │   ├── ThreatIntel.tsx
│   │   │   ├── AssetInventory.tsx
│   │   │   ├── ComplianceReports.tsx
│   │   │   ├── AuditLogsPage.tsx
│   │   │   └── SettingsPage.tsx
│   │   ├── 📁 services/
│   │   │   └── api.ts             # Axios API client with JWT injection
│   │   ├── App.tsx                # Router + sidebar layout
│   │   └── Login.tsx              # SOC authentication page
│   ├── vercel.json
│   └── package.json
│
├── 📁 datasets/                   # Training & demo data
│   ├── unsw_nb15_sample.json
│   ├── cicids2017_sample.json
│   ├── cert_insider_threat_sample.json
│   └── cve_cni_advisories.json
│
├── 📁 diagrams/                   # Mermaid architecture diagrams
│   ├── system_architecture.mermaid
│   ├── er_diagram.mermaid
│   ├── dfd_level_1.mermaid
│   ├── sequence_diagram.mermaid
│   └── deployment_topology.mermaid
│
├── 📁 docker/
│   ├── backend.Dockerfile
│   ├── frontend.Dockerfile
│   └── docker-compose.prod.yml
│
├── 📁 scripts/
│   ├── validate_build.py          # Full quality gate runner
│   ├── seed_db.py
│   ├── run_local.ps1
│   └── run_local.sh
│
├── 📁 .github/workflows/
│   └── ci.yml                     # GitHub Actions CI/CD pipeline
│
├── docker-compose.yml
├── render.yaml                    # Render deployment config
├── vercel.json                    # Vercel deployment config
├── LICENSE
├── CONTRIBUTING.md
├── SECURITY.md
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
└── README.md
```

---

## 🚦 API Reference

### Authentication
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| `POST` | `/api/v1/auth/login` | Authenticate user, receive JWT |
| `POST` | `/api/v1/auth/logout` | Invalidate session |
| `GET` | `/api/v1/auth/me` | Get current user profile |

### Core Operations
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| `GET` | `/api/v1/dashboard` | Executive dashboard metrics |
| `POST` | `/api/v1/logs` | Ingest security event logs |
| `POST` | `/api/v1/predict` | Run ML anomaly prediction |
| `POST` | `/api/v1/behavior` | UEBA behavior analysis |
| `POST` | `/api/v1/incident` | Create incident record |
| `POST` | `/api/v1/response` | Execute SOAR playbook |

### Intelligence & Analytics
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| `GET` | `/api/v1/alerts` | Live alert feed |
| `GET` | `/api/v1/threats` | Threat intelligence feed |
| `GET` | `/api/v1/timeline` | Incident timeline |
| `GET` | `/api/v1/mitre` | MITRE ATT&CK mapping |
| `GET` | `/api/v1/assets` | CNI asset inventory |
| `GET` | `/api/v1/audit` | Immutable audit log |

### Reports & AI
| Method | Endpoint | Description |
|:-------|:---------|:------------|
| `GET` | `/api/v1/reports/generate` | Generate PDF audit report |
| `POST` | `/api/v1/agents/chat` | Chat with AI knowledge agent |

---

## 🔑 RBAC Login Credentials

| Role | Email | Password | Access |
|:-----|:------|:---------|:-------|
| **SOC Director** | `admin@cni.gov.in` | `admin123` | Full system access |
| **Tier-2 Analyst** | `analyst@cni.gov.in` | `analyst123` | Investigation & hunting |
| **CSO / Executive** | `executive@cni.gov.in` | `exec123` | Dashboard & reports |
| **CERT-In Auditor** | `auditor@cni.gov.in` | `auditor123` | Audit logs & compliance |

---

## ⚡ Quick Start (Local)

### Prerequisites
- Python 3.10+ | Node.js 18+ | npm 9+

### 1. Backend
```bash
# Clone repository
git clone https://github.com/Thirumal143200/ET-PS-7.git
cd "ET-PS-7"

# Create virtual environment
python -m venv .venv
.\.venv\Scripts\activate          # Windows
source .venv/bin/activate          # Linux/Mac

# Install dependencies
pip install -r backend/requirements.txt

# Run quality gate validation
python scripts/validate_build.py

# Start FastAPI server
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Backend URLs:**
- API Root: http://localhost:8000
- Swagger Docs: http://localhost:8000/docs
- Health Check: http://localhost:8000/health

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```

**Frontend URL:** http://localhost:5173

---

## 🐳 Docker Deployment

```bash
# Full stack via Docker Compose
docker compose up --build -d

# Access at:
# Frontend → http://localhost:3000
# Backend  → http://localhost:8000
```

---

## ☁️ Free Cloud Deployment

### Database → [Neon PostgreSQL](https://neon.tech) or [Supabase](https://supabase.com)
```
DATABASE_URL=postgresql://user:pass@host:5432/cni_cyber_db?sslmode=require
```

### Backend → [Render Free Tier](https://render.com)
```yaml
Root Directory:    backend
Build Command:     pip install -r requirements.txt
Start Command:     uvicorn app.main:app --host 0.0.0.0 --port $PORT
Environment:       Python 3

Environment Variables:
  PYTHONPATH=.
  ENVIRONMENT=production
  SECRET_KEY=<your-secret-key>
  DATABASE_URL=<your-postgres-url>
```

### Frontend → [Vercel Free Tier](https://vercel.com)
```
Root Directory:    frontend
Framework:         Vite
Build Command:     npm run build
Output Directory:  dist

Environment Variables:
  VITE_API_BASE_URL=https://<your-render-service>.onrender.com/api/v1
```

---

## ✅ Quality Gates

```
pytest backend/tests         → 6/6 PASSED
black --check app tests      → PASSED (100% compliant)
isort --check-only app tests → PASSED (100% sorted)
tsc -b && vite build         → PASSED (0 type errors)
```

---

## 🛡️ Security Features

- **JWT Authentication** with configurable expiry
- **bcrypt Password Hashing** (direct, bypass passlib 72-byte bug)
- **RBAC Role-Based Access Control** (4 roles)
- **CORS Protection** (configurable allowed origins)
- **Immutable Audit Logging** (every action logged to database)
- **Session Management** with database-backed token invalidation
- **HTTPS** enforced on all cloud deployments

---

## 📊 Technology Stack

| Layer | Technology | Purpose |
|:------|:-----------|:--------|
| **Frontend** | React 18 + TypeScript + Vite | SOC dashboard UI |
| **Styling** | Tailwind CSS v4 + Glassmorphism | Dark cyber SOC theme |
| **Charts** | Recharts | Sector health, risk gauges |
| **Backend** | FastAPI + Python 3.13 | REST API |
| **ORM** | SQLAlchemy + Alembic | Database models & migrations |
| **Database** | SQLite / PostgreSQL | Persistent storage |
| **ML Engine** | scikit-learn | Isolation Forest, Random Forest, AutoEncoder |
| **AI Agents** | LangChain | 8 autonomous AI agents |
| **Vector Store** | ChromaDB | RAG knowledge retrieval |
| **PDF Reports** | ReportLab | Executive audit PDF generation |
| **Auth** | python-jose + bcrypt | JWT + password hashing |
| **Containerization** | Docker + Docker Compose | Local & production deployment |
| **CI/CD** | GitHub Actions | Automated testing pipeline |
| **Frontend Deploy** | Vercel | Global CDN + HTTPS |
| **Backend Deploy** | Render | Python web service |

---

## 📋 Compliance Coverage

| Standard | Coverage |
|:---------|:---------|
| **NIST SP 800-82 Rev 3** | Network segmentation, anomaly monitoring, patch management |
| **CERT-In Guidelines** | Incident reporting, audit logs, access control |
| **IEC 62443** | Industrial cybersecurity framework principles |
| **MITRE ATT&CK for ICS** | Full technique mapping and heatmap visualization |

---

## 🗺️ Future Roadmap

- [ ] **Live SCADA Telemetry Integration** — Modbus, DNP3, OPC-UA protocol connectors
- [ ] **Federated Multi-Agency Deployment** — Cross-sector intelligence sharing
- [ ] **Attack Graph Visualization** — Multi-stage attack path prediction
- [ ] **LLM-Powered Threat Hunting** — Natural language SOC query interface
- [ ] **Mobile SOC App** — React Native incident response on-the-go
- [ ] **Digital Twin Integration** — Virtual asset simulation for attack modeling

---

## 👥 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting pull requests.

---

## 🔐 Security

For security vulnerabilities, please read [SECURITY.md](SECURITY.md) and follow responsible disclosure guidelines.

---

## 📄 License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

**Built for ET AI Hackathon 2026 — Problem Statement 7**

*AI-Driven Cyber Resilience for Critical National Infrastructure*

[![Frontend](https://img.shields.io/badge/Frontend-et--ps--7.vercel.app-00f0ff?style=flat-square)](https://et-ps-7.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-et--ps--7.onrender.com-brightgreen?style=flat-square)](https://et-ps-7.onrender.com)
[![Docs](https://img.shields.io/badge/API-Swagger%20Docs-orange?style=flat-square)](https://et-ps-7.onrender.com/docs)

</div>
