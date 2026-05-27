import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  getAllStorySlugs,
  getAllStoryIndexEntries,
  getStoryBySlug,
} from "@/lib/stories";
import type { StoryBlock } from "@/lib/types";
import { formatEditorialDate, padPhotoIndex } from "@/lib/utils";
import { Photo } from "@/components/photo";
import { PhotoGroup } from "@/components/photo-group";
import { Reveal } from "@/components/motion/reveal";
import { ClipReveal } from "@/components/motion/clip-reveal";
import { SiteHeader } from "@/components/site-header";

export async function generateStaticParams() {
  return getAllStorySlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) return {};
  return {
    title: story.title,
    description: story.excerpt,
    openGraph: {
      title: `${story.title} · Szabina`,
      description: story.excerpt,
      images: [story.hero.src],
    },
  };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) notFound();

  const all = await getAllStoryIndexEntries();
  const idx = all.findIndex((s) => s.slug === story.slug);
  const nextStory = idx > 0 ? all[idx - 1] : null;
  const prevStory = idx < all.length - 1 ? all[idx + 1] : null;

  return (
    <>
      <SiteHeader />
      <article className="relative pb-32">
      {/* ───────── Title spread (cover page of the essay) ───────── */}
      <header className="relative">
        <div className="page-wrap pt-4 md:pt-10 lg:pt-16">
          {/* Breadcrumb mono row */}
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
            <Link href="/" className="label link-quiet">
              ← Back to stories
            </Link>
            <span className="label text-[var(--color-ink-muted)]">
              Essay № {padPhotoIndex(all.length - idx)} of{" "}
              {padPhotoIndex(all.length)}
            </span>
          </div>

          {/* Meta strip */}
          <div className="mt-14 flex flex-wrap items-baseline gap-x-8 gap-y-2 md:mt-20">
            <span className="label">{story.location}</span>
            <span className="label">{formatEditorialDate(story.date)}</span>
            {story.coordinates ? (
              <span className="label">{story.coordinates}</span>
            ) : null}
            {story.draft ? (
              <span className="label text-[var(--color-rust)]">
                Draft prose · TBD
              </span>
            ) : null}
          </div>

          {/* Title */}
          <ClipReveal delay={0.05}>
            <h1
              className="display mt-7 text-[clamp(3.25rem,12vw,11.5rem)]"
              style={{
                fontVariationSettings: '"opsz" 144, "SOFT" 80, "WONK" 1',
              }}
            >
              {story.title}
            </h1>
          </ClipReveal>

          {story.subtitle ? (
            <Reveal delay={0.2}>
              <p className="h-serif mt-3 text-2xl italic text-[var(--color-ink-muted)] md:text-3xl">
                {story.subtitle}
              </p>
            </Reveal>
          ) : null}
        </div>
      </header>

      {/* ───────── Hero photo ───────── */}
      <section className="relative mt-16 md:mt-24">
        <ClipReveal>
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-paper-deep)] md:aspect-[16/10]">
            <Image
              src={story.hero.src}
              alt={story.hero.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </ClipReveal>
        <div className="page-wrap mt-3 flex items-baseline justify-between gap-6">
          <span className="label">
            {story.shortCode} — {padPhotoIndex(story.hero.index)}
          </span>
          <span className="label normal-case tracking-normal text-[var(--color-ink-muted)]">
            Cover frame
          </span>
        </div>
      </section>

      {/* ───────── Intro paragraph ───────── */}
      <section className="relative">
        <div className="page-wrap grid grid-cols-1 gap-10 py-24 md:grid-cols-12 md:py-36">
          <div className="md:col-span-3 md:col-start-2">
            <Reveal>
              <span className="label">An entry</span>
            </Reveal>
          </div>
          <div className="md:col-span-7 lg:col-span-6">
            <Reveal delay={0.05}>
              <p className="h-serif text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.25]">
                {story.intro}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── Body ───────── */}
      <div className="flex flex-col gap-24 md:gap-32">
        {story.body.map((block, i) => (
          <BodyBlock key={i} block={block} shortCode={story.shortCode} />
        ))}
      </div>

      {/* ───────── Footer rail: prev / next ───────── */}
      <nav className="page-wrap mt-32 grid grid-cols-1 gap-10 border-t border-[var(--color-sand)]/60 pt-10 md:grid-cols-2">
        {prevStory ? (
          <Link href={`/stories/${prevStory.slug}`} className="group block">
            <span className="label">Previous essay</span>
            <p className="h-serif mt-2 text-3xl md:text-4xl">
              <span className="bg-[length:0%_1px] bg-[linear-gradient(to_right,currentColor_0,currentColor_100%)] bg-no-repeat bg-left-bottom transition-[background-size] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[length:100%_1px]">
                {prevStory.title}
              </span>
            </p>
            <span className="label mt-2 block normal-case tracking-normal text-[var(--color-ink-muted)]">
              {prevStory.location}
            </span>
          </Link>
        ) : (
          <div className="hidden md:block" />
        )}

        {nextStory ? (
          <Link
            href={`/stories/${nextStory.slug}`}
            className="group block md:text-right"
          >
            <span className="label">Next essay</span>
            <p className="h-serif mt-2 text-3xl md:text-4xl">
              <span className="bg-[length:0%_1px] bg-[linear-gradient(to_right,currentColor_0,currentColor_100%)] bg-no-repeat bg-left-bottom transition-[background-size] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[length:100%_1px]">
                {nextStory.title}
              </span>
            </p>
            <span className="label mt-2 block normal-case tracking-normal text-[var(--color-ink-muted)]">
              {nextStory.location}
            </span>
          </Link>
        ) : (
          <div className="md:text-right">
            <span className="label">No newer essay yet</span>
            <p className="h-serif mt-2 text-2xl text-[var(--color-ink-muted)] md:text-3xl">
              You&rsquo;ve reached the front of the journal.
            </p>
          </div>
        )}
      </nav>
    </article>
    </>
  );
}

/* ──────── Body block renderer ──────── */

function BodyBlock({
  block,
  shortCode,
}: {
  block: StoryBlock;
  shortCode: string;
}) {
  switch (block.kind) {
    case "paragraph":
      return (
        <section className="relative">
          <div className="page-wrap grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7 md:col-start-3 lg:col-span-6">
              <Reveal>
                <p
                  className="text-[var(--text-body-lg)] leading-[1.7] text-[var(--color-ink-soft)]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {block.text}
                </p>
              </Reveal>
            </div>
          </div>
        </section>
      );

    case "photo":
      return <Photo photo={block.photo} shortCode={shortCode} bleed={block.bleed} />;

    case "photo-group":
      return (
        <PhotoGroup
          photos={block.photos}
          shortCode={shortCode}
          layout={block.layout}
        />
      );

    case "pullquote":
      return (
        <section className="relative">
          <div className="page-wrap grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-1 md:col-start-2 md:flex md:items-start md:justify-end">
              <Reveal>
                <span
                  aria-hidden
                  className="block text-[var(--color-rust)] text-7xl leading-none md:translate-y-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  &ldquo;
                </span>
              </Reveal>
            </div>
            <div className="md:col-span-8 lg:col-span-7">
              <Reveal delay={0.05}>
                <p className="pullquote text-[clamp(2rem,4.5vw,3.75rem)]">
                  {block.text}
                </p>
              </Reveal>
              {block.attribution ? (
                <Reveal delay={0.2}>
                  <span className="label mt-5 block normal-case tracking-normal text-[var(--color-ink-muted)]">
                    — {block.attribution}
                  </span>
                </Reveal>
              ) : null}
            </div>
          </div>
        </section>
      );
  }
}
