import { useEffect, useRef, useState, type ComponentType } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeDollarSign,
  Building2,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Globe2,
  Layers3,
  Menu,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  X,
  Zap,
} from "lucide-react";
import { events, institutions, partners, portfolio } from "@/data";
import ahubLogo from "@/assets/AHub-Logo-1.png";
import heroPoster from "@/assets/hero-poster.jpg";
import event1 from "@/assets/event-1.jpg";
import event2 from "@/assets/event-2.jpg";
import event3 from "@/assets/event-3.jpg";
import event4 from "@/assets/event-4.jpg";
import inst1 from "@/assets/inst-1.jpg";
import inst2 from "@/assets/inst-2.jpg";
import inst3 from "@/assets/inst-3.jpg";
import inst4 from "@/assets/inst-4.jpg";
import inst5 from "@/assets/inst-5.jpg";
import inst6 from "@/assets/inst-6.jpg";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type PanelKey = "approach" | "aspire" | "associate" | "achieve" | "announcement" | "about";
type IconType = ComponentType<{ className?: string; size?: number }>;

type NavItem = {
  label: string;
  href: string;
  panel?: PanelKey;
};

const NAV_ITEMS: NavItem[] = [
  { label: "āpproach", href: "#home", panel: "approach" },
  { label: "āspire", href: "#what-we-do", panel: "aspire" },
  { label: "āssociate", href: "#achieve", panel: "associate" },
  { label: "āchieve", href: "#students", panel: "achieve" },
  { label: "ānnouncement", href: "#announcement", panel: "announcement" },
  { label: "ābout", href: "#about", panel: "about" },
];

function NavLabel({ label }: { label: string }) {
  const first = label.charAt(0);
  const rest = label.slice(1);
  return (
    <span className="inline-flex items-baseline gap-0">
      <span className="text-[#e75710]">{first}</span>
      <span>{rest}</span>
    </span>
  );
}

const PANEL_PARTICLES = [
  { className: "left-[8%] top-[16%] h-1.5 w-1.5", delay: 0 },
  { className: "right-[12%] top-[12%] h-1 w-1", delay: 0.5 },
  { className: "left-[18%] bottom-[16%] h-1 w-1", delay: 0.8 },
  { className: "right-[20%] bottom-[18%] h-1.5 w-1.5", delay: 0.2 },
];

const ecosystemCards = [
  {
    icon: Sparkles,
    title: "Incubation Programs",
    desc: "Cohort design, founder diagnostics, and weekly execution reviews built like a product team.",
  },
  {
    icon: Layers3,
    title: "Innovation Labs",
    desc: "Cross-functional labs for AI, climate, deep tech, and enterprise software with real delivery cycles.",
  },
  {
    icon: Users,
    title: "Mentorship Network",
    desc: "Operators, founders, and investors connected through a curated graph, not a generic directory.",
  },
  {
    icon: BadgeDollarSign,
    title: "Funding Opportunities",
    desc: "Investor access, syndicate intros, and structured capital pathways from pre-seed to Series A.",
  },
];

const programCards = [
  {
    icon: Rocket,
    title: "Aspire",
    desc: "Early-stage validation for ambitious builders.",
    tag: "Entry",
  },
  {
    icon: Users,
    title: "Associate",
    desc: "A deeper operating layer for committed teams.",
    tag: "Network",
  },
  {
    icon: ShieldCheck,
    title: "Achieve",
    desc: "High-conviction support for traction and scale.",
    tag: "Growth",
  },
  {
    icon: Zap,
    title: "Accelerator",
    desc: "Short bursts of intensity with measurable milestones.",
    tag: "Sprint",
  },
  {
    icon: Star,
    title: "Startup Bootcamp",
    desc: "Hands-on venture readiness for first-time founders.",
    tag: "Launch",
  },
  {
    icon: Globe2,
    title: "Founder Fellowship",
    desc: "A premium track for exceptional builders with network leverage.",
    tag: "Elite",
  },
];

const startupCards = portfolio.slice(0, 4);
const eventCards = events.slice(0, 4);

const networkCards = [
  { icon: Building2, title: "Institutional Nodes", desc: "Research parks, university cells, and regional launchpads." },
  { icon: Users, title: "Partner Graph", desc: "Capital, operators, and enterprise allies connected into one ecosystem." },
  { icon: Globe2, title: "Distribution Reach", desc: "A layered network for pilots, procurement, and founder visibility." },
];

type MenuLink = { label: string; href: string; description: string; image: string };

type StudentTab = {
  label: string;
  href: string;
  description: string;
  image: string;
  stats: string[];
};

const PANEL_CONTENT: Record<PanelKey, { eyebrow: string; summary: string; links: MenuLink[]; compact?: boolean; spotlight?: { image: string; caption: string; note: string } }> = {
  approach: {
    eyebrow: "Approach",
    summary: "Our core approach — vision, roadmap, and the operational model that drives our ecosystem.",
    links: [
      { label: "Vision & Roadmap", href: "/about/vision-roadmap", description: "Mission, milestones, and growth direction.", image: heroPoster },
      { label: "Operational Model", href: "/approach/operational-model", description: "How we build, validate, and scale startups.", image: inst4 },
    ],
    compact: true,
    spotlight: { image: heroPoster, caption: "Strategic clarity", note: "Vision, roadmap, and operational structure" },
  },
  aspire: {
    eyebrow: "Aspire",
    summary: "Explore the startup portfolio, infrastructure, partners, investors, and startup events.",
    links: [
      { label: "Startup Portfolio", href: "/startups/startup-portfolio", description: "Explore our incubated startups and their journeys.", image: inst2 },
      { label: "Infrastructure", href: "/ecosystem/infrastructure", description: "Labs, halls, and collaboration spaces.", image: inst4 },
      { label: "Partners", href: "/ecosystem/partners", description: "Institutional logos and collaboration network.", image: inst3 },
      { label: "Investors", href: "/ecosystem/investors", description: "Funding partners, angels, and venture support.", image: inst2 },
      { label: "Startup Events", href: "/events/startups-events", description: "Demo days, pitch sessions, and founder meetups.", image: event2 },
    ],
    spotlight: { image: inst2, caption: "Aspire ecosystem layer", note: "Portfolio, infrastructure, and investor access" },
  },
  associate: {
    eyebrow: "Associate",
    summary: "Join our ecosystem — programs, startup support, and venue bookings.",
    links: [
      { label: "Join Us", href: "/programs/join-us", description: "Community onboarding and membership.", image: event4 },
      { label: "Pitch To Us", href: "/programs/pitch-to-us", description: "Startup submission and founder intake.", image: event3 },
      { label: "Seminar Hall Booking", href: "/ecosystem/seminar-hall-booking", description: "Request a venue, date, and support package.", image: event1 },
      { label: "Startup Funding", href: "/startups/startup-funding", description: "Funding pathways, grants, and investor access.", image: inst5 },
    ],
    compact: true,
    spotlight: { image: event4, caption: "Associate programs", note: "Join, pitch, fund, and book" },
  },
  achieve: {
    eyebrow: "Achieve",
    summary: "Impact metrics, recognition, and reports showcasing ecosystem outcomes.",
    links: [
      { label: "Impact", href: "/achieve/impact", description: "Ecosystem impact metrics and founder outcomes.", image: inst1 },
      { label: "Reward & Recognition", href: "/about/rewards", description: "Awards, accolades, and ecosystem milestones.", image: event3 },
      { label: "Reports", href: "/about/reports", description: "Annual reports, impact metrics, and data insights.", image: event4 },
    ],
    compact: true,
    spotlight: { image: event3, caption: "Achievement & recognition", note: "Impact, rewards, and transparent reporting" },
  },
  announcement: {
    eyebrow: "Announcement",
    summary: "Press, case studies, events, registrations, blogs, and career opportunities.",
    links: [
      { label: "Press", href: "/about/press", description: "Media coverage, news features, and publications.", image: event2 },
      { label: "Case Studies", href: "/events/case-studies", description: "Impact stories and startup journey highlights.", image: inst3 },
      { label: "Events Calendar", href: "/events/calendar", description: "Interactive event schedule and upcoming dates.", image: event1 },
      { label: "Startup Blogs", href: "/startups/blog", description: "Insights, stories, and innovation updates.", image: heroPoster },
      { label: "Event Registration", href: "/events/event-registration", description: "Register and RSVP for upcoming events.", image: event2 },
      { label: "Startup Registration", href: "/startups/startup-registration", description: "Onboarding for founders and teams.", image: inst6 },
      { label: "Internship Registration", href: "/students/internship-registration", description: "Apply for internships and track status.", image: event2 },
      { label: "Internship Calendar", href: "/students/internship-calendar", description: "Internship schedules, openings, and timelines.", image: event1 },
    ],
    spotlight: { image: event2, caption: "Announcements & updates", note: "Press, events, registrations, and blogs" },
  },
  about: {
    eyebrow: "About",
    summary: "Meet the mentors, board, and team behind the AUIC ecosystem.",
    links: [
      { label: "Mentors", href: "/about/mentors", description: "Industry experts, office hours, and domain guidance.", image: inst1 },
      { label: "Board", href: "/about/board", description: "Governance, leadership, and strategic oversight.", image: inst5 },
      { label: "Team", href: "/about/team", description: "Core team, coordinators, and student leaders.", image: inst6 },
    ],
    compact: true,
    spotlight: { image: inst5, caption: "Institutional leadership", note: "Mentors, board, and team" },
  },
};

const STUDENT_TABS: StudentTab[] = [
  {
    label: "Internship Calendar",
    href: "/students/internship-calendar",
    description: "See internship schedules, openings, and important dates in a timeline format.",
    image: event1,
    stats: ["Openings", "Timelines", "Important dates"],
  },
  {
    label: "Internship Registration",
    href: "/students/internship-registration",
    description: "Apply for internships, submit applications, and track your status.",
    image: event2,
    stats: ["Apply now", "Track status", "Get matched"],
  },
  {
    label: "Dashboard",
    href: "/students/dashboard",
    description: "Track programs, opportunities, registrations, and application status in one view.",
    image: heroPoster,
    stats: ["Program tracking", "Startup opportunities", "RSVP status"],
  },
];

function scrollToSection(id: string) {
  const section = document.getElementById(id);
  section?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `#${id}`);
}

function MobileMenuToggle({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className="grid h-10 w-10 place-items-center rounded-lg border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.08)] text-white transition hover:border-[rgba(255,255,255,0.25)] hover:bg-[rgba(255,255,255,0.12)] focus:outline-none"
      onClick={onClick}
    >
      <span className="relative flex h-4 w-4 items-center justify-center">
        <span
          className={cn(
            "absolute h-0.5 w-4 rounded-full bg-current transition-all duration-300",
            open ? "translate-y-0 rotate-45" : "-translate-y-1.5 rotate-0",
          )}
        />
        <span
          className={cn(
            "absolute h-0.5 w-4 rounded-full bg-current transition-all duration-300",
            open ? "scale-x-0 opacity-0" : "opacity-100",
          )}
        />
        <span
          className={cn(
            "absolute h-0.5 w-4 rounded-full bg-current transition-all duration-300",
            open ? "translate-y-0 -rotate-45" : "translate-y-1.5 rotate-0",
          )}
        />
      </span>
    </button>
  );
}


function MegaMenuPanel({
  activePanel,
  panelRef,
  onNavigate,
}: {
  activePanel: PanelKey | null;
  panelRef: React.RefObject<HTMLDivElement | null>;
  onNavigate: () => void;
}) {
  const panel = activePanel ? PANEL_CONTENT[activePanel] : null;

  return (
    <AnimatePresence mode="wait">
      {activePanel && panel ? (
        <motion.div
          key={activePanel}
          ref={panelRef}
          initial={{ opacity: 0, y: 14, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.99 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "pointer-events-auto absolute left-1/2 top-full -translate-x-1/2 overflow-hidden rounded-xl border border-slate-200 bg-white backdrop-blur-xl p-4 text-slate-900 shadow-[0_20px_60px_rgba(0,0,0,0.1)]",
            panel.compact
              ? "w-[min(680px,calc(100vw-2rem))] max-h-[calc(100vh-140px)]"
              : "w-[min(1020px,calc(100vw-2rem))] max-h-[calc(100vh-140px)]",
          )}
        >
          <div className="relative flex items-center justify-between gap-4 border-b border-slate-200 px-2 pb-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-slate-500">{panel.eyebrow}</div>
            </div>
          </div>

          <div className="relative overflow-y-auto max-h-[calc(100vh-200px)] px-2 pb-2 pt-3">
            <div className={cn("grid gap-3", panel.compact ? "sm:grid-cols-2" : "sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4")}>
              {panel.links.map((item) => {
                // Map labels to appropriate icons
                const iconMap: Record<string, IconType> = {
                  "Mentors": Users,
                  "Board": Building2,
                  "Team": Users,
                  "Incubation": Rocket,
                  "Innovation": Layers3,
                  "Mentorship": Users,
                  "Funding": BadgeDollarSign,
                  "Partners": Building2,
                  "Infrastructure": Layers3,
                  "Dashboard": Zap,
                  "Calendar": CalendarDays,
                  "Registration": ShieldCheck,
                  "Login": ShieldCheck,
                };
                
                const Icon = Object.entries(iconMap).find(([key]) => item.label.includes(key))?.[1] || Sparkles;
                
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={onNavigate}
                    data-reveal
                    className="group overflow-hidden rounded-lg border border-slate-200 bg-white text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
                  >
                    <div className="relative h-[88px] overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100/50 flex items-center justify-center gap-2 px-3">
                      <Icon size={22} className="text-[#ff8901]" strokeWidth={1.5} />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5" />
                    </div>
                    <div className="p-3.5">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm font-medium text-slate-900">{item.label}</div>
                        <ArrowRight className="text-[#e75710] opacity-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100" size={14} />
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{item.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function Navbar() {
  const navigate = useNavigate();
  const routeKey = useRouterState({
    select: (state) => state.location.pathname,
  });
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<PanelKey | null>(null);
  const [activeSection, setActiveSection] = useState("home");
  const panelRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  const closeMenus = () => {
    setActivePanel(null);
    setMobileOpen(false);
  };

  useEffect(() => {
    // use ScrollTrigger so Lenis-driven scrolling controls the header state
    const st = ScrollTrigger.create({
      start: "top top",
      end: ":bottom",
      onUpdate: (self) => {
        try {
          const y = (self as any).scroll();
          setScrolled(y > 18);
        } catch {
          // fallback
          setScrolled(false);
        }
      },
    });

    // initialize state
    setTimeout(() => {
      const y = window.scrollY || 0;
      setScrolled(y > 18);
    }, 0);

    return () => st && st.kill();
  }, []);

  useEffect(() => {
    const ids = NAV_ITEMS.map((item) => item.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target instanceof HTMLElement) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-32% 0px -52% 0px", threshold: [0.2, 0.35, 0.5, 0.75] },
    );

    ids.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenus();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setActivePanel(null);
    setMobileOpen(false);
  }, [routeKey]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || !activePanel) return;

    gsap.killTweensOf(panel);
    gsap.fromTo(
      panel,
      { opacity: 0, y: 14, scale: 0.985 },
      { opacity: 1, y: 0, scale: 1, duration: 0.42, ease: "power2.out" },
    );

    const revealTargets = panel.querySelectorAll("[data-reveal]");
    if (revealTargets.length) {
      gsap.fromTo(
        revealTargets,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power3.out", delay: 0.1 },
      );
    }
  }, [activePanel]);

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
      className="fixed inset-x-0 top-0 z-50 pointer-events-none"
    >
      <div
        ref={navRef}
        className="relative w-full"
        onMouseLeave={() => setActivePanel(null)}
      >
        {/* Subtle overlay behind navbar */}
        <div className="pointer-events-auto absolute inset-x-0 top-0 h-[60px] bg-gradient-to-b from-white/20 to-transparent" />
        {/* Left black overlay for contrast (desktop) */}
        <div className="hidden lg:block pointer-events-none absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-r from-black/80 to-transparent z-0" />

        <nav
          className={cn(
            "pointer-events-auto relative mx-auto flex h-[64px] w-full items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-5 md:px-6 lg:px-6 transition-all duration-400",
            scrolled ? "shadow-sm" : "",
          )}
        >
          {/* Logo section - left aligned */}
          <div className="flex shrink-0 items-center gap-3 pr-0 lg:pr-1">
            <button 
              type="button" 
              onClick={() => navigate({ to: "/" })} 
              className="group flex items-center gap-3 focus:outline-none transition-opacity hover:opacity-70"
            >
              <img
                src={ahubLogo}
                alt="AUIC"
                className="h-11 w-auto select-none object-contain"
                draggable={false}
              />
              <div className="flex flex-col leading-tight">
                <span className="text-[0.95rem] font-semibold text-slate-950 tracking-tight">AUIC</span>
                <span className="text-[0.68rem] text-slate-700 font-medium uppercase tracking-[0.22em]">Incubation Hub</span>
              </div>
            </button>
          </div>

          {/* Center navigation links - hidden on mobile */}
          <div className="hidden flex-1 items-center justify-center lg:flex">
            <ul className="flex items-center justify-center gap-1 xl:gap-1.5">
              {NAV_ITEMS.map((item) => {
                const isPanelOpen = activePanel === item.panel;
                const hasPanel = !!item.panel;
                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      className="group flex items-center gap-1 rounded-lg px-3 py-2 text-[0.78rem] font-semibold tracking-[0.06em] text-slate-700 transition-colors duration-300 hover:text-[#e75710]"
                      onMouseEnter={() => item.panel && setActivePanel(item.panel)}
                      onFocus={() => item.panel && setActivePanel(item.panel)}
                      onClick={() => {
                        if (hasPanel) {
                          setActivePanel((current) => (current === item.panel ? null : item.panel ?? null));
                          return;
                        }
                        if (item.href === "#home") {
                          navigate({ to: "/" });
                        } else {
                          scrollToSection(item.href.slice(1));
                        }
                        closeMenus();
                      }}
                    >
                      <NavLabel label={item.label} />
                      <ChevronDown
                        size={13}
                        strokeWidth={2.5}
                        className={cn(
                          "-mr-0.5 transition-all duration-300",
                          isPanelOpen
                            ? "rotate-180 text-[#e75710]"
                            : "text-slate-400 group-hover:rotate-180 group-hover:text-[#e75710]",
                        )}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* CTA Button - right aligned */}
          <div className="flex shrink-0 items-center gap-2 pl-0 lg:pl-1">
            <button
              type="button"
              onClick={() => scrollToSection("announcement")}
              className="group hidden lg:inline-flex items-center gap-2 rounded-xl bg-[#e75710] px-3.5 py-2.5 text-xs font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d85211] hover:shadow-[0_10px_24px_rgba(231,87,16,0.28)] focus:outline-none active:scale-95"
            >
              Join Ecosystem
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>

            {/* Mobile menu toggle */}
            <div className="flex lg:hidden">
              <MobileMenuToggle open={mobileOpen} onClick={() => setMobileOpen((value) => !value)} />
            </div>
          </div>
        </nav>

        <MegaMenuPanel activePanel={activePanel} panelRef={panelRef} onNavigate={closeMenus} />
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Dark overlay background */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            
            {/* Mobile menu panel */}
            <div className="absolute inset-x-4 top-24 rounded-2xl border border-[rgba(255,255,255,0.12)] bg-black/80 backdrop-blur-xl p-6 shadow-2xl max-h-[calc(100vh-120px)] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between gap-3 pb-6 border-b border-[rgba(255,255,255,0.1)]">
                <div className="flex items-center gap-3">
                    <img src={ahubLogo} alt="AUIC" className="h-11 w-auto object-contain" draggable={false} />
                  <div>
                      <div className="text-xs uppercase tracking-widest text-white/60">AUIC</div>
                      <div className="text-sm font-semibold text-white">Incubation Hub</div>
                  </div>
                </div>
                <MobileMenuToggle open onClick={closeMenus} />
              </div>

              {/* Navigation items */}
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
                }}
                className="mt-6 grid gap-2"
              >
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.href.slice(1) || activePanel === item.panel;
                  return (
                    <motion.li
                      key={item.label}
                      variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          if (item.panel) {
                            setActivePanel((current) => (current === item.panel ? null : item.panel ?? null));
                            return;
                          }
                          if (item.href === "#home") {
                            navigate({ to: "/" });
                          } else {
                            scrollToSection(item.href.slice(1));
                          }
                          closeMenus();
                        }}
                        className={cn(
                            "w-full rounded-lg px-4 py-3 text-left text-sm font-medium uppercase tracking-widest transition-all duration-300 border",
                          isActive
                              ? "border-[#e75710]/40 bg-[#e75710]/10 text-white"
                              : "border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] text-white/80 hover:border-[rgba(255,255,255,0.2)] hover:text-white",
                        )}
                      >
                        <NavLabel label={item.label} />
                      </button>
                    </motion.li>
                  );
                })}
              </motion.ul>

              {/* Active panel content */}
              {activePanel ? (
                <div className="mt-6 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] p-4">
                  <div className="text-xs uppercase tracking-widest text-white/60">{PANEL_CONTENT[activePanel].eyebrow}</div>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{PANEL_CONTENT[activePanel].summary}</p>
                  <div className="mt-4 grid gap-2 max-h-64 overflow-y-auto">
                    {PANEL_CONTENT[activePanel].links.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={closeMenus}
                        className="rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-3 py-2.5 text-left text-sm transition hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.08)]"
                      >
                        <div className="font-medium text-white">{item.label}</div>
                        <div className="mt-0.5 text-xs uppercase tracking-widest text-white/60">{item.description}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* CTA Button */}
              <button
                type="button"
                onClick={() => {
                  scrollToSection("announcement");
                  closeMenus();
                }}
                className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#e75710] px-5 py-2.5 text-xs font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d85211] hover:shadow-[0_10px_24px_rgba(231,87,16,0.28)] active:scale-95"
              >
                Join Ecosystem
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
