import { seeded } from "@/lib/utils";

const spark = (base: number, up: boolean, seed: number) => {
  const r = seeded(seed);
  return Array.from({ length: 12 }, (_, i) =>
    Math.round(base * (0.75 + (up ? i : 11 - i) / 40) + (r() - 0.5) * base * 0.12)
  );
};

// Command Center KPI row (spec §12) — six cards.
export const overviewKpis = [
  { id: "firs", label: "Total FIRs", value: "48,291", raw: 48291, change: 8.4, changeLabel: "vs previous period", tone: "neutral", spark: spark(3900, true, 1), tip: "Total First Information Reports registered statewide in the selected period." },
  { id: "active", label: "Active Cases", value: "12,847", raw: 12847, change: 2.1, changeLabel: "vs previous period", tone: "neutral", spark: spark(1000, true, 2), tip: "Cases currently under investigation or pending trial." },
  { id: "chargesheet", label: "Chargesheet Rate", value: "72.4%", raw: 72.4, change: 2.1, changeLabel: "vs previous period", tone: "positive", spark: spark(70, true, 3), tip: "Share of cases where a chargesheet has been filed." },
  { id: "delay", label: "Avg Reporting Delay", value: "18.6 hrs", raw: 18.6, change: -3.2, changeLabel: "hrs vs previous", tone: "positive", spark: spark(20, false, 4), tip: "Average time between incident occurrence and FIR registration." },
  { id: "hotspots", label: "Active Hotspots", value: "17", raw: 17, change: 0, changeLabel: "5 critical", tone: "warning", spark: spark(14, true, 5), tip: "Spatial-temporal clusters currently flagged for analyst attention." },
  { id: "alerts", label: "Critical Alerts", value: "8", raw: 8, change: 0, changeLabel: "3 new today", tone: "critical", spark: spark(6, true, 6), tip: "Open intelligence alerts at critical severity." },
] as const;
