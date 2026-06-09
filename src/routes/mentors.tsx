import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Mentors } from "@/components/sections/Mentors";

export const Route = createFileRoute("/mentors")({
  component: MentorsPage,
});

function MentorsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Mentors />
      <Footer />
    </div>
  );
}
