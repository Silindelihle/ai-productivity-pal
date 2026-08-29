import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Mail,
  Search,
  MessageCircle,
  Menu,
  X,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { Disclaimer } from "./Disclaimer";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email-generator", label: "Smart Email Generator", icon: Mail },
  { to: "/research-assistant", label: "AI Research Assistant", icon: Search },
  { to: "/chatbot", label: "AI Chatbot", icon: MessageCircle },
] as const;

function NavLinks({ onNavigate, collapsed }: { onNavigate?: () => void; collapsed?: boolean }) {
  return (
    <nav className="flex flex-col gap-1">
      {navItems.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          onClick={onNavigate}
          title={collapsed ? label : undefined}
          aria-label={label}
          activeOptions={{ exact: to === "/" }}
          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
            collapsed ? "justify-center px-0" : ""
          }`}
          activeProps={{
            className: `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold bg-primary text-primary-foreground shadow-soft ${
              collapsed ? "justify-center px-0" : ""
            }`,
          }}
        >
          <Icon className="size-4 shrink-0" />
          {!collapsed && <span className="truncate">{label}</span>}
        </Link>
      ))}
    </nav>
  );
}

function Brand({ compact }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
        <Sparkles className="size-5" />
      </span>
      {!compact && (
        <div className="leading-tight">
          <p className="font-display text-sm font-bold">AI Workplace</p>
          <p className="text-xs text-muted-foreground">Productivity Assistant</p>
        </div>
      )}
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <aside
        className={`fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-sidebar-border bg-sidebar py-6 transition-all duration-200 lg:flex ${
          collapsed ? "w-20 px-3" : "w-72 px-5"
        }`}
      >
        <div className={collapsed ? "flex justify-center" : "flex items-center justify-between"}>
          <Brand compact={collapsed} />
        </div>

        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={`mt-6 inline-flex items-center gap-2 rounded-xl border border-sidebar-border bg-card px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary ${
            collapsed ? "justify-center" : ""
          }`}
        >
          {collapsed ? (
            <PanelLeftOpen className="size-4" />
          ) : (
            <>
              <PanelLeftClose className="size-4" /> Collapse
            </>
          )}
        </button>

        <div className="mt-6 flex-1">
          {!collapsed && (
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Workspace
            </p>
          )}
          <NavLinks collapsed={collapsed} />
        </div>

        <div className={collapsed ? "mb-3" : "mb-3"}>
          <ThemeToggle compact={collapsed} />
        </div>

        {!collapsed && (
          <div className="rounded-2xl border border-sidebar-border bg-muted p-4 text-xs text-foreground">
            <p className="font-semibold">Live AI</p>
            <p className="mt-1 text-muted-foreground">
              Responses are generated in real time — always review them.
            </p>
          </div>
        )}
      </aside>

      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-background/85 px-4 py-3 backdrop-blur lg:hidden">
        <Brand />
        <div className="flex items-center gap-2">
          <ThemeToggle compact />
          <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-xl border border-border bg-card text-foreground shadow-soft"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      {open && (
        <div className="sticky top-[65px] z-40 border-b border-border bg-card px-4 py-4 shadow-soft lg:hidden">
          <NavLinks onNavigate={() => setOpen(false)} />
        </div>
      )}

      <main className={collapsed ? "lg:pl-20" : "lg:pl-72"}>
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
          {children}
          <Disclaimer className="mt-10" />
        </div>
      </main>
    </div>
  );
}
