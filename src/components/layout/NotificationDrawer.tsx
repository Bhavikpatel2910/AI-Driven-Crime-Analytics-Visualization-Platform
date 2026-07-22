import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCheck } from "lucide-react";
import { Drawer } from "@/components/common";
import { notifications as seed } from "@/data";
import { StatusBadge } from "@/components/common";
import { cn } from "@/lib/utils";
import type { AppNotification } from "@/types";

// Notification center (spec §58) — local UI actions: mark read / mark all read.
export function NotificationDrawer({
  open,
  onClose,
  items,
  setItems,
}: {
  open: boolean;
  onClose: () => void;
  items: AppNotification[];
  setItems: (n: AppNotification[]) => void;
}) {
  const navigate = useNavigate();
  const markAll = () => setItems(items.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) =>
    setItems(items.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const groups: { key: "new" | "earlier"; label: string }[] = [
    { key: "new", label: "New" },
    { key: "earlier", label: "Earlier" },
  ];

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Notifications"
      subtitle={`${items.filter((n) => !n.read).length} unread`}
      footer={
        <button
          onClick={markAll}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-border py-2 text-xs font-medium text-text-secondary hover:bg-surface-elevated hover:text-text"
        >
          <CheckCheck className="h-3.5 w-3.5" /> Mark all read
        </button>
      }
    >
      <div className="space-y-4">
        {groups.map((g) => {
          const rows = items.filter((n) => n.group === g.key);
          if (!rows.length) return null;
          return (
            <div key={g.key}>
              <div className="mb-1.5 text-2xs font-semibold uppercase tracking-wide text-text-muted">
                {g.label}
              </div>
              <div className="space-y-1.5">
                {rows.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => {
                      markRead(n.id);
                      navigate(n.href);
                      onClose();
                    }}
                    className={cn(
                      "flex w-full items-start gap-2.5 rounded-lg border px-3 py-2.5 text-left transition-colors",
                      n.read
                        ? "border-border bg-surface hover:bg-surface-elevated/60"
                        : "border-cyan/20 bg-cyan/[0.05] hover:bg-cyan/[0.08]"
                    )}
                  >
                    {!n.read && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />}
                    <div className={cn("min-w-0 flex-1", n.read && "pl-4")}>
                      <div className="text-xs leading-snug text-text">{n.title}</div>
                      <div className="mt-1 flex items-center gap-2">
                        <StatusBadge kind={n.severity} size="xs" />
                        <span className="text-2xs text-text-muted">{n.time}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Drawer>
  );
}

export const seedNotifications = seed;
