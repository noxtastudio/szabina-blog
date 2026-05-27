# Szabina — Photo Journal

A calm, editorial photo-essay site for Szabina. Built with Next.js 16, Tailwind v4, the Motion library, and prepped for Sanity CMS.

> Theme: _"The good and the hard."_ A field journal of the world's quieter
> corners and louder feelings.

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS v4** with custom design tokens (`app/globals.css`)
- **Motion** (the successor to Framer Motion) — used for parallax hero
- **Pure-CSS reveal animations** for resilience across browsers
- **next/font** loading Fraunces (display), Newsreader (body), JetBrains Mono (labels) — all self-hosted
- **next/image** for optimized photo delivery
- Sanity CMS is scaffolded but not wired (intended next step — see "Hooking up Sanity" below)

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Project structure

```
app/
  page.tsx                 Home (latest story as cover + archive list)
  about/page.tsx           About
  stories/[slug]/page.tsx  Individual story page
  layout.tsx               Root layout, fonts, footer
  globals.css              Design tokens, fonts, keyframes

components/
  site-header.tsx          Brand + nav (rendered on inner pages)
  site-footer.tsx          Always-on footer
  story-card.tsx           Editorial card in the archive list
  photo.tsx                Single photo block (auto-centers portraits)
  photo-group.tsx          Diptych / triptych / quad layouts from -partN groups
  motion/
    reveal.tsx             CSS-only fade-up on mount
    clip-reveal.tsx        CSS-only clip-path reveal (used for hero titles)
    parallax-hero.tsx      Motion-driven scroll parallax for the home hero

lib/
  types.ts                 Story / PhotoBlock types (shared with future Sanity)
  stories.ts               Mock content + data-access functions
  utils.ts                 cn(), formatEditorialDate(), padPhotoIndex()

public/
  stories/<slug>/          Source photos for each story (1080×1440 JPGs)
```

## Adding a new story (current, file-based)

1. Drop the photos into `public/stories/<slug>/` (e.g. `public/stories/death-valley/`).
2. Add an entry to the `ALL_STORIES` array in `lib/stories.ts`. Copy the
   `monumentValley` object as a template — the `body` array mixes:
   - `{ kind: "paragraph", text }`
   - `{ kind: "photo", photo, bleed? }`
   - `{ kind: "photo-group", photos, layout? }` — diptych / triptych / quad auto-renders
   - `{ kind: "pullquote", text, attribution? }`
3. Photos with `-partN` suffixes in the source folder (`xx-3-part1.jpg`,
   `xx-3-part2.jpg`, …) belong together in a `photo-group`.

## Hooking up Sanity (next step)

The data layer in `lib/stories.ts` exposes:

```
getAllStoryIndexEntries()
getLatestStoryIndexEntry()
getStoryBySlug(slug)
getAllStorySlugs()
```

The `Story` shape in `lib/types.ts` mirrors a Sanity schema 1:1 — so swapping
to a real CMS means:

1. `npx sanity init` (free account at sanity.io)
2. Add the project ID + dataset to `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=...
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
3. Replace the in-memory `ALL_STORIES` array with GROQ queries (the function
   signatures stay the same — components do not change).

## Design tokens

All defined in `app/globals.css` under `@theme`:

| Token | Use |
|---|---|
| `--color-paper` `#F5EFE6` | Background |
| `--color-ink` `#1F1A14` | Body text |
| `--color-sand` `#D9C4A7` | Quiet accents |
| `--color-rust` `#A0461F` | Single accent (sparingly) |
| `--color-sage` `#7C7E60` | Neutral |
| `--font-display` | Fraunces |
| `--font-body` | Newsreader |
| `--font-mono` | JetBrains Mono |
| `--ease-quiet` | `cubic-bezier(0.22, 1, 0.36, 1)` |

## Notes

- `[TBD]` markers in story prose and the About page are placeholders for
  Szabina's own writing.
- The site is configured for static export (`next build`); deploy anywhere
  that serves static files (Vercel, Netlify, Cloudflare Pages, GitHub Pages).
- All photos are © Szabina.
