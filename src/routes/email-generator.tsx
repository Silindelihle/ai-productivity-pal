import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Copy, Eraser, RefreshCw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useServerFn } from "@tanstack/react-start";
import { generateEmail } from "@/lib/ai.functions";
import { type Tone } from "@/lib/mock-ai";

export const Route = createFileRoute("/email-generator")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Describe your intent, choose a formal, friendly, or persuasive tone, and generate a polished workplace email you can edit and copy.",
      },
      { property: "og:title", content: "Smart Email Generator" },
      {
        property: "og:description",
        content: "Generate professional workplace emails in seconds with a tone that fits.",
      },
    ],
  }),
  component: EmailGenerator,
});

const tones: { value: Tone; label: string; hint: string }[] = [
  { value: "formal", label: "Formal", hint: "Polished and professional" },
  { value: "friendly", label: "Friendly", hint: "Warm and approachable" },
  { value: "persuasive", label: "Persuasive", hint: "Confident and convincing" },
];

function EmailGenerator() {
  const [brief, setBrief] = useState("");
  const [tone, setTone] = useState<Tone>("formal");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const runGenerate = useServerFn(generateEmail);

  const generate = async () => {
    if (!brief.trim()) {
      toast.error("Add a few details about the email first.");
      return;
    }
    setLoading(true);
    try {
      const res = await runGenerate({ data: { brief, tone } });
      setEmail(res.email);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not generate the email.");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    if (!email) return;
    await navigator.clipboard.writeText(email);
    toast.success("Email copied to clipboard.");
  };

  const clear = () => {
    setBrief("");
    setEmail("");
  };

  return (
    <AppShell>
      <PageHeader
        eyebrow="Writing"
        icon={Mail}
        title="Smart Email Generator"
        description="Tell the assistant what the email needs to achieve, pick a tone, and get a ready-to-send draft you can edit."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card-surface p-6">
          <Label htmlFor="brief" className="text-sm font-semibold">
            What is this email about?
          </Label>
          <Textarea
            id="brief"
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            placeholder="e.g. Ask the design team for updated mockups before Friday's client review, and offer to meet Wednesday if helpful."
            className="mt-3 min-h-[160px] resize-y rounded-2xl bg-card"
          />

          <p className="mt-6 text-sm font-semibold">Tone</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {tones.map((t) => {
              const active = tone === t.value;
              return (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setTone(t.value)}
                  aria-pressed={active}
                  className={
                    active
                      ? "rounded-2xl bg-gradient-primary p-3 text-left text-primary-foreground shadow-glow"
                      : "rounded-2xl border border-border bg-card p-3 text-left transition-colors hover:bg-secondary"
                  }
                >
                  <span className="block text-sm font-semibold">{t.label}</span>
                  <span
                    className={
                      active
                        ? "mt-0.5 block text-xs opacity-85"
                        : "mt-0.5 block text-xs text-muted-foreground"
                    }
                  >
                    {t.hint}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={generate}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5 disabled:opacity-70"
            >
              <Sparkles className={loading ? "size-4 animate-pulse" : "size-4"} />
              {loading ? "Generating…" : "Generate Email"}
            </button>
            <button
              type="button"
              onClick={clear}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              <Eraser className="size-4" /> Clear
            </button>
          </div>
        </section>

        <section className="card-surface flex flex-col p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold">Generated email</h2>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground capitalize">
              {tone}
            </span>
          </div>
          <Textarea
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your generated email will appear here — fully editable before you send it."
            className="mt-3 min-h-[320px] flex-1 resize-y rounded-2xl bg-card font-sans leading-relaxed"
          />
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={copy}
              disabled={!email}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary disabled:opacity-50"
            >
              <Copy className="size-4" /> Copy
            </button>
            <button
              type="button"
              onClick={generate}
              disabled={loading || !brief.trim()}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary disabled:opacity-50"
            >
              <RefreshCw className="size-4" /> Regenerate
            </button>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
