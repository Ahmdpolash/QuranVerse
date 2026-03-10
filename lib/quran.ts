import { QuranClient } from "@quranjs/api";

if (!process.env.NEXT_PUBLIC_CLIENT_ID || !process.env.NEXT_PUBLIC_CLIENT_SECRET) {
  console.warn("Quran API credentials not found in environment variables.");
}

export const quranClient = new QuranClient({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID || "",
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET || "",
});
