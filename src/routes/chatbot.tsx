import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, Sparkles, User, Eraser } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { generateChatReply } from "@/lib/ai.functions";

export const Route = createFileRoute("/chatbot")({
  head: () => ({
    meta: [
      { title: "AI Workplace Chatbot — AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Chat with a workplace assistant for email help, summaries, productivity tips, and meeting preparation.",
      },
      { property: "og:title", content: "AI Workplace Chatbot" },
      {
        property: "og:description",
        content: "Instant, practical answers to everyday workplace questions.",
      },
    ],
  }),
  component: Chatbot,
});

type Message = { id: number; role: "user" | "assistant"; content: string };

const suggestions = [
  "Help me write a professional email.",
  "Summarise this information.",
  "Give me productivity tips.",
  "Help me prepare for a meeting.",
];

const greeting: Message = {
  id: 0,
  role: "assistant",
  content:
    "Hi! I'm your workplace assistant. Ask me about emails, summaries, planning, or productivity — or tap a suggestion below to get started.",
};

function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, typing]);

  const send = (text: string) => {
    const value = text.trim();
    if (!value || typing) return;
    setMessages((prev) => [...prev, { id: Date.now(), role: "user", content: value }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", content: buildChatReply(value) },
      ]);
      setTyping(false);
    }, 900);
  };

  return (
    <AppShell>
      <PageHeader
        eyebrow="Assistance"
        icon={MessageCircle}
        title="AI Workplace Chatbot"
        description="A quick place to think out loud about work — drafting, planning, prioritising, and preparing."
      />

      <section className="card-surface flex h-[62vh] min-h-[420px] flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="size-2 rounded-full bg-primary" />
            Workplace Assistant
          </div>
          <button
            type="button"
            onClick={() => setMessages([greeting])}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary"
          >
            <Eraser className="size-3.5" /> New chat
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-5">
          {messages.map((m) => (
            <div
              key={m.id}
              className={m.role === "user" ? "flex justify-end gap-3" : "flex gap-3"}
            >
              {m.role === "assistant" && (
                <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
                  <Sparkles className="size-4" />
                </span>
              )}
              <div
                className={
                  m.role === "user"
                    ? "max-w-[80%] rounded-2xl bg-gradient-primary px-4 py-3 text-sm leading-relaxed text-primary-foreground shadow-glow"
                    : "max-w-[80%] whitespace-pre-line rounded-2xl border border-border bg-card px-4 py-3 text-sm leading-relaxed shadow-soft"
                }
              >
                {m.content}
              </div>
              {m.role === "user" && (
                <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-secondary text-secondary-foreground">
                  <User className="size-4" />
                </span>
              )}
            </div>
          ))}
          {typing && (
            <div className="flex gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
                <Sparkles className="size-4" />
              </span>
              <div className="flex items-center gap-1.5 rounded-2xl border border-border bg-card px-4 py-3.5 shadow-soft">
                {[0, 150, 300].map((d) => (
                  <span
                    key={d}
                    className="size-2 animate-bounce rounded-full bg-primary/60"
                    style={{ animationDelay: `${d}ms` }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="border-t border-border px-4 py-4 sm:px-5">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
              >
                {s}
              </button>
            ))}
          </div>
          <form
            className="mt-3 flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a workplace question…"
              aria-label="Message"
              className="h-11 flex-1 rounded-xl border border-input bg-card px-4 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              aria-label="Send message"
              className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5 disabled:opacity-50"
            >
              <Send className="size-4" />
            </button>
          </form>
        </div>
      </section>
    </AppShell>
  );
}
