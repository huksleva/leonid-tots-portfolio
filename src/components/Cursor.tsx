"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.documentElement.classList.add("js-custom-cursor");
    const el = ref.current;
    if (!el) return;

    const move = (e: MouseEvent) => {
      el.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
    };

    const over = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button, [role="button"]')) {
        el.setAttribute("data-hover", "");
      }
    };

    const out = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button, [role="button"]')) {
        el.removeAttribute("data-hover");
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);

    return () => {
      document.documentElement.classList.remove("js-custom-cursor");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="cursor-dot pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
      style={{ transform: "translate(-200px, -200px)" }}
    />
  );
}
