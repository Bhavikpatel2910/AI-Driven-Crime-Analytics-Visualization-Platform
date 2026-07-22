import { useState, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// Lightweight CSS tooltip (spec §68) — no dependency.
export function Tooltip({
  content,
  children,
  side = "top",
  className,
}: {
  content: ReactNode;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const t = useRef<number>();
  const show = () => {
    window.clearTimeout(t.current);
    t.current = window.setTimeout(() => setOpen(true), 120);
  };
  const hide = () => {
    window.clearTimeout(t.current);
    setOpen(false);
  };
  const pos =
    side === "top" ? "bottom-full left-1/2 -translate-x-1/2 mb-1.5"
    : side === "bottom" ? "top-full left-1/2 -translate-x-1/2 mt-1.5"
    : side === "left" ? "right-full top-1/2 -translate-y-1/2 mr-1.5"
    : "left-full top-1/2 -translate-y-1/2 ml-1.5";
  return (
    <span
      className={cn("relative inline-flex", className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {open && (
        <span
          role="tooltip"
          className={cn(
            "absolute z-50 w-max max-w-[240px] rounded-md border border-border bg-surface-elevated px-2.5 py-1.5 text-2xs leading-snug text-text-secondary shadow-card animate-fade-in pointer-events-none",
            pos
          )}
        >
          {content}
        </span>
      )}
    </span>
  );
}
