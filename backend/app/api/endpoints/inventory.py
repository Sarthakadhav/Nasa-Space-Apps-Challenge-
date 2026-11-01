from typing import List
from fastapi import APIRouter, HTTPException
from app.database.connection import get_db
from app.schemas.inventory_schema import (
    InventoryItem, ConsumeInventoryRequest, EmergencyScenario
)
from app.local_ai.knowledge_base import EMERGENCY_SCENARIOS
from app.core.logging import logger

router = APIRouter()

@router.get("/inventory", response_model=List[InventoryItem], summary="Get medical vault inventory")
def get_inventory():
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM medical_inventory ORDER BY category ASC, id ASC;")
        rows = cursor.fetchall()
        return [dict(r) for r in rows]

@router.post("/inventory/consume", summary="Dispense medication or equipment")
def consume_inventory(req: ConsumeInventoryRequest):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM medical_inventory WHERE id = ?;", (req.item_id,))
        item = cursor.fetchone()
        if not item:
            raise HTTPException(status_code=404, detail="Medical item not found.")

        current_stock = item["stock"]
        if current_stock < req.quantity:
            raise HTTPException(
                status_code=400,
                detail=f"Insufficient stock for {item['name']}. Available: {current_stock}, Requested: {req.quantity}"
            )

        new_stock = current_stock - req.quantity
        new_status = item["status"]
        if new_stock <= item["minSafeStock"]:
            new_status = "Low Reserve Warning"

        cursor.execute("""
        UPDATE medical_inventory
        SET stock = ?, status = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?;
        """, (new_stock, new_status, req.item_id))

        # Log consumption to audit table
        cursor.execute("""
        INSERT INTO audit_logs (user_officer, action, details, timestamp_met)
        VALUES (?, ?, ?, ?);
        """, (
            req.authorized_by,
            "INVENTORY_DISPENSED",
            f"Dispensed {req.quantity} {item['unit']} of {item['name']}. Reason: {req.reason}",
            "MET 142d 04:42:00"
        ))

        conn.commit()

    return {
        "status": "DISPENSED",
        "item_id": req.item_id,
        "item_name": item["name"],
        "dispensed_quantity": req.quantity,
        "remaining_stock": new_stock,
        "inventory_status": new_status
    }

@router.get("/inventory/scenarios", response_model=List[EmergencyScenario], summary="Get simulated emergency supply scenarios")
def get_emergency_scenarios():
    return EMERGENCY_SCENARIOS
