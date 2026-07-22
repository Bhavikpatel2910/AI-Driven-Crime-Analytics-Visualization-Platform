import type { AppNotification } from "@/types";

export const notifications: AppNotification[] = [
  { id: "N1", title: "Critical theft spike detected in Bengaluru East", severity: "critical", time: "2 min ago", group: "new", read: false, href: "/alerts" },
  { id: "N2", title: "New hotspot emerged in Mysuru", severity: "high", time: "18 min ago", group: "new", read: false, href: "/hotspots" },
  { id: "N3", title: "Forecast model completed a scheduled run", severity: "normal", time: "42 min ago", group: "new", read: false, href: "/forecast" },
  { id: "N4", title: "Data-quality warning at Kalaburagi City PS", severity: "watch", time: "1 hr ago", group: "earlier", read: false, href: "/data-quality" },
  { id: "N5", title: "Similar-case cluster requires review", severity: "high", time: "2 hr ago", group: "earlier", read: true, href: "/similar-cases" },
  { id: "N6", title: "Cross-jurisdiction pattern flagged in Tumakuru", severity: "critical", time: "3 hr ago", group: "earlier", read: true, href: "/alerts" },
  { id: "N7", title: "Entity Resolution model moved to Review", severity: "watch", time: "5 hr ago", group: "earlier", read: true, href: "/model-monitoring" },
];
