import Navbar from "@/components/Navbar";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div id="main-content" className="pt-16">{children}</div>
    </>
  );
}
