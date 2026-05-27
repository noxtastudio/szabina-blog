import type { Story, StoryIndexEntry } from "./types";

/**
 * Local mock content. Mirrors the Sanity Story schema shape exactly,
 * so swapping to Sanity later is purely an env-var flip + query swap
 * inside the loader below — no component changes.
 *
 * NOTE: All prose marked with `[TBD]` is placeholder for Szabina to
 * replace. Voice: first person, reflective, present tense, no influencer
 * adjectives. Theme: "the good and the hard."
 */

const monumentValley: Story = {
  slug: "monument-valley",
  title: "Monument Valley",
  subtitle: "USA · part one",
  location: "Oljato-Monument Valley, Utah",
  shortCode: "MV",
  date: "2025-07-19",
  coordinates: "36.9833° N · 110.1024° W",
  excerpt:
    "The desert does not perform. It simply waits, and either you arrive on its terms or you don't arrive at all.",
  hero: {
    src: "/stories/monument-valley/Monument-Valley-1.jpg",
    alt: "A solitary sandstone pillar at sunset in Monument Valley, the sky soft amber, the foreground a tangle of dry grass.",
    width: 1080,
    height: 1440,
    index: 1,
  },
  intro:
    "[TBD — Szabina to rewrite] The road into Monument Valley empties out long before the valley itself begins. There is a stretch where the asphalt and the horizon agree on nothing, where the radio fails politely and the wind takes over the talking. I had been driving since before the light. By the time the first pillar rose out of the ground in front of me I had already forgotten what I had come here to find.",
  body: [
    {
      kind: "paragraph",
      text: "[TBD] The Navajo call it Tsé Biiʼ Ndzisgaii — the valley of the rocks. The Hollywood camera made it shorthand for the West, and the West made it shorthand for everything large and quiet. But standing there at the base of the Mittens you understand quickly that the postcard has been lying. The valley is not large. It is honest. There is a difference.",
    },
    {
      kind: "photo",
      bleed: true,
      photo: {
        src: "/stories/monument-valley/Monument-Valley-2.jpg",
        alt: "A wider view of the valley floor, dry grass burning gold in the low light, pillars retreating into haze.",
        width: 1080,
        height: 1440,
        index: 2,
      },
    },
    {
      kind: "pullquote",
      text: "The desert does not perform. It simply waits, and either you arrive on its terms or you don't arrive at all.",
    },
    {
      kind: "photo-group",
      layout: "equal",
      photos: [
        {
          src: "/stories/monument-valley/Monument-Valley-3.jpg",
          alt: "A red rock formation catching the last of the sun, deep shadow folds beneath it.",
          width: 1080,
          height: 1440,
          index: 3,
        },
        {
          src: "/stories/monument-valley/Monument-Valley-4.jpg",
          alt: "Another vantage of the same formation, the foreground rippled with old water lines.",
          width: 1080,
          height: 1440,
          index: 4,
        },
      ],
    },
    {
      kind: "paragraph",
      text: "[TBD] I had imagined I would feel small. I felt accurate instead — the right size, finally. The good and the hard of a place like this is the same thing said twice: there is no one here to meet you halfway. The wind does what it always does. The light leaves on schedule. You are responsible for your own reaction.",
    },
    {
      kind: "photo",
      bleed: true,
      photo: {
        src: "/stories/monument-valley/Monument-Valley-5.jpg",
        alt: "The Three Sisters formation in late afternoon, dust softening the air.",
        width: 1080,
        height: 1439,
        index: 5,
      },
    },
    {
      kind: "paragraph",
      text: "[TBD] Forrest Gump stopped running here, on this road, and I think about that often — that the place to stop running is the place where the land refuses to let you pretend. There is no pretending in Monument Valley. The pillars do not flatter you. They do not punish you either. They simply continue.",
    },
    {
      kind: "photo-group",
      layout: "equal",
      photos: [
        {
          src: "/stories/monument-valley/Monument-Valley-6.jpg",
          alt: "Sunset light slanting hard across a broken cliff face, sage and dust in the foreground.",
          width: 1080,
          height: 1440,
          index: 6,
        },
        {
          src: "/stories/monument-valley/Monument-Valley-7.jpg",
          alt: "The same hour, a different facing — a tower of stone going dark blue at the top while the base still glows.",
          width: 1080,
          height: 1440,
          index: 7,
        },
      ],
    },
    {
      kind: "paragraph",
      text: "[TBD] By the time I walked back to the car the air had gone cold in the way only the desert can manage: instantly, without warning, like a door closing in a house you don't own. There is more of the valley to come — what I saw the next morning belongs to another page — but for now this is what I want to hold: the first hour, before I knew anything, when the light was still doing the explaining.",
    },
    {
      kind: "photo",
      bleed: true,
      photo: {
        src: "/stories/monument-valley/Monument-Valley-8.jpg",
        alt: "Final frame: the last pillar lit, everything else giving up to dusk.",
        width: 1080,
        height: 1440,
        index: 8,
      },
    },
  ],
  draft: true,
};

const ALL_STORIES: Story[] = [monumentValley];

/* ─────────────────────────────────────────────────────────────
 * Data-access API. These are the only things the UI calls.
 * When Sanity is wired, swap these to GROQ queries — the
 * Story shape is identical, so nothing in components changes.
 * ───────────────────────────────────────────────────────────── */

export async function getAllStoryIndexEntries(): Promise<StoryIndexEntry[]> {
  return ALL_STORIES.map((s) => ({
    slug: s.slug,
    title: s.title,
    location: s.location,
    date: s.date,
    excerpt: s.excerpt,
    hero: s.hero,
    shortCode: s.shortCode,
    draft: s.draft,
  })).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getLatestStoryIndexEntry(): Promise<StoryIndexEntry | null> {
  const all = await getAllStoryIndexEntries();
  return all[0] ?? null;
}

export async function getStoryBySlug(slug: string): Promise<Story | null> {
  return ALL_STORIES.find((s) => s.slug === slug) ?? null;
}

export async function getAllStorySlugs(): Promise<{ slug: string }[]> {
  return ALL_STORIES.map((s) => ({ slug: s.slug }));
}
