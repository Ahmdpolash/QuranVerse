"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";

export function SurahSidebar({ chapters, currentChapterId }: { chapters: any[], currentChapterId: string }) {
    const [mounted, setMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const sidebarContent = (
        <div className="flex flex-col h-full overflow-y-auto custom-scrollbar p-4 space-y-1 w-full">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4 px-2">Surahs</h3>
            {chapters.map((c) => {
                const isActive = currentChapterId === c.id.toString();
                return (
                    <Link
                        key={c.id}
                        href={`/quran/${c.id}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                            "flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors group",
                            isActive
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 font-medium"
                                : "text-foreground hover:bg-secondary/50"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold text-muted-foreground w-6">{c.id}</span>
                            <span>{c.nameSimple}</span>
                        </div>
                        <span className="font-arabic text-primary group-hover:text-emerald-600 transition-colors text-right">{c.nameArabic}</span>
                    </Link>
                );
            })}
        </div>
    );

    if (!mounted) {
        return <div className="hidden lg:block w-80 h-[calc(100vh-4rem)] sticky top-16 border-r border-border shrink-0 bg-background/50 backdrop-blur-sm" />;
    }

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-80 h-[calc(100vh-4rem)] sticky top-16 border-r border-border shrink-0 bg-background/50 backdrop-blur-sm shadow-sm overflow-hidden">
                {sidebarContent}
            </aside>

            {/* Mobile Sheet */}
            <div className="lg:hidden fixed top-[4.5rem] left-4 z-40">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                    <SheetTrigger asChild>
                        <button className="w-10 h-10 bg-background/80 backdrop-blur-md border border-border rounded-full flex items-center justify-center shadow-sm text-foreground hover:bg-secondary transition-colors">
                            <Menu className="w-5 h-5" />
                        </button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[85vw] max-w-[320px] p-0 border-r-border flex flex-col">
                        <SheetTitle className="sr-only">Surah Menu</SheetTitle>
                        <SheetHeader className="p-4 border-b border-border text-left shrink-0">
                            <h2 className="text-lg font-semibold font-poppins text-foreground">Quran Surahs</h2>
                        </SheetHeader>
                        <div className="flex-1 overflow-hidden">
                            {sidebarContent}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
}
