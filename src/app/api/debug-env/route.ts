import { NextResponse } from "next/server";

export async function GET() {
  const hasKey = !!process.env.GEMINI_API_KEY;
  const keyPrefix = process.env.GEMINI_API_KEY?.slice(0, 8) ?? "not set";
  return NextResponse.json({ hasKey, keyPrefix });
}
