"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/contexts/LanguageContext";

export default function Navbar() {
  const { lang, toggle, tr } = useLang();
  const [activeSection, setActiveSection] = useState<string>("");

  const navLinks = [
    { label: tr.nav.about, href: "#about" },
    { label: tr.nav.skills, href: "#skills" },
    { label: tr.nav.projects, href: "#projects" },
    { label: tr.nav.contact, href: "#contacts" },
  ];

  useEffect(() => {
    const sectionIds = ["about", "skills", "projects", "contacts"];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-sm">
      <nav aria-label="Main navigation" className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <a
          href="#hero"
          translate="no"
          className="text-sm font-semibold text-zinc-100 hover:text-white"
        >
          Leonid Tots
        </a>
        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {navLinks.map(({ label, href }) => {
              const isActive = activeSection === href.slice(1);
              return (
                <li key={href}>
                  <a
                    href={href}
                    aria-current={isActive ? "true" : undefined}
                    className={`text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:rounded ${
                      isActive
                        ? "text-zinc-100"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
          <button
            onClick={toggle}
            aria-label={lang === "en" ? "Switch to Russian" : "Switch to English"}
            className="rounded-md border border-zinc-700 px-2.5 py-1 text-xs font-mono text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-200"
          >
            {lang === "en" ? "RU" : "EN"}
          </button>
        </div>
      </nav>
    </header>
  );
}
