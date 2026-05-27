import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-32 border-t border-[var(--color-sand)]/60">
      <div className="page-wrap flex flex-col gap-10 py-14 md:flex-row md:items-end md:justify-between md:gap-6 md:py-20">
        <div className="max-w-md">
          <p className="h-serif text-3xl md:text-4xl">
            Field notes from the<br /> edges of a small life.
          </p>
          <p className="label mt-5">Photo essays by Szabina · 2024 — present</p>
        </div>

        <nav className="flex flex-col gap-2 md:items-end">
          <Link href="/" className="label link-quiet">
            Stories
          </Link>
          <Link href="/about" className="label link-quiet">
            About
          </Link>
          <a
            href="https://instagram.com/szabina.bks"
            target="_blank"
            rel="noreferrer noopener"
            className="label link-quiet"
          >
            Instagram
          </a>
          <a
            href="mailto:hello@szabina.example"
            className="label link-quiet"
          >
            Contact
          </a>
        </nav>
      </div>

      <div className="page-wrap pb-8">
        <div className="flex flex-col justify-between gap-3 border-t border-[var(--color-sand)]/40 pt-6 md:flex-row">
          <span className="label">© Szabina · All photographs by the author</span>
          <span className="label">Made with intent, not in a hurry</span>
        </div>
      </div>
    </footer>
  );
}
