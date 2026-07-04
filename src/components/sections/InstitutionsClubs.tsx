import { motion } from "framer-motion";
import { institutions } from "@/data";
import { SectionHeading } from "@/components/ui-ahub/SectionHeading";
import { usePublicInstitutionsClubs } from "@/services/usePublicContent";

export function InstitutionsClubs() {
  const { data: instData } = usePublicInstitutionsClubs(institutions);
  const displayInstitutions = instData ?? institutions;
  return (
    <section id="aspire" className="relative overflow-hidden py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(90,30,44,0.07),transparent_52%),linear-gradient(180deg,color-mix(in_oklch,var(--background)_94%,white),color-mix(in_oklch,var(--background)_88%,white))]" />
      <div className="site-container-wide">
        <SectionHeading eyebrow="Network" title="Institutions and clubs" subtitle="Campuses, student founder communities, and innovation chapters across the country." />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {displayInstitutions.map((inst, i) => (
            <motion.div
              key={inst.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
              className={`group relative overflow-hidden rounded-[28px] ${i === 0 ? "md:col-span-2" : ""}`}
            >
              <img
                src={inst.img}
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
