"use client";

import AnimateOnScroll from "@/components/AnimateOnScroll";
import { useLang } from "@/contexts/LanguageContext";

type Project = {
  name: string;
  descKey: "d1" | "d2" | "d3";
  tags: string[];
  github: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    name: "Tramplin — AI Career Platform",
    descKey: "d1",
    tags: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Docker", "CI/CD", "JavaScript", "Vite"],
    github: "https://github.com/NerdySnake6/Tramplin-ai-career-platform",
    featured: true,
  },
  {
    name: "Epidemic Spread Simulation",
    descKey: "d2",
    tags: ["Python", "NumPy", "Matplotlib", "Simulation"],
    github: "https://github.com/huksleva/Coursework_computer_simulation",
  },
  {
    name: "Solar System Visualization",
    descKey: "d3",
    tags: ["Python", "turtle", "pywin32"],
    github: "https://github.com/huksleva/SolarSystemPyTurtle",
  },
];

export default function Projects() {
  const { tr } = useLang();
  const p = tr.projects;

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <AnimateOnScroll>
          <h2 className="mb-12 text-sm font-mono tracking-widest text-zinc-500 uppercase">
            {p.title}
          </h2>
        </AnimateOnScroll>
        <div className="space-y-6">
          {projects.map((project, i) => (
            <AnimateOnScroll key={project.name} delay={i * 120}>
              <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-6 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <h3 translate="no" className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {project.name}
                    </h3>
                    {project.featured && (
                      <span className="rounded-full bg-zinc-200 px-2.5 py-0.5 text-xs text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-xs text-zinc-400 underline underline-offset-2 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
                  >
                    GitHub →
                  </a>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {p[project.descKey]}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                    >
                      {tag}
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
