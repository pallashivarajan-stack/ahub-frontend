import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InternshipCalendarPage } from "@/components/sections/InternshipCalendarPage";

export const Route = createFileRoute("/students/internship-calendar")({
  component: InternshipCalendarRoutePage,
  head: () => ({
    meta: [
      { title: "Internship Journey Calendar — AHUB Students" },
      {
        name: "description",
        content:
          "Track internship applications, interviews, assessments, and deadlines across AHUB portfolio startups.",
      },
    ],
  }),
});

function InternshipCalendarRoutePage() {
  return (
    <main className="min-h-screen bg-[#FDF8F2]">
      <Navbar />
      <InternshipCalendarPage />
      <Footer />
    </main>
  );
}