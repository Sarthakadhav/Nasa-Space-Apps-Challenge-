from fastapi import APIRouter
from app.database.connection import get_db
from app.schemas.incident_schema import DSNSyncResponse
from app.config import settings

router = APIRouter()

@router.post("/dsn/sync-queue", response_model=DSNSyncResponse, summary="Batch sync cached telemetry & incidents to Earth")
def sync_dsn_queue():
    """
    Contract endpoint: POST /api/v1/dsn/sync-queue
    Simulates batch transmission over NASA Deep Space Network with 14-minute latency window.
    Marks cached offline incidents as synced with Houston Mission Control.
    """
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM incidents WHERE syncStatus LIKE '%Queue%' OR syncStatus LIKE '%Cached%';")
        queued_count = cursor.fetchone()[0]

        cursor.execute("""
        UPDATE incidents
        SET syncStatus = 'Synced with Houston Mission Control'
        WHERE syncStatus LIKE '%Queue%' OR syncStatus LIKE '%Cached%';
        """)
        synced_count = cursor.rowcount
        conn.commit()

    return DSNSyncResponse(
        status="DSN_TRANSMISSION_COMPLETE",
        queued_events_count=queued_count,
        synced_events_count=synced_count,
        latency_seconds=settings.DSN_LATENCY_SECONDS,
        dsn_station="Goldstone DSN 70m Deep Space Antenna (DSS-14)",
        details=f"Successfully transmitted {synced_count} event records to Houston Mission Control across DSN uplink."
    )
