import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.RAPIDAPI_KEY;
  const apiHost = process.env.RAPIDAPI_HOST;

  try {
    const body = await req.json();
    const { first_name, last_name, phone, email, address } = body;

    if (!email || !address) {
      return NextResponse.json(
        { detail: "Email and address are required." },
        { status: 422 }
      );
    }

    const zpid = body.zpid;
    const displayAddress = body.display_address || address;

    // Fetch property data from Zillow via RapidAPI
    let propertyData: Record<string, unknown> = {
      price: "N/A",
      zestimate: "N/A",
      address: displayAddress,
    };

    if (apiKey && apiHost && zpid) {
      try {
        const zillowUrl = `https://www.zillow.com/homedetails/p/${zpid}_zpid/`;
        const res = await fetch(
          `https://${apiHost}/byurl?url=${encodeURIComponent(zillowUrl)}`,
          {
            headers: {
              "X-RapidAPI-Key": apiKey,
              "X-RapidAPI-Host": apiHost,
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          const propAddr = (data.PropertyAddress as Record<string, string>) ?? {};
          const fullAddress = [
            propAddr.streetAddress,
            propAddr.city,
            `${propAddr.state ?? ""} ${propAddr.zipcode ?? ""}`.trim(),
          ]
            .filter(Boolean)
            .join(", ");

          propertyData = {
            price: data.Price ?? "N/A",
            zestimate: data.zestimate ?? "N/A",
            address: fullAddress || displayAddress,
          };
        }
      } catch {
        // Keep fallback property data
      }
    }

    // Forward to CRM webhook (best-effort, don't block response)
    const crmPayload = {
      name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
      phone: phone ?? "",
      address: propertyData.address,
      intent: "seller",
      priority: 70,
      zillow: propertyData,
      email: email,
      lead_source: "Home Valuation Tab",
      estimated_value: String(propertyData.zestimate),
    };

    // Fire-and-forget CRM push (only works if CRM is running)
    try {
      await fetch("http://localhost:8001/api/incoming-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(crmPayload),
        signal: AbortSignal.timeout(3000),
      });
    } catch {
      // CRM not available — that's fine
    }

    return NextResponse.json({
      message: "Lead processed successfully",
      property_data: propertyData,
    });
  } catch {
    return NextResponse.json(
      { detail: "Something went wrong" },
      { status: 500 }
    );
  }
}
