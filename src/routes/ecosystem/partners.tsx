import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PartnersPage } from "@/components/sections/PartnersPage";

export const Route = createFileRoute("/ecosystem/partners")({
  component: EcosystemPartnersPage,
  head: () => ({
    meta: [
      { title: "Partners — AHUB Ecosystem" },
      {
        name: "description",
        content:
          "Explore AHUB's network of trusted institutional and corporate partners driving innovation and startup growth.",
      },
    ],
  }),
});

function EcosystemPartnersPage() {
  return (
    <main className="min-h-screen bg-[#FDF8F2]">
      <Navbar />
      <PartnersPage />
      <Footer />
    </main>
  );
}
