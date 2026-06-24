import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InternshipRegistrationPage } from "@/components/sections/InternshipRegistrationPage";

export const Route = createFileRoute("/students/internship-registration")({
  component: InternshipRegistrationRoutePage,
  head: () => ({
    meta: [
      { title: "Internship Opportunities — AHUB" },
      {
        name: "description",
        content: "Apply for internship opportunities at AHUB ecosystem startups and programs.",
      },
    ],
  }),
});

function InternshipRegistrationRoutePage() {
  return (
    <main className="min-h-screen bg-[#FDF8F2]">
      <Navbar />
      <InternshipRegistrationPage />
      <Footer />
    </main>
  );
}
