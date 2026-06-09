import { motion } from "framer-motion";
import bvrMohanReddy from "@/assets/visitors/bvr mohan reddy.jpeg";
import rishiMehta from "@/assets/visitors/rishi mehta.jpg";
import matsViberg from "@/assets/visitors/mats viberg.jpeg";
import malcolmByrne from "@/assets/visitors/malcolm Byrne.jpg";
import drLawrenceJones from "@/assets/visitors/dr lawrence jones.jpeg";
import narayanaMurthy from "@/assets/visitors/naryana murthy.png";
import gMalikarjunaRao from "@/assets/visitors/G malikarjuna rao.jpg";
import carmeloRosa from "@/assets/visitors/carmelo rosa.jpg";
import orangeVisitorsBackground from "@/assets/orange  visitors background.png";
import { SectionHeading } from "@/components/ui-ahub/SectionHeading";

export function DistinguishedVisitors() {
  const visitors = [
    {
      name: "BVR Mohan Reddy",
      role: "Chairman",
      org: "Cyient",
      image: bvrMohanReddy,
    },
    {
      name: "Rishi Mehta",
      role: "Chief Executive Officer",
      org: "WAISL",
      image: rishiMehta,
    },
    {
      name: "Mats Viberg",
      role: "Vice Chancellor",
      org: "Blekinge Institute of Technology",
      image: matsViberg,
    },
    {
      name: "Malcolm Byrne",
      role: "Senator",
      org: "Senate of Ireland",
      image: malcolmByrne,
    },
    {
      name: "Dr Lawrence Jones",
      role: "Programme Director",
      org: "Wageningen University",
      image: drLawrenceJones,
    },
    {
      name: "N. R. Narayana Murthy",
      role: "Founder & Former CEO",
      org: "Infosys",
      image: narayanaMurthy,
    },
    {
      name: "G. Malikarjuna Rao",
      role: "Chairman",
      org: "GMR Group",
      image: gMalikarjunaRao,
    },
    {
      name: "Carmelo Rosa",
      role: "Director",
      org: "UD FDA",
      image: carmeloRosa,
    },
  ];

  const loop = [...visitors, ...visitors];

  return (
    <section
      data-animate
      className="relative isolate overflow-hidden bg-white py-16 text-foreground md:py-20"
      style={{
        backgroundImage:
          "linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(255,244,234,0.78)_22%,rgba(255,229,204,0.58)_62%,rgba(255,255,255,0.95)_100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-90"
        style={{ backgroundImage: `url(${orangeVisitorsBackground})` }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_55%_at_50%_0%,rgba(255,255,255,0.38),transparent_58%),linear-gradient(180deg,rgba(255,255,255,0.42),rgba(255,255,255,0.12))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(255,246,238,0.96))]" />
      <div className="pointer-events-none absolute -bottom-14 left-1/2 h-36 w-[68%] -translate-x-1/2 rounded-full bg-[rgba(255,214,180,0.38)] blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 text-center md:px-10">
        <SectionHeading
          eyebrow="OUR DISTINGUISHED VISITORS"
          title="Visionaries Driving Innovation"
          subtitle="Leaders from policy, capital, and craft who have walked the floor, met the founders, and shared their counsel."
          align="center"
        />
      </div>

      <div className="group mt-10 overflow-hidden">
        <motion.div
          aria-hidden
          className="flex w-max gap-5 px-6 will-change-transform md:px-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 42, ease: "linear", repeat: Infinity }}
        >
          {loop.map((v, i) => (
            <motion.article
              key={i}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="flex w-[300px] shrink-0 flex-col overflow-hidden rounded-[28px] border border-[color:color-mix(in_oklch,var(--primary)_10%,transparent)] bg-[color-mix(in_oklch,var(--card)_92%,transparent)] shadow-[0_18px_48px_-30px_rgba(90,30,44,0.38)] backdrop-blur-md md:w-[320px]"
            >
              <div className="flex items-start gap-4 p-5 pb-4">
                <img
                  src={v.image}
                  alt={v.name}
                  loading="lazy"
                  draggable={false}
                  className="h-24 w-24 shrink-0 rounded-[20px] object-cover ring-4 ring-[color:color-mix(in_oklch,var(--background)_92%,white)]"
                />

                <div className="min-w-0 flex-1 pt-1">
                  <div className="inline-flex items-center rounded-full border border-[color:color-mix(in_oklch,var(--primary)_10%,transparent)] bg-[color-mix(in_oklch,var(--background)_90%,white)] px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-primary/80">
                    Distinguished Visitor
                  </div>

                  <h3 className="mt-4 text-[1.05rem] font-semibold leading-tight text-foreground">
                    {v.name}
                  </h3>
                  <p className="mt-1 text-sm leading-snug text-muted-foreground">{v.role}</p>
                  <p className="text-sm leading-snug text-muted-foreground/90">{v.org}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
