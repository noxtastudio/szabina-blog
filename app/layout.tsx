import type { Metadata } from "next";
import { Fraunces, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://szabina.example"),
  title: {
    default: "Szabina — The good and the hard",
    template: "%s · Szabina",
  },
  description:
    "Photo essays from the road. A field journal of the world's quieter corners and louder feelings, by Szabina.",
  openGraph: {
    title: "Szabina — The good and the hard",
    description:
      "Photo essays from the road. A field journal of the world's quieter corners and louder feelings.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${newsreader.variable} ${mono.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <main className="relative flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
