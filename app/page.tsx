import { namesData } from "@/lib/data";
import { NameCard } from "@/components/name-card";
import { Button } from "@/components/ui/button";
import { Headphones, Library, Sparkles, Navigation } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const dayIndex = Math.floor(Date.now() / 86400000) % 99;
  const nameOfTheDay = namesData[dayIndex];

  return (
    <main className="min-h-screen bg-background text-foreground pb-20 custom-scrollbar">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 opacity-50 z-0 pattern-bg" />

        <div className="z-10 space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent font-medium mb-4">
            <Sparkles className="w-5 h-5" />
            <span>Asmaul Husna</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary font-poppins drop-shadow-sm">
            99 Names of Allah
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground font-poppins max-w-2xl mx-auto text-balance drop-shadow-sm">
            Learn the beautiful names of Allah, their meanings, virtues, and listen to their pronunciation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link href="#names-grid">
              <Button size="lg" className="w-full sm:w-auto gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 px-8 rounded-full shadow-lg">
                <Library className="w-5 h-5" />
                Explore Names
              </Button>
            </Link>
            <Link href="#listen-all">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 pt-6 pb-6 px-8 rounded-full border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground text-lg shadow-sm">
                <Headphones className="w-5 h-5" />
                Listen All
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Daily Reminder Widget */}
      <section className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-2xl border border-secondary/20 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-10 -mt-10" />

          <div className="flex-1 space-y-2 text-center md:text-left">
            <h3 className="text-sm font-semibold text-accent uppercase tracking-wider">Name of the Day</h3>
            <h2 className="text-3xl font-bold text-primary">{nameOfTheDay.bangla}</h2>
            <p className="text-muted-foreground">Meaning: {nameOfTheDay.meaning}</p>
          </div>

          <div className="flex-1 text-center font-arabic text-5xl md:text-6xl text-primary drop-shadow-md">
            {nameOfTheDay.arbi}
          </div>

          <div className="flex-1 text-center md:text-right">
            <Link href={`/name/${nameOfTheDay.id}`}>
              <Button variant="secondary" className="rounded-full">
                Learn Virtues
                <Navigation className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Importance Section */}
      <section className="max-w-4xl mx-auto px-4 py-24 text-center space-y-8">
        <h2 className="text-3xl font-bold text-primary">Why Learn Asmaul Husna?</h2>
        <div className="bg-secondary/5 rounded-3xl p-8 border border-secondary/20 shadow-inner">
          <p className="text-xl italic font-serif text-muted-foreground leading-relaxed">
            “Allah has ninety-nine names, i.e. one-hundred minus one, and whoever knows them will go to Paradise.”
          </p>
          <p className="mt-4 font-semibold text-primary">- Sahih Al-Bukhari 2736</p>
        </div>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Memorizing, understanding, and living by these names brings peace to the heart, purifies intentions, and strengthens faith.
        </p>
      </section>

      {/* Names Grid Section */}
      <section id="names-grid" className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-primary">All 99 Names</h2>
          <div className="text-muted-foreground text-sm font-medium bg-secondary/10 px-4 py-2 rounded-full">
            1 to 99
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {namesData.map((name) => (
            <NameCard key={name.id} name={name} />
          ))}
        </div>
      </section>
    </main>
  );
}
