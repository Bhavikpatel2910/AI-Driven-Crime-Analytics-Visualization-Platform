import { ShieldCheck } from "lucide-react";

// Global human-review notice (spec §10) — compact, unobtrusive.
export function HumanReviewNotice({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-start gap-2.5 rounded-lg border border-intel/25 bg-intel/[0.07] px-3 py-2 ${className}`}
    >
      <ShieldCheck className="h-4 w-4 shrink-0 text-intel mt-0.5" />
      <p className="text-2xs leading-relaxed text-text-secondary">
        <span className="font-semibold text-text">Decision Support System.</span>{" "}
        AI-generated patterns and forecasts require authorized human review and do
        not constitute evidence or accusation.
      </p>
    </div>
  );
}
