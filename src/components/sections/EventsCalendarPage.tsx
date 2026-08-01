import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  ExternalLink,
  Instagram,
  MapPin,
  Mic2,
  Sparkles,
  Ticket,
  TrendingUp, 
  Users 
} from "lucide-react";
import { resolveLegacyAsset } from "@/lib/assets";
import { Calendar } from "@/components/ui/calendar";
import {
  ecosystemEvents,
  eventStats,
  eventTypeBadge,
  featuredEvents,
  heroBadges,
  legendItems,
  type EcosystemEvent,
  type EcosystemEventType,
} from "@/data/eventsCalendar";
import { cn } from "@/lib/utils";
import { usePublicEventsCalendar } from "@/services/usePublicContent";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" as const },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

function formatDateKey(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseEventDate(event: EcosystemEvent) {
  const dateStr = event.date || "";
  if (dateStr) {
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const year = parts[0];
      const monthNum = parseInt(parts[1], 10);
      const dayNum = parseInt(parts[2], 10);
      
      const realMonths = [
        "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
      ];
      const month = realMonths[monthNum - 1] || "JULY";
      return { day: dayNum, month, year };
    }
  }
  return { day: "11", month: "JULY", year: "2026" };
}

const defaultDate = new Date(2026, 6, 11);

export function EventsCalendarPage() {
  const { data } = usePublicEventsCalendar({
    ecosystemEvents,
    eventStats,
    featuredEvents,
    heroBadges,
    legendItems,
  });

  const [selected, setSelected] = useState<Date>(defaultDate);
  const [month, setMonth] = useState<Date>(defaultDate);

  const selectedEvents = useMemo(() => {
    const key = formatDateKey(selected);
    return data.ecosystemEvents.filter((e: any) => e.date === key);
  }, [selected, data.ecosystemEvents]);

  const eventDates = useMemo(() => {
    return data.ecosystemEvents.map((e: any) => {
      const [y, m, d] = e.date.split("-").map(Number);
      return new Date(y, m - 1, d);
    });
  }, [data.ecosystemEvents]);

  const modifiers = useMemo(() => {
    const byType: Partial<Record<EcosystemEventType, Date[]>> = {};
    data.ecosystemEvents.forEach((e: any) => {
      const [y, m, d] = e.date.split("-").map(Number);
      const dateObj = new Date(y, m - 1, d);
      if (!byType[e.type as EcosystemEventType]) byType[e.type as EcosystemEventType] = [];
      byType[e.type as EcosystemEventType]?.push(dateObj);
    });
    return { hasEvent: eventDates, ...byType };
  }, [eventDates, data.ecosystemEvents]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FDF8F2] pb-16 pt-28 md:pb-24 md:pt-32 lg:pt-36">
      <BackgroundDecor />
      <div className="relative site-container-wide">
        <HeroSection badges={data.heroBadges} />
      </div>

      <div className="relative site-container-wide">
        <DashboardGrid
          selected={selected}
          month={month}
          onSelect={setSelected}
          onMonthChange={setMonth}
          selectedEvents={selectedEvents}
          modifiers={modifiers}
          allEvents={data.ecosystemEvents}
          legendItems={data.legendItems}
        />
        <FeaturedEvents events={data.featuredEvents} stats={data.eventStats} />
        <AllEventsGrid events={data.ecosystemEvents} />
      </div>
    </div>
  );
}

function BackgroundDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#F59E42]/10 blur-3xl" />
      <div className="absolute -right-24 top-64 h-72 w-72 rounded-full bg-[#FFE8D0]/80 blur-3xl" />
    </div>
  );
}

function HeroSection({ badges }: { badges: any }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
    >
      <div>
        <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-gradient-to-br from-[#F59E42] to-[#FF8C42] shadow-[0_16px_40px_-12px_rgba(245,158,66,0.55)]">
          <CalendarDays className="h-10 w-10 text-white" strokeWidth={1.5} />
        </div>

        <h1 className="mt-6 font-display text-4xl font-[800] leading-[1.08] tracking-tight text-[#2D1B1B] sm:text-5xl lg:text-[56px]">
          Event Calendar
        </h1>

        <p className="mt-4 max-w-xl text-base leading-relaxed text-[#6C5E5B]">
          Discover workshops, hackathons, seminars, and startup ecosystem events at Andhra University.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {badges.map((badge: any) => (
            <span
              key={badge.label}
              className="rounded-full border border-[#F59E42]/20 bg-white px-4 py-2 text-xs font-semibold text-[#2D1B1B] shadow-sm"
            >
              {badge.label}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center -mt-6 lg:-mt-16">
        <img
          src={resolveLegacyAsset("/src/assets/calender.png")}
          alt="Event calendar illustration"
          className="mx-auto w-full max-w-[460px] object-contain"
        />
      </div>
    </motion.section>
  );
}

function DashboardGrid({
  selected,
  month,
  onSelect,
  onMonthChange,
  selectedEvents,
  modifiers,
  allEvents,
  legendItems,
}: {
  selected: Date;
  month: Date;
  onSelect: (d: Date) => void;
  onMonthChange: (d: Date) => void;
  selectedEvents: EcosystemEvent[];
  modifiers: Record<string, Date[]>;
  allEvents: any[];
  legendItems: any[];
}) {
  const upcoming = allEvents.slice(0, 4);

  return (
    <motion.div {...fadeUp} className="mt-12 grid gap-6 lg:grid-cols-[65%_35%]">
      <CalendarCard
        selected={selected}
        month={month}
        onSelect={onSelect}
        onMonthChange={onMonthChange}
        selectedEvents={selectedEvents}
        modifiers={modifiers}
        legendItems={legendItems}
      />
      <UpcomingPanel events={selectedEvents.length ? selectedEvents : upcoming} />
    </motion.div>
  );
}

function CalendarCard({
  selected,
  month,
  onSelect,
  onMonthChange,
  selectedEvents,
  modifiers,
  legendItems,
}: {
  selected: Date;
  month: Date;
  onSelect: (d: Date) => void;
  onMonthChange: (d: Date) => void;
  selectedEvents: EcosystemEvent[];
  modifiers: Record<string, Date[]>;
  legendItems: any[];
}) {
  return (
    <div className="rounded-[32px] bg-white p-6 shadow-[0_20px_60px_-30px_rgba(45,27,27,0.12)] md:p-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_240px]">
        <div>
          <Calendar
            mode="single"
            selected={selected}
            onSelect={(d) => d && onSelect(d)}
            month={month}
            onMonthChange={onMonthChange}
            modifiers={modifiers}
            modifiersClassNames={{
              hasEvent:
                "relative after:absolute after:bottom-1 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-[#F59E42]",
            }}
            className="w-full [--cell-size:2.75rem] [&_.rdp-month_caption]:text-lg [&_.rdp-month_caption]:font-[800] [&_.rdp-month_caption]:text-[#2D1B1B] [&_[data-selected-single=true]]:rounded-full [&_[data-selected-single=true]]:bg-[#F59E42] [&_[data-selected-single=true]]:text-white"
          />

          <div className="mt-6 flex flex-wrap gap-4 border-t border-[#F5F0EB] pt-5">
            {legendItems.map((item: any) => (
              <div key={item.type} className="flex items-center gap-2 text-xs text-[#6C5E5B]">
                <span className={cn("h-2.5 w-2.5 rounded-full", item.color)} />
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[20px] bg-[#FFF8F3] p-5 flex flex-col">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#F59E42]">Selected Date</p>
          <p className="mt-2 text-lg font-[800] text-[#2D1B1B]">
            {selected.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
          <p className="text-sm text-[#6C5E5B]">{selected.toLocaleDateString("en-US", { weekday: "long" })}</p>

          <div className="mt-5 flex-1 space-y-3 overflow-y-auto max-h-[380px]">
            {selectedEvents.length === 0 ? (
              <p className="text-xs text-[#B0A8A4]">No events on this date.</p>
            ) : (
              selectedEvents.map((event) => (
                <div key={event.id} className="overflow-hidden rounded-xl bg-white shadow-sm border border-[#F5F0EB]">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#FFF8F3] flex items-center justify-center">
                    <img src={event.image} alt={event.title} className="h-full w-full object-contain" />
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-[800] text-[#2D1B1B]">{event.title}</p>
                    <p className="text-[11px] font-semibold text-[#F59E42] mt-0.5">{event.displayDate || event.date}</p>
                    <p className="text-[11px] text-[#6C5E5B]">{event.time}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function UpcomingPanel({ events }: { events: EcosystemEvent[] }) {
  return (
    <div className="rounded-[32px] bg-white p-6 shadow-[0_20px_60px_-30px_rgba(45,27,27,0.12)] md:p-7">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-[800] text-[#2D1B1B]">Upcoming Events</h2>
        <span className="text-xs font-medium text-[#F59E42]">View all</span>
      </div>

      <div className="space-y-6">
        {events.slice(0, 2).map((event) => {
          const { day, month, year } = parseEventDate(event);
          return (
            <article
              key={event.id}
              className="group overflow-hidden rounded-[24px] border border-[#F5F0EB] bg-white transition-all hover:shadow-lg flex flex-col"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#FFF8F3] flex items-center justify-center">
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col flex-1 bg-white">
                <div className="flex gap-4">
                  {/* Editorial Date Block */}
                  <div className="flex flex-col items-center justify-start pt-1 shrink-0 w-16">
                    <span className="text-[36px] font-[900] leading-none text-[#F59E42]">{day}</span>
                    <span className="text-[12px] font-[900] tracking-[0.05em] text-[#F59E42] mt-1">{month}</span>
                    <span className="text-[14px] font-[700] text-[#1A1512] mt-0.5">{year}</span>
                  </div>

                  {/* Vertical line divider */}
                  <div className="w-px self-stretch bg-[#EDE8E3] shrink-0" />

                  {/* Badges + Title + Desc */}
                  <div className="flex-1 min-w-0">
                    <h3 className="mt-1 text-base font-[800] leading-snug text-[#1A1512] line-clamp-1">{event.title}</h3>
                    <p className="mt-1 text-xs text-[#6C5E5B] line-clamp-2 leading-relaxed">{event.description}</p>
                  </div>
                </div>

                {/* Location + Time row (light grey rounded block) */}
                <div className="mt-4 rounded-2xl bg-[#FFFBF8] border border-[#F5EDE6] p-3 grid grid-cols-2 gap-4">
                  {/* Location */}
                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-5 w-5 text-[#1A1512] mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#F59E42]">Location</p>
                      <p className="text-[11px] font-semibold text-[#3D3530] leading-tight mt-0.5 line-clamp-1">{event.venue}</p>
                    </div>
                  </div>
                  
                  {/* Vertical divider inside grid */}
                  <div className="flex items-start gap-2.5 border-l border-[#EDE8E3] pl-3">
                    <Clock className="h-5 w-5 text-[#1A1512] mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#F59E42]">Time</p>
                      <p className="text-[11px] font-semibold text-[#3D3530] leading-tight mt-0.5">{event.time}</p>
                    </div>
                  </div>
                </div>

                <div
                  className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] transition-opacity hover:opacity-95 self-start"
                >
                  <Instagram className="h-4.5 w-4.5 text-white" />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function FeaturedEvents({ events, stats }: { events: any; stats: any }) {
  const icons: Record<string, any> = { events: CalendarDays, month: Sparkles, workshops: Mic2, free: Ticket };

  return (
    <motion.div {...fadeUp} className="mt-12">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-[800] text-[#2D1B1B] md:text-2xl">Featured Events</h2>
          <p className="mt-1 text-sm text-[#6C5E5B]">Highlights from AHUB Ecosystem</p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {events.map((event: any, index: number) => (
          <motion.article
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -6 }}
            className="group overflow-hidden rounded-[28px] bg-white shadow-[0_16px_50px_-24px_rgba(45,27,27,0.12)] hover:shadow-[0_24px_60px_-20px_rgba(245,158,66,0.2)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[#FFF8F3] flex items-center justify-center">
              <img
                src={event.image}
                alt={event.title}
                className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-[#F59E42] px-3.5 py-1 text-xs font-extrabold text-white shadow-md">
                {event.displayDate || event.dayLabel}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-[800] text-[#2D1B1B]">{event.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-[#6C5E5B]">{event.description}</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-[#6C5E5B]">
                <Clock className="h-3.5 w-3.5 text-[#F59E42]" />
                {event.time}
              </div>
              {event.instagram ? (
                <a
                  href={event.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 block w-full text-center rounded-full border-2 border-[#F59E42] py-2.5 text-sm font-semibold text-[#F59E42] transition-all group-hover:bg-[#F59E42] group-hover:text-white"
                >
                  View Details
                </a>
              ) : (
                <button
                  type="button"
                  className="mt-5 w-full rounded-full border-2 border-[#F59E42] py-2.5 text-sm font-semibold text-[#F59E42] transition-all group-hover:bg-[#F59E42] group-hover:text-white"
                >
                  View Details
                </button>
              )}
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat: any, index: number) => {
          const Icon = icons[stat.icon];
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="rounded-[24px] bg-gradient-to-br from-white to-[#FFF8F3] p-5 shadow-[0_12px_40px_-24px_rgba(45,27,27,0.1)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF4E8] text-[#F59E42]">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-4 font-display text-3xl font-[800] text-[#2D1B1B]">{stat.value}</p>
              <p className="mt-1 text-xs font-medium text-[#6C5E5B]">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function AllEventsGrid({ events }: { events: any }) {
  return (
    <motion.div {...fadeUp} className="mt-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-[800] text-[#2D1B1B]">All Events</h2>
          <p className="mt-1 text-sm text-[#6C5E5B]">September 2023 – July 2026 · {events.length} events</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-[#6C5E5B]">
          <TrendingUp className="h-3.5 w-3.5 text-[#F59E42]" />
          Latest ecosystem moments
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {events.map((event: any, index: number) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </div>
    </motion.div>
  );
}

function EventCard({ event, index }: { event: EcosystemEvent; index: number }) {
  const { day, month, year } = parseEventDate(event);
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.05 }}
      className="group flex flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_12px_40px_-24px_rgba(45,27,27,0.1)] transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#FFF8F3]">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="p-5 flex flex-col flex-1 bg-white">
        <div className="flex gap-4">
          {/* Editorial Date Block */}
          <div className="flex flex-col items-center justify-start pt-1 shrink-0 w-16">
            <span className="text-[36px] font-[900] leading-none text-[#F59E42]">{day}</span>
            <span className="text-[12px] font-[900] tracking-[0.05em] text-[#F59E42] mt-1">{month}</span>
            <span className="text-[14px] font-[700] text-[#1A1512] mt-0.5">{year}</span>
          </div>

          {/* Vertical line divider */}
          <div className="w-px self-stretch bg-[#EDE8E3] shrink-0" />

          {/* Badges + Title + Desc */}
          <div className="flex-1 min-w-0">
            <h3 className="mt-1 text-base font-[800] leading-snug text-[#1A1512] line-clamp-1">{event.title}</h3>
            <p className="mt-1 text-xs text-[#6C5E5B] line-clamp-2 leading-relaxed">{event.description}</p>
          </div>
        </div>

        {/* Location + Time row (light grey rounded block) */}
        <div className="mt-4 rounded-2xl bg-[#FFFBF8] border border-[#F5EDE6] p-3 grid grid-cols-2 gap-4">
          {/* Location */}
          <div className="flex items-start gap-2.5">
            <MapPin className="h-5 w-5 text-[#1A1512] mt-0.5 shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#F59E42]">Location</p>
              <p className="text-[11px] font-semibold text-[#3D3530] leading-tight mt-0.5 line-clamp-1">{event.venue}</p>
            </div>
          </div>
          
          {/* Vertical divider inside grid */}
          <div className="flex items-start gap-2.5 border-l border-[#EDE8E3] pl-3">
            <Clock className="h-5 w-5 text-[#1A1512] mt-0.5 shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#F59E42]">Time</p>
              <p className="text-[11px] font-semibold text-[#3D3530] leading-tight mt-0.5">{event.time}</p>
            </div>
          </div>
        </div>

        <div
          className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] transition-opacity hover:opacity-95 self-start"
        >
          <Instagram className="h-4.5 w-4.5 text-white" />
        </div>
      </div>
    </motion.article>
  );
}
