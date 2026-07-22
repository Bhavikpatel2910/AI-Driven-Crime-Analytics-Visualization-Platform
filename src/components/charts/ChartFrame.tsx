import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Chart palette (spec §64): cyan/blue primary; red/amber/green reserved.
export const chartColors = {
  primary: "#22D3EE",
  secondary: "#3B82F6",
  intel: "#8B5CF6",
  critical: "#EF4444",
  warning: "#F59E0B",
  success: "#22C55E",
  grid: "#1E3448",
  axis: "#64748B",
  muted: "#94A3B8",
};

export const categoryPalette = [
  "#22D3EE", "#3B82F6", "#8B5CF6", "#F59E0B",
  "#22C55E", "#EF4444", "#0EA5E9", "#64748B",
];

export const axisProps = {
  tick: { fill: chartColors.axis, fontSize: 11 },
  tickLine: false,
  axisLine: { stroke: chartColors.grid },
};

// Dark tooltip used by all recharts charts (spec §64).
export function ChartTooltip({ active, payload, label, unit, formatter }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-surface-elevated px-3 py-2 shadow-card">
      {label !== undefined && (
        <div className="mb-1 text-2xs font-semibold text-text">{label}</div>
      )}
      <div className="space-y-0.5">
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex items-center gap-2 text-2xs">
            <span className="h-2 w-2 rounded-sm" style={{ background: p.color || p.fill }} />
            <span className="text-text-muted">{p.name}</span>
            <span className="tabular ml-auto font-semibold text-text">
              {formatter ? formatter(p.value) : p.value?.toLocaleString?.() ?? p.value}
              {unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Card frame around a chart with title/subtitle/actions (spec §64).
export function ChartFrame({
  title,
  subtitle,
  actions,
  children,
  className,
  bodyClassName,
  legend,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  legend?: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col rounded-xl border border-border bg-surface shadow-card", className)}>
      <div className="flex items-start justify-between gap-3 px-4 pt-3.5 pb-2">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-text">{title}</h3>
          {subtitle && <p className="mt-0.5 text-2xs text-text-muted">{subtitle}</p>}
        </div>
        {actions}
      </div>
      {legend && <div className="px-4 pb-1">{legend}</div>}
      <div className={cn("px-2 pb-3 pt-1", bodyClassName)}>{children}</div>
    </div>
  );
}

export function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-2xs text-text-secondary">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}
