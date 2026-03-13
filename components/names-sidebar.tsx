"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { AllahName } from "@/lib/data";

export function NamesSidebar({ names, currentNameId }: { names: AllahName[], currentNameId: number }) {
    const [mounted, setMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const sidebarContent = (
        <div className="flex flex-col h-full overflow-y-auto custom-scrollbar p-4 space-y-1 w-full">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4 px-2">99 Names</h3>
            {names.map((n) => {
                const isActive = currentNameId === n.id;
                return (
                    <Link
                        key={n.id}
                        href={`/name/${n.id}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                            "flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors group",
                            isActive
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 font-medium"
                                : "text-foreground hover:bg-secondary/50"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold text-muted-foreground w-6">{n.id}</span>
                            <span>{n.bangla}</span>
                        </div>
                        <span className="font-arabic text-primary group-hover:text-emerald-600 transition-colors text-right">{n.arbi}</span>
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
            <div className="lg:hidden fixed bottom-6 right-4 z-40">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                    <SheetTrigger asChild>
                        <button className="w-12 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors">
                            <Menu className="w-6 h-6" />
                        </button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[85vw] max-w-[320px] p-0 border-l-border flex flex-col">
                        <SheetTitle className="sr-only">Contents</SheetTitle>
                        <SheetHeader className="p-4 border-b border-border text-left shrink-0">
                            <h2 className="text-lg font-semibold font-poppins text-foreground">Asmaul Husna</h2>
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
