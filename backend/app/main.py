from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.config import settings
from app.api.router import api_router
from app.database.init_db import init_database
from app.core.logging import logger

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize SQLite flight tables & seed initial mission datasets
    logger.info("Initializing ORBITAL GUARD Onboard Flight Storage...")
    init_database()
    logger.info("Onboard flight systems nominal. Ready for ESP32 streams & flight deck UI.")
    yield
    # Shutdown
    logger.info("ORBITAL GUARD shutting down gracefully.")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description=settings.DESCRIPTION,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan
)

# Cross-Origin Resource Sharing (CORS) for React dashboard, Vite dev server, and ESP32 nodes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API V1
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/", tags=["Flight Status"])
def root():
    return {
        "system": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "status": "FLIGHT_ACTIVE",
        "mode": "AUTONOMOUS_EDGE_ENGINE",
        "api_documentation": "/docs",
        "api_v1": settings.API_V1_STR
    }

@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled operational fault: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "error": "INTERNAL_SYSTEM_FAULT",
            "message": "Flight software encountered an unhandled exception. Local autonomous monitoring active.",
            "details": str(exc) if settings.DEBUG else None
        }
    )
