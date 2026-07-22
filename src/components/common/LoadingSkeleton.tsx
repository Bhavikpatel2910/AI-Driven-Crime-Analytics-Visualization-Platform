import { cn } from "@/lib/utils";

// Skeleton loaders (spec §66).
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton", className)} />;
}

export function KpiSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="mt-3 h-7 w-24" />
      <Skeleton className="mt-3 h-8 w-full" />
    </div>
  );
}

export function ChartSkeleton({ height = 240 }: { height?: number }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <Skeleton className="h-3.5 w-40" />
      <Skeleton className="mt-4 w-full" style={{ height } as React.CSSProperties} />
    </div>
  );
}

export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4 space-y-2.5">
      <Skeleton className="h-6 w-full" />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-9 w-full" />
      ))}
    </div>
  );
}

export function MapSkeleton() {
  return <Skeleton className="h-full w-full min-h-[320px] rounded-xl" />;
}
