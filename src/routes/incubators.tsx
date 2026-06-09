import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IncubatorsShowcase } from "@/components/sections/IncubatorsShowcase";

export const Route = createFileRoute("/incubators")({
  head: () => ({
    meta: [
      { title: "Incubators - AHUB" },
      {
        name: "description",
        content:
          "Premium incubator showcase with mentorship, resources, and founder-first growth programs.",
      },
    ],
  }),
  component: IncubatorsPage,
});

function IncubatorsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <IncubatorsShowcase />
      <Footer />
    </main>
  );
}
