from fastapi import HTTPException, status

class OrbitalGuardException(Exception):
    """Base exception for Orbital Guard operations."""
    def __init__(self, message: str):
        self.message = message
        super().__init__(self.message)

class SensorDataQualityError(OrbitalGuardException):
    """Raised when incoming sensor stream is corrupted, noisy, or disconnected."""
    pass

class AstronautNotFoundError(OrbitalGuardException):
    """Raised when astronaut profile cannot be resolved."""
    pass

class SafetyCriticalException(OrbitalGuardException):
    """Raised on immediate life-threatening physiological parameters."""
    pass
