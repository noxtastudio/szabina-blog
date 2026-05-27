import Image from "next/image";
import Link from "next/link";
import {
  getAllStoryIndexEntries,
  getLatestStoryIndexEntry,
} from "@/lib/stories";
import { formatEditorialDate } from "@/lib/utils";
import { StoryCard } from "@/components/story-card";
import { ParallaxHero } from "@/components/motion/parallax-hero";
import { ClipReveal } from "@/components/motion/clip-reveal";
import { Reveal } from "@/components/motion/reveal";

export default async function HomePage() {
  const latest = await getLatestStoryIndexEntry();
  const all = await getAllStoryIndexEntries();
  const archive = latest ? all.filter((s) => s.slug !== latest.slug) : all;

  return (
    <>
      {/* ───────── Cover: the latest story as this issue's front page ───────── */}
      {latest ? (
        <section className="relative">
          <div className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
            <ParallaxHero className="absolute inset-0" amount={140}>
              <Image
                src={latest.hero.src}
                alt={latest.hero.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </ParallaxHero>

            {/* Tonal scrim — keeps the photo readable, never glossy */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[rgba(31,26,20,0.45)] via-[rgba(31,26,20,0.1)] to-[rgba(31,26,20,0.7)]" />

            {/* Masthead row (top) */}
            <div className="absolute inset-x-0 top-0 z-10">
              <div className="page-wrap flex items-center justify-between py-6 text-[var(--color-paper)] md:py-8">
                <span className="label text-[var(--color-paper)]/85">
                  Szabina · Vol. 01
                </span>
                <span className="label text-[var(--color-paper)]/85">
                  {formatEditorialDate(latest.date)}
                </span>
              </div>
            </div>

            {/* Title block (bottom-left of hero) */}
            <div className="absolute inset-x-0 bottom-0 z-10">
              <div className="page-wrap pb-16 md:pb-24 text-[var(--color-paper)]">
                <Reveal delay={0.1}>
                  <span className="label text-[var(--color-paper)]/85">
                    Latest essay · {latest.location}
                  </span>
                </Reveal>

                <ClipReveal delay={0.15}>
                  <h1
                    className="display mt-5 text-[clamp(3.5rem,11vw,11rem)] text-[var(--color-paper)]"
                    style={{
                      fontVariationSettings:
                        '"opsz" 144, "SOFT" 80, "WONK" 1',
                    }}
                  >
                    {latest.title}
                  </h1>
                </ClipReveal>

                <Reveal delay={0.35} className="mt-6 max-w-2xl">
                  <p className="lead text-[var(--color-paper)]/90">
                    {latest.excerpt}
                  </p>
                </Reveal>

                <Reveal delay={0.5}>
                  <div className="mt-8 flex items-center gap-3">
                    <Link
                      href={`/stories/${latest.slug}`}
                      className="label inline-flex items-center gap-3 border-b border-[var(--color-paper)]/40 pb-1 text-[var(--color-paper)] transition-[border-color,color] duration-500 hover:border-[var(--color-paper)] hover:text-[var(--color-paper)]"
                    >
                      Open the essay
                      <svg
                        width="22"
                        height="10"
                        viewBox="0 0 22 10"
                        fill="none"
                      >
                        <path
                          d="M0 5h20m0 0L16 1m4 4l-4 4"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                      </svg>
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Scroll cue */}
            <div className="absolute bottom-6 right-[clamp(1.25rem,4vw,3rem)] z-10 hidden md:block">
              <div className="flex flex-col items-center gap-3 text-[var(--color-paper)]/75">
                <span
                  className="label text-[var(--color-paper)]/75"
                  style={{ writingMode: "vertical-rl" }}
                >
                  Scroll
                </span>
                <span className="block h-10 w-px animate-[scroll-pulse_2.4s_ease-in-out_infinite] bg-[var(--color-paper)]/60" />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* ───────── Editorial intro ───────── */}
      <section className="relative">
        <div className="page-wrap grid grid-cols-1 gap-10 py-28 md:grid-cols-12 md:py-40">
          <div className="md:col-span-3">
            <Reveal>
              <span className="label">The issue</span>
            </Reveal>
          </div>
          <div className="md:col-span-9 lg:col-span-8">
            <Reveal delay={0.05}>
              <p className="h-serif text-[clamp(1.75rem,4vw,3rem)]">
                A field journal of the world&rsquo;s quieter corners and louder
                feelings — photographs and short essays from the road.{" "}
                <span className="text-[var(--color-ink-muted)]">
                  Made slowly, on purpose. New entries when the weather agrees.
                </span>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── Archive ───────── */}
      <section className="relative">
        <div className="page-wrap mb-10 flex items-baseline justify-between border-t border-[var(--color-sand)]/60 pt-8">
          <span className="label">Archive · all stories</span>
          <span className="label">{all.length} entries</span>
        </div>

        {archive.length > 0 ? (
          <div className="page-wrap flex flex-col gap-24 md:gap-32 pb-24">
            {archive.map((story, i) => (
              <StoryCard key={story.slug} story={story} index={i + 1} />
            ))}
          </div>
        ) : (
          <div className="page-wrap pb-32">
            <Reveal>
              <p className="h-serif max-w-xl text-2xl text-[var(--color-ink-muted)] md:text-3xl">
                The archive will fill in as the road keeps unfolding.
                More essays soon.
              </p>
            </Reveal>
          </div>
        )}
      </section>

      <style>
        {`@keyframes scroll-pulse {
            0%, 100% { transform: scaleY(0.5); opacity: 0.5; transform-origin: top; }
            50% { transform: scaleY(1); opacity: 1; transform-origin: top; }
        }`}
      </style>
    </>
  );
}
