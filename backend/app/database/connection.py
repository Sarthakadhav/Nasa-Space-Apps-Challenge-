import sqlite3
from pathlib import Path
from contextlib import contextmanager
from app.config import settings

def get_db_path() -> Path:
    return settings.DATABASE_PATH

@contextmanager
def get_db():
    """Context manager for SQLite connection with WAL mode enabled."""
    conn = sqlite3.connect(
        get_db_path(),
        timeout=20.0
    )
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode = WAL;")
    conn.execute("PRAGMA synchronous = NORMAL;")
    conn.execute("PRAGMA foreign_keys = ON;")
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()
