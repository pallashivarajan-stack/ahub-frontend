import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CaseStudiesPage } from "@/components/sections/CaseStudiesPage";

export const Route = createFileRoute("/events/case-studies")({
  component: EventsCaseStudiesPage,
});

function EventsCaseStudiesPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      <Navbar />
      <CaseStudiesPage />
      <Footer />
    </div>
  );
}
