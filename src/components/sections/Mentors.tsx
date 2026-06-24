import { motion, type Variants } from "framer-motion";
import { Linkedin, ArrowUpRight, Users, Star, Briefcase } from "lucide-react";
import { mentors } from "@/data";

const EXPERTISE_TAGS: Record<string, string[]> = {
  "Deepak S. Madala": ["Strategy", "Operations", "Leadership"],
  "Dr. Diwakar K Vadapalli": ["Technology", "Innovation", "R&D"],
  "Kiran Korivi": ["Product", "Growth", "UX"],
  "Peter Schneberger": ["Venture Capital", "International", "Startups"],
  "Ravi Eswarapu": ["Finance", "Investment", "Fundraising"],
  "Srinivas Savaram": ["Ecosystem", "Partnerships", "Community"],
};

const STATS = [
  { value: "80+", label: "Expert Mentors", icon: Users },
  { value: "12+", label: "Industry Sectors", icon: Briefcase },
  { value: "4.9", label: "Avg. Rating", icon: Star },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export function Mentors() {
  return (
    <>
      <style>{`
        .mn-section {
          background: #FAF7F2;
          position: relative;
          isolation: isolate;
          padding: 120px 0;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
        }

        .mn-bg-pattern {
          position: absolute;
          inset: 0;
          z-index: -1;
          background-image: 
            radial-gradient(ellipse 60% 50% at 80% 0%, rgba(201,168,76,0.06), transparent 60%),
            radial-gradient(ellipse 50% 40% at 10% 70%, rgba(201,168,76,0.04), transparent 55%);
        }

        .mn-header-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(201,168,76,0.1);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 9999px;
          padding: 6px 16px;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: #A8863A;
          margin-bottom: 24px;
        }

        .mn-header-title {
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 800;
          color: #0A1128;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin-bottom: 24px;
        }

        .mn-header-title span {
          background: linear-gradient(135deg, #C9A84C 0%, #E8C86B 50%, #A8863A 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .mn-divider {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0 auto 30px;
          justify-content: center;
        }

        .mn-divider-line {
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.4));
        }
        .mn-divider-line.right {
          background: linear-gradient(-90deg, transparent, rgba(201,168,76,0.4));
        }
        .mn-divider-diamond {
          width: 8px;
          height: 8px;
          background: #C9A84C;
          transform: rotate(45deg);
        }

        .mn-card {
          background: #FFFFFF;
          border-radius: 24px;
          border: 1px solid rgba(201,168,76,0.15);
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05);
          overflow: hidden;
          position: relative;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          height: 100%;
        }

        .mn-card:hover {
          transform: translateY(-8px);
          border-color: rgba(201,168,76,0.3);
          box-shadow: 0 24px 50px -12px rgba(10,17,40,0.1), 0 0 0 1px rgba(201,168,76,0.1);
        }

        .mn-card-accent {
          height: 4px;
          width: 100%;
          background: linear-gradient(90deg, #A8863A, #E8C86B, #C9A84C);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .mn-card:hover .mn-card-accent {
          opacity: 1;
        }

        .mn-card-content {
          padding: 32px 28px;
        }

        .mn-avatar-wrap {
          position: relative;
          width: 80px;
          height: 80px;
          border-radius: 20px;
          overflow: hidden;
          border: 2px solid #FDFBF7;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
          background: #F0EDE5;
        }

        .mn-avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .mn-card:hover .mn-avatar {
          transform: scale(1.08);
        }

        .mn-card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #0A1128;
          margin-top: 16px;
          margin-bottom: 4px;
        }

        .mn-card-role {
          font-size: 0.85rem;
          font-weight: 600;
          color: #C9A84C;
        }

        .mn-card-org {
          font-size: 0.75rem;
          color: #706760;
          margin-top: 2px;
        }

        .mn-tag {
          background: rgba(201,168,76,0.08);
          border: 1px solid rgba(201,168,76,0.15);
          color: #A8863A;
          border-radius: 999px;
          padding: 4px 12px;
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .mn-cta {
          background: #0A1128;
          color: #FFFFFF;
          border-radius: 24px;
          padding: 48px;
          text-align: center;
          margin-top: 64px;
          box-shadow: 0 20px 40px -10px rgba(10,17,40,0.3);
          border: 1px solid rgba(255,255,255,0.08);
          position: relative;
          overflow: hidden;
        }

        .mn-cta::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 0%, rgba(201,168,76,0.15), transparent 70%);
          pointer-events: none;
        }

        .mn-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #C9A84C 0%, #A8863A 100%);
          color: #FFFFFF;
          font-size: 0.85rem;
          font-weight: 700;
          padding: 12px 28px;
          border-radius: 999px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: all 0.3s ease;
          box-shadow: 0 8px 24px -6px rgba(201,168,76,0.4);
        }

        .mn-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px -8px rgba(201,168,76,0.6);
        }
      `}</style>

      <section className="mn-section">
        <div className="mn-bg-pattern" />

        <div className="mx-auto max-w-7xl px-6 md:px-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center mb-16"
          >
            <div className="mn-header-pill">✦ Our Mentors</div>

            <h1 className="mn-header-title">
              Guiding the Next <br />
              <span>Generation of Innovators</span>
            </h1>

            <div className="mn-divider">
              <div className="mn-divider-line" />
              <div className="mn-divider-diamond" />
              <div className="mn-divider-line right" />
            </div>

            <p className="max-w-[640px] text-[15px] leading-relaxed text-[#706760] font-medium">
              Industry experts and seasoned operators committed to nurturing startups and building India's next generation of category-defining companies.
            </p>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {STATS.map(({ value, label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C9A84C]/10 text-[#C9A84C]">
                    <Icon size={20} />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-extrabold text-[#0A1128] leading-tight">{value}</div>
                    <div className="text-xs font-semibold text-[#706760] uppercase tracking-wider mt-0.5">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {mentors.map((mentor) => (
              <MentorCard key={mentor.name} mentor={mentor} />
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="mn-cta max-w-3xl w-full">
              <div className="text-2xl font-bold text-white mb-3">Want to become a mentor?</div>
              <p className="text-sm text-white/70 mb-8 max-w-xl mx-auto leading-relaxed">
                Join our growing network of industry leaders and help shape the next wave of Indian entrepreneurs. Share your expertise, network, and vision.
              </p>
              <a href="mailto:mentors@ahub.in" className="mn-cta-btn">
                Apply to Mentor <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}

function MentorCard({ mentor }: { mentor: (typeof mentors)[number] }) {
  const tags = EXPERTISE_TAGS[mentor.name] ?? [];

  return (
    <motion.div variants={cardVariants} className="group">
      <div className="mn-card">
        <div className="mn-card-accent" />

        <div className="mn-card-content">
          <div className="flex items-start gap-5">
            <div className="mn-avatar-wrap">
              <img src={mentor.image} alt={mentor.name} className="mn-avatar" />
            </div>

            <div className="flex-1 min-w-0 pt-1">
              <h3 className="mn-card-title truncate">{mentor.name}</h3>
              <p className="mn-card-role truncate">{mentor.title}</p>
              <p className="mn-card-org truncate">{mentor.organization}</p>
            </div>
          </div>

          {tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="mn-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.2)] to-transparent" />

          <a
            href={mentor.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link flex items-center justify-between text-sm text-[#706760] transition-colors hover:text-[#0A1128]"
          >
            <span className="font-semibold flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F0EDE5] text-[#A8863A] transition-colors group-hover/link:bg-[#0A1128] group-hover/link:text-white">
                <Linkedin size={14} />
              </span>
              View Profile
            </span>
            <ArrowUpRight size={16} className="text-[#A8863A] transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
