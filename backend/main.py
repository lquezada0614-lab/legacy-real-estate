"""
Legacy Real Estate CRM — FastAPI Backend
=========================================
Endpoints:
  POST /submit-lead   — receive lead from front-end, run all 3 skills
  GET  /leads          — view all leads in the database (admin)
  GET  /health         — health check
"""

import httpx

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from skills.database_skill import save_lead, mark_sms_sent, get_all_leads
from skills.zillow_skill import get_property_data
from skills.nurture_skill import nurture_lead

# Main CRM webhook endpoint (running on port 8001)
CRM_WEBHOOK_URL = "http://localhost:8001/api/incoming-lead"

app = FastAPI(
    title="Legacy Real Estate CRM",
    version="1.0.0",
)

# Allow the front-end (served on a different port) to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten in production
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Request / Response Models ────────────────────────────────────────────

class LeadRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    phone: str = Field(..., min_length=1, max_length=30)
    address: str = Field(..., min_length=1, max_length=500)


class LeadResponse(BaseModel):
    status: str
    lead: dict
    property_data: dict
    sms: dict


# ── Routes ───────────────────────────────────────────────────────────────

@app.get("/health")
def health():
    return {"status": "ok", "service": "Legacy Real Estate CRM"}


@app.post("/submit-lead", response_model=LeadResponse)
async def submit_lead(req: LeadRequest):
    """
    Master pipeline — runs all 3 skills sequentially:
      1. Database Skill  → categorize, score, save
      2. Zillow Skill    → pull property data
      3. Nurture Skill   → draft & send SMS
    """
    # Skill 1: Save lead
    lead = save_lead(req.name, req.phone, req.address)
    print(f"[SKILL 1] Lead #{lead['id']} saved — intent={lead['intent']}, priority={lead['priority']}")

    # Skill 2: Property lookup
    property_data = await get_property_data(req.address)
    print(f"[SKILL 2] Property data fetched — source={property_data['source']}, zestimate={property_data.get('zestimate')}")

    # Skill 3: Auto-nurture SMS
    sms_result = nurture_lead(lead, property_data)
    mark_sms_sent(lead["id"])
    print(f"[SKILL 3] SMS {sms_result['status']} to {lead['phone']}")

    # Skill 4: Forward to Main CRM
    crm_result = {"status": "skipped"}
    try:
        async with httpx.AsyncClient(timeout=5) as client:
            resp = await client.post(CRM_WEBHOOK_URL, json={
                "name": lead["name"],
                "phone": lead["phone"],
                "address": lead["address"],
                "intent": lead["intent"],
                "priority": lead["priority"],
                "zillow": property_data,
            })
            resp.raise_for_status()
            crm_result = resp.json()
            print(f"[SKILL 4] CRM sync {crm_result['action']} — lead #{crm_result['lead_id']}")
    except Exception as exc:
        crm_result = {"status": "failed", "error": str(exc)}
        print(f"[SKILL 4] CRM sync failed — {exc}")

    return LeadResponse(
        status="success",
        lead=lead,
        property_data=property_data,
        sms=sms_result,
    )


@app.get("/leads")
def list_leads():
    """Admin endpoint — return all leads."""
    return get_all_leads()
