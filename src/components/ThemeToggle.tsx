import { useEffect, useState } from "react";
import { Palette } from "lucide-react";

const STORAGE_KEY = "app-theme";
type Theme = "indigo" | "blush";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("indigo");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === "blush" || stored === "indigo") setTheme(stored);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("theme-blush", theme === "blush");
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return { theme, setTheme };
}

export function ThemeToggle({ compact }: { compact?: boolean }) {
  const { theme, setTheme } = useTheme();
  const next = theme === "indigo" ? "blush" : "indigo";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      title={`Switch to ${next} theme`}
      aria-label={`Switch to ${next} theme`}
      className={`inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary ${
        compact ? "justify-center px-0 size-10" : ""
      }`}
    >
      <Palette className="size-4 shrink-0" />
      {!compact && <span className="capitalize">{next} theme</span>}
    </button>
  );
}
