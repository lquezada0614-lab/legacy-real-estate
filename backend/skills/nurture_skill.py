"""
Skill 3: Auto-Nurturer & Scheduler Skill — Twilio SMS outreach.

Sends a context-aware first-touch text using the lead info + Zillow data.
Uses console logging when no Twilio credentials are set (safe for testing).

Reusable module. Copy to ~/.claude/skills/ for use in other projects.
"""

import os
from datetime import datetime, timezone

# Twilio config — set these env vars for live SMS
TWILIO_SID = os.getenv("TWILIO_ACCOUNT_SID", "")
TWILIO_TOKEN = os.getenv("TWILIO_AUTH_TOKEN", "")
TWILIO_FROM = os.getenv("TWILIO_FROM_NUMBER", "")  # e.g. "+15551234567"

USE_LIVE_SMS = all([TWILIO_SID, TWILIO_TOKEN, TWILIO_FROM])


def _format_currency(amount) -> str:
    """Format a number as $X,XXX,XXX."""
    if amount is None:
        return "N/A"
    return f"${int(amount):,}"


def build_message(lead: dict, property_data: dict) -> str:
    """
    Draft a context-aware SMS based on lead intent and property data.
    """
    name_first = lead["name"].split()[0] if lead["name"] else "there"
    address = lead["address"]
    zestimate = _format_currency(property_data.get("zestimate"))
    beds = property_data.get("beds", "?")
    baths = property_data.get("baths", "?")
    sqft = property_data.get("sqft", "?")
    if isinstance(sqft, int):
        sqft = f"{sqft:,}"

    intent = lead.get("intent", "buyer")

    if intent == "seller":
        return (
            f"Hi {name_first}! This is Alejandra Gonzalez with Legacy Real Estate. "
            f"I pulled the valuation for {address} — the current Zestimate is {zestimate} "
            f"({beds}bd/{baths}ba, {sqft} sqft). "
            f"I'd love to walk you through a full market analysis. "
            f"When's a good time to chat?"
        )
    elif intent == "investor":
        return (
            f"Hi {name_first}! Alejandra Gonzalez here — Legacy Real Estate. "
            f"Great news on {address}: Zestimate at {zestimate}, "
            f"{beds}bd/{baths}ba, {sqft} sqft. "
            f"I can run the rental comps and projected ROI for you. "
            f"Want me to send over the numbers?"
        )
    else:  # buyer / unknown
        return (
            f"Hi {name_first}! This is Alejandra Gonzalez with Legacy Real Estate. "
            f"Thanks for your interest in {address}! "
            f"Quick snapshot: Zestimate {zestimate}, {beds} beds, {baths} baths, {sqft} sqft. "
            f"I'd love to schedule a showing for you. What day works best?"
        )


def send_sms_live(to_phone: str, body: str) -> dict:
    """Send a real SMS via Twilio."""
    from twilio.rest import Client

    client = Client(TWILIO_SID, TWILIO_TOKEN)
    msg = client.messages.create(
        body=body,
        from_=TWILIO_FROM,
        to=to_phone,
    )
    return {
        "sid": msg.sid,
        "status": msg.status,
        "to": to_phone,
        "method": "twilio_live",
    }


def send_sms_mock(to_phone: str, body: str) -> dict:
    """Log the SMS to console instead of sending (no Twilio creds)."""
    timestamp = datetime.now(timezone.utc).isoformat()
    print(f"\n{'='*60}")
    print(f"  MOCK SMS  |  {timestamp}")
    print(f"{'='*60}")
    print(f"  TO:   {to_phone}")
    print(f"  BODY: {body}")
    print(f"{'='*60}\n")
    return {
        "sid": "MOCK_SID_" + timestamp,
        "status": "mock_sent",
        "to": to_phone,
        "method": "console_mock",
    }


def nurture_lead(lead: dict, property_data: dict) -> dict:
    """
    Full pipeline: build message → send (live or mock).
    Returns SMS result dict.
    """
    body = build_message(lead, property_data)

    if USE_LIVE_SMS:
        result = send_sms_live(lead["phone"], body)
    else:
        result = send_sms_mock(lead["phone"], body)

    result["message_body"] = body
    return result
