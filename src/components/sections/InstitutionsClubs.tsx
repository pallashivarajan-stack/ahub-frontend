import { motion } from "framer-motion";
import { institutions } from "@/data";
import { SectionHeading } from "@/components/ui-ahub/SectionHeading";
import inst1 from "@/assets/inst-1.jpg";
import inst2 from "@/assets/inst-2.jpg";
import inst3 from "@/assets/inst-3.jpg";
import inst4 from "@/assets/inst-4.jpg";
import inst5 from "@/assets/inst-5.jpg";
import inst6 from "@/assets/inst-6.jpg";

const imgMap: Record<string, string> = {
  "/src/assets/inst-1.jpg": inst1,
  "/src/assets/inst-2.jpg": inst2,
  "/src/assets/inst-3.jpg": inst3,
  "/src/assets/inst-4.jpg": inst4,
  "/src/assets/inst-5.jpg": inst5,
  "/src/assets/inst-6.jpg": inst6,
};

export function InstitutionsClubs() {
  return (
    <section id="aspire" className="relative overflow-hidden py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(90,30,44,0.07),transparent_52%),linear-gradient(180deg,color-mix(in_oklch,var(--background)_94%,white),color-mix(in_oklch,var(--background)_88%,white))]" />
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading eyebrow="Network" title="Institutions and clubs" subtitle="Campuses, student founder communities, and innovation chapters across the country." />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {institutions.map((inst, i) => (
            <motion.div
              key={inst.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
              className={`group relative overflow-hidden rounded-[28px] ${i === 0 ? "md:col-span-2" : ""}`}
            >
              <img
                src={imgMap[inst.img]}
                alt={inst.name}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(90,30,44,0.06)_0%,rgba(90,30,44,0.3)_58%,rgba(90,30,44,0.92)_100%)] opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <div className="text-[0.7rem] uppercase tracking-[0.22em] text-white/70">Partner</div>
                <div className="mt-1 font-display text-lg font-medium md:text-xl">{inst.name}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
