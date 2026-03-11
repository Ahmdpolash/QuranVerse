import { namesData } from "@/lib/data";
import { NameCard } from "@/components/name-card";
import { BookOpen } from "lucide-react";

export const metadata = {
  title: "99 Names of Allah - Asmaul Husna",
  description: "Learn and listen to the 99 Names of Allah (Asmaul Husna) with meanings and virtues.",
};

export default function NamesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pb-20 custom-scrollbar pt-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary font-poppins flex items-center justify-center gap-3">
              <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-emerald-600" />
              99 Names of Allah
            </h1>
            <p className="text-lg text-muted-foreground font-poppins max-w-2xl mx-auto text-balance">
              Memorizing, understanding, and living by these names brings peace to the heart, purifies intentions, and strengthens faith.
            </p>
        </div>

        <div className="flex items-center justify-between mb-8 border-b border-border/40 pb-4">
          <h2 className="text-2xl font-semibold text-foreground">Asmaul Husna List</h2>
          <div className="text-emerald-700 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400 font-medium px-4 py-1.5 rounded-full text-sm">
            Total 99
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {namesData.map((name) => (
            <NameCard key={name.id} name={name} />
          ))}
        </div>
      </div>
    </main>
  );
}
