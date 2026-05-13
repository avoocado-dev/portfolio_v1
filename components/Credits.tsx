/**
 * Credits
 *
 * End-of-case-study block listing collaborators. Optional `link` on each
 * entry renders the name as an external link; otherwise it's plain text.
 * Designed to sit at the bottom of a case study, after Reflection.
 */
export function Credits({
  items,
}: {
  items: { role: string; name: string; link?: string }[];
}) {
  return (
    <aside className="mt-16 border-t border-border pt-8">
      <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-muted">
        Project credits
      </p>
      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
        {items.map((item) => (
          <div key={item.role}>
            <dt className="text-[0.7rem] uppercase tracking-[0.18em] font-medium text-muted">
              {item.role}
            </dt>
            <dd className="mt-1 text-sm">
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  {item.name}
                </a>
              ) : (
                item.name
              )}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
