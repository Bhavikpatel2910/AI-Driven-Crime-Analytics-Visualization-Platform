import type { Hotspot } from "@/types";
import { districts } from "./districts";
import { seeded } from "@/lib/utils";

const rand = seeded(314);
const spark = (base: number, up: boolean) =>
  Array.from({ length: 14 }, (_, i) =>
    Math.round(base * (0.6 + (up ? i / 20 : (14 - i) / 30)) + (rand() - 0.5) * base * 0.2)
  );

// Hero hotspot (spec §15, §16, §28) — referenced across the demo.
const hero: Hotspot = {
  id: "HS-01",
  name: "Indiranagar Cluster",
  area: "Bengaluru East",
  districtId: districts[0].id,
  lat: 12.9784,
  lng: 77.6408,
  crimeType: "Vehicle Theft",
  incidents: 127,
  changePct: 34,
  zScore: 2.63,
  confidence: 87,
  risk: "critical",
  peakWindow: "20:00–23:00",
  topCategories: [
    { name: "Vehicle Theft", value: 71 },
    { name: "House Break", value: 34 },
    { name: "Robbery", value: 22 },
  ],
  trend: spark(90, true),
  status: "active",
};

const AREAS = [
  ["Whitefield Corridor", "Bengaluru East", "Chain Snatching", "critical"],
  ["Majestic Zone", "Bengaluru City", "Pickpocketing", "high"],
  ["Kuvempunagar Belt", "Mysuru", "House Break", "high"],
  ["Camp Area", "Belagavi", "Night Burglary", "watch"],
  ["Hubli Market", "Dharwad", "Online Fraud", "high"],
  ["Mangaluru Port Ring", "Dakshina Kannada", "Vehicle Theft", "watch"],
  ["Gulbarga Central", "Kalaburagi", "Assault", "watch"],
  ["Ballari Fort Zone", "Ballari", "Theft", "normal"],
  ["Tumkur Ring Road", "Tumakuru", "Vehicle Theft", "high"],
  ["Shivamogga Old Town", "Shivamogga", "Burglary", "watch"],
  ["Davanagere Mandi", "Davanagere", "Cheating", "normal"],
  ["Vijayapura Gate", "Vijayapura", "Drugs", "watch"],
  ["Raichur Junction", "Raichur", "Theft", "normal"],
  ["Hassan Bypass", "Hassan", "House Break", "normal"],
  ["Udupi Beach Road", "Udupi", "Chain Snatching", "watch"],
  ["Bidar Fort Area", "Bidar", "Assault", "normal"],
] as const;

const generated: Hotspot[] = AREAS.map(([name, area, crimeType, risk], i) => {
  const d = districts.find((x) => x.name === area) ?? districts[0];
  const inc = 40 + Math.round(rand() * 90);
  const up = risk !== "normal";
  return {
    id: `HS-${String(i + 2).padStart(2, "0")}`,
    name,
    area,
    districtId: d.id,
    lat: d.lat + (rand() - 0.5) * 0.16,
    lng: d.lng + (rand() - 0.5) * 0.16,
    crimeType,
    incidents: inc,
    changePct: +((up ? 1 : -1) * (8 + rand() * 34)).toFixed(0),
    zScore: +(1.2 + rand() * 1.6).toFixed(2),
    confidence: 70 + Math.round(rand() * 22),
    risk: risk as Hotspot["risk"],
    peakWindow: rand() < 0.5 ? "20:00–23:00" : "18:00–21:00",
    topCategories: [
      { name: crimeType, value: Math.round(inc * 0.5) },
      { name: "Theft", value: Math.round(inc * 0.3) },
      { name: "Assault", value: Math.round(inc * 0.2) },
    ],
    trend: spark(inc * 0.7, up),
    status: i < 3 ? "emerging" : "active",
  };
});

export const hotspots: Hotspot[] = [hero, ...generated];
export const hotspotById = (id: string) => hotspots.find((h) => h.id === id);

export const hotspotStats = {
  active: hotspots.filter((h) => h.status !== "resolved").length,
  critical: hotspots.filter((h) => h.risk === "critical").length,
  emerging: hotspots.filter((h) => h.status === "emerging").length,
  resolved: 6,
  avgConfidence: Math.round(
    hotspots.reduce((a, h) => a + h.confidence, 0) / hotspots.length
  ),
};
