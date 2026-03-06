import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from skills.zillow_skill import get_property_data, search_addresses
from skills.email_skill import log_lead

CRM_WEBHOOK_URL = "http://localhost:8001/api/incoming-lead"

app = FastAPI(title="Real Estate Lead Pipeline")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class LeadRequest(BaseModel):
    first_name: str = ""
    last_name: str = ""
    phone: str = ""
    email: str
    address: str


# --------------- Skill helpers ---------------

def validate_lead(lead: LeadRequest) -> dict:
    """Skill 1 – Basic lead validation."""
    errors = []
    if not lead.email.strip() or "@" not in lead.email:
        errors.append("A valid email is required.")
    if not lead.address.strip():
        errors.append("Property address is required.")
    return {"valid": len(errors) == 0, "errors": errors}


def push_to_crm(lead: LeadRequest, property_data: dict) -> dict:
    """Skill 4 – POST enriched lead to the Ale_CRM webhook."""
    zestimate = property_data.get("zestimate", "N/A")
    price = property_data.get("price", "N/A")
    address = property_data.get("address", "")

    payload = {
        "name": f"{lead.first_name} {lead.last_name}".strip(),
        "phone": lead.phone,
        "address": address,
        "intent": "seller",
        "priority": 70,
        "zillow": {
            "zestimate": zestimate,
            "price": price,
            "address": address,
            "source": "zillow_live",
        },
        "email": lead.email,
        "lead_source": "Home Valuation Tab",
        "estimated_value": str(zestimate),
    }
    try:
        resp = httpx.post(CRM_WEBHOOK_URL, json=payload, timeout=5)
        resp.raise_for_status()
        result = resp.json()
        print(f"[SKILL 4] CRM synced — {result}")
        return {"status": "pushed", "crm_response": result}
    except Exception as exc:
        print(f"[SKILL 4] CRM sync failed — {exc}")
        return {"status": "crm_unreachable", "error": str(exc)}


# --------------- Routes ---------------

@app.get("/autocomplete")
def autocomplete(query: str = ""):
    if len(query) < 3:
        return {"results": []}
    return {"results": search_addresses(query)}


@app.post("/submit-lead")
def submit_lead(lead: LeadRequest):
    # Skill 1: Lead Validation
    validation = validate_lead(lead)
    if not validation["valid"]:
        raise HTTPException(status_code=422, detail=validation["errors"])

    # Skill 2: Zillow Data Fetch
    property_data = get_property_data(lead.address)

    # Skill 3: Email / Log
    log_lead(lead.email, property_data)

    # Skill 4: CRM Webhook
    crm_result = push_to_crm(lead, property_data)

    return {
        "message": "Lead processed successfully",
        "property_data": property_data,
        "crm": crm_result,
    }
