import { cn } from "@/lib/utils";

/** Elevated card surface (spec §4, §13). */
export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface shadow-card",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({
  title,
  subtitle,
  right,
  className,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-3 px-4 pt-3.5 pb-2", className)}>
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-text leading-tight">{title}</h3>
        {subtitle && <p className="text-2xs text-text-muted mt-0.5">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}
