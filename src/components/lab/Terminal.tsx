"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type ScreenData = {
  dir: string;
  command: string;
  output: string[];
};

const SCREENS: ScreenData[] = [
  {
    dir: "~",
    command: "whoami",
    output: [
      "leonid-tots",
      "",
      "  role:     Software Developer",
      "  focus:    Python · FastAPI · PostgreSQL",
      "  studying: Software Development",
      "  status:   open to junior positions",
    ],
  },
  {
    dir: "~",
    command: "cat stack.json",
    output: [
      "{",
      '  "languages":  ["python", "c", "c++", "c#", "javascript"],',
      '  "backend":    ["fastapi", "flask", "node.js", "sqlalchemy"],',
      '  "databases":  ["postgresql", "mongodb", "elasticsearch"],',
      '  "infra":      ["docker", "git", "yandex-cloud"],',
      '  "learning":   ["typescript", "react", "next.js"]',
      "}",
    ],
  },
  {
    dir: "~/projects",
    command: "git log --oneline",
    output: [
      "a3f921b  tramplin-ai   hackathon 2nd place — AI career platform",
      "9d71c04  epidemic-sim  disease spread simulation (Python)",
      "f2a8e3c  solar-system  planetary orbits via NASA data (Python)",
    ],
  },
  {
    dir: "~",
    command: "cat contact",
    output: [
      "email     leonid005xc@gmail.com",
      "telegram  @pots135",
      "github    github.com/huksleva",
    ],
  },
];

function useTyping(text: string, active: boolean, speed = 40): [string, boolean] {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) {
      setDisplayed("");
      setDone(false);
      return;
    }

    let i = 0;
    setDisplayed("");
    setDone(false);

    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);

    return () => clearInterval(id);
  }, [active, speed, text]);

  return [displayed, done];
}

function TerminalScreen({ data, index }: { data: ScreenData; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  const [displayedCmd, cmdDone] = useTyping(data.command, active);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(true);
      },
      { threshold: 0.6 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{ scrollSnapAlign: "start" }}
      className="flex h-screen w-full flex-col justify-center px-8"
    >
      <div className="mx-auto w-full max-w-2xl font-mono text-sm leading-6">
        <p className="mb-6 text-xs text-slate-700">
          {String(index + 1).padStart(2, "0")} / {String(SCREENS.length).padStart(2, "0")}
        </p>

        <p className="mb-1">
          <span className="text-emerald-500">{data.dir}</span>
          <span className="text-slate-600"> $ </span>
          <span className="text-slate-100">{displayedCmd}</span>
          {active && !cmdDone && (
            <span className="animate-blink text-emerald-500">█</span>
          )}
        </p>

        {cmdDone &&
          data.output.map((line, i) => (
            <p
              key={i}
              className="whitespace-pre text-slate-500"
              style={{
                opacity: 0,
                animation: "fadeIn 0.35s ease forwards",
                animationDelay: `${i * 70 + 80}ms`,
              }}
            >
              {line || " "}
            </p>
          ))}

        {cmdDone && (
          <p
            className="mt-1"
            style={{
              opacity: 0,
              animation: "fadeIn 0.35s ease forwards",
              animationDelay: `${data.output.length * 70 + 180}ms`,
            }}
          >
            <span className="text-emerald-500">{data.dir}</span>
            <span className="text-slate-600"> $ </span>
            <span className="animate-blink text-emerald-500">█</span>
          </p>
        )}
      </div>
    </section>
  );
}

export default function Terminal() {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <>
      <Link
        href="/"
        className="fixed left-8 top-8 z-20 font-mono text-xs text-slate-700 transition-colors hover:text-slate-400"
      >
        ← portfolio
      </Link>

      <div
        className="fixed inset-0 overflow-y-scroll scroll-smooth bg-[#030712]"
        style={{ scrollSnapType: "y mandatory" }}
      >
        {SCREENS.map((screen, i) => (
          <TerminalScreen key={i} data={screen} index={i} />
        ))}

        <section
          style={{ scrollSnapAlign: "start" }}
          className="flex h-screen w-full flex-col items-center justify-center"
        >
          <div className="text-center font-mono">
            <p className="text-sm">
              <span className="text-emerald-500">~</span>
              <span className="text-slate-600"> $ </span>
              <span className="animate-blink text-emerald-500">█</span>
            </p>
            <p className="mt-8 text-xs text-slate-700">end of session</p>
            <Link
              href="/"
              className="mt-3 block text-sm text-emerald-700 transition-colors hover:text-emerald-500"
            >
              ← back to portfolio
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
