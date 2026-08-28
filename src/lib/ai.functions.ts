import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "google/gemini-3.7-flash";

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

async function callGateway(messages: ChatMessage[], jsonMode = false) {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new Error("AI is not configured (missing API key).");

  const res = await fetch(GATEWAY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "X-Lovable-AIG-SDK": "fetch",
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      ...(jsonMode ? { response_format: { type: "json_object" } } : {}),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    if (res.status === 429)
      throw new Error("Too many requests right now — please try again in a moment.");
    if (res.status === 402)
      throw new Error("AI credits are exhausted. Please add credits to continue.");
    throw new Error(`AI request failed (${res.status}). ${detail.slice(0, 200)}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("The AI returned an empty response. Please try again.");
  return text;
}

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        brief: z.string().min(1).max(4000),
        tone: z.enum(["formal", "friendly", "persuasive"]),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const content = await callGateway([
      {
        role: "system",
        content:
          "You are an expert workplace communication assistant. Write a complete, ready-to-send email based on the user's brief. Start with a 'Subject: ...' line, then the body. Use placeholders like [Your Name] only when the information is genuinely unknown. Be specific to the brief — never generic filler. Plain text only, no markdown.",
      },
      {
        role: "user",
        content: `Tone: ${data.tone}\n\nBrief:\n${data.brief}`,
      },
    ]);
    return { email: content };
  });

const researchSchema = z.object({
  summary: z.string(),
  insights: z.array(z.string()).min(3).max(6),
  recommendations: z.array(z.string()).min(3).max(6),
});

export const generateResearch = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z.object({ input: z.string().min(1).max(12000) }).parse(data),
  )
  .handler(async ({ data }) => {
    const content = await callGateway(
      [
        {
          role: "system",
          content:
            'You are a sharp research analyst. Analyse the user\'s topic, question, or pasted content and respond with json using exactly this shape: {"summary": string (2-4 sentences), "insights": string[] (4 specific insights), "recommendations": string[] (4-5 concrete, actionable next steps)}. Be specific to the actual content — no generic advice.',
        },
        { role: "user", content: data.input },
      ],
      true,
    );

    let parsed: unknown;
    try {
      parsed = JSON.parse(content);
    } catch {
      throw new Error("The AI response could not be read. Please try again.");
    }
    return researchSchema.parse(parsed);
  });

export const generateChatReply = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        messages: z
          .array(
            z.object({
              role: z.enum(["user", "assistant"]),
              content: z.string().min(1).max(6000),
            }),
          )
          .min(1)
          .max(30),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const content = await callGateway([
      {
        role: "system",
        content:
          "You are a friendly, practical AI workplace productivity assistant. Help with emails, summaries, planning, prioritisation, meetings, and difficult conversations. Answer the specific question asked, keep replies concise (under 200 words), use short bullet lists when useful, and plain text only (no markdown symbols like ** or #).",
      },
      ...data.messages,
    ]);
    return { reply: content };
  });
