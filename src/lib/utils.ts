import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const FLAG_REGEX = /[\u{1F1E6}-\u{1F1FF}]{2}/u;

const LOCATION_FLAGS = [
  { pattern: /\bHong Kong SAR\b/i, flag: "🇭🇰" },
  { pattern: /\bHong Kong\b/i, flag: "🇭🇰" },
  { pattern: /\bItaly\b/i, flag: "🇮🇹" },
  { pattern: /\bCanada\b/i, flag: "🇨🇦" },
  { pattern: /\bThe Netherlands\b/i, flag: "🇳🇱" },
  { pattern: /\bNetherlands\b/i, flag: "🇳🇱" },
  { pattern: /\bIreland\b/i, flag: "🇮🇪" },
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatLocationWithFlag(location: string) {
  if (!location || FLAG_REGEX.test(location)) {
    return location;
  }

  const matchedLocation = LOCATION_FLAGS.find(({ pattern }) =>
    pattern.test(location)
  );

  return matchedLocation ? `${location} ${matchedLocation.flag}` : location;
}

export function formatDate(date: string | Date) {
  // Use UTC to ensure consistent formatting between server and client
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
