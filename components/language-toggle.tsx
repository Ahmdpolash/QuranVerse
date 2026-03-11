"use client";

import * as React from "react";
import { useTranslation } from "@/lib/translation-provider";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageToggle() {
    const { language, setLanguage } = useTranslation();

    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-secondary/20 hover:text-primary cursor-pointer transition-colors border border-border/70 rounded-full h-9 w-9">
                    <Globe className="h-[1.2rem] w-[1.2rem] text-foreground/80" />
                    <span className="sr-only">Toggle language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="cursor-pointer">
                <DropdownMenuItem onClick={() => setLanguage("en")} className={language === "en" ? "bg-secondary text-primary font-medium cursor-pointer pb-2" : "cursor-pointer pb-2"}>
                    English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("bn")} className={`font-bengali ${language === "bn" ? "bg-secondary text-primary font-medium cursor-pointer" : "cursor-pointer"}`}>
                    বাংলা (Bengali)
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
