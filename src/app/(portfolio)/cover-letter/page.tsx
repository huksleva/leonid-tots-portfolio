"use client";

import Link from "next/link";
import { useLang } from "@/contexts/LanguageContext";

const LETTER = {
  en: {
    back: "← Back",
    date: "Saint Petersburg, 2026",
    greeting: "Hello,",
    paragraphs: [
      "My name is Leonid Tots — a software developer from Saint Petersburg. I'm currently in my third year studying Applied Informatics at Herzen University and am actively looking for my first job or internship.",
      "My primary stack is Python, FastAPI, PostgreSQL, and Docker. I'm also learning TypeScript, React, and Next.js — this portfolio is built with them.",
      "One project I'm proud of: as part of a team, I won 2nd place at a student hackathon with Tramplin — an AI-powered career development platform. The project was covered by the university press and runs as a live service. I was responsible for the backend: FastAPI, PostgreSQL, SQLAlchemy, Docker, and CI/CD.",
      "I want to grow as a developer alongside experienced people, solve real problems, and write code I can be proud of. I'm ready to start with smaller tasks and take on more responsibility over time.",
    ],
    closing: "Best regards,",
    name: "Leonid Tots",
    resumeLabel: "CV",
    resumeHref: "/leonid-tots-software-developer-en.pdf",
  },
  ru: {
    back: "← Назад",
    date: "Санкт-Петербург, 2026",
    greeting: "Здравствуйте,",
    paragraphs: [
      "Меня зовут Леонид Тоц — разработчик ПО из Санкт-Петербурга. Сейчас учусь на третьем курсе по направлению «Прикладная информатика» в Герценовском университете и активно ищу первую работу или стажировку.",
      "Основной стек — Python, FastAPI, PostgreSQL, Docker. Параллельно изучаю TypeScript, React и Next.js: это портфолио написано именно на них.",
      "Из значимых проектов: в составе команды занял второе место на студенческом хакатоне с Tramplin — AI-платформой карьерного развития. Платформа получила публикацию в университетских СМИ и работает как живой сервис. Я отвечал за backend: FastAPI, PostgreSQL, SQLAlchemy, Docker, CI/CD.",
      "Хочу расти как разработчик в команде с опытными людьми, решать реальные задачи и писать код, которым можно гордиться. Готов начинать с небольших задач и постепенно брать больше ответственности.",
    ],
    closing: "С уважением,",
    name: "Леонид Тоц",
    resumeLabel: "Резюме",
    resumeHref: "/leonid-tots-software-developer.pdf",
  },
} as const;

export default function CoverLetterPage() {
  const { lang } = useLang();
  const l = LETTER[lang];

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Back link */}
        <Link
          href="/"
          className="mb-12 inline-block font-mono text-xs text-zinc-400 transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
        >
          {l.back}
        </Link>

        {/* Letter */}
        <article className="space-y-6 text-base leading-7 text-zinc-700 dark:text-zinc-300">
          {/* Date */}
          <p className="font-mono text-sm text-zinc-400">{l.date}</p>

          {/* Greeting */}
          <p>{l.greeting}</p>

          {/* Body */}
          {l.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          {/* Closing */}
          <div className="pt-4">
            <p className="mb-1">{l.closing}</p>
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">
              {l.name}
            </p>
          </div>

          {/* Contacts */}
          <div className="border-t border-zinc-100 pt-6 dark:border-zinc-800">
            <ul className="space-y-1 font-mono text-sm text-zinc-500 dark:text-zinc-400">
              <li>
                <a
                  href="mailto:leonid005xc@gmail.com"
                  className="transition-colors hover:text-zinc-700 dark:hover:text-zinc-200"
                >
                  leonid005xc@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/pots135"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-zinc-700 dark:hover:text-zinc-200"
                >
                  t.me/pots135
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/huksleva"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-zinc-700 dark:hover:text-zinc-200"
                >
                  github.com/huksleva
                </a>
              </li>
              <li>
                <a
                  href={l.resumeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-zinc-700 dark:hover:text-zinc-200"
                >
                  {l.resumeLabel} ↗
                </a>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}
