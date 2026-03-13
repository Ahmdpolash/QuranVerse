"use client";

import { AllahName, getAudioUrl } from "@/lib/data";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";

interface NameCardProps {
    name: AllahName;
}

export function NameCard({ name }: NameCardProps) {
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

                    <div className="pt-4 mt-auto flex items-center justify-end w-full border-t border-border/50">
                        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline">
                            Learn More
                        </span>
                    </div>
                </Card>
            </motion.div>
        </Link>
    );
}
