import { cn } from "@/lib/cn";

export function Pill({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[0.72rem] uppercase tracking-[0.14em] font-medium",
        variant === "default" &&
          "border border-border bg-surface text-foreground/70",
        variant === "accent" && "bg-accent text-accent-contrast",
        className,
      )}
    >
      {children}
    </span>
  );
}
