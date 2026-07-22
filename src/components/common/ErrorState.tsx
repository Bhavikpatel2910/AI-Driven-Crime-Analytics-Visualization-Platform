import { useNavigate } from "react-router-dom";
import { ServerCrash } from "lucide-react";
import { Button } from "./Button";

// Polished local error state (spec §67) — no raw stack traces.
export function ErrorState({
  onRetry,
  title = "Unable to load intelligence data",
  message = "The requested dataset could not be loaded.",
}: {
  onRetry?: () => void;
  title?: string;
  message?: string;
}) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 px-6 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-full border border-critical/30 bg-critical/10">
        <ServerCrash className="h-6 w-6 text-critical" />
      </div>
      <div>
        <p className="text-base font-semibold text-text">{title}</p>
        <p className="mt-1 text-sm text-text-muted">{message}</p>
      </div>
      <div className="flex gap-2">
        {onRetry && (
          <Button variant="cyan" size="sm" onClick={onRetry}>
            Retry
          </Button>
        )}
        <Button variant="outline" size="sm" onClick={() => navigate("/")}>
          Return to Overview
        </Button>
      </div>
    </div>
  );
}
