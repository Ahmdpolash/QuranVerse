"use client";

import React, { useState, useRef, useEffect } from "react";
import { BookOpen, Share2, MessageSquare, Play, Pause, X, Bookmark, Copy, Flag, MoreHorizontal, FileText } from "lucide-react";
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
    chapterName,
    chapterId
}: {
    verse: any,
    englishTranslation: string,
    bengaliTranslation: string,
    chapterName: string,
    chapterId: string
}) {
    const { language } = useTranslation();
    const { activeVerseKey, isPlaying, playVerse } = useAudio();
    const [isTafsirOpen, setIsTafsirOpen] = useState(false);
    const [activeTafsir, setActiveTafsir] = useState<number | null>(null);
    const [tafsirData, setTafsirData] = useState<string | null>(null);
    const [isLoadingTafsir, setIsLoadingTafsir] = useState(false);

    // Add ref for auto-scrolling
    const cardRef = React.useRef<HTMLDivElement>(null);

    const isCurrentVersePlaying = isPlaying && activeVerseKey === verse.verseKey;
    const isCurrentVerseActive = activeVerseKey === verse.verseKey;

    // Auto scroll when active
    React.useEffect(() => {
        if (isCurrentVerseActive && cardRef.current && !isTafsirOpen) {
            cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [isCurrentVerseActive, isTafsirOpen]);

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
        playVerse(verse.verseKey, parseInt(chapterId, 10));
    };

    const handleCopy = () => {
        const textToCopy = `${chapterName} (${verse.verseKey})\n\n${verse.textUthmani}\n\n${bengaliTranslation || englishTranslation}\n\nhttps://quran.com/${verse.verseKey.replace(':', '/')}`;
        navigator.clipboard.writeText(textToCopy);
    };

    const verseHtml = (
        <div
            ref={cardRef}
            className={cn("flex flex-col gap-6 md:gap-8 p-6 md:p-8 rounded-2xl transition-all duration-500",
                isCurrentVerseActive
                    ? "bg-emerald-50 shadow-md border-emerald-500/30 dark:bg-emerald-950/20 dark:border-emerald-500/20 border-2"
                    : "bg-white dark:bg-card shadow-sm border border-border/40 hover:border-border hover:shadow-md"
            )}>
            {/* Top Action Bar */}
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4 text-muted-foreground">
                    <span className="font-semibold text-lg text-primary">{verse.verseKey}</span>
                    <button onClick={handleRecite} className="hover:text-emerald-600 transition-colors cursor-pointer" title="Play Verse">
                        {isCurrentVerseActive && isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5" />}
                    </button>
                    <button className="hover:text-emerald-600 transition-colors cursor-pointer" title="Bookmark">
                        <Bookmark className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                    <button className="hover:text-emerald-600 transition-colors cursor-pointer" onClick={handleCopy} title="Copy Verse text">
                        <Copy className="w-5 h-5" />
                    </button>
                    <button className="hover:text-emerald-600 transition-colors cursor-pointer" title="Share Verse">
                        <Share2 className="w-5 h-5" />
                    </button>
                    <button className="hover:text-emerald-600 transition-colors cursor-pointer" title="More Options">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="flex flex-col w-full">
                <p className={cn(
                    "text-3xl md:text-5xl font-arabic text-right leading-loose md:leading-[2.5] transition-colors duration-500 cursor-pointer",
                    isCurrentVerseActive ? "text-emerald-700 dark:text-emerald-400" : "text-primary hover:text-emerald-600 dark:hover:text-emerald-500"
                )} dir="rtl" onClick={handleRecite} title="Click to play audio">
                    {verse.textUthmani}
                </p>
            </div>
            <div className="flex flex-col gap-4 w-full">
                <div className="flex items-start gap-4 mt-2">
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
                                    className="text-sm font-medium text-emerald-600/80 dark:text-emerald-400/80 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-950/30 cursor-pointer"
                                >
                                    <BookOpen className="w-4 h-4" /> {language === "en" ? "Tafsir" : "তাফসির"}
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
            <div className="pb-8 relative">
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
