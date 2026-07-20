from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.cni_models import Alert, Asset, Incident, MITREMapping
from app.schemas.cni_schemas import DashboardOverviewResponse

router = APIRouter(prefix="", tags=["Dashboard"])


@router.get("/dashboard", response_model=DashboardOverviewResponse)
def get_dashboard_overview(db: Session = Depends(get_db)):
    total_assets = db.query(Asset).count()
    active_incidents = db.query(Incident).filter(Incident.status != "RESOLVED").count()
    critical_alerts = db.query(Alert).filter(Alert.severity == "CRITICAL").count()

    # Sector health score calculation
    assets = db.query(Asset).all()
    sector_scores = {}
    if assets:
        for asset in assets:
            if asset.sector not in sector_scores:
                sector_scores[asset.sector] = []
            sector_scores[asset.sector].append(100.0 - asset.risk_score)

        sector_health = {
            sector: round(sum(scores) / len(scores), 1) for sector, scores in sector_scores.items()
        }
    else:
        sector_health = {
            "Power Grid": 88.5,
            "Nuclear Energy": 95.0,
            "Rail Transit": 74.0,
            "Financial System": 92.0,
        }

    # Dynamic CNI Risk Index (0-100)
    avg_risk = sum(a.risk_score for a in assets) / len(assets) if assets else 15.0
    overall_cni_risk_index = round(max(0.0, 100.0 - avg_risk), 1)

    recent_alerts = db.query(Alert).order_by(Alert.created_at.desc()).limit(5).all()

    mitre_mappings = db.query(MITREMapping).all()
    mitre_summary = (
        {m.tactic: m.hit_count for m in mitre_mappings}
        if mitre_mappings
        else {"Execution": 14, "Persistence": 8, "Initial Access": 22, "Impact": 5}
    )

    return {
        "total_assets": total_assets,
        "active_incidents": active_incidents,
        "critical_alerts": critical_alerts,
        "overall_cni_risk_index": overall_cni_risk_index,
        "sector_health": sector_health,
        "recent_alerts": recent_alerts,
        "mitre_coverage_summary": mitre_summary,
        "system_status": "OPERATIONAL" if overall_cni_risk_index > 60 else "DEGRADED",
    }
