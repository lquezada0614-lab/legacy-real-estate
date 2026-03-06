"""
Skill 1: Database Skill — SQLite lead storage with intent categorization and priority scoring.

Reusable module. Copy to ~/.claude/skills/ for use in other projects.
"""

import sqlite3
import os
import re
from datetime import datetime, timezone

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "leads.db")


def get_connection() -> sqlite3.Connection:
    """Return a connection to the SQLite database, creating tables if needed."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("""
        CREATE TABLE IF NOT EXISTS leads (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            name        TEXT    NOT NULL,
            phone       TEXT    NOT NULL,
            address     TEXT    NOT NULL,
            intent      TEXT    NOT NULL DEFAULT 'unknown',
            priority    INTEGER NOT NULL DEFAULT 0,
            created_at  TEXT    NOT NULL,
            sms_sent    INTEGER NOT NULL DEFAULT 0
        )
    """)
    conn.commit()
    return conn


# ---------------------------------------------------------------------------
# Intent keywords — extend these lists as the business grows
# ---------------------------------------------------------------------------
BUYER_KEYWORDS = [
    "buy", "purchase", "offer", "looking for", "move in",
    "first home", "new home", "house hunt",
]
SELLER_KEYWORDS = [
    "sell", "selling", "list my", "what is my home worth",
    "home value", "valuation", "zestimate", "appraisal",
]
INVESTOR_KEYWORDS = [
    "invest", "rental", "roi", "cap rate", "flip",
    "multi-family", "duplex", "triplex", "portfolio",
]


def categorize_intent(address: str, name: str) -> str:
    """Heuristic intent classification based on the submitted text fields."""
    combined = f"{name} {address}".lower()
    for kw in INVESTOR_KEYWORDS:
        if kw in combined:
            return "investor"
    for kw in SELLER_KEYWORDS:
        if kw in combined:
            return "seller"
    for kw in BUYER_KEYWORDS:
        if kw in combined:
            return "buyer"
    # Default: someone submitting a specific address is likely a buyer/curious
    return "buyer"


def score_priority(name: str, phone: str, address: str, intent: str) -> int:
    """
    Score 0-100. Higher = hotter lead.
    Factors: completeness of data, intent type, phone format quality.
    """
    score = 0

    # Completeness — each filled field adds weight
    if name.strip():
        score += 15
    if phone.strip():
        score += 15
    if address.strip():
        score += 20

    # Address specificity — contains a street number → more serious
    if re.search(r"\d{2,}", address):
        score += 15

    # Phone quality — looks like a full 10-digit US number
    digits = re.sub(r"\D", "", phone)
    if len(digits) >= 10:
        score += 10

    # Intent bonus
    intent_bonus = {"investor": 25, "seller": 20, "buyer": 15, "unknown": 0}
    score += intent_bonus.get(intent, 0)

    return min(score, 100)


def save_lead(name: str, phone: str, address: str) -> dict:
    """
    Full pipeline: categorize → score → persist.
    Returns the saved lead as a dict.
    """
    intent = categorize_intent(address, name)
    priority = score_priority(name, phone, address, intent)
    now = datetime.now(timezone.utc).isoformat()

    conn = get_connection()
    cursor = conn.execute(
        """
        INSERT INTO leads (name, phone, address, intent, priority, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (name, phone, address, intent, priority, now),
    )
    conn.commit()
    lead_id = cursor.lastrowid
    conn.close()

    return {
        "id": lead_id,
        "name": name,
        "phone": phone,
        "address": address,
        "intent": intent,
        "priority": priority,
        "created_at": now,
    }


def mark_sms_sent(lead_id: int) -> None:
    """Flag a lead as having received the initial SMS."""
    conn = get_connection()
    conn.execute("UPDATE leads SET sms_sent = 1 WHERE id = ?", (lead_id,))
    conn.commit()
    conn.close()


def get_all_leads() -> list[dict]:
    """Return every lead, newest first."""
    conn = get_connection()
    rows = conn.execute("SELECT * FROM leads ORDER BY id DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]
