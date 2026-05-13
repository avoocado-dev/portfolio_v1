/**
 * FigurePlaceholder
 *
 * Drop-in stand-in for <Figure> when the real asset isn't ready yet.
 * Renders a dashed-border card sized to a configurable aspect ratio,
 * with the caption (and an optional inner label) shown so the layout
 * still reads. Swap to <Figure src=...> when the image lands.
 */
export function FigurePlaceholder({
  caption,
  aspectRatio = "18/11",
  label = "Image coming soon",
}: {
  caption?: string;
  aspectRatio?: string;
  label?: string;
}) {
  return (
    <figure className="my-12">
      <div
        className="flex items-center justify-center rounded-lg border border-dashed border-foreground/20 bg-surface"
        style={{ aspectRatio }}
      >
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
          {label}
        </p>
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm leading-relaxed text-foreground/60">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
