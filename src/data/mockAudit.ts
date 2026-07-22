import type { AuditEntry } from "@/types";
import { seeded } from "@/lib/utils";

const rand = seeded(2020);
const USERS = [
  ["State Analyst", "SCRB Analyst"],
  ["R. Deshpande", "District SP"],
  ["Intel Cell", "Analyst"],
  ["A. Krishnan", "Station Officer"],
  ["Data Steward", "SCRB Data"],
];
const ACTIONS = [
  ["Viewed Network", "GP-008391"],
  ["Opened Case", "KSP-2026-01842"],
  ["Marked Alert Reviewed", "ALT-002"],
  ["Exported Report", "Overview"],
  ["Viewed Forecast", "Bengaluru East"],
  ["Ran Similar Cases", "KSP-2026-01842"],
  ["Viewed Hotspot", "HS-01"],
  ["Filtered Map", "Statewide"],
  ["Opened Station Analytics", "DST-01-PS01"],
  ["Viewed Data Quality", "Statewide"],
];
const JUR = ["Statewide", "Bengaluru City", "Mysuru", "Belagavi", "Dharwad"];

export const auditLog: AuditEntry[] = Array.from({ length: 60 }, (_, i) => {
  const [user, role] = USERS[Math.floor(rand() * USERS.length)];
  const [action, entity] = ACTIONS[Math.floor(rand() * ACTIONS.length)];
  const day = 23 - Math.floor(i / 6);
  const h = 8 + Math.floor(rand() * 11);
  const m = Math.floor(rand() * 60);
  return {
    id: `AUD-${String(1000 + i)}`,
    ts: `2026-07-${String(Math.max(1, day)).padStart(2, "0")}T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`,
    user,
    role,
    action,
    entity,
    jurisdiction: JUR[Math.floor(rand() * JUR.length)],
    result: rand() < 0.94 ? "Success" : "Denied",
  };
});
