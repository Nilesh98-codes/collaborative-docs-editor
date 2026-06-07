import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Gemini API key is not configured on the server." },
      { status: 500 }
    );
  }

  const { prompt, context } = await req.json();

  if (!prompt || typeof prompt !== "string") {
    return NextResponse.json(
      { error: "A valid 'prompt' string is required." },
      { status: 400 }
    );
  }

  // Enforce input length limits
  const contextTruncated = typeof context === "string" && context.length > 2000;
  const truncatedContext = typeof context === "string" ? context.slice(0, 2000) : undefined;
  const truncatedPrompt = prompt.slice(0, 500);

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

  const fullPrompt = truncatedContext
    ? `Context (document text):\n"""\n${truncatedContext}\n"""\n\n${truncatedPrompt}`
    : truncatedPrompt;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
      generationConfig: { maxOutputTokens: 300 },
    });
    const text = result.response.text();

    if (!text) {
      return NextResponse.json(
        { error: "Empty response — content may have been filtered." },
        { status: 502 }
      );
    }

    return NextResponse.json({ text, contextTruncated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Gemini API error:", message);
    return NextResponse.json(
      { error: `Gemini API error: ${message}` },
      { status: 502 }
    );
  }
}
