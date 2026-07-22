import {
  AlertTriangle,
  ShieldAlert,
  Eye,
  CircleCheck,
  Activity,
  CircleDot,
  type LucideIcon,
} from "lucide-react";
import type { Severity } from "@/types";
import { cn } from "@/lib/utils";

// Every critical status shows text + icon + colour (spec §69).
const map: Record<
  string,
  { label: string; cls: string; icon: LucideIcon }
> = {
  critical: { label: "Critical", cls: "text-critical bg-critical/12 border-critical/30", icon: ShieldAlert },
  high: { label: "High", cls: "text-warning bg-warning/12 border-warning/30", icon: AlertTriangle },
  watch: { label: "Watch", cls: "text-yellow-400 bg-yellow-400/10 border-yellow-400/25", icon: Eye },
  normal: { label: "Normal", cls: "text-cyan bg-cyan/10 border-cyan/25", icon: CircleDot },
  healthy: { label: "Healthy", cls: "text-success bg-success/12 border-success/30", icon: CircleCheck },
  review: { label: "Review", cls: "text-warning bg-warning/12 border-warning/30", icon: AlertTriangle },
  success: { label: "Success", cls: "text-success bg-success/12 border-success/30", icon: CircleCheck },
  denied: { label: "Denied", cls: "text-critical bg-critical/12 border-critical/30", icon: ShieldAlert },
  active: { label: "Active", cls: "text-cyan bg-cyan/10 border-cyan/25", icon: Activity },
  emerging: { label: "Emerging", cls: "text-intel bg-intel/12 border-intel/30", icon: Activity },
  resolved: { label: "Resolved", cls: "text-text-muted bg-surface-elevated border-border", icon: CircleCheck },
};

export function StatusBadge({
  kind,
  label,
  className,
  showIcon = true,
  size = "sm",
}: {
  kind: Severity | keyof typeof map | string;
  label?: string;
  className?: string;
  showIcon?: boolean;
  size?: "xs" | "sm";
}) {
  const cfg = map[kind] ?? map.normal;
  const Icon = cfg.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border font-semibold uppercase tracking-wide",
        size === "xs" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-2xs",
        cfg.cls,
        className
      )}
    >
      {showIcon && <Icon className={size === "xs" ? "h-2.5 w-2.5" : "h-3 w-3"} />}
      {label ?? cfg.label}
    </span>
  );
}
