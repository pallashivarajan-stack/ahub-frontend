import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EventsCalendarPage } from "@/components/sections/EventsCalendarPage";

export const Route = createFileRoute("/events/calendar")({
  component: EventsCalendarRoutePage,
  head: () => ({
    meta: [
      { title: "Event Calendar — AHUB" },
      {
        name: "description",
        content:
          "Explore AHUB ecosystem events — workshops, hackathons, seminars, and startup programs at Andhra University.",
      },
    ],
  }),
});

function EventsCalendarRoutePage() {
  return (
    <main className="min-h-screen bg-[#FDF8F2]">
      <Navbar />
      <EventsCalendarPage />
      <Footer />
    </main>
  );
}
