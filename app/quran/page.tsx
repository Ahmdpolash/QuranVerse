import { quranClient } from "@/lib/quran";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { BookOpen, Navigation } from "lucide-react";

export const revalidate = 3600; // Cache for 1 hour

export default async function QuranPage() {
    const chapters = await quranClient.chapters.findAll({ language: "en" as any });

    return (
        <main className="min-h-screen bg-background text-foreground pb-20 custom-scrollbar">
            <section className="relative w-full h-[40vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden mb-12">
                <div className="absolute inset-0 bg-secondary/5 opacity-50 z-0 pattern-bg" />

                <div className="z-10 space-y-6 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent font-medium mb-4">
                        <BookOpen className="w-5 h-5" />
                        <span>Al-Qur'an</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary font-poppins drop-shadow-sm">
                        The Noble Quran
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground font-poppins max-w-2xl mx-auto text-balance drop-shadow-sm">
                        Read, study, and learn the Holy Quran.
                    </p>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {chapters.map((chapter) => (
                        <Link key={chapter.id} href={`/quran/${chapter.id}`} className="block group">
                            <Card className="p-6 h-full hover:shadow-xl transition-all border border-border group-hover:border-accent relative overflow-hidden flex items-center justify-between">
                                <div className="absolute top-0 left-0 w-1 h-full bg-accent/30 group-hover:bg-accent transition-colors" />

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-primary font-bold">
                                        {chapter.id}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold font-poppins text-foreground group-hover:text-primary transition-colors">
                                            {chapter.nameSimple}
                                        </h2>
                                        <p className="text-sm text-muted-foreground">
                                            {chapter.translatedName.name} &bull; {chapter.versesCount} Ayahs
                                        </p>
                                    </div>
                                </div>

                                <div className="text-3xl font-arabic text-primary/80 group-hover:text-primary pl-4 border-l border-border/50 text-right">
                                    {chapter.nameArabic}
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
