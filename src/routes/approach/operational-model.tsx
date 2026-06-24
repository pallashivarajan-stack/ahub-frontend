import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OperationalModelPage } from "@/components/sections/OperationalModelPage";

export const Route = createFileRoute("/approach/operational-model")({
  component: ApproachOperationalModelPage,
});

function ApproachOperationalModelPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <OperationalModelPage />
      <Footer />
    </div>
  );
}
