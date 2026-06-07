export interface AIContentResult {
  text: string;
  contextTruncated: boolean;
}

export async function generateAIContent(
  prompt: string,
  context?: string
): Promise<AIContentResult> {
  const res = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, context }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to generate AI content.");
  }

  return {
    text: data.text,
    contextTruncated: data.contextTruncated ?? false,
  };
}
