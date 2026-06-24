import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JoinUsPage } from "@/components/sections/JoinUsPage";

export const Route = createFileRoute("/programs/join-us")({
  component: ProgramsJoinUsPage,
});

function ProgramsJoinUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <JoinUsPage />
      <Footer />
    </div>
  );
}
