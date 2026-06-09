import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { DistinguishedVisitors } from "@/components/sections/DistinguishedVisitors";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { AhubNetwork } from "@/components/sections/AhubNetwork";
import { PortfolioCompanies } from "@/components/sections/PortfolioCompanies";
import { StartupsTicker } from "@/components/sections/StartupsTicker";
import { IncubatorsShowcase } from "@/components/sections/IncubatorsShowcase";
import { LatestEvents } from "@/components/sections/LatestEvents";
import { MeshNetwork } from "@/components/sections/MeshNetwork";
import { Partners } from "@/components/sections/Partners";
import { FindUsOn } from "@/components/sections/FindUsOn";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "AHUB — Premium Incubation Centre & Startup Ecosystem" },
      {
        name: "description",
        content:
          "AHUB empowers future entrepreneurs through incubation, mentorship and a curated network of capital, operators and institutions.",
      },
      { property: "og:title", content: "AHUB — Premium Incubation Centre" },
      {
        property: "og:description",
        content:
          "Building the next generation startup ecosystem through incubation, mentorship and strategic partnerships.",
      },
      { name: "theme-color", content: "#FFE5CC" },
    ],
  }),
});

function Index() {
  return (
    <main className="relative overflow-x-clip bg-[linear-gradient(135deg,#FFE5CC_0%,#FFF0E1_30%,#FFF7F2_65%,#FFFFFF_100%)]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(60%_45%_at_50%_0%,rgba(255,198,137,0.28),transparent_58%),radial-gradient(38%_26%_at_14%_14%,rgba(255,226,196,0.34),transparent_62%),radial-gradient(30%_22%_at_86%_18%,rgba(255,244,233,0.68),transparent_58%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.34))]" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.85)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.85)_1px,transparent_1px)] [background-size:96px_96px]" />
      <Navbar />
      <Hero />
      <WhatWeDo />
      <AhubNetwork />
      <PortfolioCompanies />
      <StartupsTicker />
      <IncubatorsShowcase />
      <LatestEvents />
      <MeshNetwork />
      <Partners />
      <DistinguishedVisitors />
      <FindUsOn />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "AHUB",
            url: "https://ahub.in",
            description:
              "Premium incubation centre building the next generation startup ecosystem.",
          }),
        }}
      />
    </main>
  );
}
