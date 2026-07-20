from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.cni_models import Alert, Incident, Log

router = APIRouter(prefix="", tags=["Incident Timeline"])


@router.get("/timeline")
def get_incident_timeline(db: Session = Depends(get_db)):
    # Build unified chronological kill-chain incident timeline
    incidents = db.query(Incident).all()
    alerts = db.query(Alert).all()
    logs = db.query(Log).filter(Log.is_anomaly == True).all()

    timeline_events = []

    for inc in incidents:
        timeline_events.append(
            {
                "id": f"inc-{inc.id}",
                "type": "INCIDENT",
                "title": f"Incident Created: {inc.title}",
                "severity": inc.severity,
                "timestamp": inc.created_at.isoformat(),
                "description": inc.description,
                "status": inc.status,
            }
        )

    for alt in alerts:
        timeline_events.append(
            {
                "id": f"alt-{alt.id}",
                "type": "ALERT",
                "title": f"Alert Triggered: {alt.title}",
                "severity": alt.severity,
                "timestamp": alt.created_at.isoformat(),
                "description": alt.description,
                "category": alt.category,
            }
        )

    for lg in logs:
        timeline_events.append(
            {
                "id": f"log-{lg.id}",
                "type": "ANOMALY_LOG",
                "title": f"Anomaly Log Ingested: {lg.event_type}",
                "severity": lg.severity,
                "timestamp": lg.timestamp.isoformat(),
                "description": f"IP {lg.source_ip} -> {lg.destination_ip}:{lg.destination_port} ({lg.protocol})",
                "score": lg.anomaly_score,
            }
        )

    timeline_events.sort(key=lambda x: x["timestamp"], reverse=True)
    return {"events": timeline_events}
