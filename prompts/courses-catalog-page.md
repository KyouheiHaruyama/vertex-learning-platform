# All Courses page (`/courses`)

## Goal

Build the catalog at `/courses`, listing every course from Sanity. Two links
already point here and 404 today: the home page's "View all courses" and
"Explore Courses", and the course page's "All Courses" breadcrumb.

Keep it simple, as asked: a heading, a count, and the grid of courses. No
filters, no search, no sorting controls, no pagination.

## Skills and docs read

- `AGENTS.md` — sections 3 (UI work: reuse the components and Tailwind patterns
  already in the project, don't restyle beyond the reference), 5 (pages are
  read-only and fetch on the server), 7, 14 (keep it small).
- `~/.claude/skills/sanity-best-practices/SKILL.md` — GROQ projections, TypeGen.
- `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`
  and `06-fetching-data.md`.

## Code and data checked

- `design/` holds only `vertex-home.png`, `vertex-course.png` and
  `vertex-designsystem.png` — **there is no reference image for this page.**
- `web/sanity/queries.ts` — `COURSES_QUERY` already returns every course with
  the fields a card needs, ordered `popular desc, _createdAt desc`, including
  the `totalSeconds` aggregate added for the home cards.
- `web/app/page.tsx` — the "All Courses" section already renders exactly this
  grid for three courses: `font-display text-[28px]` heading, `mt-8 grid gap-5
  md:grid-cols-3`, one `HomeCourseCard` per `<li>`.
- `web/components/ui/home-course-card.tsx` — already a link to
  `/courses/[slug]`, with optional meta items.
- `web/components/ui/pagination.tsx` exists but is not needed: the dataset has
  ten courses.
- `web/app/courses/[slug]/page.tsx` — the page chrome to match: `PageFrame`,
  `SiteHeader activeHref="/courses"`, sections at `px-6 sm:px-13`,
  `DecorativeBars` at the end.

## Decisions and assumptions

1. **No reference image, so the page is assembled from existing patterns**
   rather than designed. Every element already exists somewhere in the project:
   the page frame and header from both existing pages, the H1 treatment from
   the course page, and the card grid verbatim from the home page's "All
   Courses" section. Nothing new is invented visually.
2. **Simple means simple.** No category filter, no search box, no sort control,
   no pagination. Ten courses fit on one page, and the request was explicit.
   `CATEGORIES_QUERY` stays unused for now.
3. **No invented marketing copy.** The page shows the H1 "All Courses" and a
   factual count line ("10 courses"). No tagline is written, because writing one
   would be designing content rather than building the page.
4. **No breadcrumb.** This is a top-level page; the course page's breadcrumb
   points *to* it.
5. **The card component gets renamed.** `HomeCourseCard` is no longer
   home-specific once the catalog uses it. Rename
   `components/ui/home-course-card.tsx` → `components/ui/course-catalog-card.tsx`
   exporting `CourseCatalogCard`, and update the home page's import. The
   separate `CourseCard` used by the design-system page is untouched. This is
   the only change to existing behaviour — the markup and classes stay
   byte-identical, so the home page must render unchanged.
6. **Three columns at desktop, matching home.** The responsive ladder adds a
   two-column step for tablets (`sm:grid-cols-2 lg:grid-cols-3`), which
   AGENTS.md section 3 allows as a reasonable adaptation.

## Files to change

- `web/components/ui/home-course-card.tsx` → **renamed** to
  `web/components/ui/course-catalog-card.tsx`; `HomeCourseCard` →
  `CourseCatalogCard`, `HomeCourseCardProps` → `CourseCatalogCardProps`. No
  other edits.
- `web/app/page.tsx` — update the import and the JSX tag name. Nothing else.
- `web/app/courses/page.tsx` — **new.**

## Requirements

### Route

- Server component. Fetch `COURSES_QUERY` through `sanityFetch` with a
  `courses` cache tag.
- `export const metadata` with title `"All Courses — Vertex"` and a description.
- Body: `<PageFrame>` → `<SiteHeader activeHref="/courses" />` → header section
  → grid → `<DecorativeBars className="mt-14" />`.

### Header section

- `px-6 pt-10 sm:px-13 sm:pt-13`.
- `<h1>` "All Courses", `font-display text-[34px] leading-[42px] font-bold`
  rising to `text-display-1` at `sm`, matching the course page's H1.
- Below it, `text-body text-neutral-500`: the course count via `pluralize` from
  `web/lib/format.ts` (`"10 courses"`, `"1 course"`).

### Grid

- `mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3`, one `<li>` per course.
- Each card is a `CourseCatalogCard` with `href={`/courses/${slug}`}`, title,
  summary, and `formatLevel` / `formatDuration` / `pluralize` for the meta row —
  the same mapping the home page uses.
- The 76px mark is the course `coverImage`, with the initial-letter fallback.
  `CourseMark` currently lives in `app/page.tsx`; move it into
  `components/ui/course-catalog-card.tsx` as an exported `CourseMark` so both
  pages use one implementation instead of a copy.
- Courses whose slug is null are filtered out.

### Empty state

- If the query returns nothing, show a short line in `text-body
  text-neutral-500` saying no courses are published yet, instead of an empty
  grid.

### Responsive

One column below `sm`, two at `sm`, three at `lg`. No horizontal overflow at
375px.

## Security

- Read-only page rendered on the server through `sanityFetch`; the server-only
  client and its token never reach the browser.
- `urlForImage` is token-free, and `cdn.sanity.io` is already allowed in
  `next.config.ts`.
- No new environment variables, no client components, no writes.

## Acceptance criteria

1. `/courses` lists all ten seed courses, popular first.
2. Each card links to its course page and the title matches on arrival.
3. The home page's "View all courses" and "Explore Courses" links, and the
   course page's "All Courses" breadcrumb, all resolve instead of 404ing.
4. The count line matches the number of cards rendered.
5. The home page renders exactly as before the rename.
6. `npm run typecheck`, `npm run lint` and `npm run build` all pass.

## Checks to run

```bash
npm run typecheck
npm run lint
npm run build
```

Then in the browser: no console errors, `read_page` to confirm ten card links
with correct hrefs, a click through to a course page, a screenshot at desktop
and at 375px, and a check that the home page is unchanged.

## Manual test steps

1. `npm run dev`, open <http://localhost:3000/courses>.
2. Ten cards, heading "All Courses", count reading "10 courses".
3. Click any card — it opens that course page with a matching title.
4. From that page, click the "All Courses" breadcrumb — it returns here.
5. From <http://localhost:3000/>, click "View all courses" and "Explore
   Courses" — both land here.
6. Narrow to ~375px: cards stack in one column, nothing overflows.
7. Confirm the home page's three cards look unchanged.
