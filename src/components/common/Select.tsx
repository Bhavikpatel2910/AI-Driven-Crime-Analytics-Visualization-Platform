import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Compact select styled for the dark command-center theme (spec §63).
export function Select({
  value,
  onChange,
  options,
  label,
  className,
  ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  label?: string;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <label className={cn("relative inline-flex items-center", className)}>
      {label && (
        <span className="mr-1.5 text-2xs font-medium uppercase tracking-wide text-text-muted">
          {label}
        </span>
      )}
      <span className="relative">
        <select
          aria-label={ariaLabel ?? label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 appearance-none rounded-lg border border-border bg-surface-elevated pl-2.5 pr-7 text-xs font-medium text-text focus:outline-none focus:ring-2 focus:ring-cyan/50 cursor-pointer"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value} className="bg-surface">
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-muted" />
      </span>
    </label>
  );
}

// Segmented control for range toggles (7D | 30D | 90D | 1Y).
export function Segmented({
  value,
  onChange,
  options,
  ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  ariaLabel?: string;
}) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="inline-flex rounded-lg border border-border bg-surface-elevated p-0.5"
    >
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          aria-pressed={value === o}
          className={cn(
            "rounded-md px-2.5 py-1 text-2xs font-semibold transition-colors",
            value === o
              ? "bg-cyan/15 text-cyan"
              : "text-text-muted hover:text-text-secondary"
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
