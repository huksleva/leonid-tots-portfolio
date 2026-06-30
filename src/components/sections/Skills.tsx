import AnimateOnScroll from "@/components/AnimateOnScroll";

type Skill = {
  name: string;
  learning?: boolean;
};

type SkillGroup = {
  category: string;
  skills: Skill[];
};

const groups: SkillGroup[] = [
  {
    category: "Languages",
    skills: [
      { name: "Python" },
      { name: "JavaScript" },
      { name: "TypeScript", learning: true },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "REST APIs" },
      { name: "FastAPI", learning: true },
      { name: "PostgreSQL", learning: true },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "React", learning: true },
      { name: "Next.js", learning: true },
      { name: "Tailwind CSS", learning: true },
    ],
  },
  {
    category: "Tools",
    skills: [{ name: "Git" }, { name: "Linux" }, { name: "Docker", learning: true }],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <AnimateOnScroll>
          <div className="mb-12 flex items-baseline justify-between">
            <h2 className="text-sm font-mono tracking-widest text-zinc-500 uppercase">
              Skills
            </h2>
            <div className="flex items-center gap-4 text-xs text-zinc-600">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-zinc-300" />
                Comfortable
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full border border-zinc-600" />
                Learning
              </span>
            </div>
          </div>
        </AnimateOnScroll>
        <div className="grid gap-8 sm:grid-cols-2">
          {groups.map(({ category, skills }, i) => (
            <AnimateOnScroll key={category} delay={i * 100}>
              <div>
                <p className="mb-3 text-xs text-zinc-600 uppercase tracking-wider">
                  {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {skills.map(({ name, learning }) => (
                    <span
                      key={name}
                      className={
                        learning
                          ? "rounded-md border border-zinc-700 px-3 py-1 text-sm text-zinc-500"
                          : "rounded-md bg-zinc-800 px-3 py-1 text-sm text-zinc-200"
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
