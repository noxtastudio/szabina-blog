import Image from "next/image";
import Link from "next/link";
import type { StoryIndexEntry } from "@/lib/types";
import { formatEditorialDate, padPhotoIndex } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

type Props = {
  story: StoryIndexEntry;
  /** Position in the archive list, used for the mono index "01" label. */
  index: number;
};

export function StoryCard({ story, index }: Props) {
  return (
    <Reveal>
      <article className="group">
        <Link
          href={`/stories/${story.slug}`}
          className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10"
        >
          {/* Left rail: mono number */}
          <div className="hidden md:col-span-1 md:block">
            <span className="label">№ {padPhotoIndex(index)}</span>
          </div>

          {/* Photo */}
          <div className="md:col-span-5">
            <div
              className="relative overflow-hidden bg-[var(--color-paper-deep)]"
              style={{
                aspectRatio: `${story.hero.width} / ${story.hero.height}`,
              }}
            >
              <Image
                src={story.hero.src}
                alt={story.hero.alt}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
            </div>
          </div>

          {/* Meta + title */}
          <div className="flex flex-col justify-between md:col-span-6 md:py-2">
            <div>
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                <span className="label">
                  {formatEditorialDate(story.date)}
                </span>
                <span className="label">{story.location}</span>
                {story.draft ? (
                  <span className="label text-[var(--color-rust)]">
                    Draft text
                  </span>
                ) : null}
              </div>

              <h2 className="h-serif mt-6 text-5xl md:text-6xl lg:text-7xl">
                <span className="bg-[length:0%_1px] bg-[linear-gradient(to_right,currentColor_0,currentColor_100%)] bg-no-repeat bg-left-bottom transition-[background-size] duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[length:100%_1px]">
                  {story.title}
                </span>
              </h2>

              <p className="lead mt-5 max-w-prose">{story.excerpt}</p>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <span className="label">Read the essay</span>
              <span
                aria-hidden
                className="inline-block translate-x-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2"
              >
                <svg
                  width="22"
                  height="10"
                  viewBox="0 0 22 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 5h20m0 0L16 1m4 4l-4 4"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      </article>
    </Reveal>
  );
}
