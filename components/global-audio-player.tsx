"use client";

import { useAudio } from "@/lib/audio-provider";
import { Play, Pause, SkipForward, SkipBack, X, Volume2, Download, MoreHorizontal } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function GlobalAudioPlayer() {
    const { isPlaying, currentTime, duration, activeVerseKey, currentChapterId, togglePlayPause, seekTo, playNextVerse, playPrevVerse, closeAudio, audioData } = useAudio();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (activeVerseKey || isPlaying) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [activeVerseKey, isPlaying]);

    if (!isVisible) return null;

    const handleSliderChange = (value: number[]) => {
        seekTo(value[0]);
    };

    const handleClose = () => {
        setIsVisible(false);
        closeAudio();
    };

    const handleDownload = () => {
        if (audioData?.audioUrl) {
            const a = document.createElement("a");
            a.href = audioData.audioUrl;
            a.download = `Surah_${currentChapterId}.mp3`; // This tries to trigger download if same origin, else opens in new tab
            a.target = "_blank";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    const formatTime = (timeInSeconds: number) => {
        if (isNaN(timeInSeconds)) return "00:00";
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className={cn(
            "fixed bottom-0 left-0 right-0 z-50 bg-[#1e2329] text-gray-200 border-t border-border/10 shadow-[0_-10px_30px_rgba(0,0,0,0.3)] transition-transform duration-300 py-3",
            isVisible ? "translate-y-0" : "translate-y-full"
        )}>
            <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
                <div className="flex flex-col gap-2">
                    {/* Top Row: Slider */}
                    <div className="flex items-center gap-3 w-full">
                        <span className="text-xs font-medium text-gray-400 w-10 text-right">
                            {formatTime(currentTime)}
                        </span>
                        <Slider
                            value={[currentTime]}
                            max={duration || 100}
                            step={0.1}
                            onValueChange={handleSliderChange}
                            className="flex-1 cursor-pointer"
                        />
                        <div className="flex items-center gap-4 text-gray-300 shrink-0">
                            <button className="hover:text-white transition-colors" title="More Options">
                                <MoreHorizontal className="w-5 h-5" />
                            </button>
                            <button className="hover:text-white transition-colors" title="Volume">
                                <Volume2 className="w-5 h-5" />
                            </button>
                            <button className="hover:text-white transition-colors" onClick={handleDownload} title="Download Audio">
                                <Download className="w-5 h-5" />
                            </button>
                            <button className="hover:text-white transition-colors" onClick={playPrevVerse} title="Previous Verse">
                                <SkipBack className="w-5 h-5 fill-current" />
                            </button>
                            <button
                                onClick={togglePlayPause}
                                className="hover:text-white transition-colors"
                            >
                                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                            </button>
                            <button className="hover:text-white transition-colors" onClick={playNextVerse} title="Next Verse">
                                <SkipForward className="w-5 h-5 fill-current" />
                            </button>
                            <button
                                onClick={handleClose}
                                className="text-gray-400 hover:text-red-400 transition-colors ml-2"
                                title="Close Player"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
