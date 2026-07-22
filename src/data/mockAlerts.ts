import type { Alert, AlertType, CrimeMajor, Severity } from "@/types";
import { districts, districtByName } from "./districts";
import { seeded } from "@/lib/utils";

const rand = seeded(7);
const TYPES: AlertType[] = [
  "Crime Spike",
  "Emerging Hotspot",
  "Data Anomaly",
  "Cross-Jurisdiction Pattern",
  "Emerging Crime Pattern",
];

interface Seed {
  title: string;
  type: AlertType;
  severity: Severity;
  district: string;
  crime: CrimeMajor;
  observed: number;
  baseline: number;
}

const SEEDS: Seed[] = [
  { title: "Vehicle theft spike", type: "Crime Spike", severity: "critical", district: "Bengaluru City", crime: "Theft", observed: 142, baseline: 98.5 },
  { title: "Online fraud increase", type: "Emerging Crime Pattern", severity: "high", district: "Mysuru", crime: "Cheating / Fraud", observed: 88, baseline: 67 },
  { title: "Night burglary cluster", type: "Emerging Hotspot", severity: "watch", district: "Belagavi", crime: "Burglary", observed: 54, baseline: 46 },
  { title: "Chain snatching surge", type: "Crime Spike", severity: "high", district: "Dharwad", crime: "Theft", observed: 61, baseline: 44 },
  { title: "UPI fraud pattern", type: "Emerging Crime Pattern", severity: "high", district: "Bengaluru City", crime: "Cyber Crime", observed: 96, baseline: 70 },
  { title: "Missing GPS anomaly", type: "Data Anomaly", severity: "watch", district: "Kalaburagi", crime: "Other", observed: 33, baseline: 12 },
  { title: "Cross-district vehicle ring", type: "Cross-Jurisdiction Pattern", severity: "critical", district: "Tumakuru", crime: "Theft", observed: 40, baseline: 21 },
  { title: "Courier scam reports", type: "Emerging Crime Pattern", severity: "high", district: "Udupi", crime: "Cyber Crime", observed: 38, baseline: 24 },
  { title: "Drug possession cases up", type: "Crime Spike", severity: "watch", district: "Vijayapura", crime: "Drugs", observed: 29, baseline: 22 },
  { title: "House break cluster", type: "Emerging Hotspot", severity: "high", district: "Shivamogga", crime: "Burglary", observed: 47, baseline: 33 },
  { title: "Assault reports rising", type: "Crime Spike", severity: "watch", district: "Ballari", crime: "Assault", observed: 36, baseline: 30 },
  { title: "Thin BriefFacts anomaly", type: "Data Anomaly", severity: "watch", district: "Raichur", crime: "Other", observed: 51, baseline: 28 },
  { title: "Land fraud complaints", type: "Emerging Crime Pattern", severity: "high", district: "Hassan", crime: "Cheating / Fraud", observed: 27, baseline: 16 },
  { title: "Cross-state theft pattern", type: "Cross-Jurisdiction Pattern", severity: "high", district: "Bidar", crime: "Theft", observed: 34, baseline: 22 },
  { title: "Pickpocketing at markets", type: "Emerging Hotspot", severity: "watch", district: "Davanagere", crime: "Theft", observed: 41, baseline: 35 },
  { title: "Job fraud reports", type: "Emerging Crime Pattern", severity: "high", district: "Bengaluru City", crime: "Cheating / Fraud", observed: 58, baseline: 39 },
  { title: "Grievous hurt cluster", type: "Crime Spike", severity: "critical", district: "Kalaburagi", crime: "Assault", observed: 24, baseline: 12 },
  { title: "Invalid coordinates flagged", type: "Data Anomaly", severity: "watch", district: "Koppal", crime: "Other", observed: 19, baseline: 8 },
  { title: "Two-wheeler theft ring", type: "Cross-Jurisdiction Pattern", severity: "high", district: "Mandya", crime: "Theft", observed: 45, baseline: 31 },
  { title: "Cyber cell load spike", type: "Crime Spike", severity: "watch", district: "Mysuru", crime: "Cyber Crime", observed: 72, baseline: 63 },
  { title: "Repeat-offender co-occurrence", type: "Cross-Jurisdiction Pattern", severity: "high", district: "Bengaluru City", crime: "Burglary", observed: 15, baseline: 6 },
  { title: "Weekend burglary rise", type: "Emerging Hotspot", severity: "watch", district: "Tumakuru", crime: "Burglary", observed: 39, baseline: 33 },
];

const REASON_BANK: Record<AlertType, string[]> = {
  "Crime Spike": [
    "Incident count exceeded trailing baseline.",
    "Concentration increased in three neighbouring zones.",
    "Most incidents occurred between 20:00–23:00.",
  ],
  "Emerging Hotspot": [
    "Spatial cluster persisted over the last 14 days.",
    "Incident density rose above the district median.",
    "Recurring Friday/Saturday pattern detected.",
  ],
  "Data Anomaly": [
    "Field completeness dropped below the station baseline.",
    "Anomalous ratio of missing metadata detected.",
    "Requires data-quality review before analysis.",
  ],
  "Cross-Jurisdiction Pattern": [
    "Shared accused records observed across districts.",
    "Similar MO indicators across neighbouring stations.",
    "Movement pattern spans multiple jurisdictions.",
  ],
  "Emerging Crime Pattern": [
    "New modus operandi detected in recent FIRs.",
    "Keyword signature growing month-over-month.",
    "Pattern not present in prior comparison period.",
  ],
};

export const alerts: Alert[] = SEEDS.map((s, i) => {
  const d = districtByName(s.district) ?? districts[0];
  const change = +(((s.observed - s.baseline) / s.baseline) * 100).toFixed(1);
  const day = 18 - Math.floor(i / 3);
  return {
    id: `ALT-${String(i + 1).padStart(3, "0")}`,
    title: s.title,
    type: s.type,
    severity: s.severity,
    districtId: d.id,
    crimeMajor: s.crime,
    detectedAt: `2026-07-${String(day).padStart(2, "0")}T${String(
      8 + Math.floor(rand() * 12)
    ).padStart(2, "0")}:${String(Math.floor(rand() * 60)).padStart(2, "0")}:00`,
    observed: s.observed,
    baseline: s.baseline,
    zScore: +(1.4 + rand() * 1.5).toFixed(2),
    changePct: change,
    reviewed: i > 15,
    reasons: REASON_BANK[s.type],
  };
});

export const alertById = (id: string) => alerts.find((a) => a.id === id);
export { TYPES as alertTypes };
