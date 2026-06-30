# Backend API Implementation Prompt

**Goal**: Implement REST API endpoints so the frontend can fetch all section data from a database instead of using hardcoded static data — **without changing any component code or design**.

---

## What Already Exists (frontend side, do NOT touch)

- `src/services/publicContentEndpoints.ts` — all endpoint paths defined
- `src/services/publicContent.ts` — fetchers + mappers transform raw DB rows → frontend shapes
- `src/services/usePublicContent.ts` — React Query hooks each component already imports
- `src/lib/media.ts` — URL resolution helpers

The frontend calls `API_BASE_URL + endpoint`, expects JSON back, and falls back to static data if the call fails.

---

## What You Need To Do (backend only)

Implement **33 GET endpoints** at `http://localhost:8000/api/public/*` returning JSON matching the shapes below.

### Priority 1 — Homepage Critical (implement first)

| Endpoint | Returns |
|----------|---------|
| `GET /api/public/portfolio-companies` | `[{ startup, industry, category, desc, achievements[], funding?, logo?, founder, founderTitle, founderImage?, websiteUrl? }]` |
| `GET /api/public/events` | `[{ title, date, tag, desc, img }]` |
| `GET /api/public/hero` | `{ poster?, video?, heading?, subheading? }` |
| `GET /api/public/statistics` | `[{ label, value, suffix?, prefix? }]` |
| `GET /api/public/partners` | `[string]` (logo URLs or names) |
| `GET /api/public/team` | `[{ name, title, image, linkedIn? }]` |

### Priority 2 — High Traffic

| Endpoint | Returns |
|----------|---------|
| `GET /api/public/mentors` | `[{ name, title, organization, image, linkedIn?, tags? }]` |
| `GET /api/public/board` | `[{ name, title, bio, image, linkedIn? }]` |
| `GET /api/public/incubators` | `[{ name, tagline, short, long, blurb, image, card, stats? }]` |
| `GET /api/public/social-links` | `[{ name, username, description, href, iconName, accent?, glow?, testimonial? }]` |
| `GET /api/public/startups-ticker` | `[string]` (logo URLs) |
| `GET /api/public/distinguished-visitors` | `[{ name, role, org, image }]` |
| `GET /api/public/what-we-do` | `[{ title, description, iconName, stats? }]` |

### Priority 3 — Page-Specific

| Endpoint | Returns |
|----------|---------|
| `GET /api/public/ahub-network` | `[{ label, value, suffix, description, category, icons[], tone }]` |
| `GET /api/public/infrastructure` | `{ facilities[], gallery[], highlights[] }` |
| `GET /api/public/startup-portfolio` | `[{ id, name, logo, category, industry, founded, fundingStage, description, website, popularity }]` |
| `GET /api/public/events-calendar` | `[{ id, title, date, type, description, registrationLink? }]` |
| `GET /api/public/vision-roadmap` | `{ vision, phases[] }` |
| `GET /api/public/student-dashboard` | `{ challenges[], courses[] }` |
| `GET /api/public/startup-events` | `[{ title, date, description, registrationLink? }]` |
| `GET /api/public/rewards` | `[{ title, description, icon, criteria? }]` |
| `GET /api/public/internship-registration` | `{ fields[], statuses[], programs[] }` |
| `GET /api/public/internship-calendar` | `{ companies[], events[] }` |
| `GET /api/public/institutions-clubs` | `[{ name, img }]` |
| `GET /api/public/startup-blog` | `{ posts[], timeline[] }` |
| `GET /api/public/startup-funding` | `{ highlights[], fundedStartups[] }` |
| `GET /api/public/investors` | `[{ name, logo, description, website? }]` |
| `GET /api/public/partners-page` | `[{ name, description, logo, website?, category? }]` |

### Priority 4 — New (not yet in endpoints file, add these)

| Endpoint | Returns |
|----------|---------|
| `GET /api/public/operational-model` | `{ description, sectors[], teams[] }` |
| `GET /api/public/impact` | `{ period, metrics[] }` |
| `GET /api/public/press` | `[{ title, date, url, description, source, tag }]` |
| `GET /api/public/press-page` | `{ heading, subheading }` |

### Media

| Endpoint | Description |
|----------|-------------|
| `GET /api/public/media/{category}/{filename}` | Serve uploaded images/files. The frontend calls `resolveBackendMediaUrl(relativePath)` which builds the full URL. |

---

## Rules

1. **Return `null` or `[]` on error/empty** — the frontend handles fallback
2. **Use snake_case** in DB columns, the `publicContent.ts` mappers handle `snake_case` ↔ `camelCase`
3. **Media paths** should be relative like `team/photo.jpg` — the frontend prepends the base URL
4. **No auth required** — these are public read-only endpoints
5. **CORS** — allow `http://localhost:5173` (Vite dev server)

Once all endpoints return real data, the frontend will automatically use it — no component changes needed.
