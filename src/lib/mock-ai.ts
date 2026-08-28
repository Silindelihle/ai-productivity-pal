export type Tone = "formal" | "friendly" | "persuasive";

export type ResearchResult = {
  summary: string;
  insights: string[];
  recommendations: string[];
};

function firstSentence(text: string) {
  const clean = text.replace(/\s+/g, " ").trim();
  const match = clean.match(/^(.{0,140}?)(?:[.!?]|$)/);
  return (match?.[1] ?? clean).trim();
}

function subjectFrom(text: string) {
  const s = firstSentence(text);
  const words = s.split(" ").slice(0, 9).join(" ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export function buildEmail(brief: string, tone: Tone): string {
  const topic = firstSentence(brief) || "the item below";
  const subject = subjectFrom(brief) || "Quick update";

  if (tone === "friendly") {
    return `Subject: ${subject}

Hi there,

Hope your week is going well! I wanted to reach out about ${topic.toLowerCase()}.

Here's where things stand: I've pulled together the details on my side, and I think a quick alignment will keep everything moving smoothly. If it's easier to talk it through, I'm happy to jump on a short call whenever suits you.

Just let me know what works best — no rush, and thanks so much for your help with this.

Warm regards,
[Your Name]
[Your Role] · [Company]`;
  }

  if (tone === "persuasive") {
    return `Subject: ${subject}

Hello,

I'm writing about ${topic.toLowerCase()} — and I believe acting on it now gives us a clear advantage.

Three reasons it's worth your attention:
1. It removes a bottleneck that currently slows the wider team down.
2. The effort required is small compared with the time it gives back each week.
3. Moving early keeps us ahead of the deadline instead of reacting to it.

If you're open to it, I'd like to confirm the next step this week so we can start seeing the benefit immediately. Could you let me know if you're happy to proceed, or share what you'd need to feel confident?

Thank you for considering it — I'm confident this is the right call.

Best regards,
[Your Name]
[Your Role] · [Company]`;
  }

  return `Subject: ${subject}

Dear [Recipient],

I hope this message finds you well. I am writing regarding ${topic.toLowerCase()}.

To summarise the position: the relevant details have been reviewed and prepared on our side, and your input is required before we proceed to the next stage. I have outlined the key points below so that you have everything needed to respond efficiently.

Should you require any further information or clarification, please do not hesitate to contact me. I would be grateful for your response by the end of the week so that we can remain on schedule.

Thank you for your time and assistance.

Kind regards,
[Your Name]
[Your Role] · [Company]`;
}

export function buildResearch(input: string): ResearchResult {
  const topic = firstSentence(input) || "the submitted material";
  const short = topic.toLowerCase();

  return {
    summary: `Your input on ${short} centres on a practical workplace problem with a clear operational cost. Reviewing the content, the core theme is that outcomes currently depend on manual coordination rather than a repeatable process, which makes results inconsistent and hard to measure. There is enough signal here to act on: the goal is well defined, the constraints are known, and the main gap is a documented workflow with an owner and a measurable target.`,
    insights: [
      `The main driver behind ${short} is process friction rather than effort — people are already doing the work, but repeating steps that could be standardised.`,
      "Information is spread across several places, so time is lost re-finding context instead of making decisions.",
      "There is no single agreed success metric, which makes it difficult to tell whether changes are actually helping.",
      "Small, well-scoped changes are likely to outperform a large redesign, because adoption is the real constraint.",
    ],
    recommendations: [
      "Write a one-page version of the current process, then mark every step that is manual, repeated, or waiting on someone else.",
      "Pick one measurable target (for example turnaround time or number of handoffs) and baseline it this week.",
      "Automate or template the two most repeated steps first, and reuse the AI tools here for drafting and summarising.",
      "Assign a single owner and review progress at a fixed fortnightly checkpoint to keep momentum without extra meetings.",
      "Verify any figures, quotes, or claims against the original source before including them in a decision document.",
    ],
  };
}

export function buildChatReply(message: string): string {
  const m = message.toLowerCase();

  if (m.includes("email") || m.includes("write") || m.includes("draft")) {
    return `Happy to help with that email. A structure that works nearly every time:

1. Subject line — state the outcome, not the topic ("Approval needed: Q3 budget").
2. First line — why you're writing, in one sentence.
3. Middle — the context or options, kept to three short points.
4. Close — one clear ask with a date.

Tell me the recipient, the goal, and the tone you want, and I'll draft it. The Smart Email Generator can also produce a full formal, friendly, or persuasive version instantly.`;
  }

  if (m.includes("summar") || m.includes("analyse") || m.includes("analyze") || m.includes("report")) {
    return `Paste the text and I'll break it down into a summary, the key insights, and what I'd recommend doing next.

When summarising for colleagues, aim for: what changed, why it matters, and what you need from them. Anything longer usually gets skimmed.

For longer documents, the AI Research Assistant gives you an organised, editable version you can copy straight into your notes.`;
  }

  if (m.includes("productiv") || m.includes("focus") || m.includes("time") || m.includes("tip")) {
    return `Four habits that reliably move the needle:

• Choose your top three outcomes before opening your inbox.
• Block two 90-minute focus sessions and treat them as meetings.
• Batch messages into two or three fixed windows instead of all day.
• Close each day with a five-minute review and tomorrow's first task written down.

Pick one to try this week — stacking all four at once rarely sticks.`;
  }

  if (m.includes("meeting") || m.includes("prepare") || m.includes("agenda") || m.includes("present")) {
    return `Let's get you ready. A tight prep checklist:

• Purpose: decision, update, or brainstorm? Say it in the invite.
• Agenda: three items max, each with a time box and an owner.
• Pre-read: share numbers or documents beforehand so the room can discuss, not catch up.
• Questions: write the two hardest ones you might be asked, and your answers.
• Close: agree actions, owners, and dates before anyone leaves.

Tell me the meeting topic and attendees and I'll sketch the agenda for you.`;
  }

  if (m.includes("difficult") || m.includes("feedback") || m.includes("conflict") || m.includes("say no")) {
    return `For sensitive conversations, keep it specific and forward-looking:

• Observation: what happened, factually.
• Impact: the effect it had on the work or the team.
• Request: what you'd like to see next time.
• Invitation: ask for their view before agreeing next steps.

If you need to decline something, offer a clear alternative — "I can't take this on this week, but I could start it Monday" lands far better than a flat no.`;
  }

  return `Good question. Here's how I'd approach ${firstSentence(message).toLowerCase() || "that"}:

• Clarify the outcome you actually need, and by when.
• List what you already have versus what's missing.
• Take the smallest next step that creates progress today.
• Share a short update so nobody has to chase you for it.

Want me to turn this into an email, a summary, or a meeting agenda? Just say which.`;
}
