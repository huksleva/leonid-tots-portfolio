"use client";

import { createContext, useContext, useState } from "react";
import { type Lang, t } from "@/lib/translations";

type LanguageContextValue = {
  lang: Lang;
  toggle: () => void;
  tr: (typeof t)[Lang];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const saved = localStorage.getItem("lang");
    return saved === "ru" ? "ru" : "en";
  });

  const toggle = () => {
    const next: Lang = lang === "en" ? "ru" : "en";
    setLang(next);
    localStorage.setItem("lang", next);
  };

  return (
    <LanguageContext.Provider value={{ lang, toggle, tr: t[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
