import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Copy, Eraser, Sparkles, ListChecks, Lightbulb, FileText } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useServerFn } from "@tanstack/react-start";
import { generateResearch } from "@/lib/ai.functions";
import { type ResearchResult } from "@/lib/mock-ai";

export const Route = createFileRoute("/research-assistant")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Paste a topic, question, or article and get an organised summary, key insights, and practical recommendations you can edit and copy.",
      },
      { property: "og:title", content: "AI Research Assistant" },
      {
        property: "og:description",
        content: "Summaries, insights, and recommendations for any workplace topic or document.",
      },
    ],
  }),
  component: ResearchAssistant,
});

function ResearchAssistant() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ResearchResult | null>(null);
  const [loading, setLoading] = useState(false);

  const runAnalyse = useServerFn(generateResearch);

  const analyse = async () => {
    if (!input.trim()) {
      toast.error("Add a topic, question, or some text to analyse.");
      return;
    }
    setLoading(true);
    try {
      const res = await runAnalyse({ data: { input } });
      setResult(res);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not analyse that.");
    } finally {
      setLoading(false);
    }
  };

  const copyResults = async () => {
    if (!result) return;
    const text = [
      "SUMMARY",
      result.summary,
      "",
      "KEY INSIGHTS",
      ...result.insights.map((i) => `• ${i}`),
      "",
      "RECOMMENDATIONS",
      ...result.recommendations.map((r) => `• ${r}`),
    ].join("\n");
    await navigator.clipboard.writeText(text);
    toast.success("Results copied to clipboard.");
  };

  const update = (patch: Partial<ResearchResult>) =>
    setResult((prev) => (prev ? { ...prev, ...patch } : prev));

  const updateList = (key: "insights" | "recommendations", index: number, value: string) =>
    setResult((prev) => {
      if (!prev) return prev;
      const list = [...prev[key]];
      list[index] = value;
      return { ...prev, [key]: list };
    });

  return (
    <AppShell>
      <PageHeader
        eyebrow="Research"
        icon={Search}
        title="AI Research Assistant"
        description="Drop in a topic, a question, or a block of content. You'll get a structured breakdown you can edit before sharing."
      />

      <section className="card-surface p-6">
        <Label htmlFor="topic" className="text-sm font-semibold">
          Topic, question, or content to analyse
        </Label>
        <Textarea
          id="topic"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. How can our support team reduce first-response time? — or paste an article, report, or meeting notes."
          className="mt-3 min-h-[170px] resize-y rounded-2xl bg-card"
        />
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={analyse}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5 disabled:opacity-70"
          >
            <Sparkles className={loading ? "size-4 animate-pulse" : "size-4"} />
            {loading ? "Analysing…" : "Analyse"}
          </button>
          <button
            type="button"
            onClick={() => {
              setInput("");
              setResult(null);
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            <Eraser className="size-4" /> Clear
          </button>
          <button
            type="button"
            onClick={copyResults}
            disabled={!result}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary disabled:opacity-50"
          >
            <Copy className="size-4" /> Copy Results
          </button>
        </div>
      </section>

      {result && (
        <div className="mt-6 grid gap-6">
          <section className="card-surface p-6">
            <div className="flex items-center gap-2.5">
              <FileText className="size-5 text-primary" />
              <h2 className="text-base font-semibold">Summary</h2>
            </div>
            <Textarea
              value={result.summary}
              onChange={(e) => update({ summary: e.target.value })}
              className="mt-3 min-h-[130px] resize-y rounded-2xl bg-card leading-relaxed"
            />
          </section>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="card-surface p-6">
              <div className="flex items-center gap-2.5">
                <Lightbulb className="size-5 text-primary" />
                <h2 className="text-base font-semibold">Key Insights</h2>
              </div>
              <div className="mt-3 space-y-3">
                {result.insights.map((insight, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="mt-2 grid size-6 shrink-0 place-items-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                      {i + 1}
                    </span>
                    <Textarea
                      value={insight}
                      onChange={(e) => updateList("insights", i, e.target.value)}
                      className="min-h-[70px] resize-y rounded-2xl bg-card text-sm leading-relaxed"
                    />
                  </div>
                ))}
              </div>
            </section>

            <section className="card-surface p-6">
              <div className="flex items-center gap-2.5">
                <ListChecks className="size-5 text-primary" />
                <h2 className="text-base font-semibold">Recommendations</h2>
              </div>
              <div className="mt-3 space-y-3">
                {result.recommendations.map((rec, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="mt-2 grid size-6 shrink-0 place-items-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                      {i + 1}
                    </span>
                    <Textarea
                      value={rec}
                      onChange={(e) => updateList("recommendations", i, e.target.value)}
                      className="min-h-[70px] resize-y rounded-2xl bg-card text-sm leading-relaxed"
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </AppShell>
  );
}
