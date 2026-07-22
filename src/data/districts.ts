import type { District } from "@/types";
import { seeded } from "@/lib/utils";

// 31 Karnataka districts with approximate real centroids (spec §60).
// Metrics are synthetic and deterministically generated.
const BASE: { name: string; lat: number; lng: number; firs: number }[] = [
  { name: "Bengaluru City", lat: 12.9716, lng: 77.5946, firs: 8421 },
  { name: "Bengaluru Rural", lat: 13.2846, lng: 77.6069, firs: 1892 },
  { name: "Mysuru", lat: 12.2958, lng: 76.6394, firs: 3714 },
  { name: "Belagavi", lat: 15.8497, lng: 74.4977, firs: 3211 },
  { name: "Tumakuru", lat: 13.3379, lng: 77.101, firs: 2483 },
  { name: "Dakshina Kannada", lat: 12.8703, lng: 74.8806, firs: 2298 },
  { name: "Kalaburagi", lat: 17.3297, lng: 76.8343, firs: 2104 },
  { name: "Ballari", lat: 15.1394, lng: 76.9214, firs: 1987 },
  { name: "Vijayapura", lat: 16.8302, lng: 75.71, firs: 1743 },
  { name: "Shivamogga", lat: 13.9299, lng: 75.5681, firs: 1691 },
  { name: "Davanagere", lat: 14.4644, lng: 75.9218, firs: 1622 },
  { name: "Raichur", lat: 16.2076, lng: 77.3463, firs: 1508 },
  { name: "Hassan", lat: 13.0068, lng: 76.0996, firs: 1489 },
  { name: "Mandya", lat: 12.5223, lng: 76.8954, firs: 1442 },
  { name: "Udupi", lat: 13.3409, lng: 74.7421, firs: 1398 },
  { name: "Bidar", lat: 17.9104, lng: 77.5199, firs: 1287 },
  { name: "Bagalkote", lat: 16.1691, lng: 75.6615, firs: 1241 },
  { name: "Chitradurga", lat: 14.2251, lng: 76.3981, firs: 1198 },
  { name: "Kolar", lat: 13.1367, lng: 78.1292, firs: 1176 },
  { name: "Koppal", lat: 15.3547, lng: 76.1548, firs: 1043 },
  { name: "Chikkamagaluru", lat: 13.3161, lng: 75.7745, firs: 998 },
  { name: "Gadag", lat: 15.4315, lng: 75.6355, firs: 964 },
  { name: "Haveri", lat: 14.7935, lng: 75.4044, firs: 941 },
  { name: "Dharwad", lat: 15.4589, lng: 75.0078, firs: 1687 },
  { name: "Chikkaballapura", lat: 13.4355, lng: 77.7315, firs: 887 },
  { name: "Ramanagara", lat: 12.721, lng: 77.2807, firs: 842 },
  { name: "Chamarajanagar", lat: 11.9261, lng: 76.9438, firs: 798 },
  { name: "Yadgir", lat: 16.762, lng: 77.1376, firs: 761 },
  { name: "Vijayanagara", lat: 15.275, lng: 76.387, firs: 724 },
  { name: "Kodagu", lat: 12.3375, lng: 75.8069, firs: 689 },
  { name: "Uttara Kannada", lat: 14.9915, lng: 74.5645, firs: 1102 },
];

const RISK_BY_INDEX = (i: number): District["risk"] =>
  i === 0 ? "critical" : i < 4 ? "high" : i < 9 ? "watch" : "normal";

const rand = seeded(42);

export const districts: District[] = BASE.map((d, i) => {
  const chargesheetRate = 62 + Math.round(rand() * 22);
  const undetectedRate = 8 + Math.round(rand() * 14);
  return {
    id: `DST-${String(i + 1).padStart(2, "0")}`,
    name: d.name,
    lat: d.lat,
    lng: d.lng,
    firs: d.firs,
    chargesheetRate,
    avgDelayHrs: +(9 + rand() * 18).toFixed(1),
    undetectedRate,
    hotspots: i === 0 ? 6 : Math.round(rand() * 3),
    alerts: i === 0 ? 5 : Math.round(rand() * 3),
    changePct: +((rand() - 0.35) * 40).toFixed(1),
    risk: RISK_BY_INDEX(i),
    crossDistrictArrests: 20 + Math.round(rand() * 180),
  };
});

export const districtById = (id: string) => districts.find((d) => d.id === id);
export const districtByName = (name: string) =>
  districts.find((d) => d.name === name);
