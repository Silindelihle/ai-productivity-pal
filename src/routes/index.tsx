import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Search, MessageCircle, ArrowRight, Clock, Target, Wand2 } from "lucide-react";
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
      <section className="overflow-hidden rounded-3xl bg-gradient-hero p-6 shadow-soft sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent-foreground/80">
          Welcome back
        </p>
        <h1 className="mt-3 text-3xl font-bold text-accent-foreground sm:text-4xl">
          Your AI workplace productivity assistant
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-accent-foreground/85 sm:text-base">
          A calm workspace for the tasks that eat your day: writing professional emails, researching
          and summarising information, and getting quick answers to workplace questions. Pick a tool
          below and start in seconds.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/email-generator"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
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
        <h2 className="text-lg font-bold sm:text-xl">Your tools</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ to, icon: Icon, title, text }) => (
            <Link
              key={to}
              to={to}
              className="card-surface group flex flex-col p-6 transition-transform hover:-translate-y-1"
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
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
