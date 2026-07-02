"use client";

import { useState } from "react";
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

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const { tr } = useLang();
  const c = tr.contact;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website: "" }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error ?? "");
        setStatus("error");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Network error");
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-600 dark:focus:border-zinc-600";

  return (
    <section id="contacts" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <AnimateOnScroll>
          <h2 className="mb-4 font-mono text-sm uppercase tracking-widest text-zinc-500">
            {c.title}
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll delay={100}>
          <p className="mb-12 text-zinc-600 dark:text-zinc-400">{c.description}</p>
        </AnimateOnScroll>

        {/* Contact cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {links.map(({ label, value, href }, i) => (
            <AnimateOnScroll key={label} delay={200 + i * 100} className="flex flex-col">
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex flex-1 flex-col gap-1 rounded-xl border border-zinc-200 bg-zinc-50/80 px-6 py-5 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-600"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
                    {label}
                  </span>
                  <span className="text-xs text-zinc-300 transition-colors group-hover:text-zinc-500 dark:text-zinc-700 dark:group-hover:text-zinc-400">
                    ↗
                  </span>
                </div>
                <span className="text-sm text-zinc-700 dark:text-zinc-300">{value}</span>
              </a>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Contact form */}
        <AnimateOnScroll delay={500}>
          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-4 rounded-xl border border-zinc-200 bg-zinc-50/80 p-6 dark:border-zinc-800 dark:bg-zinc-900/50"
          >
            {/* honeypot — hidden from humans, filled by bots */}
            <input
              type="text"
              name="website"
              aria-hidden="true"
              tabIndex={-1}
              className="absolute h-0 w-0 opacity-0"
              autoComplete="off"
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1.5 block text-xs text-zinc-500 dark:text-zinc-400"
                >
                  {c.formName}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  maxLength={100}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={c.formNamePlaceholder}
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1.5 block text-xs text-zinc-500 dark:text-zinc-400"
                >
                  {c.formEmail}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  maxLength={200}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={c.formEmailPlaceholder}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-1.5 block text-xs text-zinc-500 dark:text-zinc-400"
              >
                {c.formMessage}
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                maxLength={2000}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={c.formMessagePlaceholder}
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
              >
                {status === "loading" ? c.formSubmitting : c.formSubmit}
              </button>

              {status === "success" && (
                <p role="status" className="text-sm text-emerald-600 dark:text-emerald-400">
                  {c.formSuccess}
                </p>
              )}
              {status === "error" && (
                <p role="alert" className="text-sm text-red-500 dark:text-red-400">
                  {c.formError}
                </p>
              )}
            </div>
          </form>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
