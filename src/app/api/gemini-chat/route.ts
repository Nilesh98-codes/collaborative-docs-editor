import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Gemini API key is not configured on the server." },
      { status: 500 }
    );
  }

  let body: { messages?: ChatMessage[]; context?: string };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const { messages, context } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: "A non-empty 'messages' array is required." },
      { status: 400 }
    );
  }

  // Keep only the most recent 6 messages to limit token usage
  const recentMessages = messages.slice(-6);

  // Truncate document context to 2000 chars
  const contextTruncated = typeof context === "string" && context.length > 2000;
  const truncatedContext = typeof context === "string" ? context.slice(0, 2000) : undefined;

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

  // Build contents array for multi-turn conversation
  const contents: { role: "user" | "model"; parts: { text: string }[] }[] = [];

  // Inject document context as the first user turn if provided
  if (truncatedContext) {
    contents.push({
      role: "user",
      parts: [
        {
          text: `You are a helpful AI document assistant for a collaborative text editor called NoteSync. Be concise, friendly, and professional. Here is the document the user is working on:\n\n"""\n${truncatedContext}\n"""\n\nPlease keep this document context in mind when answering the user's questions.`,
        },
      ],
    });
    contents.push({
      role: "model",
      parts: [
        {
          text: "I've read through the document. How can I help you with it?",
        },
      ],
    });
  }

  // Append conversation history
  for (const msg of recentMessages) {
    contents.push({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text.slice(0, 500) }],
    });
  }

  try {
    const result = await model.generateContent({
      contents,
      generationConfig: { maxOutputTokens: 600 },
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
    console.error("Gemini Chat API error:", message);
    return NextResponse.json(
      { error: `Gemini API error: ${message}` },
      { status: 502 }
    );
  }
}
