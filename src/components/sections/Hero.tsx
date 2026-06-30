"use client";

import { useLang } from "@/contexts/LanguageContext";

export default function Hero() {
  const { tr } = useLang();

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
        className="max-w-xl text-base leading-relaxed text-zinc-500"
        style={{ animation: "fadeUp 0.6s ease 0.45s both" }}
      >
        {tr.hero.description}
      </p>
      <div
        className="mt-10 flex flex-wrap justify-center gap-3"
        style={{ animation: "fadeUp 0.6s ease 0.6s both" }}
      >
        <a
          href="#projects"
          className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          {tr.hero.cta}
        </a>
        <a
          href="#contacts"
          className="rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-500 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
        >
          {tr.hero.ctaSecondary}
        </a>
        <a
          href="/cv.pdf"
          download
          className="rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-500 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
        >
          ↓ {tr.hero.ctaCV}
        </a>
      </div>
    </section>
  );
}
