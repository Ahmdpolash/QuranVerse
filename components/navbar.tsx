import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";
import { BookOpen, Star, Sparkles } from "lucide-react";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center mx-auto px-4 md:px-8 max-w-7xl justify-between">
                <Link href="/" className="flex items-center gap-2 mr-6 text-primary hover:text-primary/80 transition-colors">
                    <Sparkles className="w-5 h-5 text-accent" />
                    <span className="font-bold text-lg font-poppins hidden sm:inline-block">99 Names of Allah</span>
                </Link>
                <div className="flex items-center gap-6 md:gap-8 flex-1 justify-center md:justify-start">
                    <Link href="/" className="text-sm font-medium transition-colors hover:text-primary text-foreground/80">
                        99 Names
                    </Link>
                    <Link href="/quran" className="text-sm font-medium transition-colors hover:text-primary text-foreground/60 flex items-center gap-1.5" title="Qur'an">
                        <BookOpen className="w-4 h-4" />
                        Quran (আল-কুরআন)
                    </Link>
                    <Link href="#" className="text-sm font-medium transition-colors hover:text-primary text-foreground/60 flex items-center gap-1.5" title="Coming Soon">
                        <Star className="w-4 h-4" />
                        Hadith (হাদিস)
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    <LanguageToggle />
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}
