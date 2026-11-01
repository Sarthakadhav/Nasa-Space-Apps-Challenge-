from typing import Tuple, Dict, Any

def assess_sensor_quality(
    spo2: float,
    hr: float,
    impedance: float,
    battery: float,
    crc_valid: bool
) -> Tuple[str, str, float]:
    """
    Evaluates signal-to-noise and biometric validity of raw ESP32 packet.
    Returns: (quality_status, description, estimated_snr_db)
    """
    if not crc_valid:
        return "CORRUPTED_CRC", "Packet failed CRC32 checksum verification", 0.0

    if hr <= 0 or hr > 250 or spo2 <= 0 or spo2 > 100:
        return "INVALID_RANGE", "Physiologically implausible sensor readings", 5.0

    if impedance > 1500:
        return "LEAD_OFF", "Electrode disconnected or dry skin contact", 8.0

    if battery < 10.0:
        return "LOW_BATTERY_WARNING", "ESP32 battery critical (<10%)", 18.0

    if impedance > 700:
        return "MODERATE_NOISE", "Motion artifact detected, SNR reduced", 22.5

    return "OPTIMAL", "Nominal contact, high fidelity signal", 32.4
