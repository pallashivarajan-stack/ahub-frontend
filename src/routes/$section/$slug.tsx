import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ExternalLink,
  Users,
} from "lucide-react";
import { InternalPageShell } from "@/components/layout/InternalPageShell";
import { LatestEvents } from "@/components/sections/LatestEvents";
import { institutions, partners, portfolio, visitors } from "@/data";

export const Route = createFileRoute("/$section/$slug")({
  component: SectionPage,
});

type RouteKey =
  | "ecosystem/mentors"
  | "ecosystem/investors"
  | "ecosystem/partners"
  | "ecosystem/vision-roadmap"
  | "ecosystem/infrastructure"
  | "ecosystem/board"
  | "ecosystem/team"
  | "ecosystem/seminar-hall-booking"
  | "programs/aspire"
  | "programs/associate"
  | "programs/pitch-to-us"
  | "programs/join-us"
  | "startups/startup-portfolio"
  | "startups/latest-events"
  | "startups/blog"
  | "startups/student-startup-recruitment"
  | "startups/startup-registration"
  | "events/calendar"
  | "events/case-studies"
  | "events/careers"
  | "events/student-visits"
  | "events/host-an-event"
  | "about/mentors"
  | "about/board"
  | "about/team"
  | "students/dashboard"
  | "students/internship-calendar"
  | "students/login";

type Profile = { name: string; role: string; org: string; bio: string; linkLabel?: string };
type TimelineItem = { date: string; title: string; body: string };
type Card = { title: string; body: string; meta?: string };
type Job = { title: string; type: string; location: string; body: string };

type PageDefinition =
  | { kind: "profiles"; eyebrow: string; title: string; summary: string; profiles: Profile[]; highlights: Card[] }
  | { kind: "logos"; eyebrow: string; title: string; summary: string; logos: string[]; highlights: Card[] }
  | { kind: "timeline"; eyebrow: string; title: string; summary: string; timeline: TimelineItem[]; highlights: Card[] }
  | { kind: "gallery"; eyebrow: string; title: string; summary: string; images: string[]; cards: Card[] }
  | { kind: "form"; eyebrow: string; title: string; summary: string; fields: string[]; cards: Card[]; buttonLabel: string }
  | { kind: "portfolio"; eyebrow: string; title: string; summary: string; cards: Card[] }
  | { kind: "events"; eyebrow: string; title: string; summary: string; cards: Card[] }
  | { kind: "blog"; eyebrow: string; title: string; summary: string; featured: Card; cards: Card[] }
  | { kind: "jobs"; eyebrow: string; title: string; summary: string; jobs: Job[]; cards: Card[] }
  | { kind: "dashboard"; eyebrow: string; title: string; summary: string; cards: Card[]; timeline: TimelineItem[] }
  | { kind: "calendar"; eyebrow: string; title: string; summary: string; timeline: TimelineItem[]; cards: Card[] }
  | { kind: "login"; eyebrow: string; title: string; summary: string; roles: Card[]; buttonLabel: string };

const pageMap: Record<string, PageDefinition> = {
  "ecosystem/mentors": {
    kind: "profiles",
    eyebrow: "Ecosystem / Mentors",
    title: "Mentors who compound founder confidence",
    summary: "Industry operators, investors, and domain specialists guiding founders through product, capital, and scale decisions.",
    profiles: [
      { name: "Dr. R. A. Mashelkar", role: "Deep Tech Mentor", org: "Innovation Council", bio: "Materials, scale-up strategy, and global innovation systems.", linkLabel: "LinkedIn" },
      { name: "Nandan Nilekani", role: "Platform Mentor", org: "Digital Public Infrastructure", bio: "Systems thinking for resilient, large-scale product ecosystems.", linkLabel: "Profile" },
      { name: "Sridhar Vembu", role: "Operations Mentor", org: "Zoho Corporation", bio: "Founder discipline, product depth, and long-horizon execution.", linkLabel: "LinkedIn" },
      { name: "Falguni Nayar", role: "Brand Mentor", org: "Nykaa", bio: "Consumer growth, premium positioning, and category building.", linkLabel: "Bio" },
    ],
    highlights: [
      { title: "Mentorship tracks", body: "Founder office hours, technical reviews, and investor readiness clinics.", meta: "Weekly" },
      { title: "Domain coverage", body: "AI, climate, consumer, health tech, SaaS, manufacturing, and public systems.", meta: "8 sectors" },
      { title: "Office hours", body: "Structured 1:1 and small-group sessions for active cohorts and alumni.", meta: "By invitation" },
    ],
  },
  "ecosystem/investors": {
    kind: "profiles",
    eyebrow: "Ecosystem / Investors",
    title: "A funding network built around conviction and follow-through",
    summary: "Venture firms, angel investors, and strategic capital partners supporting founders from pre-seed momentum to growth-stage readiness.",
    profiles: [
      { name: "Sequoia India", role: "Venture Partner", org: "Growth Capital", bio: "Long-horizon bets on category-defining founders." },
      { name: "Peak XV", role: "Platform Partner", org: "Venture Capital", bio: "Operator support across fundraising, hiring, and scaling." },
      { name: "Blume Ventures", role: "Seed Partner", org: "Seed & Pre-A", bio: "Early conviction capital for emerging founders." },
      { name: "AHUB Angel Circle", role: "Angel Syndicate", org: "Network Capital", bio: "Founders, operators, and alumni backing new ventures." },
    ],
    highlights: [
      { title: "Capital pathways", body: "Warm intros, syndicate rooms, and cohort demo-day access.", meta: "Structured" },
      { title: "Support ecosystem", body: "Pitch prep, due diligence coaching, and investor matching.", meta: "End-to-end" },
      { title: "Follow-on potential", body: "Connections to strategic and institutional capital beyond seed.", meta: "Series ready" },
    ],
  },
  "ecosystem/partners": {
    kind: "logos",
    eyebrow: "Ecosystem / Partners",
    title: "Institutional and corporate partners powering the platform",
    summary: "A partner ecosystem spanning universities, corporations, public institutions, and innovation networks.",
    logos: [...partners, ...institutions.map((item) => item.name)],
    highlights: [
      { title: "University collaborations", body: "Research parks, startup cells, and innovation labs connected into one platform." },
      { title: "Corporate enablement", body: "Pilot programs, procurement pathways, and enterprise distribution support." },
      { title: "Visibility loop", body: "Partner logos and ecosystem signals presented in a clean, modern grid." },
    ],
  },
  "ecosystem/vision-roadmap": {
    kind: "timeline",
    eyebrow: "Ecosystem / Vision & Roadmap",
    title: "A clear roadmap from incubation to ecosystem leadership",
    summary: "Mission, growth milestones, and strategic priorities designed for long-term institutional impact.",
    timeline: [
      { date: "Mission", title: "Enable founders with structure", body: "Deliver incubation that combines mentorship, infrastructure, and distribution." },
      { date: "Phase 01", title: "Strengthen founder support", body: "Deepen mentor density, startup services, and operational guidance." },
      { date: "Phase 02", title: "Expand capital access", body: "Broaden investor participation, syndicates, and follow-on pathways." },
      { date: "Phase 03", title: "Scale ecosystem reach", body: "Grow partnerships, public visibility, and innovation infrastructure." },
    ],
    highlights: [
      { title: "Vision", body: "To be a trusted institutional engine for startup creation and growth." },
      { title: "Roadmap", body: "Built around founder outcomes, partner trust, and measurable impact." },
      { title: "Innovation goals", body: "High-quality venture creation, policy alignment, and global credibility." },
    ],
  },
  "ecosystem/infrastructure": {
    kind: "gallery",
    eyebrow: "Ecosystem / Infrastructure",
    title: "Spaces built for research, collaboration, and delivery",
    summary: "Innovation labs, coworking zones, event halls, and incubation rooms designed for serious building.",
    images: ["/src/assets/inst-1.jpg", "/src/assets/inst-2.jpg", "/src/assets/inst-3.jpg", "/src/assets/inst-4.jpg", "/src/assets/inst-5.jpg", "/src/assets/inst-6.jpg"],
    cards: [
      { title: "Innovation labs", body: "Cross-functional rooms for product, AI, and deep-tech exploration." },
      { title: "Incubation rooms", body: "Quiet, focused spaces for founder mentoring and review sessions." },
      { title: "Event halls", body: "Professional venues for demo days, talks, and partner gatherings." },
      { title: "Research facilities", body: "Infrastructure for prototyping, testing, and knowledge exchange." },
    ],
  },
  "ecosystem/board": {
    kind: "profiles",
    eyebrow: "Ecosystem / Board",
    title: "Leadership with institutional perspective",
    summary: "A board profile section for strategic governance, leadership vision, and program confidence.",
    profiles: [
      { name: "Prof. Anil Kumar", role: "Chair", org: "Academic Leadership", bio: "Strategic governance and institutional partnership alignment." },
      { name: "Ms. Priya Menon", role: "Member", org: "Corporate Strategy", bio: "Growth systems, ecosystem partnerships, and long-term positioning." },
      { name: "Mr. Rajiv Menon", role: "Member", org: "Innovation Policy", bio: "Public-private collaboration and ecosystem enablement." },
      { name: "Dr. Meera Iyer", role: "Advisor", org: "Research & Tech", bio: "Research translation, startup support, and impact execution." },
    ],
    highlights: [
      { title: "Governance", body: "Clear oversight with a founder-first operating mindset." },
      { title: "Leadership vision", body: "Institutional discipline paired with startup velocity." },
      { title: "Organization detail", body: "Designed for cross-sector trust and ecosystem accountability." },
    ],
  },
  "ecosystem/team": {
    kind: "profiles",
    eyebrow: "Ecosystem / Team",
    title: "The AHUB core team behind the ecosystem",
    summary: "Operations, coordination, partnerships, and student leadership working together with premium execution.",
    profiles: [
      { name: "Operations Team", role: "Core Operations", org: "AHUB", bio: "Running the day-to-day founder experience with care and speed." },
      { name: "Partnerships Team", role: "Ecosystem Growth", org: "AHUB", bio: "Managing institutional collaborations and partner activations." },
      { name: "Program Team", role: "Cohort Support", org: "AHUB", bio: "Supporting startup journeys from onboarding to graduation." },
      { name: "Student Leadership", role: "Community Ambassadors", org: "AHUB", bio: "Campus-facing leadership and engagement across the network." },
    ],
    highlights: [
      { title: "Modern coordination", body: "A compact team structure with clear ownership and response paths." },
      { title: "Social links", body: "Team cards can anchor to LinkedIn and public profiles." },
      { title: "Community face", body: "Student and core leadership showcased in a balanced layout." },
    ],
  },
  "ecosystem/seminar-hall-booking": {
    kind: "form",
    eyebrow: "Ecosystem / Seminar Hall Booking",
    title: "Book the seminar hall with a clean professional flow",
    summary: "Date selection, capacity details, time slots, and support requests in one dashboard-like booking view.",
    fields: ["Event name", "Request date", "Preferred time slot", "Expected capacity", "Technical support needed"],
    cards: [
      { title: "Capacity", body: "Suitable for talks, workshops, and founder showcases.", meta: "Up to 150" },
      { title: "Support", body: "AV support, seating arrangement, and hosting assistance.", meta: "On request" },
      { title: "Booking note", body: "Requests are reviewed for ecosystem relevance and availability." },
    ],
    buttonLabel: "Request booking",
  },
  "programs/aspire": {
    kind: "timeline",
    eyebrow: "Programs / Aspire",
    title: "Pre-incubation for ambitious student founders",
    summary: "A structured path for idea validation, startup training, and early innovation support.",
    timeline: [
      { date: "Stage 01", title: "Idea screening", body: "Assess problem quality, founder readiness, and early traction signals." },
      { date: "Stage 02", title: "Training sprint", body: "Workshops on customer discovery, product framing, and business models." },
      { date: "Stage 03", title: "Validation support", body: "Mentor reviews, prototype checkpoints, and pitch practice." },
    ],
    highlights: [
      { title: "Program benefits", body: "Startup education, early mentorship, and community support." },
      { title: "Founder readiness", body: "Designed for students building their first venture." },
      { title: "Cohort support", body: "Clear milestones with premium program structure." },
    ],
  },
  "programs/associate": {
    kind: "profiles",
    eyebrow: "Programs / Associate",
    title: "Collaboration models for deeper ecosystem engagement",
    summary: "Startup collaboration opportunities, partner models, and active support pathways for growing teams.",
    profiles: [
      { name: "Startup Collaboration", role: "Programs", org: "AHUB", bio: "Shared learning, ecosystem access, and structured engagement." },
      { name: "Corporate Collaboration", role: "Partnerships", org: "AHUB", bio: "Pilot opportunities and co-creation with partner organizations." },
      { name: "Research Collaboration", role: "Innovation", org: "AHUB", bio: "Academic and applied problem-solving partnerships." },
      { name: "Community Collaboration", role: "Network", org: "AHUB", bio: "A broader founder community with ongoing touchpoints." },
    ],
    highlights: [
      { title: "Partnership models", body: "Flexible entry points for startups, teams, and institutions." },
      { title: "Engagement", body: "A deeper operating layer for committed collaborators." },
      { title: "Ecosystem fit", body: "Designed to feel premium, useful, and easy to navigate." },
    ],
  },
  "programs/pitch-to-us": {
    kind: "form",
    eyebrow: "Programs / Pitch To Us",
    title: "Submit a startup pitch with clarity and confidence",
    summary: "Founder details, innovation description, category selection, and file upload kept in one professional form.",
    fields: ["Founder name", "Startup name", "Industry category", "Problem statement", "Pitch deck upload"],
    cards: [
      { title: "Submission type", body: "Pitch deck, product note, and founder overview.", meta: "Upload ready" },
      { title: "Categories", body: "AI, climate, consumer, health, deep tech, and SaaS." },
      { title: "Response flow", body: "Reviewed by the team for relevance and next-step routing." },
    ],
    buttonLabel: "Submit pitch",
  },
  "programs/join-us": {
    kind: "login",
    eyebrow: "Programs / Join Us",
    title: "Join the AHUB community",
    summary: "Membership benefits, startup onboarding, and application pathways presented with minimal friction.",
    roles: [
      { title: "Membership benefits", body: "Access programs, events, and innovation support." },
      { title: "Startup onboarding", body: "Get set up with the right program and community path." },
      { title: "Application CTA", body: "Simple next step for founders, students, and collaborators." },
    ],
    buttonLabel: "Apply to join",
  },
  "startups/startup-portfolio": {
    kind: "portfolio",
    eyebrow: "Startups / Portfolio",
    title: "Expanded startup portfolio and founder intelligence",
    summary: "The existing portfolio spirit is preserved, with more filters, categories, and funding detail in a clean listing.",
    cards: portfolio.map((item) => ({ title: item.startup, body: `${item.founder} · ${item.industry} · ${item.funding}`, meta: item.desc })),
  },
  "startups/latest-events": {
    kind: "events",
    eyebrow: "Startups / Latest Events",
    title: "Events, workshops, investor meets, and demo days",
    summary: "Card-based event listing for what is happening across the startup ecosystem.",
    cards: [
      { title: "Founder workshop", body: "Product discovery and customer insight session.", meta: "Tomorrow" },
      { title: "Investor breakfast", body: "Small-room meetings with venture partners.", meta: "This week" },
      { title: "Demo day", body: "Cohort showcase with ecosystem partners.", meta: "Monthly" },
      { title: "Operator clinic", body: "Hands-on support for active founders.", meta: "Rolling" },
    ],
  },
  "startups/blog": {
    kind: "blog",
    eyebrow: "Startups / Blog",
    title: "Startup insights and innovation news",
    summary: "A modern blog layout with a featured article and a curated reading list.",
    featured: { title: "How founder discipline compounds speed", body: "A premium editorial feature exploring product focus, capital discipline, and team clarity.", meta: "Featured" },
    cards: [
      { title: "AI for campus ventures", body: "Practical adoption patterns for student founders.", meta: "Insight" },
      { title: "Building for institutions", body: "How to win trust with large organizations.", meta: "Playbook" },
      { title: "From pilot to contract", body: "Turning early traction into durable revenue.", meta: "Guide" },
    ],
  },
  "startups/student-startup-recruitment": {
    kind: "jobs",
    eyebrow: "Startups / Student Startup Recruitment",
    title: "Hiring, internships, and project roles for students",
    summary: "A lightweight recruiting surface for startups looking to connect with student talent.",
    jobs: [
      { title: "Product Intern", type: "Internship", location: "Chennai / Hybrid", body: "Work on customer research and product support." },
      { title: "Design Associate", type: "Part-time", location: "Remote", body: "Support brand, UI, and social storytelling." },
      { title: "Founder's Office", type: "Full-time", location: "On-site", body: "Operate closely with the startup leadership team." },
    ],
    cards: [
      { title: "Filter system", body: "Search by role, location, and commitment type." },
      { title: "Apply buttons", body: "Clear actions for student applications." },
      { title: "Opportunity flow", body: "Match students to live startup needs." },
    ],
  },
  "startups/startup-registration": {
    kind: "form",
    eyebrow: "Startups / Startup Registration",
    title: "Register a startup with a clean onboarding form",
    summary: "Founder details, startup information, industry category, team details, and funding stage in one clear flow.",
    fields: ["Founder name", "Startup name", "Industry category", "Team size", "Funding stage"],
    cards: [
      { title: "Onboarding", body: "Designed for a fast and professional application flow." },
      { title: "Funding stage", body: "Capture pre-seed, seed, and growth-stage context." },
      { title: "Team details", body: "Keep registration lightweight but structured." },
    ],
    buttonLabel: "Register startup",
  },
  "events/calendar": {
    kind: "calendar",
    eyebrow: "Events / Calendar",
    title: "An interactive calendar for the ecosystem",
    summary: "Upcoming workshops, demo days, and networking events laid out in a simple timeline-style view.",
    timeline: [
      { date: "Mar 14", title: "Founders workshop", body: "Validation and product strategy session." },
      { date: "Apr 02", title: "Investor meet", body: "Private partner room with venture firms." },
      { date: "Apr 22", title: "Demo day", body: "Cohort showcase for startups and students." },
    ],
    cards: [
      { title: "Upcoming", body: "The next few ecosystem moments at a glance." },
      { title: "Reminders", body: "Keep registrations and RSVPs in one place." },
      { title: "Planning", body: "A straightforward calendar experience with clean visuals." },
    ],
  },
  "events/case-studies": {
    kind: "timeline",
    eyebrow: "Events / Case Studies",
    title: "Impact stories and startup journeys",
    summary: "Case studies that show growth, execution, and ecosystem impact over time.",
    timeline: [
      { date: "Story 01", title: "From idea to pilot", body: "A startup uses incubation support to land a first enterprise pilot." },
      { date: "Story 02", title: "From pilot to growth", body: "Program support helps convert early traction into repeatable revenue." },
      { date: "Story 03", title: "From campus to market", body: "Student founders translate prototypes into market-ready products." },
    ],
    highlights: [
      { title: "Impact stories", body: "Clean narrative presentation with growth metrics." },
      { title: "Innovation journeys", body: "Founders moving from exploration to execution." },
      { title: "Growth metrics", body: "A minimal enterprise layout for success stories." },
    ],
  },
  "events/careers": {
    kind: "jobs",
    eyebrow: "Events / Careers",
    title: "Careers at AHUB and the wider innovation ecosystem",
    summary: "Open positions and opportunities around program operations, partnerships, and ecosystem growth.",
    jobs: [
      { title: "Program Associate", type: "Full-time", location: "Chennai", body: "Support cohorts, events, and founder engagement." },
      { title: "Partnerships Lead", type: "Full-time", location: "Chennai", body: "Grow institutional and corporate relationships." },
      { title: "Community Coordinator", type: "Contract", location: "Hybrid", body: "Run ecosystem programs and student outreach." },
    ],
    cards: [
      { title: "Work with founders", body: "A role set focused on ecosystem support and execution." },
      { title: "Innovation jobs", body: "Professional opportunities aligned with the startup mission." },
      { title: "Apply easily", body: "A modern job-card layout with clear next steps." },
    ],
  },
  "events/student-visits": {
    kind: "form",
    eyebrow: "Events / Student Visits",
    title: "Register campus and school visit groups",
    summary: "A clear registration surface for tours, visits, and innovation immersion experiences.",
    fields: ["Institution name", "Visit date", "Visitor count", "Program interest", "Contact person"],
    cards: [
      { title: "Visit types", body: "Campus tours, school groups, and university delegations." },
      { title: "Experience", body: "Innovation tours with a professional, welcoming touch." },
      { title: "Scheduling", body: "Simple form design for quick coordination." },
    ],
    buttonLabel: "Request visit",
  },
  "events/host-an-event": {
    kind: "form",
    eyebrow: "Events / Host an Event",
    title: "Submit an event hosting request",
    summary: "Venue selection, capacity details, and technical support requests in a clean dashboard feel.",
    fields: ["Event title", "Venue", "Capacity", "Technical support", "Preferred date"],
    cards: [
      { title: "Venue selection", body: "Choose the best setting for your session or meetup." },
      { title: "Capacity details", body: "Plan seating and flow before confirmation." },
      { title: "Support request", body: "Audio, visual, and hosting help made explicit." },
    ],
    buttonLabel: "Request hosting",
  },
  "about/mentors": {
    kind: "profiles",
    eyebrow: "About / Mentors",
    title: "Mentors who shape the institution",
    summary: "A smaller, clean dropdown destination focused on trusted guidance and public-facing leadership.",
    profiles: visitors.map((person) => ({ name: person.name, role: person.role, org: person.org, bio: person.quote })),
    highlights: [
      { title: "Guidance", body: "A concise mentor directory for the about section." },
      { title: "Professional feel", body: "Minimal hover states and strong profile hierarchy." },
      { title: "Visibility", body: "Useful for institutional readers and ecosystem partners." },
    ],
  },
  "about/board": {
    kind: "profiles",
    eyebrow: "About / Board",
    title: "Board and leadership overview",
    summary: "Leadership details presented in a clean institutional format.",
    profiles: [
      { name: "Board Chair", role: "Governance", org: "AHUB", bio: "Strategic oversight and institutional alignment." },
      { name: "Academic Advisor", role: "Research", org: "AHUB", bio: "Links research depth to startup outcomes." },
      { name: "Industry Advisor", role: "Partnerships", org: "AHUB", bio: "Supports corporate and ecosystem collaboration." },
      { name: "Program Advisor", role: "Programs", org: "AHUB", bio: "Guides program quality and founder support." },
    ],
    highlights: [
      { title: "Leadership", body: "Clear board structure with a premium presentation style." },
      { title: "Designations", body: "Role, organization, and mission kept easy to scan." },
      { title: "Trust", body: "A polished public-facing page for credibility." },
    ],
  },
  "about/team": {
    kind: "profiles",
    eyebrow: "About / Team",
    title: "The AHUB team and community leadership",
    summary: "Core team, operations, coordinators, and student leadership in a modern card layout.",
    profiles: [
      { name: "Operations", role: "Core Team", org: "AHUB", bio: "Keeps the platform running smoothly every day." },
      { name: "Partnerships", role: "Ecosystem", org: "AHUB", bio: "Manages institutions, corporates, and collaborators." },
      { name: "Programs", role: "Coordinator", org: "AHUB", bio: "Supports the founder journey with precision." },
      { name: "Student Leadership", role: "Community", org: "AHUB", bio: "Bridges campus engagement and startup activity." },
    ],
    highlights: [
      { title: "Modern cards", body: "Clean hover interaction and balanced spacing." },
      { title: "Social links", body: "Easy to extend with LinkedIn or X destinations." },
      { title: "Structure", body: "Simple, institutional, and professional." },
    ],
  },
  "students/dashboard": {
    kind: "dashboard",
    eyebrow: "Students / Dashboard",
    title: "Student innovation dashboard",
    summary: "Program tracking, opportunities, event registrations, and application status in one premium workspace.",
    cards: [
      { title: "Program tracking", body: "Monitor cohort progress and next steps.", meta: "Active" },
      { title: "Startup opportunities", body: "Curated openings, calls, and ecosystem invites.", meta: "Live" },
      { title: "Event registrations", body: "Track RSVP status for campus and ecosystem events.", meta: "3 upcoming" },
      { title: "Application status", body: "One glance at submissions, reviews, and actions.", meta: "Review" },
    ],
    timeline: [
      { date: "Today", title: "Submit a pitch", body: "Prepare applications and startup documents." },
      { date: "This week", title: "Attend a session", body: "Join a workshop, demo day, or mentor clinic." },
      { date: "Next week", title: "Update profile", body: "Keep skills, interests, and startup data current." },
    ],
  },
  "students/internship-calendar": {
    kind: "calendar",
    eyebrow: "Students / Internship Calendar",
    title: "Internship schedules and startup openings",
    summary: "Important dates and timeline views for student opportunities across the ecosystem.",
    timeline: [
      { date: "Week 1", title: "Startup openings", body: "Browse active student roles and internships." },
      { date: "Week 2", title: "Application window", body: "Track deadlines for specific startup teams." },
      { date: "Week 3", title: "Interview cycles", body: "Coordinate with founders and recruiters." },
    ],
    cards: [
      { title: "Timeline view", body: "A clean schedule surface for dates and deadlines." },
      { title: "Important dates", body: "Use the calendar to stay ahead of opportunities." },
      { title: "Startup openings", body: "List internships and project-based roles." },
    ],
  },
  "students/login": {
    kind: "login",
    eyebrow: "Students / Login",
    title: "Sign in to your AHUB account",
    summary: "Professional authentication UI for students, founders, and mentors.",
    roles: [
      { title: "Student login", body: "Access dashboard, internships, and event tracking." },
      { title: "Founder login", body: "Manage startup onboarding and program submissions." },
      { title: "Mentor login", body: "Review cohorts and support guided sessions." },
    ],
    buttonLabel: "Sign in",
  },
  "about/press": {
    kind: "blog",
    eyebrow: "About / Press",
    title: "Press & Media Coverage",
    summary: "Media features, news publications, and ecosystem highlights across leading platforms.",
    featured: { title: "AUIC Incubation Hub makes national headlines", body: "A premium editorial feature on our ecosystem's impact — from student founders to deep-tech ventures.", meta: "Featured" },
    cards: [
      { title: "Startup India feature", body: "Recognized as a top-tier incubator with measurable founder outcomes.", meta: "News" },
      { title: "Economic Times coverage", body: "AUIC's innovative model spotlighted in a national innovation segment.", meta: "Media" },
      { title: "IIT collaboration spotlight", body: "Joint research and innovation programs draw national attention.", meta: "Press" },
    ],
  },
  "about/rewards": {
    kind: "timeline",
    eyebrow: "About / Reward & Recognition",
    title: "Awards, Accolades & Ecosystem Milestones",
    summary: "Celebrating the achievements, recognitions, and landmark milestones of the AUIC ecosystem.",
    timeline: [
      { date: "2024", title: "Best University Incubator", body: "Recognized nationally for program quality and founder success rates." },
      { date: "2023", title: "Innovation Excellence Award", body: "Awarded by the Department for Promotion of Industry and Internal Trade (DPIIT)." },
      { date: "2022", title: "Top 25 Startup Ecosystems", body: "Ranked among India's leading startup incubation platforms by StartupBlink." },
      { date: "2021", title: "Community Impact Recognition", body: "Honored for bridging student entrepreneurship with institutional support." },
    ],
    highlights: [
      { title: "National recognition", body: "Awards from premier bodies validating our ecosystem quality." },
      { title: "Founder outcomes", body: "Recognition tied to real startup success stories." },
      { title: "Community milestones", body: "Celebrating both institutional and individual achievements." },
    ],
  },
  "about/reports": {
    kind: "timeline",
    eyebrow: "About / Reports",
    title: "Annual Reports & Impact Metrics",
    summary: "Transparent reporting on ecosystem health, startup outcomes, and strategic growth milestones.",
    timeline: [
      { date: "FY 2024", title: "Annual Impact Report", body: "50+ startups incubated, ₹12 Cr raised, and 200+ jobs created across cohorts." },
      { date: "FY 2023", title: "Ecosystem Growth Report", body: "Expanded to 3 new partner institutions with 35 active startup teams." },
      { date: "FY 2022", title: "Foundation Year Report", body: "Launched the first cohort, established mentor network, and secured seed partnerships." },
    ],
    highlights: [
      { title: "Transparency", body: "Annual data on funding, jobs, and founder outcomes." },
      { title: "Impact metrics", body: "Clear reporting on ecosystem ROI and startup health." },
      { title: "Stakeholder trust", body: "Published openly for partners, investors, and institutions." },
    ],
  },
  "events/event-registration": {
    kind: "form",
    eyebrow: "Events / Event Registration",
    title: "Register for an Upcoming Event",
    summary: "RSVP and register for workshops, demo days, investor meets, and startup showcases.",
    fields: ["Full name", "Email address", "Event name", "Organization / Startup", "Role"],
    cards: [
      { title: "Upcoming events", body: "Workshops, demo days, investor sessions, and founder showcases.", meta: "Multiple dates" },
      { title: "Confirmation", body: "Receive instant confirmation and event details via email.", meta: "Instant" },
      { title: "Note", body: "Spots are limited — register early to secure your place." },
    ],
    buttonLabel: "Register now",
  },
};

function SectionPage() {
  const params = Route.useParams();
  const key = `${params.section}/${params.slug}`;
  const page = pageMap[key as RouteKey];

  if (!page) {
    return (
      <InternalPageShell
        eyebrow="Not found"
        title="This page is not available"
        description="The requested internal route does not exist. Use the navigation menu to reach a supported section."
      >
        <div className="site-container-wide pb-16">
          <div className="rounded-[28px] border border-[rgba(91,14,45,0.08)] bg-white p-8 text-slate-600 shadow-[0_16px_40px_-28px_rgba(91,14,45,0.18)]">
            Route key <span className="font-semibold text-slate-900">{key}</span> was not found.
          </div>
        </div>
      </InternalPageShell>
    );
  }

  if (key === "startups/latest-events") {
    return (
      <InternalPageShell eyebrow={page.eyebrow} title={page.title} description={page.summary}>
        <div className="site-container-wide space-y-8">
          <div className="rounded-[28px] border border-[rgba(91,14,45,0.08)] bg-white p-6 shadow-[0_16px_40px_-28px_rgba(91,14,45,0.18)] md:p-8">
            <div className="text-[0.62rem] uppercase tracking-[0.24em] text-primary">Startups / Latest Events</div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
              Workshops, demo days, and founder sessions are back on the page.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
              Browse the most recent ecosystem moments below. The live carousel keeps the page feeling active while the cards capture the latest founder and partner activity.
            </p>
          </div>

          <LatestEvents />

          <SectionCards cards={(page as any).cards} />
        </div>
      </InternalPageShell>
    );
  }

  return (
    <InternalPageShell eyebrow={page.eyebrow} title={page.title} description={page.summary}>
      <div className="site-container-wide space-y-8">
        {page.kind === "profiles" && <ProfilePage page={page} />}
        {page.kind === "logos" && <LogoPage page={page} />}
        {page.kind === "timeline" && <TimelinePage page={page} />}
        {page.kind === "gallery" && <GalleryPage page={page} />}
        {page.kind === "form" && <FormPage page={page} />}
        {page.kind === "portfolio" && <PortfolioPage page={page} />}
        {page.kind === "events" && <EventsPage page={page} />}
        {page.kind === "blog" && <BlogPage page={page} />}
        {page.kind === "jobs" && <JobsPage page={page} />}
        {page.kind === "dashboard" && <DashboardPage page={page} />}
        {page.kind === "calendar" && <CalendarPage page={page} />}
        {page.kind === "login" && <LoginPage page={page} />}
      </div>
    </InternalPageShell>
  );
}

function SectionCards({ cards }: { cards: Card[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {cards.map((card) => (
        <div key={card.title} className="rounded-[24px] border border-[rgba(91,14,45,0.08)] bg-white p-5 shadow-[0_14px_36px_-28px_rgba(91,14,45,0.14)]">
          <div className="text-sm font-semibold text-slate-950">{card.title}</div>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.body}</p>
          {card.meta ? <div className="mt-4 text-[0.68rem] uppercase tracking-[0.22em] text-primary">{card.meta}</div> : null}
        </div>
      ))}
    </div>
  );
}

function ProfilePage({ page }: { page: Extract<PageDefinition, { kind: "profiles" }> }) {
  return (
    <>
      <SectionCards cards={page.highlights} />
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {page.profiles.map((profile) => (
          <article key={profile.name} className="group rounded-[26px] border border-[rgba(91,14,45,0.08)] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-26px_rgba(91,14,45,0.22)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[0.62rem] uppercase tracking-[0.22em] text-slate-500">{profile.org}</div>
                <div className="mt-2 text-lg font-semibold text-slate-950">{profile.name}</div>
                <div className="mt-1 text-sm text-primary">{profile.role}</div>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(91,14,45,0.08)] text-primary">
                <Users size={18} />
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">{profile.bio}</p>
            <div className="mt-5 inline-flex items-center gap-1 rounded-full bg-[linear-gradient(135deg,#5B0E2D,#7A163B)] px-3 py-2 text-[0.68rem] uppercase tracking-[0.22em] text-white">
              {profile.linkLabel ?? "View profile"} <ExternalLink size={12} />
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function LogoPage({ page }: { page: Extract<PageDefinition, { kind: "logos" }> }) {
  return (
    <>
      <SectionCards cards={page.highlights} />
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {page.logos.map((logo) => (
          <div key={logo} className="group rounded-[24px] border border-[rgba(91,14,45,0.08)] bg-white p-5 text-slate-500 transition-all duration-300 hover:-translate-y-1 hover:text-slate-950 hover:shadow-[0_18px_40px_-26px_rgba(91,14,45,0.18)]">
            <div className="flex h-24 items-center justify-center rounded-[18px] bg-[linear-gradient(180deg,#faf7f7,#fff)] text-center text-sm font-semibold tracking-tight transition duration-300 group-hover:grayscale-0">
              {logo}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function TimelinePage({ page }: { page: Extract<PageDefinition, { kind: "timeline" }> }) {
  return (
    <>
      <SectionCards cards={page.highlights} />
      <div className="space-y-4">
        {page.timeline.map((item) => (
          <div key={item.title} className="grid gap-4 rounded-[26px] border border-[rgba(91,14,45,0.08)] bg-white p-5 md:grid-cols-[140px_1fr]">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{item.date}</div>
            <div>
              <div className="text-lg font-semibold text-slate-950">{item.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function GalleryPage({ page }: { page: Extract<PageDefinition, { kind: "gallery" }> }) {
  return (
    <>
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {page.images.map((image, index) => (
            <div key={image + index} className="overflow-hidden rounded-[26px] border border-[rgba(91,14,45,0.08)] bg-white shadow-[0_16px_40px_-28px_rgba(91,14,45,0.18)]">
              <img src={image} alt="AHUB facility" className="h-52 w-full object-cover" />
            </div>
          ))}
        </div>
        <div className="space-y-4">
          {page.cards.map((card) => (
            <div key={card.title} className="rounded-[24px] border border-[rgba(91,14,45,0.08)] bg-white p-5 shadow-[0_14px_36px_-28px_rgba(91,14,45,0.14)]">
              <div className="text-lg font-semibold text-slate-950">{card.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function FormPage({ page }: { page: Extract<PageDefinition, { kind: "form" }> }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
      <form className="rounded-[28px] border border-[rgba(91,14,45,0.08)] bg-white p-6 shadow-[0_18px_40px_-28px_rgba(91,14,45,0.18)] md:p-8">
        <div className="grid gap-4 md:grid-cols-2">
          {page.fields.map((field) => (
            <label key={field} className="space-y-2 text-sm font-medium text-slate-700">
              <span>{field}</span>
              <input type="text" placeholder={field} className="w-full rounded-2xl border border-slate-200 bg-[#fcf9f9] px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-[rgba(91,14,45,0.25)]" />
            </label>
          ))}
        </div>
        <label className="mt-4 block space-y-2 text-sm font-medium text-slate-700">
          <span>Additional details</span>
          <textarea rows={5} className="w-full rounded-2xl border border-slate-200 bg-[#fcf9f9] px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-[rgba(91,14,45,0.25)]" placeholder="Add any supporting details here" />
        </label>
        <button type="button" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#5B0E2D,#7A163B)] px-5 py-3 text-sm font-medium text-white shadow-[0_14px_30px_-18px_rgba(91,14,45,0.5)]">
          {page.buttonLabel} <ArrowRight size={16} />
        </button>
      </form>
      <SectionCards cards={page.cards} />
    </div>
  );
}

function PortfolioPage({ page }: { page: Extract<PageDefinition, { kind: "portfolio" }> }) {
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {["All", "AI", "Climate", "Health", "Consumer", "Deep Tech"].map((filter) => (
          <span key={filter} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs uppercase tracking-[0.2em] text-slate-600">{filter}</span>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {page.cards.map((card) => (
          <div key={card.title} className="rounded-[26px] border border-[rgba(91,14,45,0.08)] bg-white p-5 shadow-[0_16px_40px_-28px_rgba(91,14,45,0.16)]">
            <div className="text-lg font-semibold text-slate-950">{card.title}</div>
            <div className="mt-1 text-xs uppercase tracking-[0.22em] text-primary">Founder profile</div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{card.body}</p>
            <div className="mt-4 text-sm text-slate-500">{card.meta}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function EventsPage({ page }: { page: Extract<PageDefinition, { kind: "events" }> }) {
  return <SectionCards cards={page.cards} />;
}

function BlogPage({ page }: { page: Extract<PageDefinition, { kind: "blog" }> }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-[28px] border border-[rgba(91,14,45,0.08)] bg-white p-6 shadow-[0_18px_40px_-28px_rgba(91,14,45,0.16)]">
        <div className="text-[0.62rem] uppercase tracking-[0.24em] text-primary">{page.featured.meta}</div>
        <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{page.featured.title}</div>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{page.featured.body}</p>
      </div>
      <div className="space-y-4">
        {page.cards.map((card) => (
          <div key={card.title} className="rounded-[24px] border border-[rgba(91,14,45,0.08)] bg-white p-5">
            <div className="text-lg font-semibold text-slate-950">{card.title}</div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.body}</p>
            <div className="mt-4 text-[0.68rem] uppercase tracking-[0.2em] text-primary">{card.meta}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function JobsPage({ page }: { page: Extract<PageDefinition, { kind: "jobs" }> }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-4">
        {page.jobs.map((job) => (
          <article key={job.title} className="rounded-[26px] border border-[rgba(91,14,45,0.08)] bg-white p-5 shadow-[0_16px_40px_-28px_rgba(91,14,45,0.16)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold text-slate-950">{job.title}</div>
                <div className="mt-1 text-sm text-primary">{job.type}</div>
              </div>
              <div className="rounded-full border border-slate-200 bg-[#fcf9f9] px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-600">{job.location}</div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{job.body}</p>
            <button type="button" className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-primary">
              Apply <ArrowRight size={13} />
            </button>
          </article>
        ))}
      </div>
      <SectionCards cards={page.cards} />
    </div>
  );
}

function DashboardPage({ page }: { page: Extract<PageDefinition, { kind: "dashboard" }> }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="grid gap-4 sm:grid-cols-2">
        {page.cards.map((card, index) => (
          <div key={card.title} className="rounded-[24px] border border-[rgba(91,14,45,0.08)] bg-white p-5 shadow-[0_16px_40px_-28px_rgba(91,14,45,0.16)]">
            <div className="text-sm uppercase tracking-[0.2em] text-slate-500">{card.meta}</div>
            <div className="mt-2 text-lg font-semibold text-slate-950">{card.title}</div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.body}</p>
            <div className="mt-4 h-2 rounded-full bg-slate-100">
              <div className="h-2 rounded-full bg-[linear-gradient(135deg,#5B0E2D,#7A163B)]" style={{ width: `${65 + index * 8}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        {page.timeline.map((item) => (
          <div key={item.title} className="rounded-[24px] border border-[rgba(91,14,45,0.08)] bg-white p-5">
            <div className="text-xs uppercase tracking-[0.22em] text-primary">{item.date}</div>
            <div className="mt-2 text-lg font-semibold text-slate-950">{item.title}</div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CalendarPage({ page }: { page: Extract<PageDefinition, { kind: "calendar" }> }) {
  return (
    <>
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          {page.timeline.map((item) => (
            <div key={item.title} className="grid gap-3 rounded-[24px] border border-[rgba(91,14,45,0.08)] bg-white p-5 md:grid-cols-[140px_1fr]">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{item.date}</div>
              <div>
                <div className="text-lg font-semibold text-slate-950">{item.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
        <SectionCards cards={page.cards} />
      </div>
    </>
  );
}

function LoginPage({ page }: { page: Extract<PageDefinition, { kind: "login" }> }) {
  return (
    <div className="mx-auto grid max-w-4xl gap-4 lg:grid-cols-[0.95fr_1.05fr]">
      <SectionCards cards={page.roles} />
      <form className="rounded-[28px] border border-[rgba(91,14,45,0.08)] bg-white p-6 shadow-[0_18px_40px_-28px_rgba(91,14,45,0.18)] md:p-8">
        <div className="grid gap-4">
          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>Email address</span>
            <input type="email" className="w-full rounded-2xl border border-slate-200 bg-[#fcf9f9] px-4 py-3 text-sm text-slate-950 outline-none focus:border-[rgba(91,14,45,0.25)]" placeholder="name@institution.edu" />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>Password</span>
            <input type="password" className="w-full rounded-2xl border border-slate-200 bg-[#fcf9f9] px-4 py-3 text-sm text-slate-950 outline-none focus:border-[rgba(91,14,45,0.25)]" placeholder="••••••••" />
          </label>
          <button type="button" className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#5B0E2D,#7A163B)] px-5 py-3 text-sm font-medium text-white shadow-[0_14px_30px_-18px_rgba(91,14,45,0.5)]">
            {page.buttonLabel} <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
