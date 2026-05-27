import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEditorialDate(input: string | Date): string {
  const d = typeof input === "string" ? new Date(input) : input;
  const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = String(d.getDate()).padStart(2, "0");
  const year = String(d.getFullYear()).slice(-2);
  return `${month} · ${day} · ${year}`;
}

export function padPhotoIndex(n: number): string {
  return String(n).padStart(2, "0");
}
