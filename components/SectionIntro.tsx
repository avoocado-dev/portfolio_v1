/**
 * SectionIntro
 *
 * Two-column section opener for case studies. Left column carries the
 * section heading, an accent rule, and an optional small label (e.g.
 * timeframe). Right column carries an intro paragraph that sets up the
 * body content that follows.
 *
 * Stacks on mobile. The grid extends slightly wider than the article's
 * reading column so the two columns feel side-by-side rather than
 * cramped, but stays inside the work layout's bounds.
 */
export function SectionIntro({
  title,
  label,
  children,
}: {
  title: string;
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-10 grid gap-8 md:my-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-12">
      <div>
        <div className="mb-6 h-px w-10 bg-accent" aria-hidden="true" />
        <h2 className="text-[length:var(--text-h2)] font-bold leading-[1.05] tracking-tight">
          {title}
        </h2>
        {label && (
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-muted">
            {label}
          </p>
        )}
      </div>
      <div className="text-lg leading-relaxed text-foreground/80 md:pt-1">
        {children}
      </div>
    </div>
  );
}
