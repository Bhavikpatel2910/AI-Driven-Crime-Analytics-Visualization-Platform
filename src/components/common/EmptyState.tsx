import { Inbox, RotateCcw } from "lucide-react";
import { Button } from "./Button";

// Empty state (spec §65) — never leave blank sections.
export function EmptyState({
  title = "No results found",
  message = "No records match the current filters.",
  onReset,
  icon: Icon = Inbox,
}: {
  title?: string;
  message?: string;
  onReset?: () => void;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 px-6 text-center">
      <div className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface-elevated">
        <Icon className="h-5 w-5 text-text-muted" />
      </div>
      <div>
        <p className="text-sm font-semibold text-text">{title}</p>
        <p className="mt-1 text-xs text-text-muted max-w-xs">{message}</p>
      </div>
      {onReset && (
        <Button size="sm" variant="cyan" onClick={onReset}>
          <RotateCcw className="h-3.5 w-3.5" /> Reset Filters
        </Button>
      )}
    </div>
  );
}
