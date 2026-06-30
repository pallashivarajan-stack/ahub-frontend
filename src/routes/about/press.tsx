import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PressPage } from "@/components/sections/PressPage";

export const Route = createFileRoute("/about/press")({
  component: AboutPressPage,
});

function AboutPressPage() {
  return (
    <div className="min-h-screen bg-[#FCFCFC]">
      <Navbar />
      <PressPage />
      <Footer />
    </div>
  );
}
