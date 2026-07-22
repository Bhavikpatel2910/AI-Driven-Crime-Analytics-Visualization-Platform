import type {
  CrimeMajor,
  Incident,
  Severity,
  TrendPoint,
} from "@/types";
import { districts } from "./districts";
import { seeded } from "@/lib/utils";

// ---- Categories & subtypes (spec §61) --------------------------------------
export const crimeMajors: CrimeMajor[] = [
  "Theft",
  "Assault",
  "Burglary",
  "Murder",
  "Cheating / Fraud",
  "Drugs",
  "Cyber Crime",
  "Other",
];

export const crimeMinors: Record<CrimeMajor, string[]> = {
  Theft: ["Vehicle Theft", "Pickpocketing", "Chain Snatching"],
  Assault: ["Hurt", "Grievous Hurt", "Affray"],
  Burglary: ["House Break", "Shop Break", "Night Burglary"],
  Murder: ["Murder", "Attempt to Murder"],
  "Cheating / Fraud": ["Online Fraud", "Job Fraud", "Land Fraud"],
  Drugs: ["Possession", "Trafficking"],
  "Cyber Crime": ["UPI Fraud", "Courier Scam", "Fake Merchant Payment"],
  Other: ["Missing Person", "Public Nuisance"],
};

export const severityColor: Record<Severity, string> = {
  critical: "#EF4444",
  high: "#F59E0B",
  watch: "#EAB308",
  normal: "#22D3EE",
};

export const severityLabel: Record<Severity, string> = {
  critical: "Critical",
  high: "High",
  watch: "Watch",
  normal: "Normal",
};

// Category distribution (spec §19) — count + derived percentage.
const CATEGORY_COUNTS: Record<CrimeMajor, number> = {
  Theft: 14208,
  Assault: 7642,
  "Cheating / Fraud": 6981,
  Burglary: 5820,
  Drugs: 4110,
  "Cyber Crime": 3944,
  Murder: 1240,
  Other: 4346,
};
const total = Object.values(CATEGORY_COUNTS).reduce((a, b) => a + b, 0);
export const crimeDistribution = crimeMajors
  .map((m) => ({
    name: m,
    value: CATEGORY_COUNTS[m],
    pct: +((CATEGORY_COUNTS[m] / total) * 100).toFixed(1),
  }))
  .sort((a, b) => b.value - a.value);

// ---- Incidents (spec §60: 100+ samples) ------------------------------------
const BRIEF: Record<string, string> = {
  "Vehicle Theft":
    "Two-wheeler reported missing from a residential parking area; no eyewitness at registration.",
  "House Break":
    "Forced entry reported at a residence during occupants' absence; household items reported missing.",
  "Online Fraud":
    "Complainant reports unauthorised transaction following a fraudulent link received over messaging.",
  "UPI Fraud":
    "Complainant reports funds debited after sharing a one-time verification code with an unknown caller.",
  Possession:
    "Contraband recovered during a routine check; seizure recorded and sent for analysis.",
  "Chain Snatching":
    "Complainant reports snatching by a passing motorcyclist along a market road.",
};
const briefFor = (minor: string) =>
  BRIEF[minor] ??
  "Complaint registered based on information received; investigation initiated as per procedure.";

const STATUSES: Incident["status"][] = [
  "Under Investigation",
  "Chargesheet Filed",
  "Pending Trial",
  "Closed",
];
const SECTION_POOL = ["BNS 303", "BNS 305", "BNS 318", "BNS 331", "BNS 115", "NDPS 20"];

const rand = seeded(2026);
function pick<T>(arr: T[]): T {
  return arr[Math.floor(rand() * arr.length)];
}

export const incidents: Incident[] = Array.from({ length: 140 }, (_, i) => {
  // Weight towards top districts for believable concentration.
  const dIdx =
    rand() < 0.34 ? 0 : Math.floor(rand() * Math.min(12, districts.length));
  const d = districts[dIdx];
  const major = pick(crimeMajors);
  const minor = pick(crimeMinors[major]);
  const day = 1 + Math.floor(rand() * 22);
  const hour = rand() < 0.4 ? 20 + Math.floor(rand() * 4) : Math.floor(rand() * 24);
  const min = Math.floor(rand() * 60);
  const incidentAt = `2026-07-${String(day).padStart(2, "0")}T${String(
    hour
  ).padStart(2, "0")}:${String(min).padStart(2, "0")}:00`;
  const regDelayH = 1 + Math.floor(rand() * 40);
  const regDate = new Date(new Date(incidentAt).getTime() + regDelayH * 3600e3);
  const grave =
    major === "Murder" || major === "Drugs" || (major === "Assault" && rand() < 0.5);
  const sectionCount = 1 + Math.floor(rand() * 2);
  return {
    id: `KSP-2026-${String(1500 + i).padStart(5, "0")}`,
    crimeMajor: major,
    crimeMinor: minor,
    districtId: d.id,
    stationId: `${d.id}-PS${String(1 + Math.floor(rand() * 4)).padStart(2, "0")}`,
    lat: d.lat + (rand() - 0.5) * 0.28,
    lng: d.lng + (rand() - 0.5) * 0.28,
    registeredAt: regDate.toISOString().slice(0, 19),
    incidentAt,
    gravity: grave ? "grave" : "non-grave",
    status: pick(STATUSES),
    accusedCount: Math.floor(rand() * 4),
    victimCount: 1 + Math.floor(rand() * 2),
    sections: Array.from({ length: sectionCount }, () => pick(SECTION_POOL)),
    briefFacts: briefFor(minor),
  };
});

// A stable, named hero case referenced across the demo (spec §24, §45).
export const heroCase: Incident = {
  id: "KSP-2026-01842",
  crimeMajor: "Theft",
  crimeMinor: "Vehicle Theft",
  districtId: districts[0].id,
  stationId: `${districts[0].id}-PS01`,
  lat: 12.9784,
  lng: 77.6408,
  registeredAt: "2026-07-18T21:42:00",
  incidentAt: "2026-07-18T20:55:00",
  gravity: "non-grave",
  status: "Under Investigation",
  accusedCount: 2,
  victimCount: 1,
  sections: ["BNS 303", "BNS 331"],
  briefFacts: briefFor("Vehicle Theft"),
};
incidents.unshift(heroCase);

export const incidentById = (id: string) => incidents.find((x) => x.id === id);

// ---- Temporal distributions (spec §25) -------------------------------------
const MONTHS = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
export const crimeTrend: TrendPoint[] = MONTHS.map((label, i) => {
  const base = 3600 + i * 60;
  const actual = Math.round(base + Math.sin(i / 1.5) * 320 + (seeded(i + 7)() - 0.4) * 260);
  return {
    label,
    actual,
    baseline: Math.round(base),
    previous: Math.round(base - 180 + Math.sin((i + 1) / 1.5) * 260),
  };
});

// Hour-of-day (24) — peaks 20:00–23:00 (spec §26 observation).
export const hourly = Array.from({ length: 24 }, (_, h) => {
  const evening = h >= 20 && h <= 23 ? 1.9 : 1;
  const daytimeDip = h >= 2 && h <= 5 ? 0.35 : 1;
  const v = Math.round((120 + Math.sin((h / 24) * Math.PI * 2) * 40) * evening * daytimeDip);
  return { hour: `${String(h).padStart(2, "0")}`, value: v };
});

// Day-of-week (7) — weekend burglary lift.
export const weekday = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => ({
  day: d,
  value: Math.round(560 + (i >= 5 ? 120 : 0) + Math.sin(i) * 40),
}));

// Hour × Day heatmap: rows = weekday, cols = 0..23.
export const heatmap = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, di) => ({
  day,
  cells: Array.from({ length: 24 }, (_, h) => {
    const evening = h >= 19 && h <= 23 ? 1.8 : 1;
    const weekend = di >= 5 ? 1.25 : 1;
    const dip = h >= 2 && h <= 6 ? 0.3 : 1;
    return Math.round((10 + Math.sin((h / 24) * Math.PI * 2) * 5) * evening * weekend * dip);
  }),
}));

export const analyticsObservations = [
  "Vehicle theft is concentrated between 20:00 and 23:00.",
  "Weekend burglary incidents are 18% above weekday baseline.",
  "Bengaluru City represents 26% of current-period theft reports.",
  "Online fraud shows the strongest month-over-month increase.",
];
