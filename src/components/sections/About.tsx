"use client";

import AnimateOnScroll from "@/components/AnimateOnScroll";
import { useLang } from "@/contexts/LanguageContext";

export default function About() {
  const { tr } = useLang();
  const a = tr.about;

  const facts = [
    { label: a.labelLocation, value: a.valueLocation },
    { label: a.labelSpecialty, value: a.valueSpecialty },
    { label: a.labelFocus, value: a.valueFocus },
    { label: a.labelStatus, value: a.valueStatus },
    { label: a.labelLanguages, value: a.valueLanguages },
  ];

  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <AnimateOnScroll>
          <h2 className="mb-12 text-sm font-mono tracking-widest text-zinc-500 uppercase">
            {a.title}
          </h2>
        </AnimateOnScroll>
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <AnimateOnScroll delay={100}><p>{a.p1}</p></AnimateOnScroll>
            <AnimateOnScroll delay={200}><p>{a.p2}</p></AnimateOnScroll>
            <AnimateOnScroll delay={300}><p>{a.p3}</p></AnimateOnScroll>
          </div>
          <div className="space-y-3">
            {facts.map(({ label, value }, i) => (
              <AnimateOnScroll key={label} delay={100 + i * 80}>
                <div className="flex items-baseline justify-between border-b border-zinc-800 pb-3">
                  <span className="text-sm text-zinc-500">{label}</span>
                  <span className="text-sm text-zinc-300">{value}</span>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
