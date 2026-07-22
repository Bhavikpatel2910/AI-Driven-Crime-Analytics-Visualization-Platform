import { useLocation } from "react-router-dom";
import { Search, Bell, HelpCircle, ChevronRight, CalendarDays, RefreshCw } from "lucide-react";
import { allNavItems } from "./nav";
import { Tooltip } from "@/components/common";

// Top header (spec §9) — breadcrumb, global search trigger, sync, alerts, profile.
export function TopHeader({
  onOpenSearch,
  onOpenNotifications,
  unread,
}: {
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  unread: number;
}) {
  const { pathname } = useLocation();
  const active =
    allNavItems.find((n) => n.to === pathname) ??
    allNavItems.find((n) => n.to !== "/" && pathname.startsWith(n.to)) ??
    allNavItems[0];
  const [section, page] = active.breadcrumb;

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-border bg-bg-secondary/80 px-4 backdrop-blur">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
        <span className="text-text-muted">{section}</span>
        <ChevronRight className="h-3.5 w-3.5 text-text-muted/60" />
        <span className="font-semibold text-text">{page}</span>
      </nav>

      {/* Global search trigger */}
      <button
        onClick={onOpenSearch}
        className="group ml-auto flex h-9 w-full max-w-md items-center gap-2.5 rounded-lg border border-border bg-surface px-3 text-sm text-text-muted transition-colors hover:border-cyan/30 hover:bg-surface-elevated"
      >
        <Search className="h-4 w-4" />
        <span className="truncate">Search FIR, district, police station, person ID…</span>
        <kbd className="ml-auto hidden items-center gap-0.5 rounded border border-border bg-bg px-1.5 py-0.5 text-2xs md:flex">
          ⌘ K
        </kbd>
      </button>

      {/* Right cluster */}
      <div className="flex items-center gap-1.5">
        <Tooltip content="Current data period">
          <div className="hidden items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-2xs text-text-secondary lg:flex">
            <CalendarDays className="h-3.5 w-3.5 text-text-muted" />
            Jul 2026
          </div>
        </Tooltip>
        <Tooltip content="Data last synchronised">
          <div className="hidden items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-2xs text-text-secondary xl:flex">
            <RefreshCw className="h-3.5 w-3.5 text-success" />
            Last sync: 2 min ago
          </div>
        </Tooltip>

        <Tooltip content="Notifications">
          <button
            onClick={onOpenNotifications}
            aria-label={`Notifications, ${unread} unread`}
            className="relative grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface text-text-secondary hover:bg-surface-elevated hover:text-text"
          >
            <Bell className="h-4 w-4" />
            {unread > 0 && (
              <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-critical px-1 text-[9px] font-bold text-white">
                {unread}
              </span>
            )}
          </button>
        </Tooltip>

        <Tooltip content="Help">
          <button aria-label="Help" className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface text-text-secondary hover:bg-surface-elevated hover:text-text">
            <HelpCircle className="h-4 w-4" />
          </button>
        </Tooltip>

        <div className="ml-1 flex items-center gap-2 rounded-lg border border-border bg-surface py-1 pl-1 pr-2.5">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-brand/20 text-xs font-bold text-brand">
            SA
          </div>
          <div className="hidden sm:block">
            <div className="text-xs font-semibold leading-tight text-text">State Analyst</div>
            <div className="text-[10px] text-text-muted">SCRB</div>
          </div>
        </div>
      </div>
    </header>
  );
}
