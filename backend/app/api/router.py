from fastapi import APIRouter
from app.api.endpoints import (
    telemetry,
    crew,
    health,
    alerts,
    assistant,
    inventory,
    incidents,
    dsn,
    system,
)

api_router = APIRouter()

api_router.include_router(telemetry.router, tags=["Wearable Telemetry & Sensors"])
api_router.include_router(crew.router, tags=["Crew Matrix & Readiness Intelligence"])
api_router.include_router(health.router, tags=["Health Analytics & Isolation Forest"])
api_router.include_router(alerts.router, tags=["Decision & Alert Management"])
api_router.include_router(assistant.router, tags=["Hybrid Flight AI Assistant"])
api_router.include_router(inventory.router, tags=["Med Vault & Resource Intelligence"])
api_router.include_router(incidents.router, tags=["Mission Continuity & Recovery"])
api_router.include_router(dsn.router, tags=["Deep Space Network Synchronization"])
api_router.include_router(system.router, tags=["System Health & Autonomous Readiness"])
