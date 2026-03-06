"""
Test script for the private-zillow RapidAPI endpoint.
Paste your RapidAPI key below, then run:  python test_zillow.py
"""

import asyncio
import json
import httpx

# ── Paste your RapidAPI key here ─────────────────────────────────────────
RAPIDAPI_KEY = "YOUR_KEY_HERE"

# ── Test address (change as needed) ──────────────────────────────────────
TEST_ADDRESS = "1234 Sunset Blvd, Los Angeles, CA"


async def fetch_zillow(address: str):
    url = "https://private-zillow.p.rapidapi.com/property/by-address"
    headers = {
        "x-rapidapi-key": RAPIDAPI_KEY,
        "x-rapidapi-host": "private-zillow.p.rapidapi.com",
    }
    params = {"address": address}

    async with httpx.AsyncClient(timeout=15) as client:
        resp = await client.get(url, headers=headers, params=params)
        resp.raise_for_status()
        return resp.json()


async def main():
    print(f"Querying private-zillow for: {TEST_ADDRESS}\n")
    data = await fetch_zillow(TEST_ADDRESS)
    print(json.dumps(data, indent=2))


if __name__ == "__main__":
    asyncio.run(main())
