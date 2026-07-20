#!/usr/bin/env bash
echo "Starting CNI AI Cyber Resilience Backend and Frontend..."

(cd backend && source ../.venv/bin/activate && uvicorn app.main:app --reload --port 8000) &
(cd frontend && npm run dev) &

echo "Services Launched!"
echo "FastAPI API Docs: http://localhost:8000/docs"
echo "SOC Cyber Dashboard: http://localhost:5173"
