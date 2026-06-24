import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  MapPin,
  Mic2,
  Sparkles,
  Ticket,
  TrendingUp,
  Users,
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

const defaultDate = new Date(2023, 9, 15);

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
    const key = selected.toISOString().slice(0, 10);
    return data.ecosystemEvents.filter((e: any) => e.date === key);
  }, [selected, data.ecosystemEvents]);

  const eventDates = useMemo(() => {
    return data.ecosystemEvents.map((e: any) => new Date(e.date + "T12:00:00"));
  }, [data.ecosystemEvents]);

  const modifiers = useMemo(() => {
    const byType: Partial<Record<EcosystemEventType, Date[]>> = {};
    data.ecosystemEvents.forEach((e: any) => {
      const d = new Date(e.date + "T12:00:00");
      if (!byType[e.type as EcosystemEventType]) byType[e.type as EcosystemEventType] = [];
      byType[e.type as EcosystemEventType]?.push(d);
    });
    return { hasEvent: eventDates, ...byType };
  }, [eventDates, data.ecosystemEvents]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FDF8F2] pb-16 pt-28 md:pb-24 md:pt-32 lg:pt-36">
      <BackgroundDecor />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <HeroSection badges={data.heroBadges} />
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

      <div className="flex items-center justify-center">
        <div className="w-full max-w-md overflow-hidden rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-[0_24px_60px_-30px_rgba(45,27,27,0.15)] md:p-8">
          <img
            src={resolveLegacyAsset("/src/assets/calender.png")}
            alt="Event calendar illustration"
            className="mx-auto w-full max-w-[340px] object-contain"
          />
        </div>
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
  const upcoming = allEvents.filter((e: any) => e.date >= "2023-09-01").slice(0, 4);

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

        <div className="rounded-[20px] bg-[#FFF8F3] p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#F59E42]">Selected Date</p>
          <p className="mt-2 text-lg font-[800] text-[#2D1B1B]">
            {selected.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
          <p className="text-sm text-[#6C5E5B]">{selected.toLocaleDateString("en-US", { weekday: "long" })}</p>

          <div className="mt-5 space-y-3">
            {selectedEvents.length === 0 ? (
              <p className="text-xs text-[#B0A8A4]">No events on this date.</p>
            ) : (
              selectedEvents.map((event) => (
                <div key={event.id} className="overflow-hidden rounded-xl bg-white shadow-sm">
                  <img src={event.image} alt="" className="h-16 w-full object-cover" />
                  <div className="p-3">
                    <p className="text-xs font-[800] text-[#2D1B1B]">{event.title}</p>
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
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-[800] text-[#2D1B1B]">Upcoming Events</h2>
        <span className="text-xs font-medium text-[#F59E42]">View all</span>
      </div>

      <div className="mt-5 space-y-4">
        {events.slice(0, 4).map((event) => (
          <article
            key={event.id}
            className="group overflow-hidden rounded-[20px] border border-[#F5F0EB] bg-white transition-all hover:border-[#F59E42]/20 hover:shadow-md"
          >
            <img
              src={event.image}
              alt={event.title}
              className="h-24 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-[800] text-[#2D1B1B]">{event.title}</p>
                  <p className="mt-1 text-xs text-[#6C5E5B]">{event.dayLabel} · {event.time}</p>
                </div>
                <span className="shrink-0 rounded-full bg-[#DCFCE7] px-2 py-0.5 text-[10px] font-bold text-[#16A34A]">
                  {event.price}
                </span>
              </div>
              <span className={cn("mt-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase", eventTypeBadge(event.type))}>
                {event.tag}
              </span>
            </div>
          </article>
        ))}
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
          <p className="mt-1 text-sm text-[#6C5E5B]">Highlights from October 2023</p>
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
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase text-[#F59E42] shadow-sm">
                {event.dayLabel}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-[800] text-[#2D1B1B]">{event.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-[#6C5E5B]">{event.description}</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-[#6C5E5B]">
                <Clock className="h-3.5 w-3.5 text-[#F59E42]" />
                {event.time}
              </div>
              <button
                type="button"
                className="mt-5 w-full rounded-full border-2 border-[#F59E42] py-2.5 text-sm font-semibold text-[#F59E42] transition-all group-hover:bg-[#F59E42] group-hover:text-white"
              >
                View Details
              </button>
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
          <p className="mt-1 text-sm text-[#6C5E5B]">September – October 2023 · {events.length} events</p>
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
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.05 }}
      className="group flex flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_12px_40px_-24px_rgba(45,27,27,0.1)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(245,158,66,0.18)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-lg bg-[#F59E42] px-2.5 py-1 text-[10px] font-bold uppercase text-white">
          {event.dayLabel}
        </span>
        <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-bold text-[#16A34A]">
          {event.price}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-[800] leading-tight text-[#2D1B1B]">{event.title}</h3>
          <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase", eventTypeBadge(event.type))}>
            {event.tag}
          </span>
        </div>

        <p className="mt-2 flex items-center gap-1.5 text-xs text-[#6C5E5B]">
          <Clock className="h-3 w-3 text-[#F59E42]" />
          {event.time}
        </p>
        <p className="mt-1 flex items-start gap-1.5 text-xs leading-relaxed text-[#6C5E5B]">
          <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-[#F59E42]" />
          <span className="line-clamp-2">{event.venue}</span>
        </p>
        <p className="mt-3 line-clamp-2 flex-1 text-xs leading-relaxed text-[#78716C]">{event.description}</p>

        <button
          type="button"
          className="mt-4 inline-flex items-center gap-1 self-start rounded-full border-2 border-[#F59E42] px-4 py-1.5 text-xs font-semibold text-[#F59E42] transition-all group-hover:bg-[#F59E42] group-hover:text-white"
        >
          View Details
          <Users className="h-3 w-3" />
        </button>
      </div>
    </motion.article>
  );
}
