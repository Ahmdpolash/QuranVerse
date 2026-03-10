"use client";

import { useAudio } from "@/lib/audio-provider";
import { Play, Pause, SkipForward, SkipBack, X, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function GlobalAudioPlayer() {
    const { isPlaying, currentTime, duration, activeVerseKey, currentChapterId, togglePlayPause, seekTo } = useAudio();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (activeVerseKey || isPlaying) {
            setIsVisible(true);
        }
    }, [activeVerseKey, isPlaying]);

    if (!isVisible) return null;

    const handleSliderChange = (value: number[]) => {
        seekTo(value[0]);
    };

    const formatTime = (timeInSeconds: number) => {
        if (isNaN(timeInSeconds)) return "00:00";
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className={cn(
            "fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border/40 shadow-lg transition-transform duration-300",
            isVisible ? "translate-y-0" : "translate-y-full"
        )}>
            <div className="absolute top-0 left-0 right-0 h-1 -mt-1 bg-secondary">
                <div
                    className="h-full bg-emerald-600 transition-all duration-100 ease-linear"
                    style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                />
            </div>

            <div className="container mx-auto px-4 h-16 md:h-20 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 max-w-7xl">
                {/* Left side: Info */}
                <div className="flex items-center gap-4 flex-1 w-full mt-2 md:mt-0">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                        <Volume2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="font-semibold text-sm truncate">
                            {activeVerseKey ? `Verse ${activeVerseKey}` : (currentChapterId ? `Surah ${currentChapterId}` : 'Quran')}
                        </span>
                        <span className="text-xs text-muted-foreground truncate">
                            Mishary Rashid Alafasy
                        </span>
                    </div>
                </div>

                {/* Center: Controls */}
                <div className="flex flex-col items-center justify-center flex-[2] w-full">
                    <div className="flex items-center gap-4 md:gap-6 mb-1 md:mb-0">
                        <button className="text-muted-foreground hover:text-primary transition-colors">
                            <SkipBack className="w-5 h-5 fill-current" />
                        </button>
                        <button
                            onClick={togglePlayPause}
                            className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors shadow-md"
                        >
                            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                        </button>
                        <button className="text-muted-foreground hover:text-primary transition-colors">
                            <SkipForward className="w-5 h-5 fill-current" />
                        </button>
                    </div>
                </div>

                {/* Right side: Time & Close */}
                <div className="flex items-center justify-end gap-4 flex-1 w-full pb-2 md:pb-0">
                    <span className="text-xs font-medium tabular-nums text-muted-foreground hidden sm:block">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-full hover:bg-secondary/50"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
