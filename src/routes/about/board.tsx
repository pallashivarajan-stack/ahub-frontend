import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Board } from "@/components/sections/Board";

export const Route = createFileRoute("/about/board")({
  component: AboutBoardPage,
});

function AboutBoardPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Board />
      <Footer />
    </div>
  );
}
