import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <footer className="border-t border-zinc-100 px-6 py-8 dark:border-zinc-900">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <span className="font-mono text-xs text-zinc-400">© 2026 Leonid Tots</span>
          <div className="flex gap-6">
            <a
              href="https://github.com/huksleva"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-zinc-400 transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
            >
              GitHub
            </a>
            <a
              href="https://t.me/pots135"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-zinc-400 transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
            >
              Telegram
            </a>
            <Link
              href="/lab"
              className="font-mono text-xs text-zinc-400 transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
            >
              / lab
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
