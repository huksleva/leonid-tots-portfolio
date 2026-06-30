import type { Metadata } from "next";
import Terminal from "@/components/lab/Terminal";

export const metadata: Metadata = {
  title: "Lab — Leonid Tots",
  description: "Interactive terminal — a developer's portfolio in shell format.",
  robots: { index: false, follow: false },
};

export default function LabPage() {
  return <Terminal />;
}
