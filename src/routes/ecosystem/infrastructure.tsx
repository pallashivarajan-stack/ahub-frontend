import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InfrastructurePage } from "@/components/sections/InfrastructurePage";

export const Route = createFileRoute("/ecosystem/infrastructure")({
  component: EcosystemInfrastructurePage,
  head: () => ({
    meta: [
      { title: "Infrastructure — āhub Ecosystem" },
      {
        name: "description",
        content:
          "Explore āhub's world-class startup infrastructure — coworking spaces, research labs, event venues, and collaborative environments.",
      },
    ],
  }),
});

function EcosystemInfrastructurePage() {
  return (
    <main className="min-h-screen bg-[#FDF8F2]">
      <Navbar />
      <InfrastructurePage />
      <Footer />
    </main>
  );
}
