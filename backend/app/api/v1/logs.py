from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.ml.anomaly_engine import cni_ml_engine
from app.models.cni_models import Asset, Log
from app.schemas.cni_schemas import LogIngestRequest

router = APIRouter(prefix="", tags=["Logs"])


@router.post("/logs")
def ingest_log(request: LogIngestRequest, db: Session = Depends(get_db)):
    # Run ML Inference instantly on ingested log telemetry
    ml_result = cni_ml_engine.predict(
        source_port=request.source_port,
        destination_port=request.destination_port,
        packet_length=request.packet_length,
        protocol=request.protocol,
    )

    asset = db.query(Asset).filter(Asset.asset_id == request.asset_id).first()
    asset_db_id = asset.id if asset else None

    log_entry = Log(
        asset_id=asset_db_id,
        source_ip=request.source_ip,
        destination_ip=request.destination_ip,
        source_port=request.source_port,
        destination_port=request.destination_port,
        protocol=request.protocol,
        event_type=request.event_type,
        payload_summary=request.payload_summary,
        packet_length=request.packet_length,
        anomaly_score=ml_result["anomaly_score"],
        is_anomaly=ml_result["is_anomaly"],
        severity="HIGH" if ml_result["is_anomaly"] else "INFO",
    )
    db.add(log_entry)
    db.commit()
    db.refresh(log_entry)

    return {"status": "INGESTED", "log_id": log_entry.id, "ml_inference": ml_result}
