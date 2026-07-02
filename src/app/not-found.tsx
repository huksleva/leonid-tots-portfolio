"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type Entry = { cmd: string; output: string[] };

const REDIRECT = new Set(["exit", "cd /", "cd ~", "home", "back", "cd"]);

function resolve(raw: string): string[] {
  const c = raw.trim().toLowerCase();

  if (c === "help")
    return [
      "available commands:",
      "",
      "  ls            list the void",
      "  pwd           where am i?",
      "  whoami        identity check",
      "  cat 404.log   read the error",
      "  cd /          go to homepage",
      "  exit          escape",
      "  clear         clear terminal",
    ];

  if (c === "ls" || c === "ls -la" || c === "ls -l" || c === "ls -a")
    return [
      "total 0",
      "drwxr-xr-x  ./",
      "drwxr-xr-x  ../  (homepage — try 'cd /')",
      "-rw-r--r--  404.log           1 line",
      "-rw-r--r--  void.txt          0 bytes",
      "-rw-r--r--  your-page         NOT FOUND",
    ];

  if (c === "pwd") return ["/dev/null/lost+found/404"];

  if (c === "whoami") return ["lost-user  (uid=404, gid=0, groups=nowhere)"];

  if (c === "date")
    return ["Thu Jan  1 00:00:00 UTC 1970  (before your page existed)"];

  if (c === "uname" || c === "uname -a")
    return ["Void 4.0.4 #404 SMP Thu Jan 1 00:00:00 UTC 1970"];

  if (c === "cat 404.log")
    return [
      "the page you were looking for",
      "packed its bags and left.",
      "no forwarding address.",
    ];

  if (c === "cat void.txt") return [""];

  if (c === "sudo rm -rf /" || c === "rm -rf /")
    return [
      "nice try.",
      "permission denied: even nihilism has limits.",
    ];

  if (c === "git status")
    return [
      "On branch nowhere",
      "Your branch is lost in the void.",
      "",
      "nothing to commit, nothing to find",
    ];

  if (c === "git blame")
    return ["yourself — for typing a wrong URL"];

  if (c === "sudo su")
    return ["you are not in the sudoers file.", "this incident will be reported."];

  if (c === "man lost")
    return [
      "LOST(404)                   User Commands                  LOST(404)",
      "",
      "NAME",
      "     lost - navigate to a page that doesn't exist",
      "",
      "SYNOPSIS",
      "     lost [--404] [--confused] [--void]",
      "",
      "DESCRIPTION",
      "     lost(1) occurs when the user types a URL that has",
      "     never existed, or existed once and then vanished.",
      "",
      "     Type 'cd /' to return to reality.",
      "",
      "SEE ALSO",
      "     home(1), portfolio(1), back(1)",
    ];

  if (c === "ping leonidtots.dev")
    return [
      "PING leonidtots.dev",
      "64 bytes: icmp_seq=1 ttl=64 time=0.1ms",
      "64 bytes: icmp_seq=2 ttl=64 time=0.1ms",
      "",
      "you're close — type 'cd /' to get there",
    ];

  if (REDIRECT.has(c)) return ["redirecting to homepage..."];

  if (c === "clear") return [];

  if (c === "") return [];

  return [
    `bash: ${raw.trim()}: command not found`,
    "type 'help' for available commands",
  ];
}

export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();
  const [history, setHistory] = useState<Entry[]>([]);
  const [input, setInput] = useState("");
  const [cmdIndex, setCmdIndex] = useState(-1);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setReady(true);
    }, 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (ready) inputRef.current?.focus();
  }, [ready]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const submit = () => {
    const raw = input.trim();
    const c = raw.toLowerCase();

    if (c === "clear") {
      setHistory([]);
      setInput("");
      setCmdHistory((prev) => [raw, ...prev]);
      setCmdIndex(-1);
      return;
    }

    const output = resolve(raw);
    setHistory((prev) => [...prev, { cmd: raw, output }]);
    if (raw) setCmdHistory((prev) => [raw, ...prev]);
    setCmdIndex(-1);
    setInput("");

    if (REDIRECT.has(c)) {
      setTimeout(() => router.push("/"), 700);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(cmdIndex + 1, cmdHistory.length - 1);
      setCmdIndex(next);
      setInput(cmdHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(cmdIndex - 1, -1);
      setCmdIndex(next);
      setInput(next === -1 ? "" : (cmdHistory[next] ?? ""));
    }
  };

  return (
    <>
      <style>{`
        @keyframes glitch {
          0%, 88%, 100% { transform: none; text-shadow: none; }
          90% { transform: translate(-4px, 1px); text-shadow: 4px 0 #ff0040, -4px 0 #00ffea; }
          92% { transform: translate(4px, -2px); text-shadow: -4px 0 #ff0040, 4px 0 #00ffea; }
          94% { transform: translate(-2px, 2px); text-shadow: 3px 0 #ff0040; }
          96% { transform: translate(3px, -1px); text-shadow: -3px 0 #00ffea; }
          98% { transform: none; text-shadow: 4px 0 #ff0040, -4px 0 #00ffea; }
        }
        @keyframes terminal-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes fadeInLine {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: none; }
        }
        .glitch-num { animation: glitch 5s ease-in-out infinite; }
        .blink-cursor { animation: terminal-blink 1s step-end infinite; }
        .fade-line { animation: fadeInLine 0.2s ease forwards; }
      `}</style>

      {/* scanlines */}
      <div
        className="pointer-events-none fixed inset-0 z-10 opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 4px)",
        }}
      />

      <div
        className="flex min-h-screen flex-col bg-[#030712] px-6 pb-12 font-mono text-sm"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="mx-auto w-full max-w-2xl">
          {/* 404 */}
          <div className="mb-6 pt-16 text-center">
            <p className="glitch-num select-none text-[clamp(5rem,18vw,9rem)] font-bold leading-none text-emerald-500">
              404
            </p>
            <p className="mt-3 text-xs text-slate-600">
              bash: cd:{" "}
              <span className="text-slate-500">{pathname}</span>: No such file
              or directory
            </p>
          </div>

          {/* intro */}
          <div className="mb-2 border-t border-slate-800 pt-4 text-slate-600">
            <p>
              You wandered into the void. Type{" "}
              <span className="text-emerald-500">&apos;help&apos;</span> or{" "}
              <span className="text-emerald-500">&apos;cd /&apos;</span> to
              escape.
            </p>
          </div>

          {/* history */}
          <div className="space-y-1 pt-2">
            {history.map((entry, i) => (
              <div key={i} className="fade-line space-y-0.5">
                <p>
                  <span className="text-emerald-500">/dev/null</span>
                  <span className="text-slate-600"> $ </span>
                  <span className="text-slate-100">{entry.cmd}</span>
                </p>
                {entry.output.map((line, j) => (
                  <p key={j} className="whitespace-pre text-slate-500">
                    {line === "" ? " " : line}
                  </p>
                ))}
              </div>
            ))}

            {/* current prompt */}
            {ready && (
              <div className="flex items-center">
                <span className="shrink-0 text-emerald-500">/dev/null</span>
                <span className="shrink-0 text-slate-600">&nbsp;$&nbsp;</span>
                <span className="relative text-slate-100">
                  {input}
                  <span className="blink-cursor text-emerald-400">█</span>
                </span>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* hidden real input */}
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="absolute h-0 w-0 opacity-0"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Terminal input"
          />
        </div>
      </div>
    </>
  );
}
