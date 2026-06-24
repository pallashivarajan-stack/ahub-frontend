import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StartupFundingPage } from "@/components/sections/StartupFundingPage";

export const Route = createFileRoute("/startups/startup-funding")({
  component: StartupFundingRoutePage,
  head: () => ({
    meta: [
      { title: "Startup Funding — AHUB" },
      {
        name: "description",
        content:
          "Explore AHUB funding pathways, investor access, and curated startups building momentum across the ecosystem.",
      },
    ],
  }),
});

function StartupFundingRoutePage() {
  return (
    <main className="min-h-screen bg-[#FDF8F2]">
      <Navbar />
      <StartupFundingPage />
      <Footer />
    </main>
  );
}
