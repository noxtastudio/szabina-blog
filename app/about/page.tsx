import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { ClipReveal } from "@/components/motion/clip-reveal";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "About",
  description:
    "A short note about Szabina and what this journal is trying to be.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <article className="relative pb-32 pt-4 md:pt-12 lg:pt-20">
      <header className="page-wrap">
        <span className="label">About the journal</span>
        <ClipReveal delay={0.05}>
          <h1
            className="display mt-6 text-[clamp(3rem,11vw,10rem)]"
            style={{
              fontVariationSettings: '"opsz" 144, "SOFT" 80, "WONK" 1',
            }}
          >
            Szabina
          </h1>
        </ClipReveal>
      </header>

      <section className="page-wrap mt-20 grid grid-cols-1 gap-12 md:mt-32 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-4 md:col-start-1">
          <Reveal>
            <p className="h-serif text-3xl md:text-4xl">
              The good and the hard, kept honest.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="label mt-6 normal-case tracking-normal text-[var(--color-ink-muted)]">
              [TBD — Szabina&rsquo;s bio goes here. Two or three paragraphs in
              first person.]
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <Reveal delay={0.1}>
            <p
              className="text-[var(--text-body-lg)] leading-[1.75] text-[var(--color-ink-soft)]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              [TBD] I started this journal because I needed somewhere to put
              the things photographs can&rsquo;t finish saying on their own.
              The places here are real and so are the feelings — the days
              where the light was generous, and the days where it wasn&rsquo;t.
              I don&rsquo;t want to flatten one into the other.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p
              className="mt-6 text-[var(--text-body-lg)] leading-[1.75] text-[var(--color-ink-soft)]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              [TBD] New entries land when the weather agrees. If you want to be
              kept in the loop, write to me at the address below. I read
              everything; I answer most of it.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="page-wrap mt-24 md:mt-32">
        <div className="grid grid-cols-1 gap-10 border-t border-[var(--color-sand)]/60 pt-10 md:grid-cols-3">
          <Reveal>
            <div>
              <span className="label">Find me</span>
              <p className="h-serif mt-2 text-2xl">
                <a
                  href="https://instagram.com/szabina.bks"
                  className="link-quiet"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  @szabina.bks
                </a>
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div>
              <span className="label">Write</span>
              <p className="h-serif mt-2 text-2xl">
                <a
                  href="mailto:hello@szabina.example"
                  className="link-quiet"
                >
                  hello@szabina.example
                </a>
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <span className="label">Currently</span>
              <p className="h-serif mt-2 text-2xl text-[var(--color-ink-muted)]">
                [TBD — somewhere]
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
    </>
  );
}
