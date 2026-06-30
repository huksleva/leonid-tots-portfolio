import AnimateOnScroll from "@/components/AnimateOnScroll";

type Project = {
  name: string;
  description: string;
  tags: string[];
  github: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    name: "Tramplin — AI Career Platform",
    description:
      "Career platform for students and employers with role-based access, AI-assisted job descriptions and cover letters, two-tier moderation, and interactive opportunity mapping via Yandex Maps API. Built as a team at IF...ELSE 2026 hackathon — 2nd place.",
    tags: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Docker", "CI/CD", "JavaScript", "Vite"],
    github: "https://github.com/NerdySnake6/Tramplin-ai-career-platform",
    featured: true,
  },
  {
    name: "Epidemic Spread Simulation",
    description:
      "A cellular automaton model of infectious disease spread across a 2D grid population. Supports multiple virus profiles (COVID-19, Flu, Measles), real-time statistics visualization, interactive controls, and manual outbreak placement.",
    tags: ["Python", "NumPy", "Matplotlib", "Simulation"],
    github: "https://github.com/huksleva/Coursework_computer_simulation",
  },
  {
    name: "Solar System Visualization",
    description:
      "Physics-based simulation of planetary orbits using real NASA data. Adapts to screen resolution, includes speed controls, pause/resume, and orbital path toggling. Built with Python's built-in turtle graphics library.",
    tags: ["Python", "turtle", "pywin32"],
    github: "https://github.com/huksleva/SolarSystemPyTurtle",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <AnimateOnScroll>
          <h2 className="mb-12 text-sm font-mono tracking-widest text-zinc-500 uppercase">
            Projects
          </h2>
        </AnimateOnScroll>
        <div className="space-y-6">
          {projects.map((project, i) => (
            <AnimateOnScroll key={project.name} delay={i * 120}>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-zinc-700">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-zinc-100">{project.name}</h3>
                    {project.featured && (
                      <span className="rounded-full bg-zinc-700 px-2.5 py-0.5 text-xs text-zinc-300">
                        Hackathon · 2nd place
                      </span>
                    )}
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-xs text-zinc-500 underline underline-offset-2 hover:text-zinc-300"
                  >
                    GitHub →
                  </a>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-zinc-400">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-400"
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
