import type { Metadata } from "next";
import { Poppins, Hind_Siliguri, Amiri } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { TranslationProvider } from "@/lib/translation-provider";

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
  title: "99 Names of Allah",
  description: "Learn the beautiful names of Allah, their meanings, virtues, and listen to their pronunciation.",
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
        </ThemeProvider>
      </body>
    </html>
  );
}
