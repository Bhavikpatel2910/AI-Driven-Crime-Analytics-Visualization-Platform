import type { EmergingTrend, ForecastPoint, SimilarCase } from "@/types";
import { seeded } from "@/lib/utils";

const rand = seeded(1234);

// ---- Forecast (spec §30–32) ------------------------------------------------
export const forecastKpis = {
  expected: 142,
  previous4w: 119,
  changePct: 19.3,
  confidence: 82,
  modelVersion: "crime-forecast-v2.4",
};

// 12 historical weeks + 4 forecast weeks with confidence band.
export const forecastSeries: ForecastPoint[] = (() => {
  const out: ForecastPoint[] = [];
  let val = 24;
  for (let w = 19; w <= 30; w++) {
    val = Math.round(val + (rand() - 0.4) * 6);
    out.push({ label: `W${w}`, historical: val, forecast: w === 30 ? val : null, lower: null, upper: null });
  }
  let f = val;
  for (let w = 31; w <= 34; w++) {
    f = Math.round(f + 2 + rand() * 4);
    const spread = 6 + (w - 30) * 1.5;
    out.push({
      label: `W${w}`,
      historical: null,
      forecast: f,
      lower: Math.round(f - spread),
      upper: Math.round(f + spread),
    });
  }
  return out;
})();

export const forecastReasons = [
  "4-week incident trend increased",
  "Recurring Friday/Saturday pattern",
  "Recent hotspot persistence",
  "Seasonal pattern",
];

export const forecastRiskAreas = [
  { name: "Bengaluru East", level: "critical", lat: 12.9784, lng: 77.6408 },
  { name: "Whitefield", level: "high", lat: 12.9698, lng: 77.7499 },
  { name: "Mysuru City", level: "moderate", lat: 12.2958, lng: 76.6394 },
  { name: "Tumakuru Ring", level: "moderate", lat: 13.3379, lng: 77.101 },
  { name: "Dharwad Market", level: "low", lat: 15.4589, lng: 75.0078 },
] as const;

// ---- Emerging trends (spec §33, §34) ---------------------------------------
const spark = (base: number) =>
  Array.from({ length: 12 }, (_, i) => Math.round(base * (0.5 + i / 15) + (rand() - 0.5) * base * 0.15));

export const emergingTrends: EmergingTrend[] = [
  {
    id: "ET-1", name: "Digital Payment Fraud", changePct: 42, status: "Emerging rapidly",
    firs: 384, firstDetected: "2026-05-02", districts: ["Bengaluru City", "Mysuru", "Dharwad"],
    relatedHeads: ["Cyber Crime", "Cheating / Fraud"], keywords: ["UPI", "QR", "OTP", "merchant"],
    trend: spark(30), evolution: [{ month: "May", label: "UPI" }, { month: "June", label: "QR Scam" }, { month: "July", label: "Fake Merchant Payment" }],
  },
  {
    id: "ET-2", name: "Vehicle Theft", changePct: 27, status: "Sustained increase",
    firs: 512, firstDetected: "2026-04-14", districts: ["Bengaluru City", "Tumakuru", "Ballari"],
    relatedHeads: ["Theft"], keywords: ["two-wheeler", "parking", "night"],
    trend: spark(45), evolution: [{ month: "May", label: "Parking lots" }, { month: "June", label: "Residential" }, { month: "July", label: "Transit hubs" }],
  },
  {
    id: "ET-3", name: "Courier Scam", changePct: 19, status: "New pattern",
    firs: 148, firstDetected: "2026-06-10", districts: ["Udupi", "Dakshina Kannada"],
    relatedHeads: ["Cyber Crime"], keywords: ["parcel", "customs", "call"],
    trend: spark(14), evolution: [{ month: "May", label: "—" }, { month: "June", label: "Parcel hold" }, { month: "July", label: "Fake customs" }],
  },
  {
    id: "ET-4", name: "Night Burglary", changePct: 14, status: "Localized",
    firs: 96, firstDetected: "2026-06-22", districts: ["Belagavi", "Shivamogga"],
    relatedHeads: ["Burglary"], keywords: ["forced entry", "weekend", "unoccupied"],
    trend: spark(12), evolution: [{ month: "May", label: "Sparse" }, { month: "June", label: "Weekend" }, { month: "July", label: "Clustered" }],
  },
];

// ---- Similar cases (spec §48, §49) -----------------------------------------
export const similarCases: SimilarCase[] = [
  {
    id: "KSP-2025-00847", score: 92, crimeType: "Vehicle Theft", district: "Bengaluru City",
    reasons: ["Similar legal-section signature", "Similar incident description", "1.8 km geographic proximity", "Similar time window"],
    breakdown: { text: 91, legal: 96, geo: 84, temporal: 79 },
  },
  {
    id: "KSP-2024-00293", score: 88, crimeType: "Vehicle Theft", district: "Bengaluru City",
    reasons: ["Similar BriefFacts pattern", "Same crime subtype", "Similar act/section combination"],
    breakdown: { text: 89, legal: 92, geo: 71, temporal: 83 },
  },
  {
    id: "KSP-2025-01120", score: 81, crimeType: "House Break", district: "Bengaluru City",
    reasons: ["Overlapping section signature", "Comparable time window", "Adjacent jurisdiction"],
    breakdown: { text: 78, legal: 85, geo: 76, temporal: 74 },
  },
  {
    id: "KSP-2024-00761", score: 76, crimeType: "Chain Snatching", district: "Mysuru",
    reasons: ["Similar MO indicators", "Comparable recovery pattern"],
    breakdown: { text: 74, legal: 80, geo: 62, temporal: 71 },
  },
];
