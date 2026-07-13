import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ReportsPage } from "@/components/sections/ReportsPage";

export const Route = createFileRoute("/achieve/reports")({
  component: AchieveReportsPage,
});

function AchieveReportsPage() {
  return (
    <div className="min-h-screen bg-[#FDF8F2]">
      <Navbar />
      <ReportsPage />
      <Footer />
    </div>
  );
}
