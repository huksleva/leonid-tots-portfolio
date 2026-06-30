"use client";

import AnimateOnScroll from "@/components/AnimateOnScroll";
import { useLang } from "@/contexts/LanguageContext";

type Skill = { name: string; learning?: boolean };

const skillGroups: { key: keyof ReturnType<typeof useLang>["tr"]["skills"]; skills: Skill[] }[] = [
  {
    key: "languages",
    skills: [
      { name: "Python" },
      { name: "JavaScript" },
      { name: "C" },
      { name: "C++" },
      { name: "C#" },
      { name: "TypeScript", learning: true },
    ],
  },
  {
    key: "backend",
    skills: [
      { name: "FastAPI" },
      { name: "Flask" },
      { name: "Node.js" },
      { name: "SQLAlchemy" },
      { name: "Alembic" },
    ],
  },
  {
    key: "databases",
    skills: [
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "Elasticsearch" },
    ],
  },
  {
    key: "frontend",
    skills: [
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "Vite" },
      { name: "React", learning: true },
      { name: "Next.js", learning: true },
      { name: "Tailwind CSS", learning: true },
    ],
  },
  {
    key: "infrastructure",
    skills: [
      { name: "Docker" },
      { name: "Git" },
      { name: "Yandex Cloud" },
    ],
  },
];

export default function Skills() {
  const { tr } = useLang();
  const s = tr.skills;

  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <AnimateOnScroll>
          <div className="mb-12 flex items-baseline justify-between">
            <h2 className="text-sm font-mono tracking-widest text-zinc-500 uppercase">
              {s.title}
            </h2>
            <div className="flex items-center gap-4 text-xs text-zinc-400 dark:text-zinc-600">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-zinc-700 dark:bg-zinc-300" />
                {s.comfortable}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full border border-zinc-400 dark:border-zinc-600" />
                {s.learning}
              </span>
            </div>
          </div>
        </AnimateOnScroll>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map(({ key, skills }, i) => (
            <AnimateOnScroll key={key} delay={i * 80}>
              <div>
                <p className="mb-3 text-xs text-zinc-400 dark:text-zinc-600 uppercase tracking-wider">
                  {s[key] as string}
                </p>
                <div className="flex flex-wrap gap-2">
                  {skills.map(({ name, learning }) => (
                    <span
                      key={name}
                      className={
                        learning
                          ? "rounded-md border border-zinc-300 px-3 py-1 text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-500"
                          : "rounded-md bg-zinc-100 px-3 py-1 text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                      }
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
