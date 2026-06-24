import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RewardsPage } from "@/components/sections/RewardsPage";

export const Route = createFileRoute("/about/rewards")({
  component: AboutRewardsPage,
});

function AboutRewardsPage() {
  return (
    <div className="min-h-screen bg-[#FAF6F0]">
      <Navbar />
      <RewardsPage />
      <Footer />
    </div>
  );
}
