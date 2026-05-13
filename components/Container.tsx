import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
  as: As = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "main" | "section" | "article" | "header" | "footer";
}) {
  return (
    <As
      className={cn("mx-auto w-full max-w-3xl px-6 md:px-8", className)}
    >
      {children}
    </As>
  );
}
