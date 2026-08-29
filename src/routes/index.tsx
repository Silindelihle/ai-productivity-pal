import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  Search,
  MessageCircle,
  ArrowRight,
  Clock,
  Target,
  Wand2,
  TrendingUp,
  TrendingDown,
  Sparkles,
  FileText,
  Timer,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Workplace Productivity Assistant — Dashboard" },
      {
        name: "description",
        content:
          "Write emails faster, research smarter, and get workplace answers with a suite of AI productivity tools built for professionals.",
      },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content: "AI tools for professional emails, research summaries, and workplace assistance.",
      },
    ],
  }),
  component: Dashboard,
});

const metrics = [
  { label: "AI requests", value: "1,284", delta: "+18%", up: true, icon: Sparkles },
  { label: "Emails drafted", value: "342", delta: "+9%", up: true, icon: Mail },
  { label: "Docs analysed", value: "128", delta: "+24%", up: true, icon: FileText },
  { label: "Hours saved", value: "46.5", delta: "-3%", up: false, icon: Timer },
];

const usage = [
  { week: "W1", value: 180 },
  { week: "W2", value: 215 },
  { week: "W3", value: 142 },
  { week: "W4", value: 240 },
  { week: "W5", value: 198 },
  { week: "W6", value: 260 },
];

const features = [
  {
    to: "/email-generator" as const,
    icon: Mail,
    title: "Smart Email Generator",
    text: "Turn a few notes into a polished email in a formal, friendly, or persuasive tone.",
  },
  {
    to: "/research-assistant" as const,
    icon: Search,
    title: "AI Research Assistant",
    text: "Paste a topic or article and get a summary, key insights, and clear recommendations.",
  },
  {
    to: "/chatbot" as const,
    icon: MessageCircle,
    title: "AI Workplace Chatbot",
    text: "Ask everyday work questions and get instant, practical guidance in a chat.",
  },
];

const benefits = [
  {
    icon: Clock,
    title: "Save hours each week",
    text: "Drafting, summarising, and formatting happen in seconds instead of afternoons.",
  },
  {
    icon: Target,
    title: "Stay consistent",
    text: "Every message keeps a professional tone that matches your workplace standards.",
  },
  {
    icon: Wand2,
    title: "Think, don't type",
    text: "Spend your energy on decisions while the assistant handles the busywork.",
  },
];

function Dashboard() {
  return (
    <AppShell>
      <section className="overflow-hidden rounded-3xl bg-muted p-6 shadow-soft sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Welcome back
        </p>
        <h1 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
          Your AI workplace productivity assistant
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          A calm workspace for the tasks that eat your day: writing professional emails, researching
          and summarising information, and getting quick answers to workplace questions. Pick a tool
          below and start in seconds.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/email-generator"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
          >
            Draft an email <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/chatbot"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground shadow-soft transition-colors hover:bg-secondary"
          >
            Ask the chatbot
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-lg font-bold sm:text-xl">Analytics overview</h2>
          <span className="text-xs font-medium text-muted-foreground">Last 30 days</span>
        </div>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map(({ label, value, delta, up, icon: Icon }) => (
            <article key={label} className="card-surface p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">{label}</p>
                <span className="grid size-9 place-items-center rounded-xl bg-secondary text-primary">
                  <Icon className="size-4" />
                </span>
              </div>
              <p className="mt-4 text-4xl font-bold tracking-tight tabular-nums sm:text-5xl">
                {value}
              </p>
              <p
                className={
                  up
                    ? "mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary"
                    : "mt-3 inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground"
                }
              >
                {up ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
                {delta}
                <span className="font-normal text-muted-foreground">vs last month</span>
              </p>
            </article>
          ))}
        </div>

        <div className="card-surface mt-5 p-6">
          <div className="flex items-end justify-between gap-4">
            <h3 className="text-sm font-semibold">Weekly AI usage</h3>
            <span className="text-xs text-muted-foreground">requests per week</span>
          </div>
          <div className="mt-6 flex h-40 items-end gap-2 sm:gap-3">
            {usage.map((u) => (
              <div key={u.week} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <div
                  className="w-full shrink-0 rounded-t-lg bg-primary/85"
                  style={{ height: `${Math.round((u.value / 260) * 130)}px` }}
                  title={`${u.week}: ${u.value}`}
                />

                <span className="text-[11px] text-muted-foreground">{u.week}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold sm:text-xl">Your tools</h2>

        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ to, icon: Icon, title, text }) => (
            <Link
              key={to}
              to={to}
              className="card-surface group flex flex-col p-6 transition-transform hover:-translate-y-1"
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Open tool
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 card-surface p-6 sm:p-8">
        <h2 className="text-lg font-bold sm:text-xl">How these tools lift your productivity</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div key={title}>
              <span className="grid size-10 place-items-center rounded-xl bg-secondary text-secondary-foreground">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-3 text-sm font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
