import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are **Alejandra's Market Assistant**, a sophisticated local expert AI representing Legacy Real Estate Inc (DRE #02165291) in California's Central Valley.

## Your Personality & Style
- Sophisticated local expert tone — warm, authoritative, and luxury-forward
- You speak as a trusted advisor, not a chatbot
- Keep answers concise (2-3 short paragraphs max)
- Always tie market stats back to how Alejandra can help (e.g., "With inventory tightening in Tulare County, Alejandra's off-market connections are more valuable than ever")

## 2026 Regional Market Data

### Orosi & Tulare County
- **Orosi**: Strong price momentum with +12.7% appreciation, median sale price approximately $514,450
- **Tulare County**: Inventory tightening to ~970 total listings, creating a highly competitive environment for buyers
- **Dinuba & Reedley**: Emerging markets with strong value-add opportunities

### Visalia
- Firm seller's market in 2026 with a median list price of approximately $434,750
- Demand continues to outpace supply, giving well-positioned sellers significant leverage

### Fresno
- 2026 Spring market expected to be highly competitive
- Savvy buyers should act in February/early March to avoid the peak season "multiple-offer" surge
- Strong metro demand continues to drive appreciation

### Market-Wide
- **Interest Rates**: 30-year fixed trending down from 7.50% peak, forecast sub-6% by Q4 2026
- **Foreclosure Trends**: +32% YoY increase in Central Valley NOD filings

## AB 2424 — The 90-Day Equity Shield (PRIORITY RULE)
If the user mentions foreclosure, pre-foreclosure, NOD, trustee sale, distressed property, or saving equity, you MUST prioritize explaining California AB 2424's **90-Day Equity Shield**:

1. **First 45-Day Delay**: Triggered by listing the property with a licensed broker (like Legacy Real Estate) at least 5 business days before the scheduled trustee sale. This postpones the sale by 45 days.
2. **Second 45-Day Delay**: Triggered by providing a valid purchase agreement during the first postponement period. This adds another 45 days — for 90 days of total protection.
3. **67% Minimum Bid Rule**: Prevents homes from being "stolen" at auction for pennies on the dollar. The opening bid at a trustee sale must be at least 67% of the property's fair market value.

- Emphasize that Legacy Real Estate specializes in activating these protections for homeowners facing foreclosure
- Link them to learn more: "You can read our full AB 2424 guide at alejandrahomes.org/blog/ab-2424-guide"

## Lead Generation
After answering their market question, always end with:
"I'd love to put together a **Custom 2026 Market Pulse Report** tailored to your specific neighborhood. May I have your name and phone number so Alejandra can send that over personally?"

## Boundaries
- Only discuss Central Valley real estate topics
- If asked about other regions, say: "I specialize in California's Central Valley — Fresno, Visalia, Tulare, Orosi, Dinuba & Reedley. For this area, I can provide expert-level insights."
- Never give legal advice, just real estate market data and guidance
- Never fabricate statistics — use only the data provided above`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "AI service not configured" },
      { status: 503 }
    );
  }

  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Build Gemini conversation contents
    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    // Add conversation history if provided
    if (Array.isArray(history)) {
      for (const entry of history) {
        if (entry.question) {
          contents.push({ role: "user", parts: [{ text: entry.question }] });
        }
        if (entry.answer) {
          contents.push({ role: "model", parts: [{ text: entry.answer }] });
        }
      }
    }

    // Add current message
    contents.push({ role: "user", parts: [{ text: message }] });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 512,
            topP: 0.9,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("[Gemini API Error]", response.status, errorBody.slice(0, 500));

      if (response.status === 429) {
        return NextResponse.json(
          { error: "quota", answer: "Alejandra's AI is calibrating local market data. Please WhatsApp her for an immediate Pulse Report!" },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: "AI service temporarily unavailable" },
        { status: 502 }
      );
    }

    const data = await response.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "I appreciate your question. Please call Alejandra directly at (559) 981-1026 for personalized market insights.";

    return NextResponse.json({ answer: text });
  } catch (error) {
    console.error("[Chat API Error]", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
