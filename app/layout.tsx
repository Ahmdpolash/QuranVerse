import type { Metadata } from "next";
import { Poppins, Hind_Siliguri, Amiri } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { TranslationProvider } from "@/lib/translation-provider";
import { Toaster } from "sonner";

import { AudioProvider } from "@/lib/audio-provider";
import { GlobalAudioPlayer } from "@/components/global-audio-player";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind",
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "QuranVerse | All-in-One Islamic Platform",
    template: "%s | QuranVerse"
  },
  description: "Your comprehensive digital Islamic platform. Explore the Holy Quran, Hadith, 99 Names of Allah, and more with translations, tafsirs, and audio recitations.",
  keywords: ["Quran", "Islam", "Allah", "99 Names", "Hadith", "Tafsir", "Audio Quran", "Islamic Platform", "Muslim"],
  authors: [{ name: "Polash Ahmed" }],
  creator: "Polash Ahmed",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://quranverse.com",
    title: "QuranVerse | All-in-One Islamic Platform",
    description: "Your comprehensive digital Islamic platform. Explore the Holy Quran, Hadith, 99 Names of Allah, and more with translations, tafsirs, and audio recitations.",
    siteName: "QuranVerse",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuranVerse | All-in-One Islamic Platform",
    description: "Your comprehensive digital Islamic platform. Explore the Holy Quran, Hadith, 99 Names of Allah, and more.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${hindSiliguri.variable} ${amiri.variable} antialiased font-sans bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TranslationProvider>
            <AudioProvider>
              <Navbar />
              {children}
              <GlobalAudioPlayer />
            </AudioProvider>
          </TranslationProvider>
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
