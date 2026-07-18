import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Building2, Cpu, BarChart3, Users, Zap, ShieldCheck, Rocket } from "lucide-react";
import { resolveLegacyAsset } from "@/lib/assets";
import { usePublicCaseStudies } from "@/services/usePublicContent";

// ── Fallback Data ────────────────────────────────────────────────────────────
const FALLBACK_CASE_STUDIES = [
  {
    number: "01",
    company: "GNY.AI",
    title: "GNY.AI: Artificial Intelligence based Loan Process Automation",
    category: "FINTECH · AI",
    description: "Driving smarter loan processing with AI-powered automation, reducing manual effort and improving accuracy.",
    image: "/src/assets/case studies/GNY.AI.png",
    url: "https://drive.google.com/file/d/1yMaynUYkp669bre9H3MWDdGRiAX84xWi/view",
    stats: [
      { label: "Accuracy", value: "95%", icon: ShieldCheck },
      { label: "Process Time ↓", value: "60%", icon: Zap },
      { label: "Loans Automated", value: "10K+", icon: Users },
    ],
  },
  {
    number: "02",
    company: "GREENJAMS",
    title: "GreenJams: Turning Buildings into Carbon Sinks",
    category: "SUSTAINABILITY · GREEN TECH",
    description: "Pioneering sustainable solutions to transform buildings into carbon negative environments using innovative materials.",
    image: "/src/assets/case studies/Green jams.png",
    url: "https://drive.google.com/file/d/1OmdBvPAe6Nx_b-SX8cm8gjga4-_WZXHI/view?usp=sharing",
    stats: [
      { label: "Carbon Negative", value: "100%", icon: Sparkles },
      { label: "Energy Saving", value: "40%", icon: Cpu },
      { label: "Buildings Built", value: "50+", icon: Building2 },
    ],
  },
  {
    number: "03",
    company: "INTERVIEWBUDDY",
    title: "InterviewBuddy: Revolutionizing Job Interviews",
    category: "HR TECH · AI",
    description: "Empowering candidates and hiring teams with AI-driven interview platforms that ensure fair and effective hiring outcomes.",
    image: "/src/assets/case studies/interview buddy.png",
    url: "https://drive.google.com/file/d/1WTQs7cm0TJIor7GrsbevloM0Xov2_9wx/view?usp=sharing",
    stats: [
      { label: "Hiring Accuracy", value: "90%", icon: BarChart3 },
      { label: "Interviews Analyzed", value: "20K+", icon: Users },
      { label: "Companies Connected", value: "150+", icon: Building2 },
    ],
  },
];

// ── Motion Variants ─────────────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export function CaseStudiesPage() {
  const { data: caseStudies } = usePublicCaseStudies(FALLBACK_CASE_STUDIES);
  const studies = caseStudies ?? FALLBACK_CASE_STUDIES;
  const resolveImage = (img: string) => {
    if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("/api/")) return img;
    return resolveLegacyAsset(img);
  };

  return (
    <div className="min-h-screen bg-[#FCFAF7] font-sans antialiased text-[#0F172A] selection:bg-[#F58220]/20 selection:text-[#F58220]">
      
      {/* ── Custom fonts link (Plus Jakarta Sans) ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        .font-sans {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
      `}</style>

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden pt-20 pb-8 md:pt-24 md:pb-12 border-b border-[rgba(15,23,42,0.06)] bg-gradient-to-b from-[#FCFAF7] via-[#FFFDFB] to-[#FFFFFF]">
        {/* Subtle mesh background */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(245,130,32,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(245,130,32,0.015)_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_at_center,white_75%,transparent)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[380px] w-[700px] rounded-full bg-[#F58220]/4 blur-[100px] pointer-events-none" />
        
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#F58220]"
          >
            OUR IMPACT
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-tight"
          >
            Case Studies
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mx-auto mt-4 max-w-xl text-[18px] text-[#475569] font-normal leading-relaxed"
          >
            Real stories driving innovation across industries.
          </motion.p>

          {/* Minimal orange line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.24 }}
            className="mx-auto mt-6 h-[2px] w-12 bg-[#F58220]"
          />
        </div>
      </section>

      {/* ── Featured Showcase ── */}
      <section className="site-container-wide pt-8 pb-24 md:pt-10 md:pb-32">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-[80px]"
        >
          {studies.map((study, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.a
                key={study.company}
                href={study.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeInUp}
                whileHover={{ y: -8, transition: { duration: 0.35, ease: "easeOut" } }}
                className="group block relative overflow-hidden rounded-[28px] border border-[rgba(15,23,42,0.06)] bg-white p-[40px] shadow-[0_8px_30px_rgba(15,23,42,0.02)] hover:shadow-[0_20px_48px_rgba(15,23,42,0.06)] cursor-pointer transition-all duration-400 min-h-[430px]"
              >
                {/* Large Background Number */}
                <div className="absolute right-[-10px] top-[-20px] -z-0 pointer-events-none select-none text-[150px] font-black text-[#0F172A] opacity-[0.04] transition-all duration-500 group-hover:opacity-[0.06] group-hover:-translate-y-1">
                  {study.number}
                </div>

                <div className="flex flex-col lg:flex-row items-stretch gap-[48px]">
                  {/* Image (45%) */}
                  <div className={`w-full lg:w-[45%] shrink-0 overflow-hidden rounded-[20px] relative min-h-[260px] lg:min-h-[350px] bg-slate-50 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <motion.img
                      src={resolveImage(study.image)}
                      alt={study.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-contain p-4"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/10 to-transparent pointer-events-none" />
                  </div>

                  {/* Content (55%) */}
                  <div className={`flex-1 flex flex-col justify-between py-1 z-10 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div>
                      {/* Category Badge */}
                      <span className="text-[12px] font-bold tracking-[0.2em] text-[#F58220] uppercase block mb-3">
                        {study.category}
                      </span>

                      {/* Heading */}
                      <h3 className="text-[28px] md:text-[34px] font-bold tracking-tight text-[#0F172A] leading-tight group-hover:text-[#F58220] transition-colors duration-300">
                        {study.title}
                      </h3>

                      {/* Description */}
                      <p className="mt-3 text-[18px] leading-relaxed text-[#475569] line-clamp-3">
                        {study.description}
                      </p>
                    </div>

                    {/* Divider & Metrics/CTA */}
                    <div className="mt-6 pt-5 border-t border-[rgba(15,23,42,0.06)]">
                      <div className="flex flex-wrap items-center justify-between gap-6">
                        
                        {/* Stats block */}
                        <div className="flex gap-8">
                          {study.stats.map((stat) => (
                            <div key={stat.label} className="flex flex-col">
                              <span className="text-[22px] font-extrabold text-[#0F172A] flex items-center gap-1.5">
                                <stat.icon size={17} className="text-[#F58220]" strokeWidth={2.2} />
                                {stat.value}
                              </span>
                              <span className="text-[11px] font-medium text-[#475569] uppercase tracking-wider mt-0.5">
                                {stat.label}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* CTA button (Pill style) */}
                        <div className="inline-flex items-center gap-2 rounded-full bg-[#F58220] px-6 py-3 text-[14px] font-bold text-white shadow-[0_4px_16px_rgba(245,130,32,0.22)] transition-all duration-300 group-hover:bg-[#E0721B] group-hover:scale-[1.02] group-hover:shadow-[0_6px_22px_rgba(245,130,32,0.3)] shrink-0">
                          View Case Study
                          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </section>

      {/* ── CTA Section ── */}
      <section className="mx-auto max-w-[1240px] px-6 pb-[120px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="relative overflow-hidden rounded-[32px] border border-[rgba(245,130,32,0.12)] bg-gradient-to-br from-[#FFF9F5] via-white to-[#FFF6F0] p-10 md:p-14 text-center shadow-[0_10px_40px_rgba(245,130,32,0.03)]"
        >
          {/* Subtle decoration pattern */}
          <div
            className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#F58220 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute -left-12 -top-12 w-48 h-48 bg-[#F58220]/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-[#F58220]/5 rounded-full blur-2xl pointer-events-none" />

          {/* Mini Rocket Icon / Illustration */}
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm border border-[rgba(245,130,32,0.1)] mb-6 text-[#F58220]">
            <Rocket size={22} strokeWidth={2} />
          </div>

          <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0F172A]">
            Ready to build the next success story?
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-[18px] text-[#475569] leading-relaxed">
            Join Andhra University's innovation ecosystem and transform your ideas into impactful ventures.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href="/ecosystem/infrastructure"
              className="inline-flex items-center gap-2 rounded-full bg-[#F58220] px-8 py-3.5 text-[16px] font-bold text-white shadow-[0_6px_22px_rgba(245,130,32,0.25)] transition-all duration-300 hover:bg-[#E0721B] hover:shadow-[0_8px_28px_rgba(245,130,32,0.35)]"
            >
              Explore Ecosystem
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
