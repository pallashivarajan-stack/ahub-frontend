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
import { Testimonials } from "@/components/sections/Testimonials";
import { MeshNetwork } from "@/components/sections/MeshNetwork";
import { Partners } from "@/components/sections/Partners";
import { FindUsOn } from "@/components/sections/FindUsOn";
import { ContactUs } from "@/components/sections/ContactUs";

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
      { property: "og:image", content: "https://ahub.in/og-image.jpg" },
      { property: "og:url", content: "https://ahub.in" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AHUB — Premium Incubation Centre & Startup Ecosystem" },
      {
        name: "twitter:description",
        content:
          "Building the next generation startup ecosystem through incubation, mentorship and strategic partnerships.",
      },
      { name: "twitter:image", content: "https://ahub.in/og-image.jpg" },
      { name: "theme-color", content: "#FFE5CC" },
    ],
    links: [{ rel: "canonical", href: "https://ahub.in" }],
  }),
});

function Index() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main
        id="main-content"
        className="relative overflow-x-clip bg-[linear-gradient(135deg,#FFE5CC_0%,#FFF0E1_30%,#FFF7F2_60%,#FFF0E1_80%,#FFE8D6_100%)]"
      >
        <Hero />
        <WhatWeDo />
        <AhubNetwork />
        <PortfolioCompanies />
        <StartupsTicker />
        <IncubatorsShowcase />
        <LatestEvents />
        <Testimonials />
        <MeshNetwork />
        <Partners />
        <DistinguishedVisitors />
        <FindUsOn />
        <ContactUs />
      </main>
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
    </>
  );
}
