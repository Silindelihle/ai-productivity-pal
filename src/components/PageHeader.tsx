import type { LucideIcon } from "lucide-react";

export function PageHeader({
  title,
  description,
  icon: Icon,
  eyebrow,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  eyebrow?: string;
}) {
  return (
    <header className="mb-8">
      <div className="flex items-start gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
          <Icon className="size-6" />
        </span>
        <div>
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>
          )}
          <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">{description}</p>
        </div>
      </div>
    </header>
  );
}
