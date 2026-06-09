import { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, ArrowUpRight } from "lucide-react";
import { team } from "@/data";
import { SectionHeading } from "@/components/ui-ahub/SectionHeading";

export function Team() {
  return (
    <section id="team" className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#FFF7F2_0%,#FFF8F3_100%)] py-16 md:py-24">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_20%_0%,rgba(255,191,128,0.15),transparent_50%),radial-gradient(80%_50%_at_80%_20%,rgba(255,236,218,0.5),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:72px_72px]" />
      
      <div className="pointer-events-none absolute left-[5%] top-20 h-40 w-40 rounded-full bg-[#FFB76B]/20 blur-3xl" />
      <div className="pointer-events-none absolute right-[10%] top-40 h-56 w-56 rounded-full bg-[#FFF0E1]/60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 left-[15%] h-48 w-48 rounded-full bg-[#FF8901]/15 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Section Header */}
        <SectionHeading
          eyebrow="OUR TEAM"
          title="Dedicated Operators Building the Ecosystem"
          subtitle="Passionate team members committed to fostering innovation, supporting founders, and creating a world-class startup environment."
          align="center"
        />

        {/* Team Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {team.map((member, index) => (
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
  member: (typeof team)[number];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#F3E4D7] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all duration-500 hover:shadow-[0_24px_80px_rgba(255,137,1,0.2)] hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Overlay */}
      <div className="relative h-80 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50">
        <motion.img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Overlay Content */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-5"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white drop-shadow-lg">{member.name}</h3>
            <p className="text-sm text-white/90 drop-shadow-md">{member.title}</p>
            <p className="text-xs text-white/80 drop-shadow-md">{member.organization}</p>
          </div>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col justify-between p-6">
        {/* Member Info */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{member.name}</h3>
          <p className="mt-1 text-sm font-medium text-[#ff8901]">{member.title}</p>
          <p className="text-xs text-slate-600">{member.organization}</p>
        </div>

        {/* LinkedIn Button */}
        <motion.a
          href={member.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg border border-[#0A66C2]/20 bg-[#0A66C2]/8 px-4 py-3 text-sm font-semibold text-[#0A66C2] transition-all duration-300 hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/15 hover:shadow-lg"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <Linkedin size={16} className="flex-shrink-0" />
          <span>View Profile</span>
          <motion.div animate={{ x: isHovered ? 3 : 0 }} transition={{ duration: 0.3 }}>
            <ArrowUpRight size={14} className="flex-shrink-0" />
          </motion.div>
        </motion.a>
      </div>
    </motion.div>
  );
}
