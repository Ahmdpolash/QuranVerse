import { quranClient } from "@/lib/quran";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Share2, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Metadata } from "next";
import { VerseCard } from "@/components/verse-card";
import { PlaySurahButton } from "@/components/play-surah-button";
import { SurahSidebar } from "@/components/surah-sidebar";

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    try {
        const chapter = await quranClient.chapters.findById(id as any, { language: "en" as any });
        return {
            title: `${chapter.nameSimple} | Quran`,
            description: `Read ${chapter.nameSimple} from the Holy Quran`,
        };
    } catch (e) {
        return { title: "Quran" };
    }
}

export default async function ChapterPage({ params }: Props) {
    const { id } = await params;

    let chapter, versesData, allChapters;
    try {
        [chapter, versesData, allChapters] = await Promise.all([
            quranClient.chapters.findById(id as any, { language: "en" as any }),
            quranClient.verses.findByChapter(id as any, {
                language: "en" as any,
                translations: '20,161', // English & Bengali
                fields: { textUthmani: true },
                perPage: 286
            } as any),
            quranClient.chapters.findAll({ language: "en" as any })
        ]);
    } catch (e) {
        console.error(e);
        return notFound();
    }

    const verses: any[] = Array.isArray(versesData) ? versesData : [];
    const chaptersList: any[] = Array.isArray(allChapters) ? allChapters : ((allChapters as any)?.chapters || []);

    return (
        <main className="min-h-screen bg-background text-foreground pb-20 flex">
            <SurahSidebar currentChapterId={id} chapters={chaptersList} />
            <div className="flex-1 min-w-0">
                <div className="max-w-7xl mx-auto px-4 pt-4 md:pt-12">
                    <Link href="/quran" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors font-medium mb-8 lg:ml-0 ml-12">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Surahs
                    </Link>

                    <div className="text-center mb-12 space-y-4">
                        <h1 className="text-5xl font-arabic text-primary mb-2">{chapter?.nameArabic}</h1>
                        <h2 className="text-3xl font-bold font-poppins text-foreground">{chapter?.nameSimple}</h2>
                        <p className="text-muted-foreground">{chapter?.translatedName?.name} &bull; {chapter?.versesCount} Ayahs</p>
                        <PlaySurahButton chapterId={parseInt(id, 10)} />
                    </div>

                    {chapter?.bismillahPre && (
                        <div className="text-center mb-12 text-4xl font-arabic text-primary">
                            بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                        </div>
                    )}

                    <div className="space-y-12">
                        {verses.map((verse: any) => {
                            const englishTranslation = verse.translations?.find((t: any) => t.resourceId === 20)?.text?.replace(/<[^>]*>?/gm, '');
                            const bengaliTranslation = verse.translations?.find((t: any) => t.resourceId === 161)?.text?.replace(/<[^>]*>?/gm, '');

                            return (
                                <VerseCard
                                    key={verse.id}
                                    verse={verse}
                                    englishTranslation={englishTranslation || ''}
                                    bengaliTranslation={bengaliTranslation || ''}
                                    chapterName={chapter?.nameSimple || 'Surah'}
                                    chapterId={id}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </main>
    );
}
