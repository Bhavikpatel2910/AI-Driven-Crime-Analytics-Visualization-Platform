import { NavLink } from "react-router-dom";
import { ShieldHalf, ChevronsLeft, ChevronsRight } from "lucide-react";
import { navSections } from "./nav";
import { Tooltip } from "@/components/common";
import { cn } from "@/lib/utils";

// Sidebar (spec §7, §8) — sections, active accent, collapse.
export function Sidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-border bg-bg-sidebar transition-[width] duration-200",
        collapsed ? "w-[68px]" : "w-[248px]"
      )}
    >
      {/* Brand header */}
      <div className="flex h-16 items-center gap-2.5 border-b border-border px-4">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-cyan/30 bg-cyan/10">
          <ShieldHalf className="h-5 w-5 text-cyan" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <div className="truncate text-sm font-bold leading-tight text-text">
              Karnataka Crime Intelligence
            </div>
            <div className="truncate text-2xs text-text-muted">State Crime Records Bureau</div>
          </div>
        )}
      </div>

      {/* System status */}
      <div className={cn("px-4 py-2.5", collapsed && "px-0 flex justify-center")}>
        <div
          className={cn(
            "flex items-center gap-2 rounded-md border border-success/25 bg-success/[0.07] px-2 py-1.5",
            collapsed && "px-2"
          )}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          {!collapsed && (
            <span className="text-2xs font-semibold uppercase tracking-wide text-success">
              System Online
            </span>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-4 overflow-y-auto scrollbar-thin px-3 py-2">
        {navSections.map((section) => (
          <div key={section.title}>
            {!collapsed && (
              <div className="px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-text-muted/70">
                {section.title}
              </div>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const link = (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      cn(
                        "group relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
                        collapsed && "justify-center px-0",
                        isActive
                          ? "bg-cyan/[0.1] text-text"
                          : "text-text-secondary hover:bg-surface-elevated/60 hover:text-text"
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r bg-cyan" />
                        )}
                        <Icon
                          className={cn(
                            "h-4 w-4 shrink-0",
                            isActive ? "text-cyan" : "text-text-muted group-hover:text-text-secondary"
                          )}
                        />
                        {!collapsed && <span className="truncate">{item.label}</span>}
                      </>
                    )}
                  </NavLink>
                );
                return collapsed ? (
                  <Tooltip key={item.to} content={item.label} side="right">
                    {link}
                  </Tooltip>
                ) : (
                  link
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-border p-2">
        <button
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="flex w-full items-center justify-center gap-2 rounded-lg px-2 py-2 text-2xs font-medium text-text-muted hover:bg-surface-elevated hover:text-text-secondary"
        >
          {collapsed ? <ChevronsRight className="h-4 w-4" /> : <><ChevronsLeft className="h-4 w-4" /> Collapse</>}
        </button>
      </div>
    </aside>
  );
}
