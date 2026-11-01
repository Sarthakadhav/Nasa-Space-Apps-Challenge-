import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

class Settings:
    PROJECT_NAME: str = "ORBITAL GUARD / ASTRA SENSE"
    VERSION: str = "1.0.0"
    DESCRIPTION: str = (
        "AI-Powered Health Monitoring & Autonomous Medical Decision Support "
        "for Astronauts on Long-Duration Deep Space Missions"
    )
    API_V1_STR: str = "/api/v1"
    
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "flight_simulation")
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))
    DEBUG: bool = os.getenv("DEBUG", "True").lower() in ("true", "1", "yes")

    # Local SQLite flight storage (primary offline-first engine)
    DATABASE_PATH: Path = BASE_DIR / "orbital_guard.db"

    # AI Intelligence keys (optional cloud enhancement)
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-2.0-flash")

    # Supabase cloud sync (optional)
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_SERVICE_ROLE_KEY: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

    # Deep Space Network simulated delay
    DSN_LATENCY_SECONDS: int = int(os.getenv("DSN_LATENCY_SECONDS", "862"))
    DEFAULT_MET_DAYS: int = int(os.getenv("DEFAULT_MET_DAYS", "142"))

settings = Settings()
