# Course page (`/courses/[slug]`)

## Goal

Build the course detail page shown in `design/vertex-course.png`, rendering the
real Sanity seed content that is already in the dataset (10 courses, 120
lessons). Reconcile the Studio schema with the field names that content
actually uses, so the page can read duration, thumbnails and outcome icons.

Only this page. No catalog, no lesson page, no progress backend.

---

## Skills and docs read

- `AGENTS.md` — sections 3 (UI work), 5 (app structure), 7 (settled
  decisions), 8 (data model), 12 (gotchas), 13 (checks).
- `~/.claude/skills/sanity-best-practices/SKILL.md` — schema definitions with
  `defineType`/`defineField`, GROQ projections, TypeGen workflow.
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/dynamic-routes.md`
  — in this version `params` is a **Promise** and must be awaited.
- `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-static-params.md`

## Code and data checked

- `studio/schemaTypes/**` — `course`, `module`, `lesson`, `learningOutcome`,
  `resource`.
- `web/sanity/queries.ts` — `COURSE_BY_SLUG_QUERY` already exists and projects
  everything the page needs, except that three field names are wrong.
- `web/sanity/{client,fetch,image,env}.ts` — server-only client, `sanityFetch`
  with `next: { revalidate }`, `urlForImage`.
- `web/components/ui/*` — `PageFrame`, `Navbar`, `Breadcrumbs`, `Badge`,
  `Button`/`buttonClasses`, `ProgressBar`, `Card`, `HomeCourseCard`.
- `web/components/icons/index.tsx` — 24×24 grid, 2px stroke, `Outline`/`Filled`
  helpers.
- `web/app/page.tsx` — `SiteHeader` and `DecorativeBars` are local functions
  there; both are needed on this page too.
- `web/app/globals.css` — colour/type/radius/shadow tokens.
- Live dataset, queried with the Viewer token: 6 categories, 5 instructors,
  10 courses, 120 lessons, cover images and thumbnails uploaded.

---

## Decisions and assumptions

### 1. Schema follows the data (confirmed with the user)

The imported content and the schema disagree. The dataset is authoritative;
the schema and the GROQ get renamed. No dataset writes, no re-import — the
Viewer token is enough.

| Where | Dataset has | Schema had |
|---|---|---|
| `lesson` | `duration` (seconds) | `durationSeconds` |
| `lesson` | `thumbnail` | `poster` |
| `resource` | `type` (all values `"link"`) | `kind` |
| `learningOutcome.icon` | `layers`, `workflow`, `gauge`, `rocket`, `sparkles`, `shield`, `puzzle`, `code` | `chart`, `clock`, `document`, `play`, `bookmark`, `target` |

### 2. Progress is rendered in its "not started" state (confirmed with the user)

There is no progress document type, no write token and no server route yet, so
the page must not invent "35% complete". The bottom bar renders 0% and a
**Start Learning** call to action. The component takes
`{ percentComplete, resumeHref, resumeLabel }` as props so the real progress
feature can drop in without touching the layout.

### 3. Lesson rows are not links yet (confirmed with the user)

`/lessons/[slug]` does not exist. Expanded module rows show lesson title,
duration and a Free preview badge as plain text. The breadcrumb's **All
Courses** points at `/courses`, which is also not built yet and will 404 until
it is — that is the correct eventual destination, so the link stays.

### 4. Typography follows the design system, not the screenshot's fallback font

Body text in `vertex-course.png` renders in a serif because the mockup was
captured before Inter loaded — `vertex-home.png` shows the same copy in Inter.
Keep Playfair for the display headings (H1, section headings) and Inter
everywhere else, matching the merged home page and `vertex-designsystem.png`.

### 5. Orange follows the tokens, not the screenshot

The course mockup's orange samples as `#d8704f`; `vertex-designsystem.png` (the
token source) samples as `#f97316` = `--color-primary-500`, which is what the
home page already ships. Use the token.

### 6. Frame and gutters follow the home page

The two mockups were rendered at slightly different widths, so the course
mockup's gutter measures narrower than the home page's. Cross-page consistency
wins: reuse `PageFrame` (`max-w-[1120px]`) and the home page's paddings
(`px-6 sm:px-10` for the header, `px-6 sm:px-13` for sections). Internal
proportions inside the frame follow the course mockup.

### 7. Display-only controls

**Bookmark** has no store behind it, exactly like the notification bell the home
page already renders. It ships as a display-only tertiary button.

### 8. "Show all N modules" only appears when it does something

The mockup shows 6 of 12 modules behind an expander. Seed courses have 4
modules each, so the list renders all of them and the expander does not appear.
Rule: render the first 6 modules, and the toggle only when there are more.

---

## Files to change

### Studio

- `studio/schemaTypes/documents/lesson.ts` — rename `durationSeconds` → `duration`
  (keep the title "Duration (seconds)" and the description so the unit stays
  obvious), rename `poster` → `thumbnail`.
- `studio/schemaTypes/objects/resource.ts` — rename `kind` → `type`, and add
  `{ title: "Link", value: "link" }` to the options list (the only value the
  content uses today) ahead of the existing entries.
- `studio/schemaTypes/objects/learning-outcome.ts` — replace the icon options
  list with the eight values above.

### Web — data layer

- `web/sanity/queries.ts`
  - `COURSE_BY_SLUG_QUERY`: `modules[].lessons[]->` projects `duration` instead
    of `durationSeconds`.
  - `LESSON_BY_SLUG_QUERY`: `poster` → `thumbnail`, `durationSeconds` →
    `duration`, `resources[]{ _key, kind, … }` → `resources[]{ _key, type, … }`.
- `web/sanity.types.ts` — regenerated by `npm run typegen`, not hand-edited.
- `web/next.config.ts` — add
  `images: { remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }] }`
  so `next/image` can serve Sanity assets.

### Web — new helpers

- `web/lib/format.ts`
  - `formatDuration(seconds)` → `"18h 24m"`, `"45m"`, `"1h"`. Rounds to whole
    minutes; returns `null` for null/0 so callers can omit the row.
  - `formatCount(n)` → `"2.1k"`, `"940"`, `"18.2k"`.
  - `formatLevel(level)` → `"Intermediate"`.

### Web — icons

`web/components/icons/index.tsx`, same `Outline` helper and 24×24 grid:

- `UsersIcon` — two-person mark for the students meta item.
- Outcome icons, one per schema value: `LayersIcon`, `WorkflowIcon`,
  `GaugeIcon`, `RocketIcon`, `SparklesIcon`, `ShieldIcon`, `PuzzleIcon`,
  `CodeIcon`.

### Web — shared components extracted from the home page

- `web/components/ui/site-header.tsx` — move `SiteHeader` out of
  `app/page.tsx` verbatim, add an `activeHref` prop so "Courses" can be marked
  current on this page. `app/page.tsx` imports it instead of defining it.
- `web/components/ui/decorative-bars.tsx` — move `DecorativeBars`, `Bar`,
  `leftBars`, `rightBars` out of `app/page.tsx` verbatim. `app/page.tsx`
  imports it.

These two moves must not change how the home page renders.

### Web — course components

`web/components/course/`:

- `course-hero.tsx` (server) — cover, POPULAR badge, title, summary, meta row,
  actions.
- `learning-outcomes.tsx` (server) — the "What you'll learn" panel, including
  the `icon` string → component map.
- `course-content.tsx` (`"use client"`) — the "Course Content" list: accordion
  state per module and the show-all state.
- `course-progress.tsx` (server) — the bottom progress panel.

### Web — the page

- `web/app/courses/[slug]/page.tsx`

---

## Requirements

### Route

- Server component. `params` is a Promise — `const { slug } = await params`.
- Fetch with `sanityFetch({ query: COURSE_BY_SLUG_QUERY, params: { slug } })`.
  `notFound()` when the result is null.
- `generateStaticParams` from `COURSE_SLUGS_QUERY`, filtering out null slugs.
- `generateMetadata` returning the course title and summary.
- Page body: `<PageFrame>` → `<SiteHeader activeHref="/courses" />` →
  breadcrumbs → hero → outcomes → content → progress → `<DecorativeBars />`.

### Derived values (computed in the page, never stored)

- `totalSeconds` = sum of every lesson `duration` across every module.
- `moduleSeconds` = sum of that module's lesson durations.
- Module numbers come from array index + 1, never from a stored field.
- Missing durations count as 0 and must not produce `NaN`.

### Hero

- Two columns on `md+`, stacked on mobile. Left column ~320px fixed; right
  column fills. Gap ~70px on desktop.
- Cover: `next/image` via `urlForImage(coverImage).width(720).height(840).url()`,
  `alt` from `coverImage.alt`, `rounded-xl`, `object-cover`, aspect ratio
  ~`4 / 4.65` (the mockup's tile is 280×325). Full width when stacked.
- `<Badge tone="popular">Popular</Badge>` above the title, only when
  `popular` is true.
- H1: `font-display text-[48px] leading-[56px] font-bold` (`text-display-1`),
  dropping to `text-[34px] leading-[42px]` on mobile.
- Summary: `text-lead text-neutral-700`, `max-w-[520px]`.
- Meta row, `text-body text-neutral-700`, 16px icons in `text-neutral-500`,
  `gap-x-8 gap-y-3 flex-wrap`, each item omitted when its value is missing:
  - `BarChartIcon` + `formatLevel(level)`
  - `ClockIcon` + `formatDuration(totalSeconds)`
  - `DocumentIcon` + `"{n} modules"` (singular when 1)
  - `UsersIcon` + `"{formatCount(studentCount)} students"`
- Actions: primary `size="hero"` **Start Learning** with `ArrowRightIcon`, and
  a tertiary `size="hero"` **Bookmark** with `BookmarkIcon`. Both 60px tall per
  the mockup (205×53 and 143×49 measured, at the mockup's ~0.86 scale).

### What you'll learn

- Outer panel: `rounded-lg border border-neutral-200/70 bg-white/40 p-8`.
  The mockup's panels read as the warm canvas with a hairline warm border, not
  pure white — use `bg-white/40` over the canvas to land on that value.
- Heading `font-display text-[28px] leading-9 font-bold`.
- 2-column grid on `md+`, 1 column below, `gap-6`.
- Each outcome card: `rounded-lg border border-neutral-200/70 p-7`, icon at
  44px in `text-primary-500` with `strokeWidth={1.5}`, then title
  (`text-heading-3 text-neutral-900`) and description (`text-body
  text-neutral-500 mt-2`) in a column to the icon's right, `gap-5`.
- Unknown `icon` values fall back to `SquaresIcon` rather than crashing.

### Course Content

- Header row: `font-display text-[28px] leading-9 font-bold` heading on the
  left; on the right, `text-body text-neutral-500`, `"{n} modules · {total}"`
  with a `·` separator.
- List: `rounded-lg border border-neutral-200/70 overflow-hidden`, rows
  separated by `divide-y divide-neutral-200/70`.
- Row (min-height 70px, `px-6`):
  - A numbered circle, `size-11 rounded-full border border-neutral-200
    bg-canvas`, number in `text-body text-neutral-700`, centred.
  - A single-pixel vertical connector running the full list height **through
    the circle centres**, behind them: `absolute left-[46px] top-0 bottom-0
    w-px bg-neutral-200/70`, circles opaque on top. (Measured: card edge to
    circle centre = 46px.)
  - Title `text-body font-semibold text-neutral-900`, summary `text-body
    text-neutral-500 mt-0.5`.
  - Right side: `formatDuration(moduleSeconds)` in `text-body text-neutral-500`,
    then a `ChevronDownIcon` that rotates 180° when open.
- The whole row is the toggle: a `<button>` spanning the row with
  `aria-expanded` and `aria-controls` pointing at the panel.
- Expanded panel lists that module's lessons: `Lesson {m}.{n}`, title,
  `formatDuration(duration)`, and `<Badge tone="lesson">Free preview</Badge>`
  when `freePreview`. Plain text, no links (decision 3).
- Show the first 6 modules. When there are more, render a centred tertiary
  **Show all {n} modules** button with a `ChevronDownIcon` that reveals the
  rest and switches to **Show fewer modules**.

### Progress

- `rounded-lg border border-neutral-200/70 bg-white/40 px-8 py-6 shadow-sm`,
  the last section inside the frame, sitting above `DecorativeBars`.
- Left: `"Your Progress"` in `text-body text-neutral-500`, and
  `"{n}% complete"` below with the number in `font-semibold text-neutral-900`.
- Middle: the `ProgressBar` track, flexible width.
- Right: primary `size="hero"` **Start Learning** with `ArrowRightIcon`,
  linking to the first lesson of the first module.
- Stacks to a single column below `md`.
- `ProgressBar` gains `showValue?: boolean` (default `true`) so this layout can
  render the track alone without changing the design-system page.

### Responsive

Desktop is the reference and must be exact. Below `md`: hero stacks with the
cover first, actions go full width, outcomes drop to one column, the content
row's duration moves under the title, and the progress panel stacks.

---

## Security

- Nothing here touches a token. The page renders on the server through
  `sanityFetch`; `web/sanity/client.ts` is `server-only` and stays that way.
- `course-content.tsx` is the only client component and receives plain
  serialisable props — titles, summaries, durations, flags. No tokens, no
  client Sanity calls, no writes.
- `urlForImage` is token-free and safe to run anywhere; `cdn.sanity.io` is
  added to `images.remotePatterns` rather than disabling optimisation.
- No new environment variables, and `.env.example` is unchanged.

---

## Acceptance criteria

1. `/courses/nextjs-app-router-in-depth` renders the layout in the reference:
   breadcrumb, hero, "What you'll learn", "Course Content", progress panel,
   decorative bars.
2. Every value on the page comes from Sanity. No hardcoded course data.
3. Total duration, module durations, module numbers and lesson numbers are
   derived and correct — a course with 12 lessons across 4 modules shows the
   sum of its 12 lesson durations.
4. The POPULAR badge appears on popular courses and is absent otherwise.
5. Module rows expand and collapse, with correct `aria-expanded`, and are
   reachable and operable by keyboard.
6. An unknown slug 404s.
7. All ten seed courses render without a runtime error.
8. The home page is visually unchanged after the `SiteHeader` and
   `DecorativeBars` extractions.
9. `npm run typegen`, `npm run typecheck`, `npm run lint` and `npm run build`
   all pass.

---

## Checks to run

```bash
npm run typegen      # schema.json + web/sanity.types.ts after the renames
npm run typecheck    # web + studio
npm run lint
npm run build
```

Then the dev server, verified in the browser rather than by hand-waving:
console clean, network clean, `read_page` for structure, a screenshot of the
rendered page against the reference.

---

## Manual test steps

1. `npm run dev`, open <http://localhost:3000/courses/nextjs-app-router-in-depth>.
2. Compare against `design/vertex-course.png`: breadcrumb, cover, POPULAR
   badge, serif H1, summary, the four meta items, the two hero buttons.
3. Check the meta row against the data: 4 modules, 12 lessons, and a total
   duration equal to the sum of those lessons.
4. Click a module row — it expands to its lessons with `Lesson 1.1`-style
   numbering and a Free preview badge where the lesson is free. Click again to
   collapse. Repeat with the keyboard (Tab, Enter/Space).
5. Confirm there is no "Show all modules" button, since these courses have 4
   modules.
6. Confirm the progress panel reads `0% complete` with a **Start Learning**
   button — not a fabricated 35%.
7. Visit <http://localhost:3000/courses/practical-web-security> and
   <http://localhost:3000/courses/python-for-data-work> — both render, the
   second without a POPULAR badge.
8. Visit <http://localhost:3000/courses/does-not-exist> — 404.
9. Narrow the window to ~375px: hero stacks, nothing overflows horizontally.
10. Open <http://localhost:3000/> and confirm the home page is unchanged.
