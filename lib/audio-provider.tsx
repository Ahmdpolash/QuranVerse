"use client";

import React, { createContext, useContext, useState, useRef, useEffect, ReactNode, useCallback } from "react";

interface AudioTiming {
    verse_key: string;
    timestamp_from: number;
    timestamp_to: number;
}

interface AudioData {
    audioUrl: string;
    timings: AudioTiming[];
    chapterId: number;
}

interface AudioContextType {
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    activeVerseKey: string | null;
    currentChapterId: number | null;
    togglePlayPause: () => void;
    playChapter: (chapterId: number, startVerseKey?: string) => Promise<void>;
    playVerse: (verseKey: string, chapterId: number) => Promise<void>;
    seekTo: (time: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [activeVerseKey, setActiveVerseKey] = useState<string | null>(null);
    const [currentChapterId, setCurrentChapterId] = useState<number | null>(null);
    const [audioData, setAudioData] = useState<AudioData | null>(null);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio();

        const audio = audioRef.current;

        const updateTime = () => {
            setCurrentTime(audio.currentTime);
        };

        const updateDuration = () => {
            setDuration(audio.duration);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setActiveVerseKey(null);
        };

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", updateDuration);
        audio.addEventListener("ended", handleEnded);
        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", updateDuration);
            audio.removeEventListener("ended", handleEnded);
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("pause", handlePause);
            audio.pause();
        };
    }, []);

    useEffect(() => {
        if (!audioData || currentTime === 0) return;

        const currentMs = currentTime * 1000;
        const activeTiming = audioData.timings.find(
            (t) => currentMs >= t.timestamp_from && currentMs <= t.timestamp_to
        );

        if (activeTiming && activeTiming.verse_key !== activeVerseKey) {
            setActiveVerseKey(activeTiming.verse_key);
        }
    }, [currentTime, audioData, activeVerseKey]);

    const loadAudioData = async (chapterId: number): Promise<AudioData | null> => {
        if (audioData?.chapterId === chapterId) return audioData;

        try {
            // Fetching reciting by Mishary (7)
            const res = await fetch(`https://api.qurancdn.com/api/qdc/audio/reciters/7/audio_files?chapter=${chapterId}&segments=true`);
            const data = await res.json();

            const file = data.audio_files[0];
            if (!file) return null;

            const newAudioData: AudioData = {
                audioUrl: file.audio_url,
                timings: file.verse_timings,
                chapterId: chapterId
            };

            setAudioData(newAudioData);
            setCurrentChapterId(chapterId);

            if (audioRef.current) {
                audioRef.current.src = file.audio_url;
                audioRef.current.load();
            }

            return newAudioData;
        } catch (e) {
            console.error("Failed to fetch audio segments", e);
            return null;
        }
    };

    const playChapter = async (chapterId: number, startVerseKey?: string) => {
        const data = await loadAudioData(chapterId);
        if (!data || !audioRef.current) return;

        if (startVerseKey) {
            const timing = data.timings.find(t => t.verse_key === startVerseKey);
            if (timing) {
                audioRef.current.currentTime = timing.timestamp_from / 1000;
            } else {
                audioRef.current.currentTime = 0;
            }
        } else {
            audioRef.current.currentTime = 0;
        }

        await audioRef.current.play();
    };

    const playVerse = async (verseKey: string, chapterId: number) => {
        await playChapter(chapterId, verseKey);
    };

    const togglePlayPause = () => {
        if (!audioRef.current || !audioData) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
    };

    const seekTo = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
        }
    };

    return (
        <AudioContext.Provider value={{
            isPlaying,
            currentTime,
            duration,
            activeVerseKey,
            currentChapterId,
            togglePlayPause,
            playChapter,
            playVerse,
            seekTo
        }}>
            {children}
        </AudioContext.Provider>
    );
}

export function useAudio() {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error("useAudio must be used within an AudioProvider");
    }
    return context;
}
