import { ArrowDownRight, ArrowUpRight, Minus, type LucideIcon } from "lucide-react";
import { Sparkline } from "./Sparkline";
import { Tooltip } from "./Tooltip";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "positive" | "warning" | "critical";

const toneRing: Record<Tone, string> = {
  neutral: "text-cyan",
  positive: "text-success",
  warning: "text-warning",
  critical: "text-critical",
};
const sparkColor: Record<Tone, string> = {
  neutral: "#22D3EE",
  positive: "#22C55E",
  warning: "#F59E0B",
  critical: "#EF4444",
};

// KPI card (spec §12) — icon, label, large stat, comparison, sparkline, tooltip.
export function KPICard({
  label,
  value,
  change,
  changeLabel,
  tone = "neutral",
  spark,
  icon: Icon,
  tip,
}: {
  label: string;
  value: string;
  change?: number;
  changeLabel?: string;
  tone?: Tone;
  spark?: number[];
  icon?: LucideIcon;
  tip?: string;
}) {
  const dir =
    change === undefined || change === 0 ? "flat" : change > 0 ? "up" : "down";
  // For delay, "down" is good — the tone already encodes good/bad, so colour the
  // delta by tone-awareness: positive tone shows green regardless of arrow.
  const deltaColor =
    tone === "positive"
      ? "text-success"
      : tone === "critical"
      ? "text-critical"
      : tone === "warning"
      ? "text-warning"
      : dir === "up"
      ? "text-success"
      : dir === "down"
      ? "text-critical"
      : "text-text-muted";
  const DeltaIcon = dir === "up" ? ArrowUpRight : dir === "down" ? ArrowDownRight : Minus;

  return (
    <div className="group rounded-xl border border-border bg-surface p-3.5 shadow-card transition-colors hover:border-border/80 hover:bg-surface-elevated/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-2xs font-medium uppercase tracking-wide text-text-muted">
          {Icon && <Icon className={cn("h-3.5 w-3.5", toneRing[tone])} />}
          {tip ? (
            <Tooltip content={tip}>
              <span className="cursor-help border-b border-dotted border-text-muted/40">
                {label}
              </span>
            </Tooltip>
          ) : (
            label
          )}
        </div>
      </div>
      <div className="mt-2 flex items-end justify-between gap-2">
        <div>
          <div className="tabular text-2xl font-bold leading-none text-text">{value}</div>
          {(change !== undefined || changeLabel) && (
            <div className={cn("mt-1.5 flex items-center gap-1 text-xs font-medium", deltaColor)}>
              <DeltaIcon className="h-3.5 w-3.5" />
              <span className="tabular">
                {change !== undefined && change !== 0
                  ? `${change > 0 ? "+" : ""}${change}%`
                  : ""}
              </span>
              <span className="text-text-muted font-normal">{changeLabel}</span>
            </div>
          )}
        </div>
      </div>
      {spark && (
        <div className="mt-2 -mx-1">
          <Sparkline data={spark} color={sparkColor[tone]} />
        </div>
      )}
    </div>
  );
}
