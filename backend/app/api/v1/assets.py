from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.cni_models import Asset
from app.schemas.cni_schemas import AssetResponse

router = APIRouter(prefix="", tags=["CNI Assets"])


@router.get("/assets", response_model=List[AssetResponse])
def get_cni_assets(db: Session = Depends(get_db)):
    assets = db.query(Asset).order_by(Asset.risk_score.desc()).all()
    return assets
