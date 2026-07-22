import {
  LayoutDashboard, Map, BarChart3, Flame, TrendingUp, Sparkles, Bell,
  FolderSearch, GitCompareArrows, Share2, Users, Building2, Landmark,
  Handcuffs, DatabaseZap, Activity, ScrollText, type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  breadcrumb: [string, string];
}
export interface NavSection {
  title: string;
  items: NavItem[];
}

// Sidebar navigation (spec §8).
export const navSections: NavSection[] = [
  {
    title: "Command Center",
    items: [
      { label: "Overview", to: "/", icon: LayoutDashboard, breadcrumb: ["Command Center", "Overview"] },
      { label: "Crime Map", to: "/crime-map", icon: Map, breadcrumb: ["Command Center", "Crime Map"] },
      { label: "Crime Analytics", to: "/crime-analytics", icon: BarChart3, breadcrumb: ["Command Center", "Crime Analytics"] },
    ],
  },
  {
    title: "Intelligence",
    items: [
      { label: "Hotspots", to: "/hotspots", icon: Flame, breadcrumb: ["Intelligence", "Hotspots"] },
      { label: "AI Forecast", to: "/forecast", icon: TrendingUp, breadcrumb: ["Intelligence", "AI Forecast"] },
      { label: "Emerging Trends", to: "/emerging-trends", icon: Sparkles, breadcrumb: ["Intelligence", "Emerging Trends"] },
      { label: "Alerts", to: "/alerts", icon: Bell, breadcrumb: ["Intelligence", "Alerts"] },
    ],
  },
  {
    title: "Investigation",
    items: [
      { label: "Case Explorer", to: "/case-explorer", icon: FolderSearch, breadcrumb: ["Investigation", "Case Explorer"] },
      { label: "Similar Cases", to: "/similar-cases", icon: GitCompareArrows, breadcrumb: ["Investigation", "Similar Cases"] },
      { label: "Criminal Network", to: "/network", icon: Share2, breadcrumb: ["Investigation", "Criminal Network"] },
      { label: "Repeat Offenders", to: "/repeat-offenders", icon: Users, breadcrumb: ["Investigation", "Repeat Offenders"] },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "District Performance", to: "/district-performance", icon: Building2, breadcrumb: ["Operations", "District Performance"] },
      { label: "Police Station Performance", to: "/station-performance", icon: Landmark, breadcrumb: ["Operations", "Police Station Performance"] },
      { label: "Arrest Analytics", to: "/arrest-analytics", icon: Handcuffs, breadcrumb: ["Operations", "Arrest Analytics"] },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Data Quality", to: "/data-quality", icon: DatabaseZap, breadcrumb: ["System", "Data Quality"] },
      { label: "Model Monitoring", to: "/model-monitoring", icon: Activity, breadcrumb: ["System", "Model Monitoring"] },
      { label: "Audit Logs", to: "/audit-logs", icon: ScrollText, breadcrumb: ["System", "Audit Logs"] },
    ],
  },
];

export const allNavItems = navSections.flatMap((s) => s.items);
