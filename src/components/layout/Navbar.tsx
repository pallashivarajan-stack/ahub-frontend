import {
  useEffect,
  useRef,
  useState,
  useCallback,
  forwardRef,
  type ComponentType,
  type RefObject,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeDollarSign,
  Building2,
  CalendarDays,
  ChevronDown,
  Layers3,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { resolveLegacyAsset } from "@/lib/assets";
import { cn } from "@/lib/utils";
import { usePageVisibilityHelper } from "@/hooks/usePageVisibility";

const ahubLogo = resolveLegacyAsset("/src/assets/AHub-Logo-1.png");

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

type MenuLink = { label: string; href: string; description: string; customIcon?: string };

const PANEL_CONTENT: Record<
  PanelKey,
  {
    eyebrow: string;
    summary: string;
    links: MenuLink[];
    compact?: boolean;
  }
> = {
  approach: {
    eyebrow: "Approach",
    summary:
      "Our core approach — vision, roadmap, and the operational model that drives our ecosystem.",
    links: [
      {
        label: "Vision & Roadmap",
        href: "/about/vision-roadmap",
        description: "Mission, milestones, and growth direction.",
        customIcon: "/src/assets/icons/vision-roadmap.png",
      },
      {
        label: "Operational Model",
        href: "/approach/operational-model",
        description: "How we build, validate, and scale startups.",
        customIcon: "/src/assets/icons/operational_model.png",
      },
    ],
    compact: true,
  },
  aspire: {
    eyebrow: "Aspire",
    summary:
      "Explore the startup portfolio, infrastructure, partners, investors, and startup events.",
    links: [
      {
        label: "Startup Portfolio",
        href: "/startups/startup-portfolio",
        description: "Explore our incubated startups and their journeys.",
        customIcon: "/src/assets/icons/startup_porfolio.png",
      },
      {
        label: "Infrastructure",
        href: "/ecosystem/infrastructure",
        description: "Labs, halls, and collaboration spaces.",
        customIcon: "/src/assets/icons/infasrtucture.png",
      },
      {
        label: "Partners",
        href: "/ecosystem/partners",
        description: "Institutional logos and collaboration network.",
        customIcon: "/src/assets/icons/partners.png",
      },
      {
        label: "Startup Events",
        href: "/events/startups-events",
        description: "Demo days, pitch sessions, and founder meetups.",
        customIcon: "/src/assets/icons/startup_events.png",
      },
    ],
  },
  associate: {
    eyebrow: "Associate",
    summary: "Join our ecosystem — programs, startup support, and venue bookings.",
    links: [
      {
        label: "Join Us",
        href: "/programs/join-us",
        description: "Community onboarding and membership.",
        customIcon: "/src/assets/icons/join_us.png",
      },
      {
        label: "Pitch To Us",
        href: "/programs/pitch-to-us",
        description: "Startup submission and founder intake.",
        customIcon: "/src/assets/icons/pitch_to_us.png",
      },
      {
        label: "Startup Funding",
        href: "/startups/startup-funding",
        description: "Funding pathways, grants, and investor access.",
        customIcon: "/src/assets/icons/startup_funding.png",
      },
    ],
    compact: true,
  },
  achieve: {
    eyebrow: "Achieve",
    summary: "Impact metrics, recognition, and reports showcasing ecosystem outcomes.",
    links: [
      {
        label: "Impact",
        href: "/achieve/impact",
        description: "Ecosystem impact metrics and founder outcomes.",
        customIcon: "/src/assets/icons/impact.png",
      },
      {
        label: "Reward & Recognition",
        href: "/about/rewards",
        description: "Awards, accolades, and ecosystem milestones.",
        customIcon: "/src/assets/icons/rewared_recognition.png",
      },
      {
        label: "Reports",
        href: "/achieve/reports",
        description: "Annual reports, impact metrics, and data insights.",
        customIcon: "/src/assets/icons/reports.png",
      },
    ],
    compact: true,
  },
  announcement: {
    eyebrow: "Announcement",
    summary: "Press, case studies, events, registrations, blogs, and career opportunities.",
    links: [
      {
        label: "Press",
        href: "/about/press",
        description: "Media coverage, news features, and publications.",
        customIcon: "/src/assets/icons/press.png",
      },
      {
        label: "Case Studies",
        href: "/events/case-studies",
        description: "Impact stories and startup journey highlights.",
        customIcon: "/src/assets/icons/case_studies.png",
      },
      {
        label: "Events Calendar",
        href: "/events/calendar",
        description: "Interactive event schedule and upcoming dates.",
        customIcon: "/src/assets/icons/event_calendar.png",
      },
      {
        label: "Startup Blogs",
        href: "/startups/blog",
        description: "Insights, stories, and innovation updates.",
        customIcon: "/src/assets/icons/startup_blog.png",
      },
      {
        label: "Event Registration",
        href: "/events/event-registration",
        description: "Register and RSVP for upcoming events.",
        customIcon: "/src/assets/icons/event_registartion.png",
      },
      {
        label: "Startup Registration",
        href: "/startups/startup-registration",
        description: "Onboarding for founders and teams.",
        customIcon: "/src/assets/icons/startup_registartion.png",
      },
      {
        label: "Internship Registration",
        href: "/students/internship-registration",
        description: "Apply for internships and track status.",
        customIcon: "/src/assets/icons/internship_registartion.png",
      },
    ],
  },
  about: {
    eyebrow: "About",
    summary: "Meet the mentors, board, and team behind the AUIC ecosystem.",
    links: [
      {
        label: "Mentors",
        href: "/about/mentors",
        description: "Industry experts, office hours, and domain guidance.",
        customIcon: "/src/assets/icons/mentors.png",
      },
      {
        label: "Board",
        href: "/about/board",
        description: "Governance, leadership, and strategic oversight.",
        customIcon: "/src/assets/icons/board.png",
      },
      {
        label: "Team",
        href: "/about/team",
        description: "Core team, coordinators, and student leaders.",
        customIcon: "/src/assets/icons/team.png",
      },
    ],
    compact: true,
  },
};

function scrollToSection(id: string) {
  const section = document.getElementById(id);
  section?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `#${id}`);
}

const MobileMenuToggle = forwardRef<HTMLButtonElement, { open: boolean; onClick: () => void }>(
  ({ open, onClick }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls="mobile-menu-panel"
      className={cn(
        "grid min-h-[40px] min-w-[40px] place-items-center transition focus-visible:ring-2 focus-visible:ring-[#e75710] focus-visible:ring-offset-2 focus:outline-none",
        open
          ? "rounded-full bg-white text-black"
          : "rounded-lg border border-slate-200 bg-slate-100 text-slate-700 hover:border-slate-300 hover:bg-slate-200",
      )}
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
  ),
);

function MegaMenuPanel({
  activePanel,
  panelRef,
  onNavigate,
}: {
  activePanel: PanelKey | null;
  panelRef: RefObject<HTMLDivElement | null>;
  onNavigate: () => void;
}) {
  const { isVisible } = usePageVisibilityHelper();
  const panel = activePanel ? PANEL_CONTENT[activePanel] : null;
  const visibleLinks = panel ? panel.links.filter((link) => isVisible(link.href)) : [];

  return (
    <AnimatePresence mode="wait">
      {activePanel && panel && visibleLinks.length > 0 ? (
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
              ? "w-[min(612px,calc(100vw-2rem))] max-h-[calc(100vh-126px)]"
              : "w-[min(918px,calc(100vw-2rem))] max-h-[calc(100vh-126px)]",
          )}
        >
          <div className="relative flex items-center justify-between gap-4 border-b border-slate-200 px-2 pb-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-slate-500">
                {panel.eyebrow}
              </div>
            </div>
          </div>

          <div className="relative overflow-y-auto max-h-[calc(100vh-180px)] px-2 pb-2 pt-3">
            <div
              className={cn(
                "grid gap-3",
                panel.compact ? "sm:grid-cols-2" : "sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4",
              )}
            >
              {visibleLinks.map((item) => {
                // Map labels to appropriate icons
                const iconMap: Record<string, IconType> = {
                  Mentors: Users,
                  Board: Building2,
                  Team: Users,
                  Incubation: Rocket,
                  Innovation: Layers3,
                  Mentorship: Users,
                  Funding: BadgeDollarSign,
                  Partners: Building2,
                  Infrastructure: Layers3,
                  Dashboard: Zap,
                  Calendar: CalendarDays,
                  Registration: ShieldCheck,
                  Login: ShieldCheck,
                  Vision: Target,
                  Roadmap: Target,
                };

                const Icon =
                  Object.entries(iconMap).find(([key]) => item.label.includes(key))?.[1] ||
                  Sparkles;

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={onNavigate}
                    data-reveal
                    className="group overflow-hidden rounded-lg border border-slate-200 bg-white text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
                  >
                    <div className="relative h-[100px] overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100/50 flex items-center justify-center gap-2 px-3">
                      {item.customIcon ? (
                        <img
                          src={item.customIcon}
                          alt={item.label}
                          className="h-16 w-16 object-contain select-none"
                          draggable={false}
                        />
                      ) : (
                        <Icon size={22} className="text-[#ff8901]" strokeWidth={1.5} />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5" />
                    </div>
                    <div className="p-3.5">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm font-medium text-slate-900">{item.label}</div>
                        <ArrowRight
                          className="text-[#e75710] opacity-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                          size={14}
                        />
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                        {item.description}
                      </p>
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
  const { isVisible } = usePageVisibilityHelper();
  const navigate = useNavigate();
  const routeKey = useRouterState({
    select: (state) => state.location.pathname,
  });
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<PanelKey | null>(null);
  const [activeSection, setActiveSection] = useState("home");

  const visibleNavItems = NAV_ITEMS.filter((item) => {
    if (item.panel) {
      const panelContent = PANEL_CONTENT[item.panel];
      const visibleLinks = panelContent.links.filter((link) => isVisible(link.href));
      return visibleLinks.length > 0;
    }
    return isVisible(item.href);
  });

  const panelRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const closeMenus = useCallback(() => {
    setActivePanel(null);
    setMobileOpen(false);
  }, []);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!mobileOpen || !menuRef.current) return;
    const menu = menuRef.current;
    const focusable = menu.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    // Focus first element after open
    first?.focus();
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    menu.addEventListener("keydown", trap);
    return () => {
      menu.removeEventListener("keydown", trap);
      toggleRef.current?.focus();
    };
  }, [mobileOpen]);

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
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
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
      if (event.key === "Escape") {
        closeMenus();
        return;
      }
      // Arrow navigation in dropdown panels
      if (activePanel && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
        const panel = panelRef.current;
        if (!panel) return;
        const focusable = panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        event.preventDefault();
        const currentIndex = Array.from(focusable).indexOf(document.activeElement as HTMLElement);
        if (event.key === "ArrowDown") {
          const next = focusable[(currentIndex + 1) % focusable.length];
          next?.focus();
        } else {
          const prev = focusable[(currentIndex - 1 + focusable.length) % focusable.length];
          prev?.focus();
        }
      }
      // ArrowDown on trigger with no active panel: open panel and focus first item
      if (activePanel === null && event.key === "ArrowDown") {
        // handled per-item via onFocus
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePanel, closeMenus]);

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
      <div ref={navRef} className="relative w-full" onMouseLeave={() => setActivePanel(null)}>
        {/* Subtle overlay behind navbar */}
        <div className="pointer-events-auto absolute inset-x-0 top-0 h-[54px] bg-gradient-to-b from-white/20 to-transparent" />
        {/* Left black overlay for contrast (desktop) */}
        <div className="hidden lg:block pointer-events-none absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-r from-black/80 to-transparent z-0" />

        <nav
          aria-label="Primary navigation"
          className={cn(
            "pointer-events-auto relative w-full border-b border-slate-200 bg-white transition-[box-shadow] duration-400",
            scrolled ? "shadow-sm" : "",
          )}
        >
          <div className="flex h-[58px] w-full items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10">
            {/* Logo section - left aligned */}
            <div className="flex shrink-0 items-center gap-3">
              <Link
                to="/"
                className="group flex items-center gap-3 transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-[#e75710] focus-visible:ring-offset-2 focus:outline-none"
              >
                <img
                  src={ahubLogo}
                  alt="AUIC"
                  className="h-11 w-auto select-none object-contain"
                  draggable={false}
                />
                <div className="flex flex-col leading-tight">
                  <span className="text-[0.95rem] font-semibold text-slate-950 tracking-tight">
                    AUIC
                  </span>
                  <span className="text-[0.68rem] text-slate-700 font-medium uppercase tracking-[0.22em]">
                    Incubation Hub
                  </span>
                </div>
              </Link>
            </div>

             {/* Center navigation links - hidden on mobile */}
            <div className="hidden flex-1 items-center justify-center lg:flex">
              <ul className="flex items-center justify-center gap-1 xl:gap-1.5">
                {visibleNavItems.map((item) => {
                  const isPanelOpen = activePanel === item.panel;
                  const hasPanel = !!item.panel;
                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        className="group flex items-center gap-1 rounded-lg px-3 py-2 text-[0.78rem] font-semibold tracking-[0.06em] text-slate-700 transition-colors duration-300 hover:text-[#e75710] focus-visible:ring-2 focus-visible:ring-[#e75710] focus-visible:ring-offset-2 focus:outline-none"
                        onMouseEnter={() => item.panel && setActivePanel(item.panel)}
                        onFocus={() => item.panel && setActivePanel(item.panel)}
                        onClick={() => {
                          if (hasPanel) {
                            setActivePanel((current) =>
                              current === item.panel ? null : (item.panel ?? null),
                            );
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
            <div className="flex shrink-0 items-center gap-2">
              {isVisible("/programs/join-us") && (
                <Link
                  to="/programs/join-us"
                  className="group hidden lg:inline-flex items-center gap-2 rounded-xl bg-[#c94a0a] px-3.5 py-2.5 text-xs font-medium text-white transition-transform duration-300 hover:-translate-y-0.5 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#e75710] focus-visible:ring-offset-2 focus:outline-none"
                >
                  Join Us
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </Link>
              )}

              {/* Mobile menu toggle */}
              <div className="flex lg:hidden">
                <MobileMenuToggle
                  ref={toggleRef}
                  open={mobileOpen}
                  onClick={() => setMobileOpen((value) => !value)}
                />
              </div>
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
            className="fixed inset-0 z-40 lg:hidden pointer-events-auto"
          >
            {/* Dark overlay background */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            {/* Mobile menu panel */}
            <div
              ref={menuRef}
              id="mobile-menu-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Main navigation menu"
              className="absolute inset-x-4 top-24 rounded-2xl border border-[rgba(255,255,255,0.12)] bg-black/80 backdrop-blur-xl p-6 shadow-2xl max-h-[calc(100vh-108px)] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-3 pb-6 border-b border-[rgba(255,255,255,0.1)]">
                <div className="flex items-center gap-3">
                  <img
                    src={ahubLogo}
                    alt="AUIC"
                    className="h-11 w-auto object-contain"
                    draggable={false}
                  />
                  <div>
                    <div className="text-xs uppercase tracking-widest text-white/60">AUIC</div>
                    <div className="text-sm font-semibold text-white">Incubation Hub</div>
                  </div>
                </div>
                <MobileMenuToggle open onClick={closeMenus} />
              </div>

              {/* Navigation sections with inline links */}
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
                }}
                className="mt-6 grid gap-3"
              >
                {visibleNavItems.map((item) => {
                  const isActive =
                    activeSection === item.href.slice(1) || activePanel === item.panel;
                  const panelContent = item.panel ? PANEL_CONTENT[item.panel] : null;
                  return (
                    <motion.li
                      key={item.label}
                      variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                    >
                      {/* Section header button */}
                      <button
                        type="button"
                        onClick={() => {
                          if (item.panel) {
                            setActivePanel((current) =>
                              current === item.panel ? null : (item.panel ?? null),
                            );
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
                          "w-full rounded-lg px-4 py-3 text-left text-sm font-semibold uppercase tracking-widest transition-all duration-300 border flex items-center justify-between",
                          isActive
                            ? "border-[#e75710]/40 bg-[#e75710]/10 text-white"
                            : "border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] text-white/80 hover:border-[rgba(255,255,255,0.2)] hover:text-white",
                        )}
                      >
                        <NavLabel label={item.label} />
                        {panelContent && (
                          <ChevronDown
                            size={14}
                            className={cn(
                              "transition-transform duration-300 text-white/50",
                              activePanel === item.panel ? "rotate-180 text-[#e75710]" : "",
                            )}
                          />
                        )}
                      </button>

                      {/* Inline sub-links — shown when panel is open */}
                      {panelContent && activePanel === item.panel && (
                        <div className="mt-1.5 grid gap-1 pl-2">
                          {panelContent.links
                            .filter((link) => isVisible(link.href))
                            .map((link) => (
                              <Link
                                key={link.href}
                                to={link.href}
                                onClick={closeMenus}
                                className="flex items-center justify-between rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-2.5 text-left transition hover:border-[rgba(255,255,255,0.18)] hover:bg-[rgba(255,255,255,0.08)]"
                              >
                                <div>
                                  <div className="text-sm font-medium text-white">{link.label}</div>
                                  <div className="mt-0.5 text-xs text-white/50">{link.description}</div>
                                </div>
                                <ArrowRight size={13} className="shrink-0 text-[#e75710] ml-2" />
                              </Link>
                            ))}
                        </div>
                      )}
                    </motion.li>
                  );
                })}
              </motion.ul>

              {/* CTA Button */}
              {isVisible("/programs/join-us") && (
                <Link
                  to="/programs/join-us"
                  onClick={closeMenus}
                  className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#c94a0a] px-5 py-2.5 text-xs font-medium text-white transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(201,74,10,0.28)] active:scale-95 focus-visible:ring-2 focus-visible:ring-[#e75710] focus-visible:ring-offset-2 focus:outline-none"
                >
                  Join Us
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
