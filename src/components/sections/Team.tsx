import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Users } from "lucide-react";
import { team, teamGroupPhoto, teamPageData } from "@/data";
import { usePublicTeam, usePublicTeamPage } from "@/services/usePublicContent";

const ROLE_COLORS: Record<string, string> = {
  Manager: "bg-[#fff3e8] text-[#d85211] border-[#ffd4a8]",
  Engineer: "bg-[#eef4ff] text-[#2563eb] border-[#bfdbfe]",
  Executive: "bg-[#f0fdf4] text-[#16a34a] border-[#bbf7d0]",
  Assistant: "bg-[#fdf4ff] text-[#9333ea] border-[#e9d5ff]",
  Intern: "bg-[#f8fafc] text-[#64748b] border-[#e2e8f0]",
};

function getRoleBadge(title: string) {
  const key = Object.keys(ROLE_COLORS).find((k) => title.includes(k));
  return ROLE_COLORS[key ?? "Intern"];
}

function getRoleLabel(title: string) {
  if (title.includes("Intern")) return "Intern";
  if (title.includes("Manager")) return "Manager";
  if (title.includes("Engineer")) return "Engineer";
  if (title.includes("Executive")) return "Executive";
  if (title.includes("Assistant")) return "Assistant";
  return "Team";
}

export function Team() {
  const { data: teamData } = usePublicTeam(team);
  const { data: meta } = usePublicTeamPage(teamPageData);

  const pageMeta = meta ?? teamPageData;

  return (
    <section id="team" className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#FFF7F2_0%,#FFF8F3_100%)] py-16 md:py-24">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_20%_0%,rgba(255,191,128,0.15),transparent_50%),radial-gradient(80%_50%_at_80%_20%,rgba(255,236,218,0.5),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="pointer-events-none absolute left-[5%] top-20 h-40 w-40 rounded-full bg-[#FFB76B]/20 blur-3xl" />
      <div className="pointer-events-none absolute right-[10%] top-40 h-56 w-56 rounded-full bg-[#FFF0E1]/60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 left-[15%] h-48 w-48 rounded-full bg-[#FF8901]/15 blur-3xl" />

      <div className="site-container-wide">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#ff8901]/20 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-[#ff8901]/80"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff8901]" />
            OUR TEAM
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="text-balance font-display font-bold leading-[1.08] tracking-tight text-3xl md:text-4xl lg:text-5xl"
            style={{ color: "#000000" }}
          >
            Dedicated Operators<br />
            <span className="text-[#ff8901]">Building the Ecosystem</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            className="mt-5 text-balance text-base leading-relaxed md:text-lg text-muted-foreground"
          >
            Passionate team members committed to fostering innovation, supporting founders, and creating a world-class startup environment.
          </motion.p>
        </div>

        {/* Group Photo Banner */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 overflow-hidden rounded-2xl border border-[#F3E4D7] shadow-[0_16px_60px_rgba(231,87,16,0.12)]"
        >
          <div className="relative h-64 sm:h-80 md:h-96">
            <img
              src={pageMeta.groupPhoto || teamGroupPhoto}
              alt="A-Hub Team Group Photo"
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  {pageMeta.title && (
                    <div className="text-xs uppercase tracking-widest text-white/70 mb-1">{pageMeta.title}</div>
                  )}
                  {pageMeta.subtitle && (
                    <h3 className="text-xl md:text-2xl font-bold text-white">{pageMeta.subtitle}</h3>
                  )}
                  {pageMeta.description && (
                    <p className="mt-1 text-sm text-white/75">{pageMeta.description}</p>
                  )}
                </div>
                <div className="hidden sm:flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 backdrop-blur-sm">
                  <Users size={16} className="text-white/80" />
                  <span className="text-sm font-semibold text-white">{teamData.length} {pageMeta.memberCountLabel || "Team Members"}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Team Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {teamData.map((member: any, index: number) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCard({
  member,
  index,
}: {
  member: any;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const badgeClass = getRoleBadge(member.title);

  const handleLink = member.visitLink || member.linkedIn;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#F3E4D7] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-500 hover:shadow-[0_20px_60px_rgba(255,137,1,0.18)] hover:-translate-y-1.5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Photo */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-100 to-[#FFF0E1]">
        <motion.img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover object-top"
          animate={{ scale: isHovered ? 1.06 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
        />
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-4"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
        >
          <p className="text-base font-bold text-white drop-shadow-md leading-tight">{member.name}</p>
          <p className="mt-0.5 text-xs text-white/85 drop-shadow-sm">{member.title}</p>
        </motion.div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 leading-snug">{member.name}</h3>
          <p className="mt-1.5 text-xs font-medium text-[#e75710]">{member.title}</p>
          {member.tagline && (
            <p className="mt-2 text-xs text-slate-500 leading-relaxed line-clamp-2">{member.tagline}</p>
          )}
          <div className="mt-3">
            <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${badgeClass}`}>
              {getRoleLabel(member.title)}
            </span>
          </div>
        </div>

        {/* Visit Link */}
        {handleLink && (
          <motion.a
            href={handleLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg border border-[#0A66C2]/20 bg-[#0A66C2]/6 px-3 py-2 text-xs font-semibold text-[#0A66C2] transition-all duration-300 hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/12 hover:shadow-md"
            whileHover={{ y: -1.5 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Visit Profile</span>
            <motion.span animate={{ x: isHovered ? 2 : 0 }} transition={{ duration: 0.25 }}>
              <ArrowUpRight size={12} className="flex-shrink-0" />
            </motion.span>
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}
