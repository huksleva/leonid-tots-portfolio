"use client";

import { useLang } from "@/contexts/LanguageContext";

// Пути к локальным PDF-файлам (basePath добавится автоматически при сборке)

const CV_URLS: Record<"en" | "ru", string> = {
  en: "/cv/leonid-tots-en.pdf",
  ru: "/cv/leonid-tots-ru.pdf",
};

export default function Hero() {
  const { tr, lang } = useLang();

  return (
    <section
      id="hero"
      className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 text-center"
    >
      <p
        className="mb-3 font-mono text-sm tracking-widest text-zinc-500 dark:text-zinc-400 uppercase"
        style={{ animation: "fadeIn 0.6s ease both" }}
      >
        {tr.hero.greeting}
      </p>
      <h1
        className="mb-4 text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-6xl"
        style={{ animation: "fadeUp 0.6s ease 0.15s both" }}
      >
        {tr.hero.name}
      </h1>
      <h2
        className="mb-6 text-xl font-medium text-zinc-600 dark:text-zinc-400 sm:text-2xl"
        style={{ animation: "fadeUp 0.6s ease 0.3s both" }}
      >
        {tr.hero.role}
      </h2>
      <p
        className="max-w-xl text-base leading-relaxed text-zinc-500 dark:text-zinc-400"
        style={{ animation: "fadeUp 0.6s ease 0.45s both" }}
      >
        {tr.hero.description}
      </p>
      <div
        className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        style={{ animation: "fadeUp 0.6s ease 0.6s both" }}
      >
        <a
          href="#projects"
          className="w-48 rounded-lg bg-zinc-900 px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white sm:w-auto"
        >
          {tr.hero.cta}
        </a>
        <a
          href="#contacts"
          className="w-48 rounded-lg border border-zinc-300 px-5 py-2.5 text-center text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-500 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-100 sm:w-auto"
        >
          {tr.hero.ctaSecondary}
        </a>
        <a
          href={CV_URLS[lang]}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-48 items-center justify-center gap-2 rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-500 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-100 sm:w-auto"
        >
          {tr.hero.ctaCV}
          <span className="text-zinc-400 dark:text-zinc-500">↗</span>
        </a>
      </div>
    </section>
  );
}
