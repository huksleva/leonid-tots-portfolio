import type { Metadata } from "next";
import Link from "next/link";
import ParticleField from "@/components/lab/ParticleField";

export const metadata: Metadata = {
  title: "Lab — Leonid Tots",
  description: "Interactive 3D particle field — a generative canvas experiment.",
  robots: { index: false, follow: false },
};

export default function LabPage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <ParticleField />

      <div
        className="fixed inset-0 pointer-events-none flex flex-col justify-between p-8"
        style={{ zIndex: 10 }}
      >
        <div className="flex items-start justify-between">
          <Link
            href="/"
            className="pointer-events-auto font-mono text-sm text-white/30 transition-colors hover:text-white/70"
          >
            ← portfolio
          </Link>
          <p className="font-mono text-xs tracking-widest text-white/20 uppercase">
            3D Particle Field
          </p>
        </div>

        <div className="flex items-end justify-between">
          <p className="font-mono text-xs text-white/15">
            move cursor to interact
          </p>
          <p className="font-mono text-xs text-white/15">
            {160} particles · canvas api
          </p>
        </div>
      </div>
    </div>
  );
}
