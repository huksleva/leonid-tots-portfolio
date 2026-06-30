"use client";

import AnimateOnScroll from "@/components/AnimateOnScroll";
import { useLang } from "@/contexts/LanguageContext";

const links = [
  {
    label: "Email",
    value: "leonid005xc@gmail.com",
    href: "mailto:leonid005xc@gmail.com",
  },
  {
    label: "Telegram",
    value: "@pots135",
    href: "https://t.me/pots135",
  },
  {
    label: "GitHub",
    value: "github.com/huksleva",
    href: "https://github.com/huksleva",
  },
];

export default function Contact() {
  const { tr } = useLang();
  const c = tr.contact;

  return (
    <section id="contacts" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <AnimateOnScroll>
          <h2 className="mb-4 text-sm font-mono tracking-widest text-zinc-500 uppercase">
            {c.title}
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll delay={100}>
          <p className="mb-12 text-zinc-400">{c.description}</p>
        </AnimateOnScroll>
        <div className="flex flex-col gap-4 sm:flex-row">
          {links.map(({ label, value, href }, i) => (
            <AnimateOnScroll key={label} delay={200 + i * 100}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex flex-col gap-1 rounded-xl border border-zinc-800 bg-zinc-900/50 px-6 py-5 transition-colors hover:border-zinc-700"
              >
                <span className="text-xs text-zinc-600 uppercase tracking-wider">
                  {label}
                </span>
                <span className="text-sm text-zinc-300">{value}</span>
              </a>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
