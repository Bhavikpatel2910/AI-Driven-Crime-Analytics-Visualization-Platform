import type { PoliceStation } from "@/types";
import { districts } from "./districts";
import { seeded } from "@/lib/utils";

const STATION_SUFFIX = ["City", "East", "West", "North", "Rural", "Market"];
const rand = seeded(99);

// 4 stations for the top 8 districts, 2 for the rest → 50+ (spec §60).
export const stations: PoliceStation[] = districts.flatMap((d, di) => {
  const count = di < 8 ? 4 : 2;
  return Array.from({ length: count }, (_, si) => {
    const firCount = Math.round((d.firs / (count + 2)) * (0.7 + rand() * 0.6));
    const missingGps = Math.round(firCount * (rand() * 0.08));
    const thin = Math.round(firCount * (rand() * 0.11));
    const missingDate = Math.round(firCount * (rand() * 0.02));
    const invalid = Math.round(firCount * (rand() * 0.015));
    const qualityScore = +(
      100 -
      ((missingGps + thin * 0.6 + missingDate + invalid) / Math.max(firCount, 1)) * 100
    ).toFixed(1);
    return {
      id: `${d.id}-PS${String(si + 1).padStart(2, "0")}`,
      name: `${d.name.split(" ")[0]} ${STATION_SUFFIX[si % STATION_SUFFIX.length]} PS`,
      districtId: d.id,
      lat: d.lat + (rand() - 0.5) * 0.12,
      lng: d.lng + (rand() - 0.5) * 0.12,
      firCount,
      avgDelayHrs: +(8 + rand() * 20).toFixed(1),
      chargesheetRate: 58 + Math.round(rand() * 28),
      missingGps,
      missingIncidentDate: missingDate,
      thinBriefFacts: thin,
      invalidCoords: invalid,
      qualityScore: Math.max(78, qualityScore),
      activeAlerts: rand() < 0.25 ? 1 + Math.floor(rand() * 3) : 0,
    };
  });
});

export const stationById = (id: string) => stations.find((s) => s.id === id);
export const stationsInDistrict = (districtId: string) =>
  stations.filter((s) => s.districtId === districtId);
