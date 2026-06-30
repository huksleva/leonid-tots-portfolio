const facts = [
  { label: "Location", value: "Ukraine" },
  { label: "Focus", value: "Backend Development" },
  { label: "Status", value: "Open to opportunities" },
  { label: "Languages", value: "Ukrainian, English (B2)" },
];

export default function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-12 text-sm font-mono tracking-widest text-zinc-500 uppercase">
          About
        </h2>
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              I&apos;m a developer focused on backend systems. I write Python —
              building APIs, automating tasks, and working with data. I care
              about code that is readable, maintainable, and does exactly what
              it should.
            </p>
            <p>
              I&apos;m currently expanding into full-stack development: learning
              React, Next.js, and TypeScript to understand how the whole system
              fits together — not just the server side.
            </p>
            <p>
              This portfolio is part of that learning process. Every component
              here is something I built and understand.
            </p>
          </div>
          <div className="space-y-3">
            {facts.map(({ label, value }) => (
              <div
                key={label}
                className="flex items-baseline justify-between border-b border-zinc-800 pb-3"
              >
                <span className="text-sm text-zinc-500">{label}</span>
                <span className="text-sm text-zinc-300">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
