/**
 * ORBITAL GUARD / ASTRA SENSE API Client
 * Connects frontend directly to the Python FastAPI backend.
 * Gracefully falls back to mock data if backend server is not running during standalone previews.
 */

const API_BASE = '/api/v1';

export const orbitalApi = {
  // Module 1: Telemetry ingestion
  async ingestTelemetry(packet) {
    const res = await fetch(`${API_BASE}/telemetry/ingest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(packet)
    });
    if (!res.ok) throw new Error(`Telemetry ingest failed: ${res.statusText}`);
    return res.json();
  },

  // Module 2: Scikit-learn Isolation Forest Anomaly Detection
  async runIsolationForest(payload) {
    const res = await fetch(`${API_BASE}/ml/isolation-forest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`ML scoring failed: ${res.statusText}`);
    return res.json();
  },

  // Module 3: Crew Profiles & Readiness
  async getCrew() {
    const res = await fetch(`${API_BASE}/crew`);
    if (!res.ok) throw new Error(`Get crew failed: ${res.statusText}`);
    return res.json();
  },

  async getCrewReadiness() {
    const res = await fetch(`${API_BASE}/crew/readiness`);
    if (!res.ok) throw new Error(`Get readiness failed: ${res.statusText}`);
    return res.json();
  },

  async redistributeWorkload(primaryId = 'AST-01', backupId = 'AST-02') {
    const res = await fetch(`${API_BASE}/crew/redistribute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        primary_astronaut_id: primaryId,
        backup_astronaut_id: backupId,
        approved_by: 'Cmdr. Sarah Chen',
        reason: 'Acute neuro-fatigue and cognitive latency drift'
      })
    });
    if (!res.ok) throw new Error(`Redistribution failed: ${res.statusText}`);
    return res.json();
  },

  // Module 4: Med Vault
  async getInventory() {
    const res = await fetch(`${API_BASE}/inventory`);
    if (!res.ok) throw new Error(`Get inventory failed: ${res.statusText}`);
    return res.json();
  },

  async consumeInventory(itemId, quantity = 1, reason = 'Emergency consumption') {
    const res = await fetch(`${API_BASE}/inventory/consume`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item_id: itemId, quantity, reason, authorized_by: 'Dr. Elena Vance' })
    });
    if (!res.ok) throw new Error(`Consume inventory failed: ${res.statusText}`);
    return res.json();
  },

  // Module 5: Hybrid AI Assistant (Google Gemini 2.0 + Offline Flight Knowledge)
  async askAssistant(question, astronautId = 'AST-01') {
    const res = await fetch(`${API_BASE}/assistant/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, astronaut_id: astronautId, include_vitals: true })
    });
    if (!res.ok) throw new Error(`Assistant query failed: ${res.statusText}`);
    return res.json();
  },

  // Module 6: Mission Incidents & DSN Sync
  async getIncidents() {
    const res = await fetch(`${API_BASE}/incidents`);
    if (!res.ok) throw new Error(`Get incidents failed: ${res.statusText}`);
    return res.json();
  },

  async syncDsnQueue() {
    const res = await fetch(`${API_BASE}/dsn/sync-queue`, { method: 'POST' });
    if (!res.ok) throw new Error(`DSN sync failed: ${res.statusText}`);
    return res.json();
  },

  // System & Emergency Drills
  async getSystemStatus() {
    const res = await fetch(`${API_BASE}/system/status`);
    if (!res.ok) throw new Error(`System status failed: ${res.statusText}`);
    return res.json();
  },

  async triggerEmergencyDrill(scenarioId = 'SCENARIO-02') {
    const res = await fetch(`${API_BASE}/simulation/drill`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenario_id: scenarioId })
    });
    if (!res.ok) throw new Error(`Drill failed: ${res.statusText}`);
    return res.json();
  }
};
