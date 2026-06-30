export default function Hero() {
  return (
    <section
      id="hero"
      className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 text-center"
    >
      <p
        className="mb-3 font-mono text-sm tracking-widest text-zinc-400 uppercase"
        style={{ animation: "fadeIn 0.6s ease both" }}
      >
        Hi, I&apos;m
      </p>
      <h1
        translate="no"
        className="mb-4 text-5xl font-bold tracking-tight text-zinc-100 sm:text-6xl"
        style={{ animation: "fadeUp 0.6s ease 0.15s both" }}
      >
        Leonid Tots
      </h1>
      <h2
        className="mb-6 text-xl font-medium text-zinc-400 sm:text-2xl"
        style={{ animation: "fadeUp 0.6s ease 0.3s both" }}
      >
        Backend Developer
      </h2>
      <p
        className="max-w-xl text-base leading-relaxed text-zinc-500"
        style={{ animation: "fadeUp 0.6s ease 0.45s both" }}
      >
        I build reliable server-side applications and APIs using Python. Currently
        learning the full stack — React, Next.js, and TypeScript.
      </p>
      <div
        className="mt-10 flex gap-4"
        style={{ animation: "fadeUp 0.6s ease 0.6s both" }}
      >
        <a
          href="#projects"
          className="rounded-lg bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-white"
        >
          View Projects
        </a>
        <a
          href="#contacts"
          className="rounded-lg border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
        >
          Contact Me
        </a>
      </div>
    </section>
  );
}
