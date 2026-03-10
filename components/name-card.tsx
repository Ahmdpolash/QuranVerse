"use client";

import { AllahName, getAudioUrl } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Play, Pause } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface NameCardProps {
    name: AllahName;
}

export function NameCard({ name }: NameCardProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Only initialize in browser
        if (typeof window !== "undefined") {
            audioRef.current = new Audio(getAudioUrl(name));
            audioRef.current.onended = () => setIsPlaying(false);
        }
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [name]);

    const togglePlay = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            // Pause any other playing audio if needed, simplest is just playing current
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <Link href={`/name/${name.id}`} passHref className="block h-full">
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="h-full"
            >
                <Card className="flex flex-col items-center justify-between p-6 hover:shadow-xl transition-all border border-border group relative overflow-hidden h-full">
                    <div className="absolute top-0 left-0 w-full h-1 bg-accent/30 group-hover:bg-accent transition-colors" />

                    <div className="text-sm font-medium text-muted-foreground w-full flex justify-between absolute top-4 left-4 right-4 items-center">
                        <span className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center text-xs text-secondary">
                            {name.id}
                        </span>
                    </div>

                    <h2 className="text-4xl font-arabic text-primary mt-8 mb-4 text-center leading-relaxed" style={{ lineHeight: '1.5' }}>
                        {name.arbi}
                    </h2>

                    <div className="text-center space-y-1 w-full mb-4">
                        <h3 className="font-bengali text-lg font-semibold">{name.bangla}</h3>
                        <p className="text-sm text-balance text-muted-foreground line-clamp-2">{name.meaning}</p>
                    </div>

                    <div className="pt-4 mt-auto flex items-center gap-4 w-full justify-between border-t border-border/50">
                        <button
                            onClick={togglePlay}
                            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors p-2 -ml-2 rounded-full hover:bg-primary/5"
                            aria-label="Play audio"
                        >
                            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                        </button>
                        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline">
                            Learn More
                        </span>
                    </div>
                </Card>
            </motion.div>
        </Link>
    );
}
