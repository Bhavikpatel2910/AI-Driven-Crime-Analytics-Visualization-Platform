import { cn } from "@/lib/utils";

type Variant =
  | "default"
  | "outline"
  | "ghost"
  | "cyan"
  | "danger"
  | "subtle";
type Size = "sm" | "md" | "icon";

const variants: Record<Variant, string> = {
  default: "bg-brand/90 text-white hover:bg-brand border border-brand/50",
  cyan: "bg-cyan/15 text-cyan hover:bg-cyan/25 border border-cyan/30",
  outline: "bg-transparent text-text-secondary hover:text-text hover:bg-surface-elevated border border-border",
  ghost: "bg-transparent text-text-secondary hover:text-text hover:bg-surface-elevated border border-transparent",
  subtle: "bg-surface-elevated text-text-secondary hover:text-text border border-border",
  danger: "bg-critical/15 text-critical hover:bg-critical/25 border border-critical/30",
};
const sizes: Record<Size, string> = {
  sm: "h-7 px-2.5 text-xs gap-1.5",
  md: "h-9 px-3.5 text-sm gap-2",
  icon: "h-8 w-8 p-0 justify-center",
};

export function Button({
  variant = "outline",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60 focus-visible:ring-offset-1 focus-visible:ring-offset-bg",
        "disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
