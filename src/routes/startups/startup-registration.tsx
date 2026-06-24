import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StartupRegistrationPage } from "@/components/sections/StartupRegistrationPage";

export const Route = createFileRoute("/startups/startup-registration")({
  component: StartupRegistration,
});

function StartupRegistration() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <StartupRegistrationPage />
      <Footer />
    </div>
  );
}
