import { Button } from "@/components/ui/button";
import { BookOpen, Headphones, Library, Sparkles, Navigation, ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground pb-20 custom-scrollbar">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-emerald-900/5 opacity-50 z-0 pattern-bg dark:bg-emerald-900/10" />

        {/* Animated Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 delay-1000 animate-pulse" />

        <div className="z-10 space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-medium mb-4 shadow-sm border border-emerald-200 dark:border-emerald-800">
            <Sparkles className="w-5 h-5" />
            <span>Welcome to QuranVerse</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary font-poppins drop-shadow-sm leading-tight">
            Your Digital Islamic <br className="hidden md:block" />
            <span className="text-emerald-600 dark:text-emerald-500">Ecosystem</span>
          </h1>

          <p className="text-lg md:text-2xl text-muted-foreground font-poppins max-w-2xl mx-auto text-balance drop-shadow-sm leading-relaxed mt-6">
            Explore the Holy Quran with Tafsir, immerse yourself in the 99 Names of Allah, and discover Hadith all in one beautifully designed platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/quran">
              <Button size="lg" className="w-full cursor-pointer sm:w-auto gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-lg py-6 px-8 rounded-full shadow-lg transition-transform hover:scale-105 duration-300">
                <BookOpen className="w-5 h-5" />
                Read Quran Now
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
            <Link href="/99-names">
              <Button size="lg" variant="outline" className="w-full cursor-pointer hover:text-white sm:w-auto gap-2 pt-6 pb-6 px-8 rounded-full border-2 border-primary text-primary hover:bg-primary/5 text-lg shadow-sm transition-transform hover:scale-105 duration-300">
                <Library className="w-5 h-5" />
                Explore 99 Names
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="max-w-7xl mx-auto px-4 py-24 relative z-20">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-primary">Everything You Need</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">A seamless, ad-free experience designed to bring you closer to your faith.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Feature 1: Quran */}
          <div className="group relative bg-card rounded-3xl p-8 shadow-sm border border-border/40 hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 overflow-hidden text-center md:text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full -z-10 group-hover:bg-emerald-500/10 transition-colors" />
            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0 shadow-sm">
              <BookOpen className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Holy Quran</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">Read the Quran with multiple translations, word-by-word meaning, renowned Tafsirs and synchronized audio playback.</p>
            <Link href="/quran" className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-medium hover:underline">
              Start Reading <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* Feature 2: 99 Names */}
          <div className="group relative bg-card rounded-3xl p-8 shadow-sm border border-border/40 hover:shadow-xl hover:border-primary/30 transition-all duration-300 overflow-hidden text-center md:text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors" />
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0 shadow-sm">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Asmaul Husna</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">Memorize and understand the 99 Names of Allah. Discover their profound meanings, virtues, and correct Arabic pronunciation.</p>
            <Link href="/99-names" className="inline-flex items-center text-primary font-medium hover:underline">
              Explore Names <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* Feature 3: Hadith */}
          <div className="group relative bg-card rounded-3xl p-8 shadow-sm border border-border/40 hover:shadow-xl hover:border-amber-500/30 transition-all duration-300 overflow-hidden text-center md:text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full -z-10 group-hover:bg-amber-500/10 transition-colors" />
            <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0 shadow-sm">
              <Star className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3 flex items-center justify-center md:justify-start gap-3">
              Hadith
              <span className="text-[10px] uppercase font-bold tracking-wider bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 px-2 py-1 rounded-full">Coming Soon</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">Access authentic Hadith collections including Sahih Al-Bukhari and Sahih Muslim with advanced searching and filtering.</p>
            <button disabled className="inline-flex items-center text-muted-foreground font-medium cursor-not-allowed">
              In Development
            </button>
          </div>

        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto px-4 py-12 text-center space-y-8">
        <div className="bg-emerald-900/5 dark:bg-emerald-900/20 rounded-[3rem] p-10 md:p-16 border border-emerald-500/20 shadow-inner relative overflow-hidden">
          <div className="absolute inset-0 bg-emerald-500/5 pattern-bg" />
          <div className="relative z-10">
            <p className="text-2xl md:text-3xl font-serif text-emerald-800 dark:text-emerald-200 leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
              “Indeed, in the remembrance of Allah do hearts find rest.”
            </p>
            <p className="mt-6 font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest text-sm">- Quran 13:28</p>
          </div>
        </div>
      </section>

    </main>
  );
}
