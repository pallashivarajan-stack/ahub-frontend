import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StudentDashboardPage } from "@/components/sections/StudentDashboardPage";

export const Route = createFileRoute("/students/dashboard")({
  component: StudentDashboardRoutePage,
  head: () => ({
    meta: [
      { title: "Student Internship Dashboard — AHUB" },
      {
        name: "description",
        content:
          "Manage applications, active internships, interviews, and explore opportunities at top startups.",
      },
    ],
  }),
});

function StudentDashboardRoutePage() {
  return (
    <main className="min-h-screen bg-[#FAF7F4] text-slate-900">
      <Navbar />
      <StudentDashboardPage />
      <Footer />
    </main>
  );
}
