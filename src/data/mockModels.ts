import type { ModelInfo } from "@/types";
import { seeded } from "@/lib/utils";

const rand = seeded(88);
const recent = (b: number) => Array.from({ length: 10 }, () => Math.round(b + (rand() - 0.5) * b * 0.3));

export const models: ModelInfo[] = [
  { id: "M1", name: "Hotspot Detection", version: "hotspot-scan-v3.1", status: "Healthy", lastTrained: "2026-07-12", datasetVersion: "ds-2026.07", horizon: "Spatial-temporal", metric: "Precision@k", metricValue: "0.88", calibration: 91, drift: "Stable", recent: recent(120) },
  { id: "M2", name: "Crime Forecast", version: "crime-forecast-v2.4", status: "Healthy", lastTrained: "2026-07-09", datasetVersion: "ds-2026.07", horizon: "1–4 weeks", metric: "MAPE", metricValue: "12.4%", calibration: 82, drift: "Minor", recent: recent(140) },
  { id: "M3", name: "Entity Resolution", version: "entity-resolve-v1.8", status: "Review", lastTrained: "2026-06-28", datasetVersion: "ds-2026.06", horizon: "Record linkage", metric: "F1", metricValue: "0.86", calibration: 79, drift: "Elevated", recent: recent(90) },
  { id: "M4", name: "Similar Case Model", version: "case-sim-v2.0", status: "Healthy", lastTrained: "2026-07-05", datasetVersion: "ds-2026.07", horizon: "Retrieval", metric: "nDCG", metricValue: "0.90", calibration: 88, drift: "Stable", recent: recent(110) },
  { id: "M5", name: "Anomaly Detection", version: "anomaly-z-v1.5", status: "Healthy", lastTrained: "2026-07-11", datasetVersion: "ds-2026.07", horizon: "Streaming", metric: "AUC", metricValue: "0.93", calibration: 90, drift: "Stable", recent: recent(75) },
];
export const modelById = (id: string) => models.find((m) => m.id === id);
