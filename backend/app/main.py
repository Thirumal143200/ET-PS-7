from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1 import (
    agents,
    alerts,
    assets,
    audit,
    auth,
    dashboard,
    incidents,
    logs,
    mitre,
    predict,
    reports,
    threats,
    timeline,
)
from app.core.config import settings
from app.db.session import Base, SessionLocal, engine
from app.services.seed_data import seed_cni_database

# Initialize database tables
Base.metadata.create_all(bind=engine)

# Seed database with baseline CNI dataset
db = SessionLocal()
try:
    seed_cni_database(db)
finally:
    db.close()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="AI-Driven Cyber Resilience System for Critical National Infrastructure (ET AI Hackathon 2026 - Problem Statement 7)",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers under /api/v1 prefix
api_prefix = settings.API_V1_STR
app.include_router(auth.router, prefix=api_prefix)
app.include_router(dashboard.router, prefix=api_prefix)
app.include_router(logs.router, prefix=api_prefix)
app.include_router(predict.router, prefix=api_prefix)
app.include_router(incidents.router, prefix=api_prefix)
app.include_router(alerts.router, prefix=api_prefix)
app.include_router(threats.router, prefix=api_prefix)
app.include_router(timeline.router, prefix=api_prefix)
app.include_router(mitre.router, prefix=api_prefix)
app.include_router(assets.router, prefix=api_prefix)
app.include_router(reports.router, prefix=api_prefix)
app.include_router(audit.router, prefix=api_prefix)
app.include_router(agents.router, prefix=api_prefix)


@app.get("/")
def root():
    return {
        "status": "ONLINE",
        "system": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "docs": "/docs",
        "api_v1": settings.API_V1_STR,
    }


@app.get("/health")
def health_check():
    return {"status": "HEALTHY", "database": "CONNECTED", "ai_ml_engine": "READY"}
