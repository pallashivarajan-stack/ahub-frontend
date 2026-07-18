import { useMemo, useState, useCallback, useEffect } from "react";
import { usePublicStartupEvents } from "@/services/usePublicContent";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Clock,
  MapPin,
  Mic2,
  Sparkles,
  Ticket,
  TrendingUp,
  Users,
  Rocket,
  Handshake,
  Trophy,
  Lightbulb,
  ChevronDown,
  ArrowRight,
  Bell,
  Mail,
  X,
  CheckCircle2,
} from "lucide-react";
import { resolveLegacyAsset } from "@/lib/assets";
import { EVENTS_DATA, type RedesignedEvent } from "@/data/startupEvents";
import { StartupEventsPremiumHero } from "./StartupEventsPremiumHero";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" as const },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

const isUrl = (v: string) => v.startsWith("http://") || v.startsWith("https://") || v.startsWith("/");

const CATEGORIES = [
  { label: "Startup Meetups", icon: Rocket, type: "Networking", color: "from-orange-500 to-amber-500", count: "2 Events" },
  { label: "Pitch Sessions", icon: Mic2, type: "Pitch Sessions", color: "from-purple-500 to-indigo-500", count: "2 Events" },
  { label: "Workshops", icon: Lightbulb, type: "Workshops", color: "from-amber-400 to-yellow-500", count: "3 Events" },
  { label: "Networking Events", icon: Handshake, type: "Networking", color: "from-blue-500 to-sky-500", count: "2 Events" },
  { label: "Hackathons", icon: Trophy, type: "Hackathons", color: "from-rose-500 to-red-500", count: "1 Event" },
  { label: "Investor Connect", icon: TrendingUp, type: "Pitch Sessions", color: "from-emerald-500 to-teal-500", count: "1 Event" },
];

const STATS = [
  { label: "Active Events", value: "50+" },
  { label: "Startup Communities", value: "20+" },
  { label: "Ecosystem Attendees", value: "5000+" },
  { label: "Active Founders", value: "100+" }
];

function EventImageGallery({ title, image, images }: { title: string; image: string; images?: string[] }) {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start", dragFree: false });

  if (images && images.length > 1) {
    return (
      <div className="overflow-hidden cursor-grab active:cursor-grabbing h-full w-full" ref={emblaRef}>
        <div className="flex h-full">
          {images.map((img, idx) => (
            <div key={idx} className="min-w-0 flex-[0_0_100%] h-full">
              <img
                src={img}
                alt={`${title} - ${idx + 1}`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <img
      src={image}
      alt={title}
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
  );
}

function EventImageCollage({ title, image, images }: { title: string; image: string; images?: string[] }) {
  if (!images || images.length <= 1) {
    return (
      <img src={image} alt={title} className="h-full w-full object-cover rounded-2xl" />
    );
  }
  
  if (images.length === 3) {
    return (
      <div className="grid grid-cols-2 grid-rows-2 h-full w-full gap-2 p-2">
        <div className="col-span-1 row-span-2 overflow-hidden rounded-xl bg-white border border-slate-100">
          <img src={images[0]} alt={title} className="h-full w-full object-cover" />
        </div>
        <div className="col-span-1 row-span-1 overflow-hidden rounded-xl bg-white border border-slate-100">
          <img src={images[1]} alt={title} className="h-full w-full object-cover" />
        </div>
        <div className="col-span-1 row-span-1 overflow-hidden rounded-xl bg-white border border-slate-100">
          <img src={images[2]} alt={title} className="h-full w-full object-cover" />
        </div>
      </div>
    );
  }

  // fallback grid
  return (
    <div className="grid grid-cols-2 h-full w-full gap-2 p-2">
      {images.slice(0, 4).map((img, i) => (
        <div key={i} className="overflow-hidden rounded-xl bg-white border border-slate-100">
          <img src={img} alt={title} className="h-full w-full object-cover" />
        </div>
      ))}
    </div>
  );
}

export function StartupsEventsPage() {
  const { data: eventsData } = usePublicStartupEvents(EVENTS_DATA);
  const displayEvents = eventsData ?? EVENTS_DATA;
  const [selectedFilter, setSelectedFilter] = useState("All Events");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeModalEvent, setActiveModalEvent] = useState<RedesignedEvent | null>(null);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center", dragFree: false });
  const [currentFeatured, setCurrentFeatured] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentFeatured(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  const filteredEvents = useMemo(() => {
    if (selectedFilter === "All Events") return displayEvents;
    return displayEvents.filter((event) => {
      const filter = selectedFilter.toLowerCase();
      const type = event.type.toLowerCase();
      if (filter === "networking" && type === "networking") return true;
      if (filter === "workshops" && (type.includes("workshop") || type.includes("roundtable"))) return true;
      if (filter === "webinars" && type.includes("webinar")) return true;
      if (filter === "hackathons" && type.includes("hackathon")) return true;
      if (filter === "demo days" && (type.includes("panel") || type.includes("demo"))) return true;
      if (filter === "pitch sessions" && (type.includes("pitch") || type.includes("info"))) return true;
      return false;
    });
  }, [selectedFilter]);

  const featuredEvents = useMemo(() => {
    return [
      {
        id: "featured-1",
        title: "Women Entrepreneurship Series",
        image: resolveLegacyAsset("/src/assets/startups_events/women_tie.jpeg"),
        type: "Upcoming Event",
        panelDetails: "Interactive sessions on startup growth strategies, investor readiness, and building scalable products in emerging markets.",
        dateLabel: "JUL 29, 2025",
        time: "10:00 AM",
        venue: "Vizag, Andhra Pradesh",
        description: "Join founders, mentors, and ecosystem builders for our flagship monthly meetup. Pitch your ideas, get feedback from experienced entrepreneurs, and network with the startup community.",
        registrationLink: "https://forms.gle/startup-saturdays-aug2025"
      },
      {
        id: "featured-2",
        title: "Startup Saturdays – Monthly Meetup",
        image: resolveLegacyAsset("/src/assets/startups_events/startup starurdays.jpg"),
        type: "Networking",
        panelDetails: "A high-energy weekend meetup designed to bring the local ecosystem together. Hear from successful founders and pitch your MVP.",
        dateLabel: "JUL 04, 2025",
        time: "4:00 PM",
        venue: "MRT Cmart Mall",
        description: "An electrifying session focusing on modern startup distribution challenges, finding your first 100 customers, and open Q&A."
      }
    ];
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 5000);
    }
  };

  const handleCategoryClick = (categoryType: string) => {
    const filterMap: Record<string, string> = {
      "Networking": "Networking",
      "Pitch Sessions": "Pitch Sessions",
      "Workshops": "Workshops",
      "Hackathons": "Hackathons",
    };
    const targetFilter = filterMap[categoryType] || "All Events";
    setSelectedFilter(targetFilter);
    const listSection = document.getElementById("recent-events-list");
    if (listSection) {
      listSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FDF8F2] pb-16 pt-14 md:pb-24 md:pt-16 font-['Inter',sans-serif]">
      {/* Premium background gradient overlays */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#F59E42]/8 blur-[100px]" />
        <div className="absolute -right-24 top-64 h-[500px] w-[500px] rounded-full bg-[#FFE8D0]/40 blur-[130px]" />
        <div className="absolute left-[30%] bottom-20 h-80 w-80 rounded-full bg-[#FF8C42]/5 blur-[90px]" />
      </div>

      <div className="relative site-container-wide">
        
        {/* HERO SECTION */}
        <StartupEventsPremiumHero />

        {/* FEATURED EVENT SECTION */}
        <motion.section
          {...fadeUp}
          className="mt-16 sm:mt-24"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-[900] text-[#2D1B1B] md:text-3xl flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-[#F59E42]" />
              Featured Event
            </h2>
            <p className="mt-1 text-sm text-[#6C5E5B]">Don't miss our upcoming flagship ecosystem moment</p>
          </div>

          {/* Embla drag viewport */}
          <div className="overflow-hidden cursor-grab active:cursor-grabbing pb-6 pt-2" ref={emblaRef}>
            <div className="flex">
              {featuredEvents.map((featuredEvent) => (
                <div key={featuredEvent.id} className="min-w-0 flex-[0_0_100%] px-2">
                  <div className="overflow-hidden rounded-2xl border border-white/80 bg-white shadow-[0_8px_20px_-8px_rgba(45,27,27,0.08)] hover:shadow-[0_12px_30px_-6px_rgba(245,158,66,0.15)] transition-all duration-500 group">
                    <div className="grid lg:grid-cols-[40%_60%]">
                      <div className="relative min-h-[240px] lg:min-h-[280px] overflow-hidden bg-[#FFF8F2]">
                        <img
                          src={featuredEvent.image}
                          alt={featuredEvent.title}
                          className="absolute inset-0 h-full w-full object-contain p-2.5 transition-transform duration-700 group-hover:scale-103 pointer-events-none"
                        />
                      </div>

                      <div className="flex flex-col justify-between p-4 sm:p-5 lg:p-6">
                        <div>
                          {/* Event type badge */}
                          <span className="inline-block rounded-full bg-[#FFF4E8] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#F59E42] border border-[#F59E42]/10">
                            {featuredEvent.type}
                          </span>

                          {/* Title */}
                          <h3 className="mt-3 font-display text-xl font-[900] leading-tight text-[#2D1B1B] md:text-2xl">
                            {featuredEvent.title}
                          </h3>

                          {/* Date / Time / Venue — clean detail rows */}
                          <div className="mt-4 space-y-2.5">
                            <div className="flex items-center gap-3 text-sm text-[#2D1B1B]">
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FFF4E8]">
                                <CalendarDays className="h-4 w-4 text-[#F59E42]" />
                              </span>
                              <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-[#6C5E5B]/70">Date</p>
                                <p className="font-bold">{featuredEvent.dateLabel}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-[#2D1B1B]">
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FFF4E8]">
                                <Clock className="h-4 w-4 text-[#F59E42]" />
                              </span>
                              <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-[#6C5E5B]/70">Time</p>
                                <p className="font-bold">{featuredEvent.time}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-[#2D1B1B]">
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FFF4E8]">
                                <MapPin className="h-4 w-4 text-[#F59E42]" />
                              </span>
                              <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-[#6C5E5B]/70">Venue</p>
                                <p className="font-bold">{featuredEvent.venue}</p>
                              </div>
                            </div>
                          </div>

                          {/* Event Highlights */}
                          <div className="mt-5 rounded-xl bg-[#FFFBF7] border border-[#F5E6D3]/40 p-3">
                            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#F59E42]">Event Highlights</p>
                            <p className="mt-1.5 text-sm font-semibold leading-relaxed text-[#2D1B1B]">{featuredEvent.panelDetails}</p>
                          </div>

                          {/* Description */}
                          <p className="mt-4 text-sm leading-relaxed text-[#6C5E5B]">
                            {featuredEvent.description}
                          </p>
                        </div>

                        {/* Register CTA */}
                        <div className="mt-6 pt-4 border-t border-slate-100">
                          <a
                            href={featuredEvent.registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F59E42] to-[#FF8C42] hover:brightness-105 hover:shadow-[0_8px_20px_-4px_rgba(245,158,66,0.4)] text-white px-8 py-3.5 text-xs font-extrabold uppercase tracking-wider transition-all"
                          >
                            <Ticket className="h-4 w-4" />
                            Register Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination dots */}
          <div className="mt-2 flex items-center justify-center gap-2">
            {featuredEvents.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollTo(i)}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === currentFeatured ? 20 : 8,
                  backgroundColor: i === currentFeatured ? "#F59E42" : "#D1D5DB",
                }}
              />
            ))}
          </div>
          
          <style dangerouslySetInnerHTML={{__html: `
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}} />
        </motion.section>

        {/* UPCOMING EVENT TYPES (CATEGORIES) */}
        <motion.section
          {...fadeUp}
          className="mt-16 sm:mt-24"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-[900] text-[#2D1B1B] md:text-3xl">Explore Ecosystem Categories</h2>
            <p className="mt-1 text-sm text-[#6C5E5B]">Discover events based on your startup timeline or community profile</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.label}
                  whileHover={{ y: -6, scale: 1.01 }}
                  onClick={() => handleCategoryClick(cat.type)}
                  className="group cursor-pointer overflow-hidden rounded-[24px] border border-white/80 bg-white p-6 shadow-[0_12px_36px_-20px_rgba(45,27,27,0.06)] hover:border-[#F59E42]/20 hover:shadow-[0_20px_45px_-15px_rgba(245,158,66,0.15)] transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.color} text-white shadow-md`}>
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <span className="rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                      {cat.count}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold text-[#2D1B1B] group-hover:text-[#F59E42] transition-colors">
                    {cat.label}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#6C5E5B]">
                    Find curated meetups, opportunities, and panel discussions relating to {cat.label.toLowerCase()} in the AHub ecosystem.
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[#F59E42] opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-4px] group-hover:translate-x-0">
                    Filter events <ArrowRight className="h-3 w-3" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* RECENT STARTUP EVENTS WITH REAL-TIME FILTERING */}
        <section id="recent-events" className="mt-16 sm:mt-24 scroll-mt-24">
          <div id="recent-events-list" className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#F5E6D3]/40 pb-5">
            <div>
              <h2 className="relative inline-block text-2xl font-[900] text-[#2D1B1B] md:text-3xl">
                Recent Startup Events
                <span className="absolute bottom-[-6px] left-0 h-[3px] w-24 bg-[#F59E42]" />
              </h2>
              <p className="mt-2 text-sm text-[#6C5E5B]">Discover active meetups, hackathons, and webinars</p>
            </div>

            {/* Custom Dropdown Filter */}
            <div className="relative self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#F59E42]/20 bg-white px-4 py-2.5 text-sm font-semibold text-[#2D1B1B] shadow-sm hover:border-[#F59E42]/45 transition-colors focus:outline-none"
              >
                <CalendarDays className="h-4 w-4 text-[#F59E42]" />
                {selectedFilter}
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-52 origin-top-right rounded-2xl border border-slate-100 bg-white p-2 shadow-xl z-20 focus:outline-none"
                    >
                      {["All Events", "Networking", "Workshops", "Webinars", "Hackathons", "Demo Days", "Pitch Sessions"].map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setSelectedFilter(option);
                            setDropdownOpen(false);
                          }}
                          className={`w-full text-left rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                            selectedFilter === option
                              ? "bg-[#FFF4E8] text-[#F59E42]"
                              : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* VERTICAL EVENT LIST */}
          <div className="space-y-5">
            {filteredEvents.length === 0 ? (
              <div className="rounded-[24px] border border-[#F5E6D3]/40 bg-white/40 p-12 text-center shadow-inner">
                <p className="text-base font-bold text-[#2D1B1B]">No events found matching "{selectedFilter}"</p>
                <p className="mt-1 text-xs text-[#6C5E5B]">Try resetting the filter or explore other categories above.</p>
                <button
                  onClick={() => setSelectedFilter("All Events")}
                  className="mt-4 rounded-xl border border-[#F59E42] px-4 py-2 text-xs font-bold text-[#F59E42] hover:bg-[#FFF4E8] transition"
                >
                  Show All Events
                </button>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredEvents.map((event) => (
                  <motion.article
                    key={event.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.4 }}
                    className="group relative flex flex-col md:flex-row overflow-hidden rounded-[24px] border border-white/60 bg-white p-5 shadow-[0_10px_30px_-15px_rgba(45,27,27,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#F59E42]/20 hover:shadow-[0_20px_40px_-12px_rgba(245,158,66,0.15)]"
                  >
                    <div className="relative w-full md:w-64 h-40 md:h-full rounded-2xl overflow-hidden shrink-0 bg-[#FFF8F2]">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {getEventLogo(event.logo)}
                    </div>

                    <div className="flex flex-row md:flex-col items-center justify-start md:justify-center border-b md:border-b-0 md:border-r border-[#F5E6D3]/60 py-4 md:py-0 px-1 md:px-6 shrink-0 gap-2 md:gap-0">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-[#F59E42]">
                        {event.date.month}
                      </span>
                      <span className="text-3xl font-black text-[#2D1B1B] mt-0.5 leading-none">
                        {event.date.day}
                      </span>
                      <span className="text-xs font-semibold text-[#6C5E5B] mt-0.5">
                        {event.date.year}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col justify-center py-4 md:py-0 md:px-6">
                      <h3 className="mb-2 text-lg font-extrabold text-[#2D1B1B] group-hover:text-[#F59E42] transition-colors leading-tight">
                        {event.title}
                      </h3>

                      <div className="flex flex-col items-start gap-2 mt-1">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                          event.type === "Workshop" || event.type === "Info Session"
                            ? "bg-[#FFEBE5] text-[#FF5A36]"
                            : event.type === "Webinar"
                            ? "bg-[#EFE8FF] text-[#8050FF]"
                            : event.type === "Networking"
                            ? "bg-[#FFF0E0] text-[#FF8800]"
                            : "bg-[#E6F5FF] text-[#0088FF]"
                        }`}>
                          {event.type}
                        </span>

                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#6C5E5B]">
                          <MapPin className="h-3.5 w-3.5 text-[#F59E42]" />
                          <span>{event.location}</span>
                        </div>

                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#6C5E5B]">
                          <Clock className="h-3.5 w-3.5 text-[#F59E42]" />
                          <span>{event.time}</span>
                        </div>
                      </div>

                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#6C5E5B]">
                        {event.description}
                      </p>

                      {event.partners && event.partners.length > 0 && (
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-[#6C5E5B]/60">Partners</span>
                          {event.partners.map((p) => (
                            <div key={p.name} title={p.name} className="flex items-center justify-center h-9 w-16 rounded-lg overflow-hidden bg-white border border-[#F5E6D3] shadow-md">
                              <img src={p.logo} alt={p.name} className="h-full w-full object-contain p-1" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 border-slate-100 pt-4 md:pt-0 shrink-0 gap-4 pl-1 md:pl-0">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                        event.status === "Upcoming"
                          ? "bg-[#DCFCE7] text-[#16A34A]"
                          : event.status === "Live"
                          ? "bg-[#FEE2E2] text-[#DC2626]"
                          : "bg-slate-100 text-slate-500"
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          event.status === "Upcoming"
                            ? "bg-[#16A34A]"
                            : event.status === "Live"
                            ? "bg-[#DC2626] animate-pulse"
                            : "bg-slate-400"
                        }`} />
                        {event.status}
                      </span>

                      <button
                        type="button"
                        onClick={() => setActiveModalEvent(event)}
                        className="rounded-xl border-2 border-[#F59E42] hover:bg-[#F59E42] text-[#F59E42] hover:text-white px-5 py-2.5 text-xs font-extrabold tracking-wider transition-all duration-300 focus:outline-none"
                      >
                        View Details
                      </button>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            )}
          </div>
        </section>

        {/* NEWSLETTER CTA BANNER */}
        <motion.section
          {...fadeUp}
          className="mt-16 sm:mt-24"
        >
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#FFEBD3]/70 to-[#FFF6EB] border border-[#F5E6D3]/60 px-6 py-10 sm:p-12 md:p-14 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="absolute top-[-20%] left-[-10%] h-60 w-60 rounded-full bg-[#F59E42]/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] h-60 w-60 rounded-full bg-[#FF8C42]/10 blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left relative z-10">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF4E8] text-[#F59E42] shadow-sm border border-[#F59E42]/15">
                <Bell className="h-6 w-6 animate-bounce" />
              </div>
              <div>
                <h3 className="text-xl font-[900] text-[#2D1B1B] sm:text-2xl leading-none">
                  Never Miss a Startup Event
                </h3>
                <p className="mt-2 max-w-lg text-xs leading-relaxed text-[#6C5E5B] sm:text-sm">
                  Get notified about startup events, founder meetups, workshops, funding opportunities, and networking sessions in Andhra University's startup ecosystem.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubscribe} className="w-full md:w-auto relative z-10 flex flex-col sm:flex-row gap-2 shrink-0">
              {isSubscribed ? (
                <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 border border-emerald-200 px-6 py-3.5 text-emerald-800 text-xs font-bold">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Subscription Successful!
                </div>
              ) : (
                <>
                  <div className="relative flex-1 sm:w-64">
                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-2xl border border-[#F5E6D3] bg-white px-10 py-3.5 text-xs text-[#2D1B1B] placeholder-slate-400 shadow-inner outline-none transition focus:border-[#F59E42]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-2xl bg-gradient-to-r from-[#F59E42] to-[#FF8C42] hover:shadow-[0_8px_20px_-4px_rgba(245,158,66,0.3)] hover:brightness-105 transition-all text-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider shrink-0 flex items-center justify-center gap-1.5"
                  >
                    Subscribe Now
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </>
              )}
            </form>

            <div className="absolute right-12 top-2 opacity-5 hidden lg:block select-none pointer-events-none transform rotate-12">
              <svg viewBox="0 0 24 24" className="h-24 w-24">
                <path fill="#F59E42" d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
              </svg>
            </div>
          </div>
        </motion.section>
      </div>

      <AnimatePresence>
        {activeModalEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalEvent(null)}
              className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="relative w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden rounded-[32px] border border-slate-100 bg-white shadow-2xl z-10"
            >
              <button
                onClick={() => setActiveModalEvent(null)}
                className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100/80 backdrop-blur-sm hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors focus:outline-none shadow-sm"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="overflow-y-auto p-6 sm:p-8 custom-scrollbar">
                <div className="mt-2">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                  activeModalEvent.status === "Upcoming"
                    ? "bg-[#DCFCE7] text-[#16A34A]"
                    : activeModalEvent.status === "Live"
                    ? "bg-[#FEE2E2] text-[#DC2626]"
                    : "bg-slate-100 text-slate-500"
                }`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${
                    activeModalEvent.status === "Upcoming"
                      ? "bg-[#16A34A]"
                      : activeModalEvent.status === "Live"
                      ? "bg-[#DC2626] animate-pulse"
                      : "bg-slate-400"
                  }`} />
                  {activeModalEvent.status}
                </span>

                <h3 className="mt-4 font-display text-xl font-[900] leading-tight text-[#2D1B1B] sm:text-2xl pr-8">
                  {activeModalEvent.title}
                </h3>

                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-[#6C5E5B] border-y border-slate-100 py-3">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4 text-[#F59E42]" />
                    <span>{activeModalEvent.date.month} {activeModalEvent.date.day}, {activeModalEvent.date.year}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-[#F59E42]" />
                    <span>{activeModalEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-[#F59E42]" />
                    <span>{activeModalEvent.location}</span>
                  </div>
                </div>

                <div className="mt-4 w-full h-56 sm:h-72 rounded-2xl overflow-hidden bg-[#FFF8F2] border border-slate-100">
                  <EventImageCollage title={activeModalEvent.title} image={activeModalEvent.image} images={activeModalEvent.images} />
                </div>

                <div className="mt-5 text-sm leading-relaxed text-[#6C5E5B] whitespace-pre-line">
                  <p className="font-bold text-[#2D1B1B] uppercase tracking-wider text-[10px]">About Event</p>
                  <p className="mt-2">{activeModalEvent.detailedDescription || activeModalEvent.description}</p>
                </div>

                {activeModalEvent.instagramLink && (
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <a
                      href={activeModalEvent.instagramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white px-5 py-2.5 text-xs font-bold shadow-md hover:shadow-lg transition-shadow"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                      </svg>
                      View on Instagram
                    </a>
                  </div>
                )}

                {activeModalEvent.speakers && activeModalEvent.speakers.length > 0 && (
                  <div className="mt-6">
                    <p className="text-xs font-extrabold uppercase tracking-wider text-[#6C5E5B] mb-3">Speakers</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {activeModalEvent.speakers.map((speaker) => (
                        <div key={speaker.name} className="flex items-center gap-3 bg-slate-50/60 p-3 rounded-2xl border border-slate-100/50">
                          <img
                            src={speaker.avatar}
                            alt={speaker.name}
                            className="h-10 w-10 rounded-full object-cover border border-[#F59E42]/20"
                          />
                          <div>
                            <p className="text-xs font-bold text-[#2D1B1B]">{speaker.name}</p>
                            <p className="text-[10px] font-semibold text-[#6C5E5B]">{speaker.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8 flex gap-3">
                  {activeModalEvent.id === "host-request" ? (
                    <button
                      onClick={() => {
                        setActiveModalEvent(null);
                        alert("Thank you! Your event proposal has been submitted to the AHub Program Committee.");
                      }}
                      className="flex-1 rounded-2xl bg-gradient-to-r from-[#F59E42] to-[#FF8C42] py-3.5 text-center text-xs font-extrabold uppercase tracking-wider text-white hover:brightness-105 transition active:scale-[0.98]"
                    >
                      Submit Proposal
                    </button>
                  ) : activeModalEvent.status !== "Completed" ? (
                    <>
                      <button
                        onClick={() => {
                          setActiveModalEvent(null);
                          alert("Successfully RSVP'd! Confirmation and calendar invite sent to your registered email.");
                        }}
                        className="flex-1 rounded-2xl bg-gradient-to-r from-[#F59E42] to-[#FF8C42] py-3.5 text-center text-xs font-extrabold uppercase tracking-wider text-white hover:brightness-105 transition active:scale-[0.98]"
                      >
                        Confirm Registration
                      </button>
                      <button
                        onClick={() => {
                          setActiveModalEvent(null);
                        }}
                        className="rounded-2xl border border-slate-200 hover:bg-slate-50 px-5 py-3.5 text-xs font-bold text-[#6C5E5B] transition"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setActiveModalEvent(null)}
                      className="flex-1 rounded-2xl bg-slate-100 py-3.5 text-center text-xs font-extrabold uppercase tracking-wider text-[#6C5E5B] hover:bg-slate-200 transition"
                    >
                      This Event has Concluded
                    </button>
                  )}
                </div>
              </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function getEventLogo(logoType?: string) {
  if (!logoType) return null;
  if (isUrl(logoType)) {
    return (
      <div className="absolute bottom-3 left-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-md border border-slate-100 overflow-hidden">
        <img src={logoType} alt="" className="h-8 w-8 object-contain" />
      </div>
    );
  }
  switch (logoType) {
    case "google":
      return (
        <div className="absolute bottom-3 left-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-md border border-slate-100">
          <svg viewBox="0 0 24 24" className="h-6 w-6">
            <path fill="#EA4335" d="M12 5.04c1.67 0 3.2.58 4.38 1.71l3.27-3.27C17.67 1.71 15 1 12 1 7.35 1 3.4 3.65 1.5 7.5l3.86 3C6.27 7.76 8.91 5.04 12 5.04z" />
            <path fill="#4285F4" d="M23.5 12.25c0-.82-.07-1.6-.2-2.35H12v4.46h6.45c-.28 1.46-1.1 2.7-2.34 3.53l3.64 2.82c2.13-1.97 3.75-4.86 3.75-8.46z" />
            <path fill="#FBBC05" d="M5.36 14.86c-.24-.72-.38-1.5-.38-2.3s.14-1.58.38-2.3L1.5 7.26C.54 9.18 0 11.3 0 13.5c0 2.2.54 4.32 1.5 6.24l3.86-3.88z" />
            <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.64-2.82c-1.1.74-2.5 1.18-4.32 1.18-3.09 0-5.73-2.72-6.64-5.46L1.5 16.86C3.4 20.35 7.35 23 12 23z" />
          </svg>
        </div>
      );
    case "microsoft":
      return (
        <div className="absolute bottom-3 left-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-md border border-slate-100">
          <svg viewBox="0 0 23 23" className="h-5 w-5">
            <rect x="0" y="0" width="10" height="10" fill="#F25022" />
            <rect x="11" y="0" width="10" height="10" fill="#7FBA00" />
            <rect x="0" y="11" width="10" height="10" fill="#00A4EF" />
            <rect x="11" y="11" width="10" height="10" fill="#FFB900" />
          </svg>
        </div>
      );
    case "adobe":
      return (
        <div className="absolute bottom-3 left-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-md border border-slate-100">
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-[#FF0000]">
            <path d="M14.7 3H22v18l-7.3-18zm-5.4 0H2v18l7.3-18zm2.7 6.4L17.7 21h-3.2l-2.4-5.6H8.3L12 9.4z" />
          </svg>
        </div>
      );
    case "rocket":
      return (
        <div className="absolute bottom-3 left-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-md border border-slate-100">
          <Rocket className="h-6 w-6 text-[#F59E42]" strokeWidth={1.5} />
        </div>
      );
    case "lightbulb":
      return (
        <div className="absolute bottom-3 left-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-md border border-slate-100">
          <Lightbulb className="h-6 w-6 text-[#F59E42]" strokeWidth={1.5} />
        </div>
      );
    case "handshake":
      return (
        <div className="absolute bottom-3 left-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-md border border-slate-100">
          <Handshake className="h-6 w-6 text-[#F59E42]" strokeWidth={1.5} />
        </div>
      );
    case "trophy":
      return (
        <div className="absolute bottom-3 left-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-md border border-slate-100">
          <Trophy className="h-6 w-6 text-[#F59E42]" strokeWidth={1.5} />
        </div>
      );
    default:
      return (
        <div className="absolute bottom-3 left-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-md border border-slate-100">
          <Users className="h-6 w-6 text-[#F59E42]" strokeWidth={1.5} />
        </div>
      );
  }
}
