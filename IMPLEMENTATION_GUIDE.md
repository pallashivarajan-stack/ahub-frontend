# Frontend–Backend Integration Guide

Convert all 34 section components from static/hardcoded data to API-first architecture, making every section ready for a backend developer to connect to a database.

---

## Architecture

```
Database → FastAPI Backend → GET /api/public/* → React Query Hooks → Section Components
```

The frontend already has:
- **Endpoint definitions**: `src/services/publicContentEndpoints.ts` (33 endpoints)
- **Fetchers + mappers**: `src/services/publicContent.ts` (fetch + map raw DB rows to frontend shapes)
- **React Query hooks**: `src/services/usePublicContent.ts` (27 `usePublic*` hooks with fallback support)
- **Media helpers**: `src/lib/media.ts` (resolve backend media URLs, configurable via `VITE_USE_API_MEDIA`)

---

## Component Categorization (34 total)

### Group A — Score 1: No API hook at all (16 components)

These need a `usePublic*` hook added and hardcoded data removed.

| # | Component | Data Source | Available Hook |
|---|-----------|-------------|----------------|
| 1 | `AhubNetwork` | Inline `cards[]` array | `usePublicAhubNetwork` |
| 2 | `ImpactPage` | Inline `metrics[]` array | `usePublicStatistics` (partial match) |
| 3 | `InstitutionsClubs` | `@/data/institutionsClubs` | `usePublicInstitutionsClubs` |
| 4 | `InternshipCalendarPage` | `@/data/internshipCalendar` | `usePublicInternshipCalendar` |
| 5 | `InternshipRegistrationPage` | Inline form config | `usePublicInternshipRegistration` |
| 6 | `InvestorsPage` | `@/data/investorsPage` | `usePublicInvestors` |
| 7 | `JoinUsPage` | Pure form (no data) | N/A (submission endpoint needed) |
| 8 | `OperationalModelPage` | Inline `operationalModelData`, `teams[][]` | N/A (new hook needed) |
| 9 | `PartnersPage` | `@/data/partnersPage` | `usePublicPartnersPage` |
| 10 | `PitchToUsPage` | Pure form (no data) | N/A (submission endpoint needed) |
| 11 | `RewardsPage` | Inline rewards data | `usePublicRewards` |
| 12 | `StartupBlogPage` | `@/data/startupBlog` | `usePublicStartupBlog` |
| 13 | `StartupFundingPage` | `@/data/startupFunding` | `usePublicStartupFunding` |
| 14 | `StartupRegistrationPage` | Pure form (no data) | N/A (submission endpoint needed) |
| 15 | `StartupsEventsPage` | Inline `EVENTS_DATA[]` | `usePublicStartupEvents` |
| 16 | `StudentDashboardPage` | Inline challenges/courses | `usePublicStudentDashboard` |

### Group B — Score 2: Has hook + full static fallback (16 components)

These already import a `usePublic*` hook but pass the entire static dataset as fallback. The hook's return value is treated as "use API data, fall back to static" — but the fallback is so complete that the UI never shows an empty/loading state. They need to be refactored to:
1. Drop the static fallback data (or reduce to minimal placeholder)
2. Add loading skeleton / spinner
3. Add empty state
4. Handle error state

| Component | Hook Used | Static Fallback Source |
|-----------|-----------|----------------------|
| `Board` | `usePublicBoard` | `@/data/boardPage` |
| `DistinguishedVisitors` | `usePublicDistinguishedVisitors` | Inline `fallbackVisitors[]` |
| `EventsCalendarPage` | `usePublicEventsCalendar` | Full static calendar object |
| `FindUsOn` | `usePublicSocialLinks` | Inline `platforms[]` |
| `Hero` | `usePublicHero` | Inline `fallbackHeroData` |
| `IncubatorsShowcase` | `usePublicIncubators` | Inline `incubators[]` |
| `InfrastructurePage` | `usePublicInfrastructure` | All `@/data/infrastructurePage` modules |
| `Mentors` | `usePublicMentors` | `@/data` (through component) |
| `MeshNetwork` | `usePublicPartners` | Inline `networkLogos[]` |
| `Partners` | `usePublicPartners` | Inline `logos[]` |
| `StartupPortfolioPage` | `usePublicStartupPortfolio` | Full static data object |
| `StartupsTicker` | `usePublicStartupsTicker` | Inline `logos[]` |
| `Statistics` | `usePublicStatistics` | `@/data` stats |
| `Team` | `usePublicTeam` | `@/data/teamPage` |
| `VisionRoadmapPage` | `usePublicVisionRoadmap` | `@/data/visionRoadmap` |
| `WhatWeDo` | `usePublicWhatWeDo` | Inline `cards[]` |

### Group C — Score 3: Specialized hook + loading state (2 components)

These already show loading spinners and have internal fallback logic. They are close but should be made fully API-driven by removing the internal fallback.

| Component | Hook | Notes |
|-----------|------|-------|
| `LatestEvents` | `usePublicEvents` | Hook internally merges API + static `@/data` events. Move that logic out. |
| `PortfolioCompanies` | `usePublicPortfolio` | Hook internally merges API + static `@/data` portfolio. Move that logic out. |

---

## API Response Types (Backend Must Implement)

Each endpoint must return JSON. Below are the expected shapes per section component.

### 1. Hero → `GET /api/public/hero`
```ts
interface HeroData {
  poster?: string;    // relative media path
  video?: string;     // relative media path
  heading?: string;
  subheading?: string;
}
```

### 2. What We Do → `GET /api/public/what-we-do`
```ts
interface WhatWeDoCard {
  title: string;
  description: string;
  iconName: string;  // lucide icon name
  stats?: { label: string; value: string }[];
}
// Returns: WhatWeDoCard[]
```

### 3. Statistics → `GET /api/public/statistics`
```ts
interface Statistic {
  label: string;
  value: string;     // numeric string
  suffix?: string;   // e.g. "+", "Cr+"
  prefix?: string;   // e.g. "₹"
}
// Returns: Statistic[]
```

### 4. Partners → `GET /api/public/partners`
```ts
// Returns: string[] (array of logo URLs or partner names)
```

### 5. Partners Page → `GET /api/public/partners-page`
```ts
interface PartnerItem {
  name: string;
  description: string;
  logo: string;
  website?: string;
  category?: string;
}
// Returns: PartnerItem[]
```

### 6. Team → `GET /api/public/team`
```ts
interface TeamMember {
  name: string;
  title: string;
  image: string;
  linkedIn?: string;
}
// Returns: TeamMember[]
```

### 7. Board → `GET /api/public/board`
```ts
interface BoardMember {
  name: string;
  title: string;
  bio: string;
  image: string;
  linkedIn?: string;
}
// Returns: BoardMember[]
```

### 8. Mentors → `GET /api/public/mentors`
```ts
interface Mentor {
  name: string;
  title: string;
  organization: string;
  image: string;
  linkedIn?: string;
  tags?: string[];
}
// Returns: Mentor[]
```

### 9. Portfolio Companies → `GET /api/public/portfolio-companies`
```ts
interface PortfolioCompany {
  startup: string;
  industry: string;
  category: string;       // uppercase e.g. "EDTECH"
  desc: string;
  achievements: string[];
  funding?: string;
  logo?: string;
  founder: string;
  founderTitle: string;
  founderImage?: string;
  websiteUrl?: string;
}
// Returns: PortfolioCompany[]
```

### 10. Events (marquee) → `GET /api/public/events`
```ts
interface Event {
  title: string;
  date: string;
  tag: string;      // e.g. "Meetup", "Panel", "Workshop"
  desc: string;
  img: string;
}
// Returns: Event[]
```

### 11. Incubators → `GET /api/public/incubators`
```ts
interface Incubator {
  name: string;
  tagline: string;
  short: string;
  long: string;
  blurb: string;
  image: string;
  card: string;
  stats?: { label: string; value: string }[];
}
// Returns: Incubator[]
```

### 12. Social Links → `GET /api/public/social-links`
```ts
interface SocialLink {
  name: string;
  username: string;
  description: string;
  href: string;
  iconName: string;
  accent?: string;
  glow?: string;
  testimonial?: { quote: string; author: string; role: string };
}
// Returns: SocialLink[]
```

### 13. Startups Ticker → `GET /api/public/startups-ticker`
```ts
// Returns: string[] (logo URLs)
```

### 14. Distinguished Visitors → `GET /api/public/distinguished-visitors`
```ts
interface Visitor {
  name: string;
  role: string;
  org: string;
  image: string;
}
// Returns: Visitor[]
```

### 15. Ahub Network → `GET /api/public/ahub-network`
```ts
interface NetworkStat {
  label: string;
  value: number;
  suffix: string;
  description: string;
  category: string;
  icons: string[];       // icon names
  tone: string;          // gradient CSS class
}
// Returns: NetworkStat[]
```

### 16. Infrastructure → `GET /api/public/infrastructure`
```ts
interface InfrastructureData {
  facilities: FacilityItem[];
  gallery: GalleryImage[];
  highlights: string[];
  // See src/data/infrastructurePage.ts for full shape
}
```

### 17. Startup Portfolio → `GET /api/public/startup-portfolio`
```ts
interface StartupItem {
  id: string;
  name: string;
  logo: string;
  category: string;
  industry: string;
  founded: number;
  fundingStage: string;
  description: string;
  website: string;
  popularity: number;
}
// Returns: StartupItem[]
```

### 18. Events Calendar → `GET /api/public/events-calendar`
```ts
interface EcosystemEvent {
  id: string;
  title: string;
  date: string;
  type: "workshop" | "hackathon" | "seminar" | "competition" | "networking";
  description: string;
  registrationLink?: string;
}
// Returns: EcosystemEvent[]
```

### 19. Vision & Roadmap → `GET /api/public/vision-roadmap`
```ts
interface VisionRoadmapData {
  vision: string;
  phases: { title: string; description: string; year: string; milestones: string[] }[];
}
```

### 20. Student Dashboard → `GET /api/public/student-dashboard`
```ts
interface StudentDashboardData {
  challenges: { title: string; description: string; deadline: string }[];
  courses: { title: string; provider: string; duration: string }[];
}
```

### 21. Startup Events → `GET /api/public/startup-events`
```ts
interface StartupEvent {
  title: string;
  date: string;
  description: string;
  registrationLink?: string;
}
// Returns: StartupEvent[]
```

### 22. Rewards → `GET /api/public/rewards`
```ts
interface RewardItem {
  title: string;
  description: string;
  icon: string;
  criteria?: string;
}
// Returns: RewardItem[]
```

### 23. Internship Registration → `GET /api/public/internship-registration`
```ts
interface InternshipConfig {
  fields: { name: string; label: string; type: string; required: boolean; options?: string[] }[];
  statuses: string[];
  programs: string[];
}
```

### 24. Internship Calendar → `GET /api/public/internship-calendar`
```ts
interface InternshipCompany {
  name: string;
  logo: string;
  roles: string[];
}
interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: "application" | "assessment" | "interview" | "offer" | "deadline";
  company: string;
  description: string;
}
interface InternshipCalendarData {
  companies: InternshipCompany[];
  events: CalendarEvent[];
}
```

### 25. Institutions & Clubs → `GET /api/public/institutions-clubs`
```ts
interface Institution {
  name: string;
  img: string;
}
// Returns: Institution[]
```

### 26. Startup Blog → `GET /api/public/startup-blog`
```ts
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
}
interface TimelineStep {
  year: string;
  title: string;
  description: string;
}
interface StartupBlogData {
  posts: BlogPost[];
  timeline: TimelineStep[];
}
```

### 27. Startup Funding → `GET /api/public/startup-funding`
```ts
interface FundingHighlight {
  label: string;
  value: string;
  description: string;
}
interface FundedStartup {
  name: string;
  logo: string;
  funding: string;
  investors: string;
  description: string;
  category: string;
}
interface StartupFundingData {
  highlights: FundingHighlight[];
  fundedStartups: FundedStartup[];
}
```

### 28. Investors → `GET /api/public/investors`
```ts
interface InvestorItem {
  name: string;
  logo: string;
  description: string;
  website?: string;
}
// Returns: InvestorItem[]
```

### 29. Operational Model (NEW endpoint) → `GET /api/public/operational-model`
```ts
interface OperationalModelData {
  description: string;
  sectors: { name: string; description: string; icon: string }[];
  teams: { name: string; members: { name: string; role: string; image: string }[] }[];
}
```

### 30. Impact Page → `GET /api/public/statistics` (reuse) + `GET /api/public/impact`
```ts
interface ImpactData {
  period: string;
  metrics: { id: string; value: string; label: string; subLabel?: string; icon: string; colorClass: string }[];
}
```

### 31. Events (Startup Events page) → `GET /api/public/startup-events`
Same shape as `StartupEvent[]`.

---

## Step-by-Step Migration Plan

### Phase 1: Backend (FastAPI Developer)

Implement all `GET /api/public/*` endpoints in `publicContentEndpoints.ts`. Each endpoint should:
1. Query the database table for the section
2. Return JSON matching the frontend type above
3. Handle empty states (return `[]` or `null`, never throw)
4. Serve media files via `GET /api/public/media/{category}/{filename}`

**Priority order** (by component usage):
1. `hero`, `portfolio`, `events` — homepage critical
2. `partners`, `team`, `mentors`, `board`, `statistics` — high-traffic sections
3. `incubators`, `socialLinks`, `startupsTicker` — secondary
4. All remaining (see endpoints file)

### Phase 2: Frontend — Group C (2 components)

**PortfolioCompanies.tsx** and **LatestEvents.tsx**:
- Remove the internal API+static merge in `usePublicPortfolio` and `usePublicEvents`
- Have the hooks return raw API data only
- Add proper loading/empty/error states in the hooks themselves
- The components already have loading spinners — ensure they also handle empty/error

### Phase 3: Frontend — Group B (16 components)

For each component:
1. Remove the `import` of static data from `@/data/*`
2. Remove the `fallbackData` parameter passed to the hook
3. Add a loading skeleton or spinner (match existing component styling)
4. Add an empty state message like "No data available yet"
5. Add error boundary or error display
6. Change the render to `data && data.length > 0 ? renderContent : <EmptyState />`

**Pattern to follow** (from `PortfolioCompanies.tsx`):
```tsx
const { data, isLoading, isError } = usePublicHook();

if (isLoading) return <LoadingSkeleton />;
if (isError) return <ErrorState />;
if (!data || data.length === 0) return <EmptyState />;

return <ActualContent data={data} />;
```

### Phase 4: Frontend — Group A (16 components)

For each component:
1. Import the appropriate `usePublic*` hook from `@/services/usePublicContent`
2. Define the component's local type based on the API response type above
3. Replace `const data = hardcodedArray` with `const { data, isLoading } = usePublicHook()`
4. Add loading, empty, and error states
5. Remove all inline hardcoded data
6. For form components (`JoinUsPage`, `PitchToUsPage`, `StartupRegistrationPage`): add POST endpoints and connect form submission

### Phase 5: Cleanup

1. Remove unused data files from `src/data/` (or keep as reference/seed data)
2. Remove unused imports from `src/data/index.ts`
3. Remove the fallback parameter pattern from `usePublicContent.ts` hooks (or make fallback optional)
4. Update all test fixtures to use the API pattern

---

## Media Handling

All image/media URLs follow this pattern:
```ts
// In component:
<img src={resolveBackendMediaUrl(relativePath)} />

// Backend serves files at:
GET /api/public/media/{category}/{filename}
```

The frontend's `mediaFetchUrl()` and `resolveBackendMediaUrl()` in `src/lib/media.ts` handle URL resolution. Backend just needs to return relative paths like `team/deepak.jpg`.

---

## Environment Variables

```env
VITE_API_URL=http://localhost:8000              # Backend base URL
VITE_USE_API_MEDIA=true                          # Use API media URLs vs local assets
```

---

## Verification Checklist

After migration, verify each component:
- [ ] Shows loading skeleton on mount (fast/slow network)
- [ ] Renders data when API returns successfully
- [ ] Shows empty state when API returns `[]` or `null`
- [ ] Shows error state when API returns 5xx / network error
- [ ] Media URLs resolve correctly (images load)
- [ ] No static/hardcoded data visible in rendered output (check network tab for API calls only)
- [ ] Works with `VITE_API_URL` pointing to production backend
