import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";
import { BookOpen, Star, Sparkles, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center mx-auto px-4 md:px-8 max-w-[1400px] justify-between">

                {/* Brand */}
                <div className="flex items-center gap-2 md:w-[200px] shrink-0">
                    <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                        {/* <Sparkles className="w-5 h-5 text-emerald-600" /> */}
                        <span className="font-bold text-lg font-poppins">QuranVerse</span>
                    </Link>
                </div>

                {/* Desktop Nav in Center */}
                <div className="hidden md:flex items-center justify-center gap-8 flex-1">
                    <Link href="/99-names" className="text-sm font-medium transition-colors hover:text-primary text-foreground/80 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        99 Names (আসমাউল হুসনা)
                    </Link>
                    <Link href="/quran" className="text-sm font-medium transition-colors hover:text-emerald-600 text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5" title="Qur'an">
                        <BookOpen className="w-4 h-4" />
                        Quran (আল-কুরআন)
                    </Link>
                    <Link href="#" className="text-sm font-medium transition-colors hover:text-primary text-foreground/60 flex items-center gap-1.5" title="Coming Soon">
                        <Star className="w-4 h-4" />
                        Hadith (হাদিস)
                    </Link>
                </div>

                {/* Right side: Toggles & Mobile Menu */}
                <div className="flex items-center gap-2 md:w-[200px] justify-end shrink-0">
                    <LanguageToggle />
                    <ThemeToggle />

                    <div className="md:hidden ml-1">
                        <Sheet>
                            <SheetTrigger asChild>
                                <button className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-secondary transition-colors">
                                    <Menu className="w-5 h-5" />
                                </button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[80vw] max-w-[300px]">
                                <SheetHeader className="pb-4 border-b border-border/40 mb-4 text-left">
                                    <SheetTitle className="flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-emerald-600" />
                                        <span>QuranVerse</span>
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col gap-4">
                                    <Link href="/99-names" className="px-2 py-2 text-sm font-medium  transition-colors hover:bg-secondary rounded-md">
                                        99 Names (আসমাউল হুসনা)
                                    </Link>
                                    <Link href="/quran" className="px-2 py-2 text-sm font-medium transition-colors hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 rounded-md flex items-center gap-2">
                                        <BookOpen className="w-4 h-4" />
                                        Quran (আল-কুরআন)
                                    </Link>
                                    <Link href="#" className="px-2 py-2 text-sm font-medium transition-colors hover:bg-secondary rounded-md flex items-center gap-2 text-muted-foreground">
                                        <Star className="w-4 h-4" />
                                        Hadith (হাদিস)
                                    </Link>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>

            </div>
        </nav>
    );
}
