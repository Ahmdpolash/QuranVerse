"use client";

import { AllahName, getAudioUrl } from "@/lib/data";
import { ArrowLeft, Share2, Heart, RefreshCw, Smartphone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

export function NameDetailsClient({ name }: { name: AllahName }) {
    // Tasbih Mode State
    const [tasbihMode, setTasbihMode] = useState(false);
    const [tasbihCount, setTasbihCount] = useState(0);

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: `Meaning of ${name.bangla}`,
                    text: `Learn the beautiful meaning and virtues of ${name.bangla} (${name.arbi})`,
                    url: window.location.href,
                });
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleTasbihCount = () => {
        // Vibrate
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate(50);
        }
        setTasbihCount(prev => prev + 1);
    };

    const resetTasbih = () => {
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate([50, 50, 50]);
        }
        setTasbihCount(0);
    };

    return (
        <main className="min-h-screen bg-background text-foreground pb-20 custom-scrollbar overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-3xl mx-auto px-4 pt-8 md:pt-12 relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors font-medium">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back
                    </Link>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-primary">
                            <Heart className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={handleShare} className="rounded-full text-muted-foreground hover:text-primary">
                            <Share2 className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Card className="flex flex-col items-center justify-center p-8 md:p-12 space-y-6 md:space-y-8 shadow-2xl border-border/50 relative overflow-hidden bg-white/50 dark:bg-black/50 backdrop-blur-sm">
                        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-secondary via-accent to-primary" />

                        <div className="bg-primary/5 text-primary text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                            Name {name.id}
                        </div>

                        <h1 className="text-8xl md:text-[140px] font-arabic text-primary drop-shadow-lg leading-tight" style={{ lineHeight: '1.2' }}>
                            {name.arbi}
                        </h1>

                        <div className="text-center space-y-2">
                            <h2 className="text-3xl md:text-5xl font-bengali font-bold text-foreground">
                                {name.bangla}
                            </h2>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
                                Meaning: {name.meaning}
                            </p>
                        </div>

                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                    <div className="mt-12 bg-card rounded-2xl p-6 md:p-8 shadow-md border border-border/50">
                        <h3 className="text-2xl font-bold font-bengali text-primary mb-6 flex items-center gap-3">
                            <span className="w-1.5 h-6 bg-accent rounded-full"></span>
                            Fazilat (Virtues & Benefits)
                        </h3>
                        <p className="text-lg leading-loose font-bengali text-muted-foreground whitespace-pre-wrap">
                            {name.faz}
                        </p>
                    </div>
                </motion.div>

                <div className="mt-12 text-center">
                    <Dialog onOpenChange={(open) => {
                        setTasbihMode(open);
                        if (open) setTasbihCount(0);
                    }}>
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
                                size="lg"
                                className="gap-2 rounded-full border-2 hover:bg-primary hover:text-primary-foreground text-primary border-primary transition-all px-8 py-6 text-lg shadow-sm"
                            >
                                <Smartphone className="w-5 h-5" />
                                Enter Tasbih Mode
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md rounded-3xl p-8 border-border shadow-xl">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-bold text-primary font-bengali flex items-center justify-center gap-2 mb-4">
                                    <Smartphone className="w-5 h-5 text-accent" />
                                    Tasbih Zikr
                                </DialogTitle>
                            </DialogHeader>

                            <div className="text-center font-arabic text-5xl text-foreground mb-4">
                                يَا {name.arbi.replace(/^(ال|اَلْ)/, '')}
                            </div>

                            <div className="relative flex justify-center py-8">
                                <Button
                                    onClick={handleTasbihCount}
                                    className="w-48 h-48 rounded-full shadow-2xl border-8 border-background bg-primary hover:bg-primary/90 text-primary-foreground transform active:scale-95 transition-all text-5xl font-bold relative overflow-hidden"
                                >
                                    {tasbihCount}
                                    <div className="absolute bottom-0 left-0 w-full h-[10%] bg-black/10 transition-all" style={{ height: `${(tasbihCount % 100)}%` }} />
                                </Button>
                            </div>

                            <div className="flex justify-between items-center text-muted-foreground mt-4">
                                <span className="text-sm font-medium">Goal: 100</span>
                                <Button variant="outline" size="sm" onClick={resetTasbih} className="gap-2 rounded-full border-muted/50">
                                    <RefreshCw className="w-4 h-4" /> Reset
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </main>
    );
}
