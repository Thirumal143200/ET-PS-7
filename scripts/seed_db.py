import sys
import os

# Add backend directory to PYTHONPATH
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "backend"))

from app.db.session import SessionLocal, Base, engine
from app.services.seed_data import seed_cni_database

def main():
    print("Initializing CNI Cyber Resilience Database Tables...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        print("Seeding database with CNI telemetry and baseline users...")
        seed_cni_database(db)
        print("Database successfully seeded!")
    finally:
        db.close()

if __name__ == "__main__":
    main()
