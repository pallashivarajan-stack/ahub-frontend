import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ImpactPage } from "@/components/sections/ImpactPage";

export const Route = createFileRoute("/achieve/impact")({
  component: AchieveImpactPage,
});

function AchieveImpactPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <ImpactPage />
      <Footer />
    </div>
  );
}
