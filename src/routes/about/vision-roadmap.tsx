import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VisionRoadmapPage } from "@/components/sections/VisionRoadmapPage";

export const Route = createFileRoute("/about/vision-roadmap")({
  component: AboutVisionRoadmapPage,
});

function AboutVisionRoadmapPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <VisionRoadmapPage />
      <Footer />
    </div>
  );
}
