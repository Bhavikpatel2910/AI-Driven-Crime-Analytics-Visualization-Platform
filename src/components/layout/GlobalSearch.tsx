import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, CornerDownLeft } from "lucide-react";
import { allNavItems } from "./nav";
import { incidents, districts, stations, persons } from "@/data";
import { StatusBadge } from "@/components/common";
import { cn } from "@/lib/utils";

type Result = {
  id: string;
  kind: "CASE" | "DISTRICT" | "STATION" | "PERSON" | "PAGE";
  title: string;
  subtitle: string;
  to: string;
};

// Command palette / global search (spec §59). Searches FIRs, districts,
// stations, synthetic person IDs and pages.
export function GlobalSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  const results = useMemo<Result[]>(() => {
    const t = q.trim().toLowerCase();
    if (!t) {
      return allNavItems.slice(0, 6).map((n) => ({
        id: n.to, kind: "PAGE", title: n.label,
        subtitle: n.breadcrumb.join(" / "), to: n.to,
      }));
    }
    const out: Result[] = [];
    for (const c of incidents) {
      if (out.length >= 6) break;
      if (c.id.toLowerCase().includes(t) || c.crimeMinor.toLowerCase().includes(t))
        out.push({
          id: c.id, kind: "CASE", title: c.id,
          subtitle: `${c.crimeMinor} · ${districts.find((d) => d.id === c.districtId)?.name ?? ""}`,
          to: `/case-explorer?fir=${c.id}`,
        });
    }
    for (const d of districts) {
      if (out.length >= 9) break;
      if (d.name.toLowerCase().includes(t))
        out.push({ id: d.id, kind: "DISTRICT", title: d.name, subtitle: `${d.firs.toLocaleString()} FIRs`, to: `/district-performance` });
    }
    for (const s of stations) {
      if (out.length >= 12) break;
      if (s.name.toLowerCase().includes(t))
        out.push({ id: s.id, kind: "STATION", title: s.name, subtitle: `${s.firCount} FIRs`, to: `/station-performance` });
    }
    for (const p of persons) {
      if (out.length >= 15) break;
      if (p.id.toLowerCase().includes(t) || p.name.toLowerCase().includes(t))
        out.push({ id: p.id, kind: "PERSON", title: `${p.id} · ${p.name}`, subtitle: `${p.caseCount} cases (synthetic)`, to: `/repeat-offenders?person=${p.id}` });
    }
    for (const n of allNavItems) {
      if (out.length >= 18) break;
      if (n.label.toLowerCase().includes(t))
        out.push({ id: n.to, kind: "PAGE", title: n.label, subtitle: n.breadcrumb.join(" / "), to: n.to });
    }
    return out;
  }, [q]);

  const go = (r: Result) => {
    navigate(r.to);
    onClose();
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[12vh]" role="dialog" aria-modal="true" aria-label="Global search">
      <div className="absolute inset-0 bg-black/60 animate-fade-in" onClick={onClose} />
      <div className="relative w-full max-w-xl rounded-xl border border-border bg-bg-secondary shadow-2xl animate-fade-in">
        <div className="flex items-center gap-2.5 border-b border-border px-4">
          <Search className="h-4 w-4 text-text-muted" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => { setQ(e.target.value); setActive(0); }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(results.length - 1, a + 1)); }
              else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
              else if (e.key === "Enter" && results[active]) go(results[active]);
              else if (e.key === "Escape") onClose();
            }}
            placeholder="Search FIR, district, police station, person ID…"
            className="h-12 w-full bg-transparent text-sm text-text placeholder:text-text-muted focus:outline-none"
          />
          <kbd className="hidden rounded border border-border bg-surface px-1.5 py-0.5 text-2xs text-text-muted sm:block">ESC</kbd>
        </div>
        <div className="max-h-[52vh] overflow-y-auto scrollbar-thin p-2">
          {results.length === 0 ? (
            <div className="px-3 py-8 text-center text-xs text-text-muted">
              No results for “{q}”.
            </div>
          ) : (
            results.map((r, i) => (
              <button
                key={`${r.kind}-${r.id}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => go(r)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left",
                  i === active ? "bg-cyan/[0.1]" : "hover:bg-surface-elevated/60"
                )}
              >
                <span className="w-16 shrink-0">
                  <StatusBadge kind="normal" label={r.kind} showIcon={false} size="xs" className="!text-text-muted !bg-surface-elevated !border-border" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className={cn("block truncate text-sm", r.kind === "CASE" || r.kind === "PERSON" ? "font-mono" : "", "text-text")}>{r.title}</span>
                  <span className="block truncate text-2xs text-text-muted">{r.subtitle}</span>
                </span>
                {i === active && <CornerDownLeft className="h-3.5 w-3.5 text-text-muted" />}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
