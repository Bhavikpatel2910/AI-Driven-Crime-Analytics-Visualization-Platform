import { stations } from "./stations";
import { districtById } from "./districts";

// Overall + per-dimension (spec §53).
export const qualityOverview = {
  overall: 94.7,
  dimensions: [
    { label: "GPS Completeness", value: 96.2, tip: "Share of FIRs with valid geocoordinates." },
    { label: "Incident Date", value: 99.1, tip: "Share of FIRs with a recorded incident date." },
    { label: "BriefFacts Quality", value: 91.4, tip: "Share of FIRs with sufficiently detailed brief facts." },
    { label: "Identity Resolution Coverage", value: 88.7, tip: "Share of accused records with a resolved synthetic identity." },
  ],
};

// Per-station rows for the data-quality table (spec §54).
export const qualityRows = stations.map((s) => ({
  ...s,
  districtName: districtById(s.districtId)?.name ?? s.districtId,
}));
