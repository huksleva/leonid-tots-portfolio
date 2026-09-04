"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { type Lang, t } from "@/lib/translations";

type LanguageContextValue = {
  lang: Lang;
  toggle: () => void;
  tr: (typeof t)[Lang];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // 1. Инициализируем БЕЗОПАСНЫМ значением по умолчанию.
  // Оно ДОЛЖНО совпадать с lang="ru" в layout.tsx.
  // Это гарантирует 100% совпадение сервера и клиента при первой отрисовке.
  const [lang, setLang] = useState<Lang>("ru");

  // 2. Флаг, чтобы знать, что мы уже в браузере
  const [isMounted, setIsMounted] = useState(false);

  // 3. Читаем localStorage ТОЛЬКО после монтирования компонента на клиенте.
  // Это не вызовет ошибку гидратации, так как происходит после начального рендера.
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("lang");
    if (saved === "ru" || saved === "en") {
      setLang(saved);
    }
  }, []);

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
