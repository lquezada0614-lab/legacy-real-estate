import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { rating, feedback } = body;

    // Input validation
    if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Invalid rating" }, { status: 400 });
    }
    if (!feedback || typeof feedback !== "string" || feedback.trim().length === 0) {
      return NextResponse.json({ error: "Feedback is required" }, { status: 400 });
    }

    const backendUrl = process.env.CRM_BACKEND_URL;
    const apiKey = process.env.CRM_API_KEY;

    if (!backendUrl || !apiKey) {
      console.error("Missing CRM_BACKEND_URL or CRM_API_KEY in environment");
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    const crmResponse = await fetch(`${backendUrl}/v1/log-feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({ rating, feedback }),
    });

    if (!crmResponse.ok) {
      const detail = await crmResponse.text();
      console.error("CRM backend error:", crmResponse.status, detail);
      return NextResponse.json({ error: "Failed to log feedback" }, { status: 502 });
    }

    const data = await crmResponse.json();
    return NextResponse.json({ success: true, id: data.id });
  } catch (error: unknown) {
    console.error("Feedback API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
