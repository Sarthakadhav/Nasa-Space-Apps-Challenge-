import zlib
import json
from typing import Any, Dict

def calculate_crc32(payload: Dict[str, Any]) -> int:
    """Computes standard IEEE 802.3 CRC32 checksum for telemetry packets."""
    serialized = json.dumps(payload, sort_keys=True).encode("utf-8")
    return zlib.crc32(serialized) & 0xFFFFFFFF

def verify_packet_crc(payload: Dict[str, Any], reported_crc: int | None = None) -> bool:
    """Verifies ESP32 packet integrity."""
    if reported_crc is None:
        return True
    expected = calculate_crc32(payload)
    return expected == reported_crc
