import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StartupPortfolioPage } from "@/components/sections/StartupPortfolioPage";

export const Route = createFileRoute("/startups/startup-portfolio")({
  component: StartupPortfolioRoutePage,
  head: () => ({
    meta: [
      { title: "Startup Portfolio — AHUB" },
      {
        name: "description",
        content:
          "Discover AHUB's portfolio of successful startups — explore innovative companies, filter by industry, and find your next collaboration.",
      },
    ],
  }),
});

function StartupPortfolioRoutePage() {
  return (
    <main className="min-h-screen bg-[#FDF8F2]">
      <Navbar />
      <StartupPortfolioPage />
      <Footer />
    </main>
  );
}
