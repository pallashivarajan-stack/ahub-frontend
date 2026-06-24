import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  CalendarDays,
  Clock,
  Gift,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import calendarIllustration from "@/assets/calender.png";
import { Calendar } from "@/components/ui/calendar";
import {
  calendarEvents,
  companies,
  deadlines,
  eventBadgeStyle,
  featuredInternships,
  getEventsForDate,
  getEventDates,
  heroBadges,
  legendItems,
  quickStats,
  recentActivity,
  type CalendarEvent,
  type EventType,
} from "@/data/internshipCalendar";
import { cn } from "@/lib/utils";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" as const },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

const defaultDate = new Date(2025, 5, 12);

export function InternshipCalendarPage() {
  const [selected, setSelected] = useState<Date>(defaultDate);
  const [month, setMonth] = useState<Date>(defaultDate);

  const selectedEvents = useMemo(() => getEventsForDate(selected), [selected]);
  const eventDates = useMemo(() => getEventDates(), []);

  const modifiers = useMemo(() => {
    const byType: Partial<Record<EventType, Date[]>> = {};
    calendarEvents.forEach((e) => {
      const d = new Date(e.date + "T12:00:00");
      if (!byType[e.type]) byType[e.type] = [];
      byType[e.type]?.push(d);
    });
    return { hasEvent: eventDates, ...byType };
  }, [eventDates]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FDF8F2] pb-16 pt-28 md:pb-24 md:pt-32 lg:pt-36">
      <BackgroundDecor />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <HeroSection />
        <DashboardGrid
          selected={selected}
          month={month}
          onSelect={setSelected}
          onMonthChange={setMonth}
          selectedEvents={selectedEvents}
          modifiers={modifiers}
        />
        <FeaturedInternships />
        <BottomSection />
      </div>
    </div>
  );
}

function BackgroundDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#F59E42]/10 blur-3xl" />
      <div className="absolute -right-24 top-64 h-72 w-72 rounded-full bg-[#FFE8D0]/80 blur-3xl" />
      <div className="absolute bottom-40 left-1/3 h-48 w-48 rounded-full bg-[#FFF4E8] blur-2xl" />
    </div>
  );
}

function HeroSection() {
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
          Internship Journey Calendar
        </h1>

        <p className="mt-4 max-w-xl text-base leading-relaxed text-[#6C5E5B]">
          Track internship applications, assessments, interviews, deadlines, and offers in one place.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {heroBadges.map((badge) => (
            <span
              key={badge.label}
              className="rounded-full border border-[#F59E42]/20 bg-white px-4 py-2 text-xs font-semibold text-[#2D1B1B] shadow-sm"
            >
              {badge.label}
            </span>
          ))}
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="w-full max-w-md overflow-hidden rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-[0_24px_60px_-30px_rgba(45,27,27,0.15)] backdrop-blur-sm md:p-8">
          <img
            src={calendarIllustration}
            alt="Internship calendar illustration"
            className="mx-auto w-full max-w-[340px] object-contain drop-shadow-sm"
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
}: {
  selected: Date;
  month: Date;
  onSelect: (d: Date) => void;
  onMonthChange: (d: Date) => void;
  selectedEvents: CalendarEvent[];
  modifiers: Record<string, Date[]>;
}) {
  return (
    <motion.div {...fadeUp} className="mt-12 grid gap-6 lg:grid-cols-[65%_35%]">
      <CalendarCard
        selected={selected}
        month={month}
        onSelect={onSelect}
        onMonthChange={onMonthChange}
        selectedEvents={selectedEvents}
        modifiers={modifiers}
      />
      <TodaySchedule events={selectedEvents.length ? selectedEvents : calendarEvents.filter((e) => e.date === "2025-06-12")} />
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
  selectedEvents: CalendarEvent[];
  modifiers: Record<string, Date[]>;
}) {
  return (
    <div className="rounded-[32px] bg-white p-6 shadow-[0_20px_60px_-30px_rgba(45,27,27,0.12)] md:p-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_220px]">
        <div>
          <Calendar
            mode="single"
            selected={selected}
            onSelect={(d) => d && onSelect(d)}
            month={month}
            onMonthChange={onMonthChange}
            modifiers={modifiers}
            modifiersClassNames={{
              hasEvent: "relative after:absolute after:bottom-1 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-[#F59E42]",
              selected: "!bg-[#F59E42] !text-white rounded-full",
            }}
            className="w-full [--cell-size:2.75rem] [&_.rdp-month_caption]:text-lg [&_.rdp-month_caption]:font-[800] [&_.rdp-month_caption]:text-[#2D1B1B] [&_[data-selected-single=true]]:bg-[#F59E42] [&_[data-selected-single=true]]:text-white [&_[data-selected-single=true]]:rounded-full"
          />

          <div className="mt-6 flex flex-wrap gap-4 border-t border-[#F5F0EB] pt-5">
            {legendItems.map((item) => (
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
          <p className="text-sm text-[#6C5E5B]">
            {selected.toLocaleDateString("en-US", { weekday: "long" })}
          </p>

          <div className="mt-5 space-y-3">
            {selectedEvents.length === 0 ? (
              <p className="text-xs text-[#B0A8A4]">No events on this date.</p>
            ) : (
              selectedEvents.map((event) => {
                const company = companies[event.companyId];
                return (
                  <div key={event.id} className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
                    {company?.logo ? (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FFF4E8] p-1">
                        <img src={company.logo} alt="" className="max-h-full max-w-full object-contain" />
                      </div>
                    ) : null}
                    <div className="min-w-0">
                      <p className="truncate text-xs font-[800] text-[#2D1B1B]">{company?.name}</p>
                      <p className="text-[11px] text-[#6C5E5B]">{event.title}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TodaySchedule({ events }: { events: CalendarEvent[] }) {
  return (
    <div className="rounded-[32px] bg-white p-6 shadow-[0_20px_60px_-30px_rgba(45,27,27,0.12)] md:p-7">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-[800] text-[#2D1B1B]">Today&apos;s Schedule</h2>
        <span className="text-xs font-medium text-[#F59E42]">View all</span>
      </div>

      <div className="mt-5 space-y-4">
        {events.slice(0, 4).map((event) => (
          <ScheduleEventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

function StartupLogoBanner({ logo, name, size = "md" }: { logo: string; name: string; size?: "sm" | "md" | "lg" }) {
  const heights = { sm: "h-20", md: "h-28", lg: "h-36" };
  const logoSizes = { sm: "max-h-10", md: "max-h-14", lg: "max-h-20" };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFF4E8] via-[#FFF8F3] to-[#FFE8D0]",
        heights[size],
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,66,0.12),transparent_55%)]" />
      <img src={logo} alt={name} className={cn("relative z-10 object-contain", logoSizes[size], size === "lg" ? "max-w-[180px]" : "max-w-[120px]")} />
    </div>
  );
}

function ScheduleEventCard({ event }: { event: CalendarEvent }) {
  const company = companies[event.companyId];
  if (!company) return null;

  return (
    <article className="group overflow-hidden rounded-[20px] border border-[#F5F0EB] bg-white transition-all hover:border-[#F59E42]/20 hover:shadow-md">
      <StartupLogoBanner logo={company.logo} name={company.name} size="sm" />
      <div className="p-4">
        <p className="text-sm font-[800] text-[#2D1B1B]">{company.name}</p>
        <p className="text-xs text-[#6C5E5B]">{company.role}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className={cn("rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase", eventBadgeStyle(event.type))}>
            {event.type === "interview" ? "Interview" : event.type === "assessment" ? "Assessment" : event.title}
          </span>
          {event.time && (
            <span className="flex items-center gap-1 text-xs text-[#6C5E5B]">
              <Clock className="h-3 w-3" />
              {event.time}
            </span>
          )}
        </div>
        <span
          className={cn(
            "mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold",
            event.status === "completed" ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-[#FFF4E8] text-[#F59E42]",
          )}
        >
          {event.status === "completed" ? "Completed" : "Upcoming"}
        </span>
      </div>
    </article>
  );
}

function FeaturedInternships() {
  return (
    <motion.div {...fadeUp} className="mt-12">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-[800] text-[#2D1B1B] md:text-2xl">Featured Internship Applications</h2>
          <p className="mt-1 text-sm text-[#6C5E5B]">Active roles at AHUB portfolio startups</p>
        </div>
        <span className="text-xs font-medium text-[#F59E42]">View all</span>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {featuredInternships.map((company, index) => (
          <FeaturedCard key={company.id} company={company} progress={[72, 58, 85][index] ?? 65} />
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>
    </motion.div>
  );
}

function FeaturedCard({
  company,
  progress,
}: {
  company: (typeof featuredInternships)[number];
  progress: number;
}) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-[28px] bg-white shadow-[0_16px_50px_-24px_rgba(45,27,27,0.12)] transition-shadow hover:shadow-[0_24px_60px_-20px_rgba(245,158,66,0.22)]"
    >
      <div className="relative">
        <StartupLogoBanner logo={company.logo} name={company.name} size="lg" />
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase text-[#F59E42] shadow-sm">
          In Progress
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-[800] text-[#2D1B1B]">{company.name}</h3>
        <p className="mt-1 text-sm text-[#6C5E5B]">{company.role}</p>
        <p className="mt-1 text-xs text-[#B0A8A4]">{company.duration}</p>
        <div className="mt-4">
          <div className="flex justify-between text-[10px] font-medium text-[#6C5E5B]">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[#F5F0EB]">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-[#F59E42] to-[#FF8C42]"
            />
          </div>
        </div>
        <button
          type="button"
          className="mt-5 w-full rounded-full border-2 border-[#F59E42] py-2.5 text-sm font-semibold text-[#F59E42] transition-all group-hover:bg-[#F59E42] group-hover:text-white"
        >
          View Details
        </button>
      </div>
    </motion.article>
  );
}

function StatCard({
  stat,
  index,
}: {
  stat: (typeof quickStats)[number];
  index: number;
}) {
  const icons = {
    applications: Briefcase,
    deadlines: Clock,
    interviews: Users,
    offers: Gift,
  };
  const Icon = icons[stat.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="rounded-[24px] bg-gradient-to-br from-white to-[#FFF8F3] p-5 shadow-[0_12px_40px_-24px_rgba(45,27,27,0.1)]"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF4E8] text-[#F59E42]">
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-4 font-display text-3xl font-[800] tabular-nums text-[#2D1B1B]">{stat.value}</p>
      <p className="mt-1 text-xs font-medium text-[#6C5E5B]">{stat.label}</p>
    </motion.div>
  );
}

function BottomSection() {
  return (
    <motion.div {...fadeUp} className="mt-12 grid gap-6 lg:grid-cols-2">
      <div className="rounded-[32px] bg-white p-6 shadow-[0_20px_60px_-30px_rgba(45,27,27,0.12)] md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-[800] text-[#2D1B1B]">Upcoming Deadlines</h2>
          <span className="text-xs font-medium text-[#F59E42]">View all</span>
        </div>
        <div className="space-y-4">
          {deadlines.map((item) => {
            const company = companies[item.companyId];
            if (!company) return null;
            return (
              <div
                key={item.companyId + item.title}
                className="flex items-center gap-4 rounded-[20px] border border-[#F5F0EB] p-4 transition-colors hover:border-[#F59E42]/20 hover:bg-[#FFF8F3]"
              >
                <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-[#FFF4E8] text-center">
                  <span className="text-[10px] font-bold uppercase text-[#F59E42]">{item.dateLabel.split(" ")[0]}</span>
                  <span className="text-lg font-[800] leading-none text-[#2D1B1B]">{item.dateLabel.split(" ")[1]}</span>
                </div>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white p-1.5 shadow-sm">
                  <img src={company.logo} alt="" className="max-h-full max-w-full object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-[800] text-[#2D1B1B]">{company.name}</p>
                  <p className="text-xs text-[#6C5E5B]">{item.title}</p>
                  <p className="text-[11px] text-[#B0A8A4]">{item.type}</p>
                </div>
                <div className="shrink-0 text-right">
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                      item.priority === "high" ? "bg-[#FEE2E2] text-[#DC2626]" : "bg-[#FFF4E8] text-[#F59E42]",
                    )}
                  >
                    {item.priority === "high" ? "High" : "Medium"}
                  </span>
                  <p className="mt-1 text-xs font-semibold text-[#6C5E5B]">{item.daysLeft} days left</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-[32px] bg-white p-6 shadow-[0_20px_60px_-30px_rgba(45,27,27,0.12)] md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-[800] text-[#2D1B1B]">Recent Activity</h2>
          <Sparkles className="h-4 w-4 text-[#F59E42]" />
        </div>
        <div className="space-y-4">
          {recentActivity.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", item.color)}>
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#2D1B1B]">{item.text}</p>
                <p className="mt-0.5 text-xs text-[#B0A8A4]">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
