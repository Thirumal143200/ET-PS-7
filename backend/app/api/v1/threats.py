from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.cni_models import ThreatIntel
from app.schemas.cni_schemas import ThreatIntelResponse

router = APIRouter(prefix="", tags=["Threat Intelligence"])


@router.get("/threats", response_model=List[ThreatIntelResponse])
def get_threat_intel(db: Session = Depends(get_db)):
    threats = db.query(ThreatIntel).order_by(ThreatIntel.created_at.desc()).all()
    return threats
