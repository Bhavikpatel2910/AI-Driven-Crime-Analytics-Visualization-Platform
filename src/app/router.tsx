import { createBrowserRouter, isRouteErrorResponse, useRouteError } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { ErrorState } from "@/components/common";

import Overview from "@/pages/Overview";
import CrimeMap from "@/pages/CrimeMap";
import CrimeAnalytics from "@/pages/CrimeAnalytics";
import Hotspots from "@/pages/Hotspots";
import Forecast from "@/pages/Forecast";
import EmergingTrends from "@/pages/EmergingTrends";
import Alerts from "@/pages/Alerts";
import CaseExplorer from "@/pages/CaseExplorer";
import SimilarCases from "@/pages/SimilarCases";
import NetworkExplorer from "@/pages/NetworkExplorer";
import RepeatOffenders from "@/pages/RepeatOffenders";
import DistrictPerformance from "@/pages/DistrictPerformance";
import StationPerformance from "@/pages/StationPerformance";
import ArrestAnalytics from "@/pages/ArrestAnalytics";
import DataQuality from "@/pages/DataQuality";
import ModelMonitoring from "@/pages/ModelMonitoring";
import AuditLogs from "@/pages/AuditLogs";

function RouteError() {
  const err = useRouteError();
  const msg = isRouteErrorResponse(err)
    ? `${err.status} — this page could not be found.`
    : "The requested dataset could not be loaded.";
  return (
    <div className="grid min-h-screen place-items-center bg-bg">
      <ErrorState message={msg} />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Overview /> },
      { path: "crime-map", element: <CrimeMap /> },
      { path: "crime-analytics", element: <CrimeAnalytics /> },
      { path: "hotspots", element: <Hotspots /> },
      { path: "forecast", element: <Forecast /> },
      { path: "emerging-trends", element: <EmergingTrends /> },
      { path: "alerts", element: <Alerts /> },
      { path: "case-explorer", element: <CaseExplorer /> },
      { path: "similar-cases", element: <SimilarCases /> },
      { path: "network", element: <NetworkExplorer /> },
      { path: "repeat-offenders", element: <RepeatOffenders /> },
      { path: "district-performance", element: <DistrictPerformance /> },
      { path: "station-performance", element: <StationPerformance /> },
      { path: "arrest-analytics", element: <ArrestAnalytics /> },
      { path: "data-quality", element: <DataQuality /> },
      { path: "model-monitoring", element: <ModelMonitoring /> },
      { path: "audit-logs", element: <AuditLogs /> },
    ],
  },
]);
