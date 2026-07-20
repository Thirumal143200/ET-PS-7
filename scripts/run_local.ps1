# Local Execution Script for CNI Cyber Resilience System
Write-Host "Starting CNI AI Cyber Resilience Backend and Frontend..." -ForegroundColor Cyan

# Start Backend in Background
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; ..\.venv\Scripts\activate; uvicorn app.main:app --reload --port 8000"

# Start Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "Services Launched!" -ForegroundColor Green
Write-Host "FastAPI API Docs: http://localhost:8000/docs" -ForegroundColor Yellow
Write-Host "SOC Cyber Dashboard: http://localhost:5173" -ForegroundColor Yellow
