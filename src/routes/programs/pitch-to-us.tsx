import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PitchToUsPage } from "@/components/sections/PitchToUsPage";

export const Route = createFileRoute("/programs/pitch-to-us")({
  component: PitchToUs,
});

function PitchToUs() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <PitchToUsPage />
      <Footer />
    </div>
  );
}
