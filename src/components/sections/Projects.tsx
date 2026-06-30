"use client";

import { useCallback, useEffect, useState } from "react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { useLang } from "@/contexts/LanguageContext";

type Project = {
  name: string;
  descKey: "d1" | "d2" | "d3";
  tags: string[];
  github: string;
  featured?: boolean;
  media?: string;
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

type ModalProps = {
  project: Project;
  desc: string;
  badge: string;
  noPreview: string;
  onClose: () => void;
};

function ProjectModal({ project, desc, badge, noPreview, onClose }: ModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        style={{ animation: "fadeIn 0.2s ease both" }}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-zinc-900"
        style={{ animation: "fadeUp 0.25s ease both" }}
      >
        <div className="aspect-video w-full bg-zinc-100 dark:bg-zinc-800">
          {project.media ? (
            <img
              src={project.media}
              alt={project.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="font-mono text-xs text-zinc-400">{noPreview}</p>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <h3 translate="no" className="font-semibold text-zinc-900 dark:text-zinc-100">
                {project.name}
              </h3>
              {project.featured && (
                <span className="rounded-full bg-zinc-200 px-2.5 py-0.5 text-xs text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
                  {badge}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="shrink-0 rounded-md p-1 text-zinc-400 transition-colors hover:text-zinc-700 dark:hover:text-zinc-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <p className="mt-3 mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {desc}
          </p>

          <div className="mb-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { tr } = useLang();
  const p = tr.projects;
  const [selected, setSelected] = useState<Project | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <AnimateOnScroll>
          <h2 className="mb-12 font-mono text-sm uppercase tracking-widest text-zinc-500">
            {p.title}
          </h2>
        </AnimateOnScroll>

        <div className="space-y-6">
          {projects.map((project, i) => (
            <AnimateOnScroll key={project.name} delay={i * 120}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => setSelected(project)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setSelected(project);
                }}
                className="shimmer-card cursor-pointer rounded-xl border border-zinc-200 bg-zinc-50/80 p-6 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700"
              >
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
                    onClick={(e) => e.stopPropagation()}
                    className="relative z-10 shrink-0 rounded-md border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-200"
                  >
                    GitHub ↗
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

      {selected && (
        <ProjectModal
          project={selected}
          desc={p[selected.descKey]}
          badge={p.badge}
          noPreview={p.noPreview}
          onClose={close}
        />
      )}
    </section>
  );
}
