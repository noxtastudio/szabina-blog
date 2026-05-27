import Image from "next/image";
import type { PhotoRef } from "@/lib/types";
import { padPhotoIndex, cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

type Props = {
  photos: PhotoRef[];
  shortCode: string;
  layout?: "equal" | "feature";
};

/**
 * Auto-layout for -partN photo sets:
 *   2 photos  → diptych
 *   3 photos  → triptych (equal thirds or 1 feature + 2 stacked)
 *   4 photos  → 2×2 quad
 *   5+        → masonry grid (best-effort)
 *
 * All photos are 3:4 portrait by default (Szabina's typical output),
 * so layouts assume vertical aspect — they degrade gracefully otherwise.
 */
export function PhotoGroup({ photos, shortCode, layout = "equal" }: Props) {
  const n = photos.length;

  if (n === 2) return <Diptych photos={photos} shortCode={shortCode} />;
  if (n === 3)
    return layout === "feature" ? (
      <TriptychFeature photos={photos} shortCode={shortCode} />
    ) : (
      <TriptychEqual photos={photos} shortCode={shortCode} />
    );
  if (n === 4) return <QuadGrid photos={photos} shortCode={shortCode} />;
  return <MasonryGrid photos={photos} shortCode={shortCode} />;
}

/* ───── building blocks ───── */

function PhotoTile({
  photo,
  shortCode,
  sizes,
}: {
  photo: PhotoRef;
  shortCode: string;
  sizes: string;
}) {
  return (
    <figure className="group relative">
      <div
        className="relative overflow-hidden bg-[var(--color-paper-deep)]"
        style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
        />
      </div>
      <figcaption className="mt-3">
        <span className="label">
          {shortCode} — {padPhotoIndex(photo.index)}
        </span>
      </figcaption>
    </figure>
  );
}

function Diptych({
  photos,
  shortCode,
}: {
  photos: PhotoRef[];
  shortCode: string;
}) {
  return (
    <Reveal>
      <div className="page-wrap">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {photos.map((p) => (
            <PhotoTile
              key={p.index}
              photo={p}
              shortCode={shortCode}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function TriptychEqual({
  photos,
  shortCode,
}: {
  photos: PhotoRef[];
  shortCode: string;
}) {
  return (
    <Reveal>
      <div className="page-wrap">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6">
          {photos.map((p) => (
            <PhotoTile
              key={p.index}
              photo={p}
              shortCode={shortCode}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function TriptychFeature({
  photos,
  shortCode,
}: {
  photos: PhotoRef[];
  shortCode: string;
}) {
  const [feature, ...rest] = photos;
  return (
    <Reveal>
      <div className="page-wrap">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <PhotoTile
              photo={feature}
              shortCode={shortCode}
              sizes="(max-width: 768px) 100vw, 58vw"
            />
          </div>
          <div className="grid grid-cols-1 gap-6 md:col-span-5">
            {rest.map((p) => (
              <PhotoTile
                key={p.index}
                photo={p}
                shortCode={shortCode}
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function QuadGrid({
  photos,
  shortCode,
}: {
  photos: PhotoRef[];
  shortCode: string;
}) {
  return (
    <Reveal>
      <div className="page-wrap">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-7">
          {photos.map((p) => (
            <PhotoTile
              key={p.index}
              photo={p}
              shortCode={shortCode}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function MasonryGrid({
  photos,
  shortCode,
}: {
  photos: PhotoRef[];
  shortCode: string;
}) {
  return (
    <Reveal>
      <div className="page-wrap">
        <div
          className={cn(
            "grid gap-6 md:gap-7",
            "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
          )}
        >
          {photos.map((p) => (
            <PhotoTile
              key={p.index}
              photo={p}
              shortCode={shortCode}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ))}
        </div>
      </div>
    </Reveal>
  );
}
