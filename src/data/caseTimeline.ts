// Case timeline (spec §47) — used by the case drawer.
export const heroCaseTimeline = [
  { time: "20:55", label: "Incident", detail: "Reported incident time." },
  { time: "21:18", label: "Information received", detail: "Complaint received at station." },
  { time: "21:42", label: "FIR registered", detail: "FIR KSP-2026-01842 registered." },
  { time: "Next Day", label: "Investigation initiated", detail: "Investigating officer assigned." },
  { time: "Day 3", label: "Arrest recorded", detail: "Arrest recorded in case diary." },
  { time: "Day 42", label: "Chargesheet submitted", detail: "Chargesheet filed before court." },
];

export function timelineFor(status: string) {
  const base = heroCaseTimeline.slice(0, 4);
  if (status === "Chargesheet Filed" || status === "Pending Trial") return heroCaseTimeline;
  if (status === "Closed") return heroCaseTimeline;
  return base;
}
