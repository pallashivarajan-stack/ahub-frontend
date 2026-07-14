import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EventRegistrationPage } from "@/components/sections/EventRegistrationPage";

export const Route = createFileRoute("/events/event-registration")({
  component: EventRegistrationRoute,
});

function EventRegistrationRoute() {
  return (
    <div className="min-h-screen bg-[#FDF8F2]">
      <Navbar />
      <EventRegistrationPage />
      <Footer />
    </div>
  );
}