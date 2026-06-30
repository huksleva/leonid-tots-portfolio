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
      <footer className="py-10 text-center">
        <Link
          href="/lab"
          className="font-mono text-xs text-zinc-500 transition-colors hover:text-zinc-300 dark:text-zinc-600 dark:hover:text-zinc-400"
        >
          / lab →
        </Link>
      </footer>
    </>
  );
}
