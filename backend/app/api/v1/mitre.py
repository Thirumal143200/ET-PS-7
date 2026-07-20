from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.cni_models import MITREMapping

router = APIRouter(prefix="", tags=["MITRE ATT&CK Matrix"])


@router.get("/mitre")
def get_mitre_matrix(db: Session = Depends(get_db)):
    mappings = db.query(MITREMapping).all()

    tactics = {
        "Initial Access": [],
        "Execution": [],
        "Persistence": [],
        "Privilege Escalation": [],
        "Defense Evasion": [],
        "Credential Access": [],
        "Discovery": [],
        "Lateral Movement": [],
        "Collection": [],
        "Command and Control": [],
        "Impact (ICS)": [],
    }

    for m in mappings:
        item = {
            "id": m.id,
            "technique_id": m.technique_id,
            "technique_name": m.technique_name,
            "hit_count": m.hit_count,
            "severity": m.severity,
            "detection_source": m.detection_source,
            "recommendation": m.recommendation,
        }
        if m.tactic in tactics:
            tactics[m.tactic].append(item)
        else:
            tactics.setdefault("Execution", []).append(item)

    return {"total_techniques_flagged": len(mappings), "matrix": tactics}
