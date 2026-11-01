import sys
import os

sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

# Update backend/app/database/init_db.py
with open('backend/app/database/init_db.py', 'r', encoding='utf-8') as f:
    code = f.read()

code = code.replace(
    '"condition": "Fatigued"',
    '"condition": "Tired (Needs Rest)"'
).replace(
    '"status": "Fatigue Outlier"',
    '"status": "Unusual Pattern (Needs Rest)"'
).replace(
    '"recommendation": "Astronaut A has reported significant fatigue. Consider postponing non-urgent medical duties, assigning a qualified backup, and reassessing readiness after rest."',
    '"recommendation": "Dr. Vance is showing signs of high fatigue. To keep the crew safe and ready, consider letting Commander Chen cover non-urgent tasks so Dr. Vance can rest."'
).replace(
    '"Fatigue & Cognitive Saccade Drift"',
    '"Fatigue & Slowed Reaction Notice"'
).replace(
    '"Astronaut A (Dr. Elena Vance): Resting pulse elevated to 84 bpm (+31%). 72h sleep debt is 6.4h. Anomaly score -0.42."',
    '"Dr. Elena Vance: Resting pulse is slightly high at 84 bpm. Missing 6.4 hours of sleep over the past 3 days. Rest recommended."'
)

with open('backend/app/database/init_db.py', 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated init_db.py seed definitions.")

# Add backend directory to sys.path
sys.path.insert(0, os.path.abspath('backend'))

from app.database.init_db import init_database
init_database()
print("Reinitialized database with simplified friendly content!")
