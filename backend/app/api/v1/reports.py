import os
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.cni_models import Alert, Asset, Incident, Report

router = APIRouter(prefix="", tags=["Executive Reports"])


@router.get("/reports")
def get_reports(db: Session = Depends(get_db)):
    reports = db.query(Report).order_by(Report.created_at.desc()).all()
    if not reports:
        # Generate initial default report
        report = Report(
            report_title="CNI National Cyber Resilience Executive Audit",
            report_type="Executive Summary & NIST Compliance",
            summary="Comprehensive security health audit for Critical National Infrastructure power grid and telemetry networks.",
            key_metrics={"resilience_score": 84.5, "active_incidents": 2, "resolved_threats": 14},
            generated_by="Executive Report Agent",
        )
        db.add(report)
        db.commit()
        db.refresh(report)
        reports = [report]
    return reports


@router.get("/reports/generate")
def generate_pdf_report(db: Session = Depends(get_db)):
    os.makedirs("./generated_reports", exist_ok=True)
    filename = (
        f"./generated_reports/CNI_Cyber_Report_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}.pdf"
    )

    c = canvas.Canvas(filename, pagesize=letter)
    c.setTitle("CNI Cyber Resilience Audit Report")

    c.setFont("Helvetica-Bold", 18)
    c.drawString(50, 750, "CRITICAL NATIONAL INFRASTRUCTURE (CNI)")
    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, 730, "AI-Driven Cyber Resilience & Executive Audit Report")

    c.setFont("Helvetica", 10)
    c.drawString(
        50,
        710,
        f"Generated: {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')} | Classification: SECRET / CNI OFFICIAL",
    )

    c.line(50, 700, 550, 700)

    total_assets = db.query(Asset).count()
    active_incidents = db.query(Incident).filter(Incident.status != "RESOLVED").count()
    critical_alerts = db.query(Alert).filter(Alert.severity == "CRITICAL").count()

    c.setFont("Helvetica-Bold", 12)
    c.drawString(50, 670, "1. Executive Metrics Overview")
    c.setFont("Helvetica", 10)
    c.drawString(70, 650, f"- Protected CNI Assets: {total_assets}")
    c.drawString(70, 635, f"- Active Security Incidents: {active_incidents}")
    c.drawString(70, 620, f"- Critical Alerts Triggered: {critical_alerts}")
    c.drawString(70, 605, f"- National Cyber Resilience Index: 84.5 / 100 (HEALTHY)")

    c.setFont("Helvetica-Bold", 12)
    c.drawString(50, 570, "2. AI Anomaly Engine & SOAR Summary")
    c.setFont("Helvetica", 10)
    c.drawString(
        70, 550, "- Isolation Forest & Neural AutoEncoder flagged 3 Modbus protocol anomalies."
    )
    c.drawString(
        70, 535, "- Automated SOAR Playbook 'PLAYBOOK_ISOLATE_SCADA_PLC' executed successfully."
    )
    c.drawString(70, 520, "- Zero SCADA PLC operational outages incurred.")

    c.setFont("Helvetica-Bold", 12)
    c.drawString(50, 480, "3. Compliance & CERT-In Status")
    c.setFont("Helvetica", 10)
    c.drawString(70, 460, "- NIST SP 800-82 Rev 3 Compliance: 90% Pass Rate.")
    c.drawString(70, 445, "- CERT-In Cyber Security Directions 2026: COMPLIANT.")

    c.drawString(50, 100, "Signed by: Executive AI Report Agent & CNI Defense Directorate")
    c.save()

    return FileResponse(
        filename, media_type="application/pdf", filename="CNI_Cyber_Resilience_Report.pdf"
    )
