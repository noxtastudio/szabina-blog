import Image from "next/image";
import type { PhotoRef } from "@/lib/types";
import { padPhotoIndex, cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

type Props = {
  photo: PhotoRef;
  shortCode: string;
  /**
   * Asks the layout to give this photo extra presence. For portrait photos
   * this means a wider centered frame (still capped). For landscape/square
   * it means full-bleed edge-to-edge.
   */
  bleed?: boolean;
  /** Priority hint for above-the-fold hero photos. */
  priority?: boolean;
  /** Custom sizes attribute when needed. */
  sizes?: string;
  className?: string;
};

const PORTRAIT_BLEED_MAX = "min(92vw, 1040px)";
const PORTRAIT_DEFAULT_MAX = "min(86vw, 820px)";
const LANDSCAPE_DEFAULT_MAX = "min(94vw, 1280px)";

export function Photo({
  photo,
  shortCode,
  bleed = false,
  priority = false,
  sizes,
  className,
}: Props) {
  const isPortrait = photo.width / photo.height < 1;
  const fullBleed = bleed && !isPortrait;

  const maxWidth = fullBleed
    ? "100%"
    : bleed
      ? PORTRAIT_BLEED_MAX
      : isPortrait
        ? PORTRAIT_DEFAULT_MAX
        : LANDSCAPE_DEFAULT_MAX;

  const figure = (
    <figure
      className={cn(
        "group relative mx-auto",
        fullBleed ? "w-full" : "w-full",
        className,
      )}
      style={{ maxWidth }}
    >
      <div
        className="relative overflow-hidden bg-[var(--color-paper-deep)]"
        style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          priority={priority}
          sizes={
            sizes ??
            (fullBleed
              ? "100vw"
              : "(max-width: 768px) 92vw, (max-width: 1200px) 80vw, 1040px")
          }
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
        />
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between gap-6">
        <span className="label">
          {shortCode} — {padPhotoIndex(photo.index)}
        </span>
        {photo.caption ? (
          <span className="label max-w-md text-right normal-case tracking-normal text-[var(--color-ink-muted)]">
            {photo.caption}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );

  // Hero photos skip Reveal (they animate via ClipReveal at the page level).
  return priority ? figure : <Reveal>{figure}</Reveal>;
}
