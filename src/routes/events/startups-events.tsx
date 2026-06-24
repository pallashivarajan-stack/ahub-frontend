import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StartupsEventsPage } from "@/components/sections/StartupsEventsPage";

export const Route = createFileRoute("/events/startups-events")({
  component: StartupsEventsRoutePage,
  head: () => ({
    meta: [
      { title: "Startup Events — AHUB" },
      {
        name: "description",
        content:
          "Explore AHUB startup ecosystem events — demo days, pitch competitions, workshops, and founder networking sessions.",
      },
    ],
  }),
});

function StartupsEventsRoutePage() {
  return (
    <main className="min-h-screen bg-[#FDF8F2]">
      <Navbar />
      <StartupsEventsPage />
      <Footer />
    </main>
  );
}
