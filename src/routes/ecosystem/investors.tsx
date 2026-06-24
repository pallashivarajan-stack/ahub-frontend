import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InvestorsPage } from "@/components/sections/InvestorsPage";

export const Route = createFileRoute("/ecosystem/investors")({
  component: EcosystemInvestorsPage,
  head: () => ({
    meta: [
      { title: "Investors — AHUB Ecosystem" },
      {
        name: "description",
        content:
          "Connect with AHUB's venture and angel investor network backing founders from pre-seed to growth stage.",
      },
    ],
  }),
});

function EcosystemInvestorsPage() {
  return (
    <main className="min-h-screen bg-[#FDF8F2]">
      <Navbar />
      <InvestorsPage />
      <Footer />
    </main>
  );
}
