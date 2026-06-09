import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Team } from "@/components/sections/Team";

export const Route = createFileRoute("/about/team")({
  component: AboutTeamPage,
});

function AboutTeamPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Team />
      <Footer />
    </div>
  );
}
