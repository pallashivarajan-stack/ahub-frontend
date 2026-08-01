import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StartupBlogPage } from "@/components/sections/StartupBlogPage";

export const Route = createFileRoute("/startups/blog")({
  component: StartupBlogRoutePage,
  head: () => ({
    meta: [
      { title: "Startup Blog — AHUB" },
      {
        name: "description",
        content:
          "Insights, founder stories, and practical guidance from the AHUB startup ecosystem — funding, product, and growth.",
      },
    ],
  }),
});

function StartupBlogRoutePage() {
  return (
    <main className="min-h-screen bg-[#F8F4EE]">
      <Navbar />
      <StartupBlogPage />
      <Footer />
    </main>
  );
}
