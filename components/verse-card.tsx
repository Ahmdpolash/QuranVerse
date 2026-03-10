"use client";

import { useState } from "react";
import { BookOpen, Share2, MessageSquare, Play, X, Bookmark, Copy, Flag, MoreHorizontal, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useTranslation } from "@/lib/translation-provider";
import { useAudio } from "@/lib/audio-provider";
import { cn } from "@/lib/utils";

const TAFSIRS = [
    { id: 165, name: "Tafsir Ahsanul Bayaan", lang: "bn" },
    { id: 381, name: "Tafsir Fathul Majid", lang: "bn" },
    { id: 164, name: "Tafseer Ibn Kathir", lang: "bn" },
    { id: 166, name: "Tafsir Abu Bakr Zakaria", lang: "bn" },
    { id: 169, name: "Ibn Kathir", lang: "en" },
    { id: 817, name: "Tazkirul Quran", lang: "en" },
];

export function VerseCard({
    verse,
    englishTranslation,
    bengaliTranslation,
    chapterName
}: {
    verse: any,
    englishTranslation: string,
    bengaliTranslation: string,
    chapterName: string
}) {
    const { language } = useTranslation();
    const { activeVerseKey, isPlaying, playVerse } = useAudio();
    const [isTafsirOpen, setIsTafsirOpen] = useState(false);
    const [activeTafsir, setActiveTafsir] = useState<number | null>(null);
    const [tafsirData, setTafsirData] = useState<string | null>(null);
    const [isLoadingTafsir, setIsLoadingTafsir] = useState(false);

    const isCurrentVersePlaying = isPlaying && activeVerseKey === verse.verseKey;
    const isCurrentVerseActive = activeVerseKey === verse.verseKey;

    const fetchTafsir = async (tafsirId: number) => {
        setActiveTafsir(tafsirId);
        setIsLoadingTafsir(true);
        setTafsirData(null);
        try {
            const res = await fetch(`https://api.quran.com/api/v4/tafsirs/${tafsirId}/by_ayah/${verse.verseKey}`);
            const data = await res.json();
            setTafsirData(data.tafsir.text);
        } catch (error) {
            console.error("Error fetching tafsir", error);
            setTafsirData("Failed to load tafsir.");
        } finally {
            setIsLoadingTafsir(false);
        }
    };

    const handleOpenTafsir = () => {
        setIsTafsirOpen(true);
        if (!tafsirData) {
            const defaultId = language === "en" ? 169 : 165;
            fetchTafsir(defaultId);
        }
    };

    const handleRecite = () => {
        playVerse(verse.verseKey, parseInt(verse.chapterId, 10));
    };

    const verseHtml = (
        <div className={cn("flex flex-col gap-6 md:gap-8 p-4 sm:p-6 rounded-2xl transition-all duration-500",
            isCurrentVerseActive ? "bg-emerald-500/10 shadow-sm border border-emerald-500/20" : "bg-transparent border-transparent"
        )}>
            <div className="flex flex-col w-full">
                <p className={cn(
                    "text-3xl md:text-5xl font-arabic text-right leading-loose md:leading-[2.5] transition-colors duration-500",
                    isCurrentVerseActive ? "text-emerald-600 dark:text-emerald-400" : "text-primary"
                )} dir="rtl">
                    {verse.textUthmani}
                </p>
            </div>
            <div className="flex flex-col gap-4 w-full">
                <div className="flex items-start gap-4 mt-2">
                    {!isTafsirOpen && (
                        <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0 text-sm mt-1 transition-colors duration-500",
                            isCurrentVerseActive ? "bg-emerald-600 text-white" : "bg-secondary/10 text-primary"
                        )}>
                            {verse.verseNumber}
                        </div>
                    )}
                    <div className="flex-1 space-y-4">
                        {language === "bn" && bengaliTranslation && (
                            <p className="text-lg md:text-xl font-bengali text-foreground/90 leading-relaxed text-balance">
                                {bengaliTranslation}
                            </p>
                        )}
                        {language === "en" && englishTranslation && (
                            <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-balance">
                                {englishTranslation}
                            </p>
                        )}

                        {!isTafsirOpen && (
                            <div className="flex items-center gap-6 mt-6 pt-4 border-t border-border/10">
                                <button
                                    onClick={handleOpenTafsir}
                                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                                >
                                    <BookOpen className="w-4 h-4" /> {language === "en" ? "Tafsir" : "তাফসির"}
                                </button>
                                <button
                                    onClick={handleRecite}
                                    className={cn(
                                        "text-sm font-medium transition-colors flex items-center gap-2",
                                        isCurrentVerseActive ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground hover:text-primary"
                                    )}
                                >
                                    <Play className="w-4 h-4" /> {language === "en" ? "Recite" : "পাঠ"}
                                </button>
                                <button className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4" /> {language === "en" ? "Reflect" : "প্রতিফলন"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div className="pb-8 border-b border-border/20 last:border-0 relative">
                {verseHtml}
            </div>

            <Sheet open={isTafsirOpen} onOpenChange={setIsTafsirOpen}>
                <SheetContent side="bottom" className="h-[90vh] sm:h-[85vh] flex flex-col p-0 gap-0 rounded-t-3xl overflow-hidden bg-background border-border shadow-2xl">
                    <SheetHeader className="p-4 border-b border-border/20 flex flex-row items-center justify-between sticky top-0 bg-background/95 backdrop-blur z-10 shrink-0">
                        <div className="flex items-center gap-4">
                            <div className="px-3 py-1.5 bg-secondary/10 rounded-md text-sm font-medium text-primary flex items-center gap-2">
                                {chapterName} <span className="opacity-50">▾</span>
                            </div>
                            <div className="flex items-center bg-secondary/10 rounded-md overflow-hidden">
                                <button className="px-3 py-1.5 hover:bg-secondary/20 border-r border-border/10 text-xs">{"<-"}</button>
                                <button className="px-3 py-1.5 hover:bg-secondary/20 border-r border-border/10 text-xs">{">"}</button>
                                <button className="px-3 py-1.5 hover:bg-secondary/20 text-xs">{"⤢"}</button>
                            </div>
                        </div>

                        <SheetTitle className="sr-only">Tafsir for Verse {verse.verseKey}</SheetTitle>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar relative">
                        <div className="max-w-4xl mx-auto space-y-8">
                            {/* Verse Actions Header */}
                            <div className="flex items-center justify-between text-muted-foreground">
                                <div className="flex items-center gap-4">
                                    <span className="font-bold text-foreground text-lg">{verse.verseKey}</span>
                                    <button className="hover:text-primary transition-colors"><Play className="w-5 h-5 fill-current" /></button>
                                    <button className="hover:text-primary transition-colors"><Bookmark className="w-5 h-5" /></button>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button className="hover:text-primary transition-colors"><Copy className="w-5 h-5" /></button>
                                    <button className="hover:text-primary transition-colors"><Share2 className="w-5 h-5" /></button>
                                    <button className="hover:text-primary transition-colors"><Flag className="w-5 h-5" /></button>
                                    <button className="hover:text-primary transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
                                </div>
                            </div>

                            {/* The Verse & Translations in Modal */}
                            <div className="py-6 border-b border-border/10">
                                {verseHtml}
                            </div>

                            {/* Tafsir Tools / Tabs */}
                            <div className="flex flex-wrap items-center gap-2 pt-4">
                                <Button variant="outline" size="sm" className="bg-secondary/10 text-xs h-8">Aa</Button>
                                <Button variant="outline" size="sm" className="bg-secondary/10 text-xs h-8">
                                    {language === "en" ? "English ▾" : "বাংলা ▾"}
                                </Button>

                                {TAFSIRS.filter(t => t.lang === language).map(t => (
                                    <Button
                                        key={t.id}
                                        onClick={() => fetchTafsir(t.id)}
                                        variant={activeTafsir === t.id ? "default" : "outline"}
                                        size="sm"
                                        className={cn(
                                            "text-xs h-8 transition-colors rounded-full px-4",
                                            activeTafsir === t.id ? "bg-emerald-600 hover:bg-emerald-700 text-white border-transparent shadow-md" : "bg-transparent border-border/30 hover:bg-secondary/10"
                                        )}
                                    >
                                        {t.name}
                                    </Button>
                                ))}
                            </div>

                            {/* Tafsir Content */}
                            <div className="pt-6 pb-20">
                                {isLoadingTafsir ? (
                                    <div className="flex items-center gap-3 text-muted-foreground animate-pulse">
                                        <FileText className="w-5 h-5" />
                                        <span>{language === "en" ? "Loading Tafsir..." : "তাফসির লোড হচ্ছে..."}</span>
                                    </div>
                                ) : tafsirData ? (
                                    <div
                                        className={cn(
                                            "prose prose-lg dark:prose-invert max-w-none text-foreground/90 leading-loose tafsir-content",
                                            language === "bn" ? "font-bengali" : "font-sans"
                                        )}
                                        dangerouslySetInnerHTML={{ __html: tafsirData }}
                                    />
                                ) : null}
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            <style jsx global>{`
        .tafsir-content p {
          margin-bottom: 1.5em;
          line-height: 1.8;
        }
        .tafsir-content span.arabic {
          font-family: var(--font-amiri), serif;
          font-size: 1.5em;
          color: var(--primary);
        }
      `}</style>
        </>
    );
}
