export type PhotoRef = {
  src: string;
  alt: string;
  width: number;
  height: number;
  index: number; // for the small "MV — 03" label
  caption?: string;
};

export type StoryBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "photo"; photo: PhotoRef; bleed?: boolean }
  | { kind: "photo-group"; photos: PhotoRef[]; layout?: "equal" | "feature" }
  | { kind: "pullquote"; text: string; attribution?: string };

export type Story = {
  slug: string;
  title: string;
  subtitle?: string;
  location: string;
  /** Two-letter code used in tiny mono photo labels: "MV", "DV", "GC", … */
  shortCode: string;
  /** ISO date string */
  date: string;
  excerpt: string;
  hero: PhotoRef;
  intro: string;
  body: StoryBlock[];
  /** Optional approximate coordinates as display text */
  coordinates?: string;
  /** TBD marker: true if any text on this story is still placeholder */
  draft?: boolean;
};

export type StoryIndexEntry = Pick<
  Story,
  "slug" | "title" | "location" | "date" | "excerpt" | "hero" | "shortCode" | "draft"
>;
