# AI-Driven Cyber Resilience for Critical National Infrastructure (CNI)

**ET AI Hackathon 2026 — Problem Statement 7 Solution**

A production-hardened, enterprise-grade AI Cyber Resilience Platform engineered specifically for Critical National Infrastructure (CNI)—such as smart power grids, nuclear plant telemetry nodes, rail signaling switches, and national financial settlement gateways.

---

## 🌟 Key Architecture & Features

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

## ☁️ Free Cloud Deployment Guide

### 1. Database Deployment (Supabase PostgreSQL / Neon Free Tier)

1. Sign up at [Supabase](https://supabase.com) or [Neon](https://neon.tech).
2. Create a new PostgreSQL project named `cni_cyber_db`.
3. Copy your Connection String (`postgresql://postgres:[PASSWORD]@[HOST]:5432/cni_cyber_db?sslmode=require`).

### 2. Backend Deployment (Render Free Tier)

1. Connect your GitHub repository `Thirumal143200/ET-PS-7` to [Render](https://render.com).
2. Create a **Web Service** selecting `render.yaml` or manually configure:
   - **Environment**: `Python 3`
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt && pip install bcrypt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
3. Configure Environment Variables in Render Dashboard:
   - `DATABASE_URL`: Your Supabase/Neon PostgreSQL connection string.
   - `SECRET_KEY`: `cni_cyber_resilience_secret_key_prod_2026`
   - `ENVIRONMENT`: `production`
4. Deploy the service. Your backend URL will be: `https://cni-cyber-backend.onrender.com`.

### 3. Frontend Deployment (Vercel Free Tier)

1. Connect your GitHub repository `Thirumal143200/ET-PS-7` to [Vercel](https://vercel.com).
2. Configure Project Settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Add Environment Variable in Vercel Dashboard:
   - `VITE_API_BASE_URL`: `https://cni-cyber-backend.onrender.com/api/v1`
4. Click **Deploy**. Your frontend URL will be live at `https://et-ps-7.vercel.app`.

---

## 🚀 Quick Start Guide (Local Execution)

### Prerequisites
- Python 3.10+ (Tested on Python 3.13)
- Node.js 18+ (Tested on Node 20/24)
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

# Run Automated Build & Quality Gate Suite
python scripts/validate_build.py

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

To launch the full containerized stack locally:

```bash
docker compose up --build -d
```

---

## 🔑 Quick RBAC Demo Login Credentials

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
│   ├── alembic/           # Alembic Database Migrations
│   ├── app/
│   │   ├── ai/            # 8 Autonomous AI Agents & RAG Vectorstore
│   │   ├── api/v1/        # REST API Routes (Auth, Dashboard, Logs, Predict, SOAR, Reports)
│   │   ├── core/          # JWT Security & Config Settings
│   │   ├── db/            # Database session & ORM Base
│   │   ├── ml/            # IsolationForest, RandomForest & AutoEncoder Engine
│   │   ├── models/        # 12 SQLAlchemy ORM Database Models
│   │   ├── schemas/       # Pydantic V2 Schemas
│   │   └── services/      # Seed Generator & PDF Report Service
│   └── tests/             # Pytest Automated Test Suite
├── frontend/              # Vite React TypeScript Application (SOC Cyber Theme)
├── datasets/              # UNSW-NB15, CICIDS2017, CERT Insider & CVE Data Files
├── diagrams/              # Architecture, ERD, DFD, Sequence & Deployment Diagrams
├── docker/                # Production Dockerfiles & docker-compose.prod.yml
├── scripts/               # Helper Scripts (seed_db.py, validate_build.py, run_local.ps1)
├── .github/workflows/     # GitHub Actions CI/CD Workflow (ci.yml)
├── vercel.json            # Vercel Deployment Configuration
├── render.yaml            # Render Deployment Configuration
└── README.md
```

---

## 🛡️ License

Built for **ET AI Hackathon 2026 — Problem Statement 7**. Protected under CNI Cyber Defense Directive 2026.
