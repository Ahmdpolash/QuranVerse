"use client";

import * as React from "react";
import { useTranslation } from "@/lib/translation-provider";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
    const { language, toggleLanguage } = useTranslation();

    return (
        <Button variant="ghost" size="sm" onClick={toggleLanguage} className="w-16 font-medium font-bengali hover:bg-secondary/20 hover:text-primary transition-colors border border-border/20 rounded-full h-8 text-xs">
            {language === "en" ? "EN" : "বাংলা"}
        </Button>
    );
}
