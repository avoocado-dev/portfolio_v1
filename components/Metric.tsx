export function MetricGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-10 grid grid-cols-1 gap-px bg-border rounded-2xl overflow-hidden md:grid-cols-3">
      {children}
    </div>
  );
}

export function Metric({
  value,
  label,
  caption,
}: {
  value: string;
  label: string;
  caption?: string;
}) {
  return (
    <div className="bg-background p-6">
      <div className="text-4xl font-bold tracking-tight text-accent leading-none">
        {value}
      </div>
      <div className="mt-3 text-sm font-medium">{label}</div>
      {caption && (
        <div className="mt-1 text-sm text-foreground/60 leading-snug">
          {caption}
        </div>
      )}
    </div>
  );
}
