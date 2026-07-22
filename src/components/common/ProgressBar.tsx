import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  max = 100,
  color = "#22D3EE",
  className,
  height = 6,
}: {
  value: number;
  max?: number;
  color?: string;
  className?: string;
  height?: number;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div
      className={cn("w-full overflow-hidden rounded-full bg-surface-elevated", className)}
      style={{ height }}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
    >
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  );
}
