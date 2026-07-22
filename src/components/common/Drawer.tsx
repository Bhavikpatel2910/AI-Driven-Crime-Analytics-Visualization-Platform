import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// Right-side drawer (spec §16, §36, §40, §58). Keyboard-friendly: Esc closes.
export function Drawer({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  width = 420,
}: {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  width?: number;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={typeof title === "string" ? title : "Details"}>
      <div className="absolute inset-0 bg-black/50 animate-fade-in" onClick={onClose} />
      <div
        className="absolute right-0 top-0 flex h-full flex-col border-l border-border bg-bg-secondary shadow-2xl animate-slide-in-right"
        style={{ width: `min(${width}px, 92vw)` }}
      >
        <div className="flex items-start justify-between gap-3 border-b border-border px-4 py-3">
          <div className="min-w-0">
            <div className="text-sm font-semibold text-text">{title}</div>
            {subtitle && <div className="mt-0.5 text-2xs text-text-muted">{subtitle}</div>}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-border text-text-muted hover:text-text hover:bg-surface-elevated"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className={cn("flex-1 overflow-y-auto scrollbar-thin px-4 py-4")}>{children}</div>
        {footer && <div className="border-t border-border px-4 py-3">{footer}</div>}
      </div>
    </div>
  );
}

export function DrawerMetric({
  label,
  value,
  mono,
}: {
  label: string;
  value: ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface px-3 py-2">
      <div className="text-2xs uppercase tracking-wide text-text-muted">{label}</div>
      <div className={cn("mt-0.5 text-sm font-semibold text-text", mono && "font-mono")}>
        {value}
      </div>
    </div>
  );
}
