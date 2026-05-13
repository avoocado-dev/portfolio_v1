import Image from "next/image";

/**
 * Figure
 *
 * Image + caption block for case study body content. Wraps the image in
 * a bordered card and renders the caption below in muted prose.
 *
 * `width` and `height` are intrinsic-aspect hints for next/image — the
 * actual rendered size is controlled by `className="w-full h-auto"`,
 * so the numbers only need to preserve the source aspect ratio.
 */
export function Figure({
  src,
  alt,
  caption,
  width = 1800,
  height = 1100,
  priority = false,
  bare = false,
  frameClassName,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  bare?: boolean;
  frameClassName?: string;
}) {
  const baseFrame = bare
    ? "overflow-hidden"
    : "overflow-hidden rounded-lg border border-border bg-surface";
  return (
    <figure className="my-12">
      <div
        className={
          frameClassName ? `${baseFrame} ${frameClassName}` : baseFrame
        }
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="block h-auto w-full"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm leading-relaxed text-foreground/60">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
