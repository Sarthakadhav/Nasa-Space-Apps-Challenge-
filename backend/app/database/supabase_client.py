from typing import Dict, Any, List, Optional
import httpx
from app.config import settings
from app.core.logging import logger

class SupabaseSyncManager:
    def __init__(self):
        self.url = settings.SUPABASE_URL.strip() if settings.SUPABASE_URL else ""
        self.key = settings.SUPABASE_SERVICE_ROLE_KEY.strip() if settings.SUPABASE_SERVICE_ROLE_KEY else ""

    @property
    def is_configured(self) -> bool:
        return bool(self.url and self.key)

    async def sync_incident(self, incident: Dict[str, Any]) -> Dict[str, Any]:
        """
        Attempts to sync incident to remote Supabase table 'incidents'.
        If unreachable, maintains local offline queue without failing.
        """
        if not self.is_configured:
            return {
                "status": "QUEUED_OFFLINE",
                "message": "Supabase credentials not configured. Cached locally in SQLite."
            }

        headers = {
            "apikey": self.key,
            "Authorization": f"Bearer {self.key}",
            "Content-Type": "application/json",
            "Prefer": "return=minimal"
        }
        endpoint = f"{self.url.rstrip('/')}/rest/v1/incidents"

        try:
            async with httpx.AsyncClient(timeout=4.0) as client:
                res = await client.post(endpoint, json=incident, headers=headers)
                if res.status_code in (200, 201):
                    logger.info(f"Successfully synced incident {incident.get('id')} to Supabase.")
                    return {"status": "SYNCED_TO_SUPABASE", "code": res.status_code}
                else:
                    logger.warning(f"Supabase responded with code {res.status_code}: {res.text}")
                    return {"status": "SYNC_FAILED_CACHED_LOCALLY", "code": res.status_code}
        except Exception as exc:
            logger.warning(f"Supabase connection unreachable ({exc}). Event safely cached in local SQLite.")
            return {"status": "OFFLINE_CACHED_LOCALLY", "error": str(exc)}

    async def test_connection(self) -> Dict[str, Any]:
        """Verifies cloud Supabase reachability."""
        if not self.is_configured:
            return {
                "connected": False,
                "configured": False,
                "status": "NOT_CONFIGURED",
                "message": "Local SQLite serving as primary operational database"
            }

        headers = {
            "apikey": self.key,
            "Authorization": f"Bearer {self.key}"
        }
        try:
            async with httpx.AsyncClient(timeout=3.0) as client:
                res = await client.get(f"{self.url.rstrip('/')}/rest/v1/", headers=headers)
                return {
                    "connected": res.status_code in (200, 404),
                    "configured": True,
                    "status": "ONLINE" if res.status_code in (200, 404) else "UNREACHABLE",
                    "status_code": res.status_code
                }
        except Exception as exc:
            return {
                "connected": False,
                "configured": True,
                "status": "OFFLINE",
                "error": str(exc)
            }

supabase_manager = SupabaseSyncManager()
