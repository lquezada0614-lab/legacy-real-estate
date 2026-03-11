import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, address } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { detail: "Name and phone are required." },
        { status: 422 }
      );
    }

    const backendUrl = process.env.CRM_BACKEND_URL;
    const apiKey = process.env.CRM_API_KEY;

    if (!backendUrl) {
      console.error("Missing CRM_BACKEND_URL in environment");
      return NextResponse.json(
        { detail: "Server misconfigured" },
        { status: 500 }
      );
    }

    const crmPayload = {
      name: name.trim(),
      phone: phone.trim(),
      address: (address ?? "").trim(),
      intent: "consultation",
      priority: 80,
      lead_source: "Book Consultation Modal",
    };

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (apiKey) {
      headers["x-api-key"] = apiKey;
    }

    const crmRes = await fetch(`${backendUrl}/api/incoming-lead`, {
      method: "POST",
      headers,
      body: JSON.stringify(crmPayload),
      signal: AbortSignal.timeout(5000),
    });

    if (!crmRes.ok) {
      const detail = await crmRes.text();
      console.error("CRM backend error:", crmRes.status, detail);
      return NextResponse.json(
        { detail: "Failed to submit lead" },
        { status: 502 }
      );
    }

    const data = await crmRes.json();
    return NextResponse.json({ success: true, ...data });
  } catch (error: unknown) {
    console.error("Book consultation API error:", error);
    return NextResponse.json(
      { detail: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
