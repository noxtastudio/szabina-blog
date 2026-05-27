import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="relative z-30">
      <div className="page-wrap flex items-center justify-between py-6 md:py-8">
        <Link
          href="/"
          className="label text-[var(--color-ink)] hover:text-[var(--color-rust)] transition-colors"
          aria-label="Szabina — home"
        >
          Szabina
        </Link>

        <nav className="flex items-center gap-7 md:gap-10">
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
        </nav>
      </div>
    </header>
  );
}
