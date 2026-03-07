import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query") ?? "";

  if (query.length < 3) {
    return NextResponse.json({ results: [] });
  }

  const apiKey = process.env.RAPIDAPI_KEY;
  const apiHost = process.env.RAPIDAPI_HOST;

  if (!apiKey || !apiHost) {
    return NextResponse.json({ results: [] });
  }

  try {
    const res = await fetch(
      `https://${apiHost}/autocomplete?query=${encodeURIComponent(query)}`,
      {
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": apiHost,
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json({ results: [] });
    }

    const data = await res.json();
    const results = (data.results ?? [])
      .filter(
        (r: Record<string, unknown>) =>
          r.resultType === "Address" &&
          (r.metaData as Record<string, unknown> | undefined)?.zpid
      )
      .map((r: Record<string, unknown>) => ({
        display: r.display ?? "",
        zpid: (r.metaData as Record<string, unknown>)?.zpid,
      }));

    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ results: [] });
  }
}
