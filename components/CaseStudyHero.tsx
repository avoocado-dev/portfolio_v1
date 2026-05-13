import { Pill } from "@/components/Pill";

type Pair = { label: string; value: string };

/**
 * CaseStudyHero
 *
 * Single hero used by every case study. Flat layout — no tinted card.
 * Order: eyebrow → title → lede → meta dl (sandwiched in dividers) →
 * tags → optional illustration.
 *
 * Every field after `title` is optional, so the same component can carry
 * a meta-rich opener AND a lighter illustration-led opener while keeping
 * the visual rhythm consistent.
 *
 * `children` is the slot for an illustration / mock that sits below the
 * textual block.
 */
export function CaseStudyHero({
  eyebrow,
  title,
  lede,
  meta,
  tags,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  meta?: Pair[];
  tags?: string[];
  children?: React.ReactNode;
}) {
  return (
    <header className="mb-12">
      {eyebrow && (
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-muted">
          {eyebrow}
        </p>
      )}
      <h1 className="text-[length:var(--text-h1)] font-bold leading-[1.05] tracking-tight">
        {title}
      </h1>
      {lede && (
        <p className="mt-6 text-lg leading-relaxed text-foreground/75">
          {lede}
        </p>
      )}
      {meta && meta.length > 0 && (
        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 border-y border-border py-5 md:grid-cols-4">
          {meta.map((pair) => (
            <div key={pair.label}>
              <dt className="text-[0.7rem] uppercase tracking-[0.18em] font-medium text-muted">
                {pair.label}
              </dt>
              <dd className="mt-1 text-sm">{pair.value}</dd>
            </div>
          ))}
        </dl>
      )}
      {tags && tags.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <li key={tag}>
              <Pill>{tag}</Pill>
            </li>
          ))}
        </ul>
      )}
      {children && <div className="mt-12 md:mt-16">{children}</div>}
    </header>
  );
}
