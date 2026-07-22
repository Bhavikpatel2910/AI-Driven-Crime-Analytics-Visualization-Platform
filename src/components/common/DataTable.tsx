import { useMemo, useState, type ReactNode } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { EmptyState } from "./EmptyState";

export interface Column<T> {
  key: string;
  header: string;
  align?: "left" | "right" | "center";
  sortable?: boolean;
  width?: string;
  // value used for sorting/search
  accessor?: (row: T) => string | number;
  render?: (row: T) => ReactNode;
  className?: string;
}

// Analytical table (spec §62): sticky header, sort, search, pagination, hover/selected.
export function DataTable<T extends { id: string }>({
  columns,
  rows,
  searchable = true,
  searchPlaceholder = "Search…",
  pageSize = 10,
  onRowClick,
  selectedId,
  dense = true,
  toolbar,
  emptyMessage,
}: {
  columns: Column<T>[];
  rows: T[];
  searchable?: boolean;
  searchPlaceholder?: string;
  pageSize?: number;
  onRowClick?: (row: T) => void;
  selectedId?: string;
  dense?: boolean;
  toolbar?: ReactNode;
  emptyMessage?: string;
}) {
  const [q, setQ] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [dir, setDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(0);

  const accessorFor = (key: string) => columns.find((c) => c.key === key)?.accessor;

  const filtered = useMemo(() => {
    let r = rows;
    if (q.trim()) {
      const t = q.toLowerCase();
      r = r.filter((row) =>
        columns.some((c) => {
          const v = c.accessor ? c.accessor(row) : (row as any)[c.key];
          return String(v ?? "").toLowerCase().includes(t);
        })
      );
    }
    if (sortKey) {
      const acc = accessorFor(sortKey);
      r = [...r].sort((a, b) => {
        const av = acc ? acc(a) : (a as any)[sortKey];
        const bv = acc ? acc(b) : (b as any)[sortKey];
        if (typeof av === "number" && typeof bv === "number")
          return dir === "asc" ? av - bv : bv - av;
        return dir === "asc"
          ? String(av).localeCompare(String(bv))
          : String(bv).localeCompare(String(av));
      });
    }
    return r;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, q, sortKey, dir, columns]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const clampedPage = Math.min(page, pageCount - 1);
  const paged = filtered.slice(clampedPage * pageSize, clampedPage * pageSize + pageSize);

  const toggleSort = (key: string) => {
    if (sortKey === key) setDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setDir("desc");
    }
  };

  return (
    <div className="flex flex-col">
      {(searchable || toolbar) && (
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2.5">
          {searchable ? (
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-muted" />
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setPage(0);
                }}
                placeholder={searchPlaceholder}
                aria-label="Search table"
                className="h-8 w-56 rounded-lg border border-border bg-surface-elevated pl-8 pr-2.5 text-xs text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-cyan/50"
              />
            </div>
          ) : (
            <span />
          )}
          {toolbar}
        </div>
      )}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full border-collapse text-left">
          <thead className="sticky top-0 z-10">
            <tr className="border-y border-border bg-bg-secondary">
              {columns.map((c) => (
                <th
                  key={c.key}
                  style={c.width ? { width: c.width } : undefined}
                  className={cn(
                    "px-3 py-2 text-2xs font-semibold uppercase tracking-wide text-text-muted whitespace-nowrap",
                    c.align === "right" && "text-right",
                    c.align === "center" && "text-center"
                  )}
                >
                  {c.sortable ? (
                    <button
                      onClick={() => toggleSort(c.key)}
                      className={cn(
                        "inline-flex items-center gap-1 hover:text-text-secondary",
                        c.align === "right" && "flex-row-reverse"
                      )}
                    >
                      {c.header}
                      {sortKey === c.key ? (
                        dir === "asc" ? (
                          <ChevronUp className="h-3 w-3 text-cyan" />
                        ) : (
                          <ChevronDown className="h-3 w-3 text-cyan" />
                        )
                      ) : (
                        <ChevronsUpDown className="h-3 w-3 opacity-40" />
                      )}
                    </button>
                  ) : (
                    c.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((row) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  "border-b border-border/60 transition-colors",
                  onRowClick && "cursor-pointer",
                  selectedId === row.id
                    ? "bg-cyan/[0.08]"
                    : "hover:bg-surface-elevated/60"
                )}
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={cn(
                      dense ? "px-3 py-2" : "px-3 py-3",
                      "text-xs text-text-secondary align-middle",
                      c.align === "right" && "text-right tabular",
                      c.align === "center" && "text-center",
                      c.className
                    )}
                  >
                    {c.render ? c.render(row) : (row as any)[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <EmptyState
            message={emptyMessage ?? "No records match the current search."}
            onReset={q ? () => setQ("") : undefined}
          />
        )}
      </div>
      {filtered.length > pageSize && (
        <div className="flex items-center justify-between gap-2 px-3 py-2.5 text-2xs text-text-muted">
          <span className="tabular">
            {clampedPage * pageSize + 1}–
            {Math.min((clampedPage + 1) * pageSize, filtered.length)} of {filtered.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={clampedPage === 0}
              className="grid h-7 w-7 place-items-center rounded-md border border-border text-text-secondary hover:bg-surface-elevated disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <span className="tabular px-1">
              {clampedPage + 1} / {pageCount}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
              disabled={clampedPage >= pageCount - 1}
              className="grid h-7 w-7 place-items-center rounded-md border border-border text-text-secondary hover:bg-surface-elevated disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
