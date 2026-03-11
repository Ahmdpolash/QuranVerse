"use client";

import { useAudio } from "@/lib/audio-provider";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PlaySurahButton({ chapterId }: { chapterId: number }) {
    const { currentChapterId, isPlaying, togglePlayPause, playChapter } = useAudio();

    const isThisSurahPlaying = currentChapterId === chapterId && isPlaying;

    const handlePlayToggle = () => {
        if (currentChapterId === chapterId) {
            togglePlayPause();
        } else {
            playChapter(chapterId);
        }
    };

    return (
        <Button
            onClick={handlePlayToggle}
            className="gap-2 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-medium shadow-md px-6 my-2"
        >
            {isThisSurahPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
            {isThisSurahPlaying ? "Pause Surah" : "Play Surah"}
        </Button>
    );
}
