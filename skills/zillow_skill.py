import os
import httpx
from dotenv import load_dotenv

load_dotenv()

RAPIDAPI_KEY = os.getenv("RAPIDAPI_KEY")
RAPIDAPI_HOST = os.getenv("RAPIDAPI_HOST")


def _headers():
    return {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": RAPIDAPI_HOST,
    }


def search_addresses(query: str) -> list[dict]:
    """Return autocomplete suggestions from Zillow."""
    try:
        response = httpx.get(
            f"https://{RAPIDAPI_HOST}/autocomplete",
            headers=_headers(),
            params={"query": query},
            timeout=10,
        )
        response.raise_for_status()
        results = response.json().get("results", [])
        return [
            {
                "display": r.get("display", ""),
                "zpid": r.get("metaData", {}).get("zpid"),
            }
            for r in results
            if r.get("resultType") == "Address" and r.get("metaData", {}).get("zpid")
        ]
    except Exception:
        return []


def get_property_data(address: str) -> dict:
    """Fetch property data from Zillow via RapidAPI and return standardized fields."""
    fallback = {
        "price": "N/A",
        "zestimate": "N/A",
        "address": address,
    }

    try:
        url = f"https://{RAPIDAPI_HOST}/byurl"
        zillow_url = address if address.startswith("http") else f"https://www.zillow.com/homedetails/p/{address}_zpid/"
        params = {"url": zillow_url}

        response = httpx.get(url, headers=_headers(), params=params, timeout=10)
        response.raise_for_status()
        data = response.json()

        prop_addr = data.get("PropertyAddress", {})
        full_address = f"{prop_addr.get('streetAddress', '')}, {prop_addr.get('city', '')}, {prop_addr.get('state', '')} {prop_addr.get('zipcode', '')}".strip(", ")

        return {
            "price": data.get("Price", "N/A"),
            "zestimate": data.get("zestimate", "N/A"),
            "address": full_address or address,
        }
    except Exception:
        return fallback
