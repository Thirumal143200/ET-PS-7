# AI-Driven Cyber Resilience for Critical National Infrastructure (CNI)

**ET AI Hackathon 2026 — Problem Statement 7 Solution**

A production-ready, enterprise-grade AI Cyber Resilience Platform engineered specifically for Critical National Infrastructure (CNI)—such as smart power grids, nuclear plant telemetry nodes, rail signaling switches, and national financial settlement gateways.

---

## 🌟 Executive Key Features

- **Multi-Model Anomaly Detection Engine**: Combines **Isolation Forest** (unsupervised network anomaly flagger), **Random Forest** (multi-class attack classifier), and **Neural AutoEncoder** (deep reconstruction error scorer).
- **8 Autonomous AI Agents**:
  1. **Behavior Analysis Agent (UEBA)**: Baseline drift detection across user accounts and SCADA entities.
  2. **Threat Intelligence Agent**: Correlates telemetry against CVEs, NVD, and CERT-In advisories.
  3. **MITRE Mapping Agent**: Maps attack vectors to MITRE ATT&CK for ICS (T1059, T1078, T1190, T1565).
  4. **SOAR Response Agent**: Formulates and executes automated zero-downtime containment playbooks.
  5. **Executive Report Agent**: Synthesizes C-level executive briefings and national risk scores.
  6. **Compliance Agent**: Audits infrastructure against NIST SP 800-82 Rev 3 & CERT-In guidelines.
  7. **Attack Prediction Agent**: Forecasts multi-stage attack propagation across interconnected grid assets.
  8. **RAG Knowledge Agent**: Conversational AI query engine powered by ChromaDB vector store.
- **Automated SOAR Playbook Execution**: Instant network segment isolation, SCADA PLC lockdown, and credential revocation with sub-second execution logs.
- **PDF Executive Audit Generator**: One-click generation of signed CNI security compliance reports.
- **Sleek Cyber SOC Dashboard**: Dark theme glassmorphism UI with real-time sector health charts, risk gauges, and interactive MITRE heatmap.

---

## 🚀 Quick Start Guide (Local Execution)

### Prerequisites
- Python 3.10+ (Tested on 3.13)
- Node.js 18+ (Tested on 20/24)
- npm 9+

### 1. Backend Setup & Run

```bash
# Navigate to project root
cd "ET PS 7"

# Create & activate Python virtual environment
python -m venv .venv
# On Windows PowerShell:
.\.venv\Scripts\activate

# Install backend dependencies
pip install -r backend/requirements.txt
pip install bcrypt

# Run Pytest suite to verify backend health
pytest backend/tests

# Start FastAPI server
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
FastAPI Swagger API Documentation will be available at: `http://localhost:8000/docs`

### 2. Frontend Setup & Run

```bash
# Open a new terminal tab, navigate to frontend
cd frontend

# Install node dependencies
npm install

# Start Vite development server
npm run dev
```
Access the SOC Cyber Dashboard at: `http://localhost:5173` or `http://localhost:3000`

---

## 🐳 Docker Deployment

To launch the full system (PostgreSQL + FastAPI Backend + Vite NGINX Frontend) using Docker Compose:

```bash
docker compose up --build -d
```

---

## 🔑 Quick RBAC Login Credentials

| Role | Username / Email | Password | Access Rights |
| :--- | :--- | :--- | :--- |
| **SOC Director (Admin)** | `admin@cni.gov.in` | `admin123` | Full SOAR execution, asset isolation & settings |
| **Tier-2 Analyst** | `analyst@cni.gov.in` | `analyst123` | Incident investigation, threat hunting & UEBA |
| **Executive / CSO** | `executive@cni.gov.in` | `exec123` | Executive risk dashboard & PDF reports |
| **CERT-In Auditor** | `auditor@cni.gov.in` | `auditor123` | Compliance checklists & immutable audit logs |

---

## 📂 Project Structure

```
.
├── backend/
│   ├── app/
│   │   ├── ai/            # 8 AI Agents & RAG Vectorstore
│   │   ├── api/v1/        # REST API Routes (Auth, Dashboard, Predict, SOAR, Reports)
│   │   ├── core/          # JWT Security & Settings
│   │   ├── db/            # Database session & ORM Base
│   │   ├── ml/            # IsolationForest, RandomForest, AutoEncoder ML Engine
│   │   ├── models/        # 12 SQLAlchemy Database Models
│   │   ├── schemas/       # Pydantic Schemas
│   │   ├── services/      # CNI Dataset Seed Generator & Report Service
│   │   └── main.py        # FastAPI Application Entrypoint
│   ├── tests/             # Pytest Automated Test Suite
│   ├── Dockerfile
│   └── pyproject.toml
├── frontend/
│   ├── src/
│   │   ├── components/    # Navbar, Sidebar, Recharts Visuals
│   │   ├── pages/         # Executive Dashboard, UEBA, SOAR, Threat Hunting RAG, MITRE
│   │   ├── services/      # Axios API Layer with Fallbacks
│   │   └── types/         # TypeScript Interfaces
│   ├── Dockerfile
│   └── tailwind.config.js
├── docs/                  # Architecture, ERD, DFD, Sequence & Deployment Diagrams
├── .github/workflows/     # GitHub Actions CI/CD Pipeline
├── docker-compose.yml
└── README.md
```

---

## 🛡️ License

Built for **ET AI Hackathon 2026 — Problem Statement 7**. Protected under CNI Cyber Defense Directive 2026.
