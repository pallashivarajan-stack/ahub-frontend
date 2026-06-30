import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowUpRight,
  Mail,
  CalendarDays,
  Rocket,
  Globe2,
  Users2,
  Megaphone,
  Newspaper,
  Award,
  Landmark,
  TrendingUp,
  Lightbulb,
  Handshake,
  BadgeCheck,
  ScrollText,
  ChevronLeft,
  ChevronRight,
  Zap,
  Brain,
  FlaskConical,
  type LucideIcon,
} from "lucide-react";
import { usePublicPress, usePublicPressPage } from "@/services/usePublicContent";
import { pressItems as staticPress, defaultPressPageMeta, type PressItem } from "@/data/pressPage";

const TAG_ICON_MAP: Record<string, LucideIcon> = {
  Event: CalendarDays,
  Funding: TrendingUp,
  Grants: FlaskConical,
  Recognition: Award,
  Partnership: Handshake,
  Infrastructure: Brain,
  Leadership: BadgeCheck,
  Global: Globe2,
  Innovation: Rocket,
  "Space Tech": Megaphone,
  Community: Users2,
  Education: Lightbulb,
  MedTech: FlaskConical,
  Pharma: ScrollText,
  Milestone: Rocket,
  Policy: Brain,
  Strategy: TrendingUp,
};

function resolveIcon(tag: string): LucideIcon {
  return TAG_ICON_MAP[tag] ?? Newspaper;
}

// ── Data ─────────────────────────────────────────────────────────────────────
const PRESS_ITEMS: PressItem[] = [
  {
    title: "Smart India Hackathon (SIH) internal competition at the university level concludes successfully",
    date: "May 24, 2024",
    url: "https://drive.google.com/file/d/1oC6X59CsAuJMk2Wt2QRrhTKNyhkc1Vbt/view?usp=sharing",
    description: "A-Hub's internal SIH competition concluded with top-performing student teams advancing to the national round.",
    source: "A-Hub Official",
    tag: "Event",
    Icon: CalendarDays,
  },
  {
    title: "Ā-hub launches early stage grant programme to empower innovators",
    date: "May 10, 2024",
    url: "https://www.thehansindia.com/andhra-pradesh/-hub-launches-early-stage-grant-programme-to-empower-innovators-817465",
    description: "A new grant programme offers seed funding and mentorship support to early-stage innovators within the ecosystem.",
    source: "The Hans India",
    tag: "Funding",
    Icon: Zap,
  },
  {
    title: "Andhra University Incubation Centre invites applications for NIDHI grants",
    date: "Apr 28, 2024",
    url: "https://www.thehindu.com/news/cities/Visakhapatnam/andhra-university-incubation-centre-in-visakhapatnam-invites-applications-from-innovators-start-ups-for-nidhi-grants/article67177119.ece",
    description: "AUIC calls on innovators and startups to apply for DST-NIDHI grants to accelerate product development.",
    source: "The Hindu",
    tag: "Grants",
    Icon: FlaskConical,
  },
  {
    title: "Andhra varsity's A-Hub turning into premier incubation centre",
    date: "Apr 15, 2024",
    url: "https://www.bizzbuzz.news/industry/andhra-varsitys-a-hub-turning-into-premier-incubation-centre-1237374",
    description: "A-Hub is rapidly establishing itself as a leading incubation centre in South India, nurturing hundreds of startups.",
    source: "BizzBuzz",
    tag: "Recognition",
    Icon: Landmark,
  },
  {
    title: "A-Hub entrepreneurs raise ₹68 cr funds in 1 yr",
    date: "Apr 05, 2024",
    url: "https://timesofindia.indiatimes.com/city/visakhapatnam/a-hub-entrepreneurs-raise-68-cr-funds-in-1-yr/articleshow/101841976.cms?from=mdr",
    description: "Startups incubated at A-Hub collectively raised ₹68 crores in funding within a single year — a major ecosystem milestone.",
    source: "Times of India",
    tag: "Funding",
    Icon: TrendingUp,
  },
  {
    title: "STPI to set up incubation centre at Andhra varsity",
    date: "Mar 20, 2024",
    url: "https://timesofindia.indiatimes.com/city/visakhapatnam/stpi-to-set-up-incubation-centre-at-andhra-varsity/articleshow/101529821.cms?from=mdr",
    description: "Software Technology Parks of India partners with Andhra University to establish a dedicated tech incubation facility.",
    source: "Times of India",
    tag: "Partnership",
    Icon: Handshake,
  },
  {
    title: "Technology Park to Come Up on AU Campus",
    date: "Mar 12, 2024",
    url: "https://www.deccanchronicle.com/education/040723/andhra-university-campus-to-get-tech-park.html",
    description: "A state-of-the-art technology park is planned for the Andhra University campus to boost innovation and industry linkages.",
    source: "Deccan Chronicle",
    tag: "Infrastructure",
    Icon: Brain,
  },
  {
    title: "AU Prof H Purushotham on Start-up India Seed Fund Committee",
    date: "Feb 28, 2024",
    url: "https://globalgreenews.com/2023/06/13/visakhapatnam-au-prof-h-purushotham-on-start-up-india-seed-fund-committee/",
    description: "A-Hub's faculty lead joins the national Startup India Seed Fund Committee, bringing institutional expertise to policy.",
    source: "Global GreeNews",
    tag: "Leadership",
    Icon: BadgeCheck,
  },
  {
    title: "Space startup ties up with French forum",
    date: "Feb 18, 2024",
    url: "https://timesofindia.indiatimes.com/city/visakhapatnam/space-startup-ties-up-with-french-forum/articleshow/100908572.cms?from=mdr",
    description: "A-Hub incubated space-tech startup partners with a prestigious French aerospace forum to advance clean-space missions.",
    source: "Times of India",
    tag: "Global",
    Icon: Globe2,
  },
  {
    title: "Young entrepreneurs on their way to revolutionise space technology",
    date: "Feb 01, 2024",
    url: "https://newindianexpress.com/good-news/2023/jun/11/young-entrepreneurs-on-their-way-to-revolutionise-space-technology-2583949.html",
    description: "Student-founded space ventures from A-Hub are building next-gen satellite and propulsion technology.",
    source: "New Indian Express",
    tag: "Innovation",
    Icon: Rocket,
  },
  {
    title: "AP startup Taramandal teams up with PPF on clean space mission",
    date: "Jan 20, 2024",
    url: "https://www.bizzbuzz.news/eco-buzz/ap-startup-taramandal-teams-up-with-ppf-on-clean-space-mission-1225040",
    description: "Taramandal, an A-Hub alumnus, collaborates with PPF to launch a debris-removal clean space mission.",
    source: "BizzBuzz",
    tag: "Space Tech",
    Icon: Megaphone,
  },
  {
    title: "A Hub, TiE-AP hold meet on future of work",
    date: "Jan 10, 2024",
    url: "https://www.bizzbuzz.news/industry/a-hub-tie-ap-hold-meet-on-future-of-work-1222271",
    description: "A-Hub and TiE-AP co-host a leadership roundtable exploring the evolving nature of work for startups.",
    source: "BizzBuzz",
    tag: "Community",
    Icon: Users2,
  },
  {
    title: "Andhra University focus on empowering students",
    date: "Dec 15, 2023",
    url: "https://www.thehansindia.com/news/cities/visakhapatnam/andhra-university-focus-on-empowering-students-794625",
    description: "Andhra University doubles down on student entrepreneurship with structured incubation pathways and support programmes.",
    source: "The Hans India",
    tag: "Education",
    Icon: Lightbulb,
  },
  {
    title: "Research scholars develop Compact Transcranial Magnetic Stimulator",
    date: "Nov 28, 2023",
    url: "https://www.thehindu.com/news/cities/Visakhapatnam/visakhapatnam-research-scholars-at-andhra-university-incubation-centre-develop-compact-repetitive-transcranial-magnetic-stimulator/article66746679.ece",
    description: "AUIC researchers create a compact medical device that could democratise TMS therapy across tier-2 healthcare settings.",
    source: "The Hindu",
    tag: "MedTech",
    Icon: FlaskConical,
  },
  {
    title: "100 teams take part in a-Hub hackathon",
    date: "Oct 20, 2023",
    url: "https://www.bizzbuzz.news/industry/100-teams-take-part-in-a-hub-hackathon-1194348",
    description: "A-Hub's flagship hackathon attracted over 100 teams competing to solve real-world problems across sectors.",
    source: "BizzBuzz",
    tag: "Event",
    Icon: Zap,
  },
  {
    title: "Andhra University's pharma centre Element to drive cheap drug discovery",
    date: "Sep 05, 2023",
    url: "https://timesofindia.indiatimes.com/city/visakhapatnam/andhra-universitys-pharma-centre-element-to-drive-cheap-drug-discovery/articleshow/95870046.cms",
    description: "The Element pharma centre at AUIC is pioneering affordable drug discovery models using AI and computational chemistry.",
    source: "Times of India",
    tag: "Pharma",
    Icon: ScrollText,
  },
  {
    title: "Andhra varsity shines in innovation rankings",
    date: "Aug 18, 2023",
    url: "https://timesofindia.indiatimes.com/city/visakhapatnam/andhra-varsity-shines-in-innovation-rankings/articleshow/95648905.cms",
    description: "Andhra University climbs national innovation rankings, reflecting the sustained impact of its incubation ecosystem.",
    source: "Times of India",
    tag: "Recognition",
    Icon: Award,
  },
  {
    title: "Andhra varsity opens Next Gen Tech incubation centre with 25 startups",
    date: "Jul 10, 2023",
    url: "https://www.thehansindia.com/business/andhra-varsity-opens-next-gen-tech-incubation-centre-with-25-startups-737916",
    description: "The Next Gen Tech incubation centre officially launches with 25 resident startups across deep tech and software sectors.",
    source: "The Hans India",
    tag: "Milestone",
    Icon: Rocket,
  },
  {
    title: "Union minister says AI, IoT will change tech landscape",
    date: "Jun 01, 2023",
    url: "https://www.deccanchronicle.com/nation/in-other-news/011221/union-minister-says-ai-iot-will-change-tech-landscape.html",
    description: "At an A-Hub summit, the Union minister highlighted AI and IoT as transformative forces for India's startup ecosystem.",
    source: "Deccan Chronicle",
    tag: "Policy",
    Icon: Brain,
  },
  {
    title: "Andhra University incubation hub looks to drive innovation in AP",
    date: "Apr 15, 2023",
    url: "https://timesofindia.indiatimes.com/city/visakhapatnam/au-incubation-hub-looks-to-drive-innovation-in-ap/articleshow/82185595.cms",
    description: "AUIC sets its sights on becoming the innovation anchor for Andhra Pradesh, partnering with government and industry.",
    source: "Times of India",
    tag: "Strategy",
    Icon: TrendingUp,
  },
];

const ITEMS_PER_PAGE = 10;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

// ── Component ─────────────────────────────────────────────────────────────────
export function PressPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data: pressPageMeta } = usePublicPressPage(defaultPressPageMeta);
  const { data: pressData } = usePublicPress(staticPress);

  const items = pressData ?? staticPress;

  const meta = pressPageMeta ?? defaultPressPageMeta;

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return q
      ? items.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.tag.toLowerCase().includes(q) ||
            p.source.toLowerCase().includes(q)
        )
      : items;
  }, [query, items]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const go = (p: number) => setPage(p);
  const handleSearch = (v: string) => { setQuery(v); setPage(1); };

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="border-b border-[#E5E7EB] bg-[#0C0C0C] pt-20 pb-8 md:pt-24 md:pb-10">
        {/* Very subtle dot texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(#F97316 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="text-4xl font-bold tracking-tight text-[#F97316] md:text-5xl"
          >
            {meta.heading}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-white/40"
          >
            {meta.subheading}
          </motion.p>

          {/* Simple orange rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="mx-auto mt-5 h-px w-8 origin-center bg-[#F97316]/60"
          />
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10">

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-7">
          <h2 className="text-[13px] font-semibold text-[#374151]">
            Latest Press Releases
            <span className="ml-2 rounded-full bg-[#F3F4F6] px-2 py-0.5 text-[11px] font-medium text-[#6B7280]">
              {filtered.length}
            </span>
          </h2>

          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search announcements..."
              className="h-9 w-60 rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] pl-8.5 pr-4 text-[13px] text-[#111827] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#F97316]/50 focus:bg-white focus:ring-2 focus:ring-[#F97316]/08"
              style={{ paddingLeft: "2.125rem" }}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-[#F3F4F6]" />

        {/* Card grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${page}-${query}`}
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          >
            {paginated.map((p) => (
              <PressCard key={p.url} press={p} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {paginated.length === 0 && (
          <div className="py-20 text-center text-sm text-[#6B7280]">
            No results for "{query}"
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-1.5">
            <button
              onClick={() => go(Math.max(1, page - 1))}
              disabled={page === 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280] text-sm transition hover:border-[#F97316]/40 hover:text-[#F97316] disabled:opacity-30"
            >
              <ChevronLeft size={15} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => go(p)}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-[13px] font-semibold transition ${
                  p === page
                    ? "bg-[#F97316] text-white"
                    : "border border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#F97316]/40 hover:text-[#F97316]"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => go(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280] text-sm transition hover:border-[#F97316]/40 hover:text-[#F97316] disabled:opacity-30"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        )}

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mt-16 flex flex-col items-start justify-between gap-5 rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] p-6 sm:flex-row sm:items-center"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white">
              <Mail size={16} className="text-[#F97316]" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#111827]">Stay updated with our innovation journey</p>
              <p className="text-[12px] text-[#6B7280]">Follow our latest announcements and media coverage.</p>
            </div>
          </div>
          <a
            href="mailto:press@ahub.in"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#111827] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#F97316]"
          >
            Contact Us <ArrowUpRight size={13} />
          </a>
        </motion.div>

      </div>
    </div>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────────
function PressCard({ press }: { press: PressItem }) {
  const Icon = resolveIcon(press.tag);

  return (
    <motion.a
      href={press.url}
      target="_blank"
      rel="noopener noreferrer"
      variants={item}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
      className="group flex flex-col rounded-xl border border-[#E5E7EB] bg-white p-4 transition-shadow duration-200 hover:border-[#F97316]/30 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] cursor-pointer"
    >
      {/* Icon */}
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#F3F4F6] bg-[#F9FAFB] transition-colors duration-200 group-hover:border-[#F97316]/20 group-hover:bg-[#FFF7F2]">
          <Icon size={17} className="text-[#374151] transition-colors duration-200 group-hover:text-[#F97316]" strokeWidth={1.7} />
        </div>
        <span className="rounded-md bg-[#F3F4F6] px-1.5 py-0.5 text-[10px] font-medium text-[#9CA3AF]">
          {press.tag}
        </span>
      </div>

      {/* Date */}
      <div className="mt-3 flex items-center gap-1 text-[11px] text-[#9CA3AF]">
        <CalendarDays size={10} />
        {press.date}
      </div>

      {/* Title */}
      <h3 className="mt-1.5 text-[12.5px] font-semibold leading-snug text-[#111827] line-clamp-3">
        {press.title}
      </h3>

      {/* Description */}
      <p className="mt-2 flex-1 text-[11.5px] leading-relaxed text-[#6B7280] line-clamp-2">
        {press.description}
      </p>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between border-t border-[#F3F4F6] pt-3">
        <span className="text-[11px] text-[#9CA3AF]">{press.source}</span>
        <span className="flex items-center gap-0.5 text-[11px] font-semibold text-[#F97316] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          Read <ArrowUpRight size={11} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </motion.a>
  );
}
