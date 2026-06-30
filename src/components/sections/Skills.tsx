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
      { name: "C" },
      { name: "C++" },
      { name: "TypeScript", learning: true },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "FastAPI" },
      { name: "Flask" },
      { name: "Node.js" },
      { name: "SQLAlchemy" },
      { name: "Alembic" },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "Elasticsearch" },
    ],
  },
  {
    category: "Frontend",
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
    category: "Infrastructure & Tools",
    skills: [
      { name: "Docker" },
      { name: "Git" },
      { name: "Yandex Cloud" },
    ],
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
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map(({ category, skills }, i) => (
            <AnimateOnScroll key={category} delay={i * 80}>
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
