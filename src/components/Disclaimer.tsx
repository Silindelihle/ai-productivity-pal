import { ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export function Disclaimer({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        "flex gap-3 rounded-2xl border border-border bg-muted p-4 text-sm text-foreground",
        className,
      )}
    >
      <ShieldAlert className="mt-0.5 size-5 shrink-0" />
      <p>
        <span className="font-semibold">Responsible AI: </span>
        AI-generated content may not always be accurate or appropriate for every situation. Always
        review and verify AI-generated information before using it for professional, workplace, or
        important decisions.
      </p>
    </aside>
  );
}
