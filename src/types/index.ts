// Shared domain types for the Karnataka Crime Intelligence prototype.
// All data is synthetic/mock. No real persons, victims, or accused.

export type Severity = "critical" | "high" | "watch" | "normal";
export type Gravity = "grave" | "non-grave";
export type CaseStatus =
  | "Under Investigation"
  | "Chargesheet Filed"
  | "Closed"
  | "Pending Trial";

export type CrimeMajor =
  | "Theft"
  | "Assault"
  | "Burglary"
  | "Murder"
  | "Cheating / Fraud"
  | "Drugs"
  | "Cyber Crime"
  | "Other";

export interface District {
  id: string;
  name: string;
  lat: number;
  lng: number;
  firs: number;
  chargesheetRate: number; // %
  avgDelayHrs: number;
  undetectedRate: number; // %
  hotspots: number;
  alerts: number;
  changePct: number;
  risk: Severity;
  crossDistrictArrests: number;
}

export interface PoliceStation {
  id: string;
  name: string;
  districtId: string;
  lat: number;
  lng: number;
  firCount: number;
  avgDelayHrs: number;
  chargesheetRate: number;
  missingGps: number;
  missingIncidentDate: number;
  thinBriefFacts: number;
  invalidCoords: number;
  qualityScore: number; // %
  activeAlerts: number;
}

export interface Incident {
  id: string; // FIR number, e.g. KSP-2026-01842
  crimeMajor: CrimeMajor;
  crimeMinor: string;
  districtId: string;
  stationId: string;
  lat: number;
  lng: number;
  registeredAt: string; // ISO
  incidentAt: string; // ISO
  gravity: Gravity;
  status: CaseStatus;
  accusedCount: number;
  victimCount: number;
  sections: string[];
  briefFacts: string;
}

export interface Hotspot {
  id: string;
  name: string; // cluster name e.g. Indiranagar Cluster
  area: string; // e.g. Bengaluru East
  districtId: string;
  lat: number;
  lng: number;
  crimeType: string;
  incidents: number;
  changePct: number;
  zScore: number;
  confidence: number; // %
  risk: Severity;
  peakWindow: string; // e.g. 20:00–23:00
  topCategories: { name: string; value: number }[];
  trend: number[];
  status: "active" | "emerging" | "resolved";
}

export type AlertType =
  | "Crime Spike"
  | "Emerging Hotspot"
  | "Data Anomaly"
  | "Cross-Jurisdiction Pattern"
  | "Emerging Crime Pattern";

export interface Alert {
  id: string;
  title: string;
  type: AlertType;
  severity: Severity;
  districtId: string;
  crimeMajor: CrimeMajor;
  detectedAt: string;
  observed: number;
  baseline: number;
  zScore: number;
  changePct: number;
  reviewed: boolean;
  reasons: string[];
}

export interface Person {
  id: string; // synthetic global person id GP-008391
  name: string; // synthetic
  ageRange: string;
  gender: "M" | "F";
  caseCount: number;
  districtCount: number;
  coAccusedLinks: number;
  crimeTypes: string[];
  districts: string[];
  jurisdictionSpread: "Low" | "Medium" | "High";
  firstObserved: string;
  lastCase: string;
  entityMatch: number; // %
  communityId: string;
  cases: string[];
}

export interface GraphNode {
  id: string;
  label: string;
  type: "person" | "case" | "location" | "station" | "crime";
  community?: string;
}
export interface GraphLink {
  source: string;
  target: string;
  rel: "ACCUSED_IN" | "CO_ACCUSED" | "REGISTERED_AT" | "OCCURRED_AT" | "CLASSIFIED_AS";
}

export interface Community {
  id: string;
  people: number;
  cases: number;
  districts: number;
  label: string;
}

export interface TrendPoint {
  label: string;
  actual: number;
  baseline: number;
  previous: number;
}

export interface ForecastPoint {
  label: string;
  historical: number | null;
  forecast: number | null;
  lower: number | null;
  upper: number | null;
}

export interface EmergingTrend {
  id: string;
  name: string;
  changePct: number;
  status: string;
  firs: number;
  firstDetected: string;
  districts: string[];
  relatedHeads: string[];
  keywords: string[];
  trend: number[];
  evolution: { month: string; label: string }[];
}

export interface SimilarCase {
  id: string;
  score: number;
  reasons: string[];
  crimeType: string;
  district: string;
  breakdown: { text: number; legal: number; geo: number; temporal: number };
}

export interface ModelInfo {
  id: string;
  name: string;
  version: string;
  status: "Healthy" | "Review";
  lastTrained: string;
  datasetVersion: string;
  horizon: string;
  metric: string;
  metricValue: string;
  calibration: number;
  drift: "Stable" | "Minor" | "Elevated";
  recent: number[];
}

export interface AuditEntry {
  id: string;
  ts: string;
  user: string;
  role: string;
  action: string;
  entity: string;
  jurisdiction: string;
  result: "Success" | "Denied";
}

export interface AppNotification {
  id: string;
  title: string;
  severity: Severity;
  time: string;
  group: "new" | "earlier";
  read: boolean;
  href: string;
}
