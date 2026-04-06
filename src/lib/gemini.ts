import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("NEXT_PUBLIC_GEMINI_API_KEY is not set in .env.local");
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function generateAIContent(
  prompt: string,
  context?: string
): Promise<string> {
  if (!genAI) {
    throw new Error("Gemini API key is not configured.");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const fullPrompt = context
    ? `Context (document text):\n"""\n${context}\n"""\n\n${prompt}`
    : prompt;

  const result = await model.generateContent(fullPrompt);
  const response = result.response;
  const text = response.text();

  return text;
}
