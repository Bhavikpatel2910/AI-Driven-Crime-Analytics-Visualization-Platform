import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { TopHeader } from "./TopHeader";
import { GlobalSearch } from "./GlobalSearch";
import { NotificationDrawer, seedNotifications } from "./NotificationDrawer";
import type { AppNotification } from "@/types";

// Fixed desktop application shell (spec §6).
export function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState<AppNotification[]>(seedNotifications);
  const unread = notifs.filter((n) => !n.read).length;

  // ⌘K / Ctrl+K opens the command palette (spec §59).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopHeader
          onOpenSearch={() => setSearchOpen(true)}
          onOpenNotifications={() => setNotifOpen(true)}
          unread={unread}
        />
        <main className="flex-1 overflow-y-auto scrollbar-thin bg-bg">
          <div className="mx-auto max-w-[1680px] p-4 md:p-5">
            <Outlet />
          </div>
        </main>
      </div>

      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
      <NotificationDrawer
        open={notifOpen}
        onClose={() => setNotifOpen(false)}
        items={notifs}
        setItems={setNotifs}
      />
    </div>
  );
}
