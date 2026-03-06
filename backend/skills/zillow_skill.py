"""
Skill 2: Zillow Data Skill — property lookup via RapidAPI Zillow wrapper.

Uses mock data by default so the full pipeline works without an API key.
Set RAPIDAPI_KEY env var to enable live calls.

Reusable module. Copy to ~/.claude/skills/ for use in other projects.
"""

import os
import json

# Toggle: set to True + provide RAPIDAPI_KEY to hit the real API
USE_LIVE_API = bool(os.getenv("RAPIDAPI_KEY"))

# ── Mock database keyed by normalized street prefix ──────────────────────
MOCK_DATA = {
    "1234 sunset blvd": {
        "zestimate": 1_285_000,
        "beds": 4,
        "baths": 3,
        "sqft": 2_800,
        "year_built": 1978,
        "lot_size": "6,200 sqft",
    },
    "5678 ocean ave": {
        "zestimate": 2_150_000,
        "beds": 3,
        "baths": 2,
        "sqft": 1_950,
        "year_built": 2005,
        "lot_size": "N/A (condo)",
    },
    "910 maple dr": {
        "zestimate": 3_520_000,
        "beds": 5,
        "baths": 4,
        "sqft": 4_200,
        "year_built": 1992,
        "lot_size": "12,400 sqft",
    },
    "default": {
        "zestimate": 750_000,
        "beds": 3,
        "baths": 2,
        "sqft": 1_600,
        "year_built": 1985,
        "lot_size": "5,000 sqft",
    },
}


def _normalize(address: str) -> str:
    """Lowercase and strip city/state/zip to match mock keys."""
    return address.lower().split(",")[0].strip()


def lookup_property_mock(address: str) -> dict:
    """Return mock Zillow-style data for any address."""
    key = _normalize(address)
    data = MOCK_DATA.get(key, MOCK_DATA["default"]).copy()
    data["address"] = address
    data["source"] = "mock"
    return data


async def lookup_property_live(address: str) -> dict:
    """
    Hit the RapidAPI Zillow wrapper.
    Requires: pip install httpx, and RAPIDAPI_KEY env var.
    """
    import httpx

    api_key = os.getenv("RAPIDAPI_KEY", "")
    url = "https://zillow-com1.p.rapidapi.com/property"
    headers = {
        "X-RapidAPI-Key": api_key,
        "X-RapidAPI-Host": "zillow-com1.p.rapidapi.com",
    }
    params = {"address": address}

    async with httpx.AsyncClient(timeout=10) as client:
        resp = await client.get(url, headers=headers, params=params)
        resp.raise_for_status()
        raw = resp.json()

    return {
        "address": address,
        "zestimate": raw.get("zestimate"),
        "beds": raw.get("bedrooms"),
        "baths": raw.get("bathrooms"),
        "sqft": raw.get("livingArea"),
        "year_built": raw.get("yearBuilt"),
        "lot_size": raw.get("lotSize"),
        "source": "zillow_live",
    }


async def get_property_data(address: str) -> dict:
    """
    Single entry point — uses live API if key is set, otherwise mock.
    """
    if USE_LIVE_API:
        try:
            return await lookup_property_live(address)
        except Exception as exc:
            # Fallback to mock on any API failure
            data = lookup_property_mock(address)
            data["source"] = "mock_fallback"
            data["api_error"] = str(exc)
            return data
    return lookup_property_mock(address)
