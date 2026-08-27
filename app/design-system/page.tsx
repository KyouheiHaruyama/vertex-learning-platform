import type { ReactNode } from "react";
import type { Metadata } from "next";
import {
  AccessibilityIcon,
  BarChartFilledIcon,
  BarChartIcon,
  BellFilledIcon,
  BellIcon,
  BookmarkFilledIcon,
  BookmarkIcon,
  ChevronRightFilledIcon,
  ChevronRightIcon,
  ClockFilledIcon,
  ClockIcon,
  DocumentFilledIcon,
  DocumentIcon,
  ExternalLinkIcon,
  EyeIcon,
  PlayCircleFilledIcon,
  PlayCircleIcon,
  SearchFilledIcon,
  SearchIcon,
  SquaresIcon,
  TargetIcon,
  UserFilledIcon,
  UserIcon,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button, type ButtonState } from "@/components/ui/button";
import { CourseCard } from "@/components/ui/course-card";
import { SearchInput, Select } from "@/components/ui/input";
import { LessonCard } from "@/components/ui/lesson-card";
import { LessonVideoCard } from "@/components/ui/lesson-video-card";
import { Logo } from "@/components/ui/logo";
import { Navbar } from "@/components/ui/navbar";
import { Pagination } from "@/components/ui/pagination";
import { ProgressBar } from "@/components/ui/progress-bar";
import { ResourceCard } from "@/components/ui/resource-card";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Design System — Vertex",
  description:
    "A unified design language for Vertex learning platform. Clean, modern and focused on clarity, consistency and intuitive learning experiences.",
};

export default function DesignSystemPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-4 py-8 sm:px-6 sm:py-10">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <Cover />
        <ColorsSection />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <TypographySection />
        <TypeScaleSection />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SpacingSection />
        <RadiusShadowSection />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2.15fr)_minmax(0,1fr)]">
        <IconsSection />
        <ButtonsSection />
        <InputsSection />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)_minmax(0,1.2fr)]">
        <BadgesSection />
        <StatusSection />
        <ProgressSection />
      </div>

      <CardsSection />
      <NavigationSection />
      <PrinciplesSection />
    </main>
  );
}

/* --- shared shells -------------------------------------------------------- */

function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "@container rounded-lg border border-neutral-200 bg-white/60 p-6",
        className,
      )}
    >
      {children}
    </section>
  );
}

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <span className="text-eyebrow text-primary-500">{number}</span>
      <h2 className="text-eyebrow text-neutral-900">{title}</h2>
    </div>
  );
}

function SubLabel({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-body mb-3 font-medium text-neutral-900">{children}</h3>
  );
}

function SpecList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li key={item} className="text-body flex gap-2 text-neutral-500">
          <span aria-hidden="true">&middot;</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* --- cover ---------------------------------------------------------------- */

function Cover() {
  return (
    <Panel className="flex flex-col justify-between gap-8">
      <Logo />
      <div>
        <h1 className="text-display-1 text-neutral-900">Design System</h1>
        <p className="text-body-lg mt-4 max-w-xs text-neutral-500">
          A unified design language for Vertex learning platform. Clean, modern
          and focused on clarity, consistency and intuitive learning
          experiences.
        </p>
      </div>
      <p className="text-eyebrow text-neutral-500">Version 1.0 &middot; May 2025</p>
    </Panel>
  );
}

/* --- 01 colors ------------------------------------------------------------ */

const primaryColors = [
  { name: "Primary 500", hex: "#F97316", swatch: "bg-primary-500" },
  { name: "Primary 400", hex: "#FB923C", swatch: "bg-primary-400" },
  { name: "Primary 300", hex: "#FDBA74", swatch: "bg-primary-300" },
  { name: "Primary 200", hex: "#FED7AA", swatch: "bg-primary-200" },
  { name: "Primary 100", hex: "#FFEEE5", swatch: "bg-primary-100" },
];

const neutralColors = [
  { name: "Neutral 900", hex: "#0F172A", swatch: "bg-neutral-900" },
  { name: "Neutral 700", hex: "#334155", swatch: "bg-neutral-700" },
  { name: "Neutral 500", hex: "#64748B", swatch: "bg-neutral-500" },
  { name: "Neutral 300", hex: "#CBD5E1", swatch: "bg-neutral-300" },
  { name: "Neutral 200", hex: "#E2E8F0", swatch: "bg-neutral-200" },
  { name: "Neutral 100", hex: "#F1F5F9", swatch: "bg-neutral-100" },
  { name: "Neutral 50", hex: "#FAFAFC", swatch: "bg-neutral-50" },
  { name: "White", hex: "#FFFFFF", swatch: "bg-white" },
];

function Swatch({
  name,
  hex,
  swatch,
}: {
  name: string;
  hex: string;
  swatch: string;
}) {
  return (
    <li>
      <div
        className={cn(
          "h-14 rounded-sm border border-neutral-200 shadow-sm",
          swatch,
        )}
      />
      <p className="text-body mt-3 whitespace-nowrap text-neutral-900">{name}</p>
      <p className="text-small whitespace-nowrap text-neutral-500">{hex}</p>
    </li>
  );
}

function ColorsSection() {
  return (
    <Panel>
      <SectionHeading number="01" title="Colors" />
      <SubLabel>Primary</SubLabel>
      <ul className="grid grid-cols-2 gap-4 @md:grid-cols-3 @2xl:grid-cols-5">
        {primaryColors.map((color) => (
          <Swatch key={color.name} {...color} />
        ))}
      </ul>
      <div className="mt-6">
        <SubLabel>Neutral</SubLabel>
        <ul className="grid grid-cols-2 gap-4 @md:grid-cols-4 @2xl:grid-cols-8">
          {neutralColors.map((color) => (
            <Swatch key={color.name} {...color} />
          ))}
        </ul>
      </div>
    </Panel>
  );
}

/* --- 02 typography -------------------------------------------------------- */

const typefaces = [
  {
    name: "Playfair Display",
    traits: ["Elegant", "Readable", "Timeless"],
    specimen: "font-display font-bold",
  },
  {
    name: "Inter",
    traits: ["Clean", "Modern", "Highly legible"],
    specimen: "font-sans font-medium",
  },
];

function TypographySection() {
  return (
    <Panel>
      <SectionHeading number="02" title="Typography" />
      <ul className="flex flex-col gap-8">
        {typefaces.map((face) => (
          <li key={face.name} className="flex items-center gap-8">
            <span
              aria-hidden="true"
              className={cn(
                "w-24 shrink-0 text-[56px] leading-none text-neutral-900",
                face.specimen,
              )}
            >
              Ag
            </span>
            <div>
              <p className="text-heading-3 text-neutral-900">{face.name}</p>
              <p className="text-body mt-1 text-neutral-500">
                {face.traits.join(" · ")}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/* --- 03 type scale -------------------------------------------------------- */

const typeScale = [
  {
    style: "Display 1",
    font: "Playfair Display",
    size: "48 / 56",
    weight: "Bold",
    use: "Page titles",
    preview: "font-display font-bold",
  },
  {
    style: "Display 2",
    font: "Playfair Display",
    size: "36 / 44",
    weight: "Bold",
    use: "Section titles",
    preview: "font-display font-bold",
  },
  {
    style: "Heading 1",
    font: "Inter",
    size: "28 / 36",
    weight: "Semi Bold",
    use: "Card titles",
    preview: "font-sans font-semibold",
  },
  {
    style: "Heading 2",
    font: "Inter",
    size: "22 / 30",
    weight: "Semi Bold",
    use: "Sub section",
    preview: "font-sans font-semibold",
  },
  {
    style: "Heading 3",
    font: "Inter",
    size: "18 / 26",
    weight: "Medium",
    use: "Small titles",
    preview: "font-sans font-medium",
  },
  {
    style: "Body Large",
    font: "Inter",
    size: "16 / 24",
    weight: "Regular",
    use: "Body copy",
    preview: "font-sans font-normal",
  },
  {
    style: "Body",
    font: "Inter",
    size: "14 / 20",
    weight: "Regular",
    use: "Supporting text",
    preview: "font-sans font-normal",
  },
  {
    style: "Small",
    font: "Inter",
    size: "12 / 16",
    weight: "Regular",
    use: "Captions, meta",
    preview: "font-sans font-normal",
  },
];

function TypeScaleSection() {
  return (
    <Panel>
      <SectionHeading number="03" title="Type Scale" />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-separate border-spacing-y-2 text-left">
          <thead>
            <tr className="text-body text-neutral-900">
              <th scope="col" className="font-normal">
                Style
              </th>
              <th scope="col" className="font-normal">
                Font
              </th>
              <th scope="col" className="font-normal">
                Size / Line Height
              </th>
              <th scope="col" className="font-normal">
                Weight
              </th>
              <th scope="col" className="font-normal">
                Use
              </th>
            </tr>
          </thead>
          <tbody>
            {typeScale.map((row) => (
              <tr key={row.style} className="text-body text-neutral-500">
                <th
                  scope="row"
                  className={cn(
                    "pr-6 text-[16px] whitespace-nowrap text-neutral-900",
                    row.preview,
                  )}
                >
                  {row.style}
                </th>
                <td className="pr-6 whitespace-nowrap">{row.font}</td>
                <td className="pr-6 whitespace-nowrap">{row.size}</td>
                <td className="pr-6 whitespace-nowrap">{row.weight}</td>
                <td className="whitespace-nowrap">{row.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

/* --- 04 spacing ----------------------------------------------------------- */

const spacingScale = [
  { px: 4, rem: "0.25rem" },
  { px: 8, rem: "0.5rem" },
  { px: 12, rem: "0.75rem" },
  { px: 16, rem: "1rem" },
  { px: 24, rem: "1.5rem" },
  { px: 32, rem: "2rem" },
  { px: 40, rem: "2.5rem" },
  { px: 48, rem: "3rem" },
  { px: 64, rem: "4rem" },
];

function SpacingSection() {
  return (
    <Panel>
      <SectionHeading number="04" title="Spacing System" />
      <SubLabel>Base unit: 4px</SubLabel>
      <ul className="flex items-end justify-between gap-3 overflow-x-auto">
        {spacingScale.map((step) => (
          <li
            key={step.px}
            className="flex shrink-0 flex-col items-center gap-3"
          >
            <span
              aria-hidden="true"
              className="block rounded-xs bg-primary-200"
              style={{ width: step.px, height: step.px }}
            />
            <span className="text-small text-neutral-900">{step.px}</span>
            <span className="text-small whitespace-nowrap text-neutral-500">
              ({step.rem})
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/* --- 05 radius & shadows -------------------------------------------------- */

const radiusScale = [
  { label: "4px", name: "(xs)", className: "rounded-xs" },
  { label: "8px", name: "(sm)", className: "rounded-sm" },
  { label: "12px", name: "(md)", className: "rounded-md" },
  { label: "16px", name: "(lg)", className: "rounded-lg" },
  { label: "24px", name: "(xl)", className: "rounded-xl" },
  { label: "Full", name: "(circle)", className: "rounded-full" },
];

const shadowScale = [
  {
    name: "Sm",
    offset: "0 1px 2px 0",
    color: "rgba(15, 23, 42, 0.05)",
    className: "shadow-sm",
  },
  {
    name: "Md",
    offset: "0 4px 12px -2px",
    color: "rgba(15, 23, 42, 0.08)",
    className: "shadow-md",
  },
  {
    name: "Lg",
    offset: "0 12px 24px -4px",
    color: "rgba(15, 23, 42, 0.10)",
    className: "shadow-lg",
  },
  {
    name: "Xl",
    offset: "0 20px 40px -8px",
    color: "rgba(15, 23, 42, 0.12)",
    className: "shadow-xl",
  },
];

function RadiusShadowSection() {
  return (
    <Panel>
      <SectionHeading number="05" title="Radius & Shadows" />
      <SubLabel>Radius</SubLabel>
      <ul className="flex flex-wrap gap-6">
        {radiusScale.map((radius) => (
          <li key={radius.label} className="flex flex-col items-center gap-3">
            <span
              aria-hidden="true"
              className={cn(
                "block size-12 border border-primary-200 bg-white",
                radius.className,
              )}
            />
            <span className="text-body text-neutral-900">{radius.label}</span>
            <span className="text-small text-neutral-500">{radius.name}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <SubLabel>Shadows</SubLabel>
        <ul className="grid gap-3 @md:grid-cols-2 @xl:grid-cols-4">
          {shadowScale.map((shadow) => (
            <li
              key={shadow.name}
              className={cn(
                "rounded-sm bg-white p-3",
                shadow.className,
              )}
            >
              <p className="text-heading-3 font-semibold text-neutral-900">
                {shadow.name}
              </p>
              <p className="text-small mt-2 whitespace-nowrap text-neutral-500">
                {shadow.offset}
              </p>
              <p className="text-small whitespace-nowrap text-neutral-500">
                {shadow.color}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}

/* --- 06 icons ------------------------------------------------------------- */

const outlineIcons = [
  { name: "Notifications", Icon: BellIcon },
  { name: "Search", Icon: SearchIcon },
  { name: "Play", Icon: PlayCircleIcon },
  { name: "Notes", Icon: DocumentIcon },
  { name: "Bookmark", Icon: BookmarkIcon },
  { name: "Level", Icon: BarChartIcon },
  { name: "Duration", Icon: ClockIcon },
  { name: "Account", Icon: UserIcon },
  { name: "Next", Icon: ChevronRightIcon },
];

const filledIcons = [
  { name: "Notifications", Icon: BellFilledIcon },
  { name: "Search", Icon: SearchFilledIcon },
  { name: "Play", Icon: PlayCircleFilledIcon },
  { name: "Notes", Icon: DocumentFilledIcon },
  { name: "Bookmark", Icon: BookmarkFilledIcon },
  { name: "Level", Icon: BarChartFilledIcon },
  { name: "Duration", Icon: ClockFilledIcon },
  { name: "Account", Icon: UserFilledIcon },
  { name: "Next", Icon: ChevronRightFilledIcon },
];

function IconRow({
  icons,
}: {
  icons: { name: string; Icon: typeof BellIcon }[];
}) {
  return (
    <ul className="flex flex-wrap items-center gap-3 text-neutral-900 @sm:gap-5">
      {icons.map(({ name, Icon }) => (
        <li key={name} title={name}>
          <Icon size={24} />
          <span className="sr-only">{name}</span>
        </li>
      ))}
    </ul>
  );
}

function IconsSection() {
  return (
    <Panel>
      <SectionHeading number="06" title="Icons" />
      <SubLabel>Outline Style</SubLabel>
      <IconRow icons={outlineIcons} />
      <div className="mt-8">
        <SubLabel>Filled Style</SubLabel>
        <IconRow icons={filledIcons} />
      </div>
      <div className="mt-8">
        <SubLabel>Icon Specs</SubLabel>
        <SpecList
          items={[
            "24x24px grid",
            "2px stroke width (outline)",
            "Rounded line caps",
            "Consistent optical balance",
          ]}
        />
      </div>
    </Panel>
  );
}

/* --- 07 buttons ----------------------------------------------------------- */

const buttonStates: { label: string; state: ButtonState }[] = [
  { label: "Default", state: "default" },
  { label: "Hover", state: "hover" },
  { label: "Disabled", state: "disabled" },
];

function ButtonsSection() {
  return (
    <Panel>
      <SectionHeading number="07" title="Buttons" />
      <div className="overflow-x-auto">
        <div className="grid w-max grid-cols-[auto_repeat(4,auto)] items-center gap-x-4 gap-y-4">
          <span />
          <span className="text-body text-neutral-500">Primary</span>
          <span className="text-body text-neutral-500">Secondary</span>
          <span className="text-body text-neutral-500">Tertiary</span>
          <span className="text-body text-neutral-500">Text</span>

          {buttonStates.map(({ label, state }) => (
            <ButtonRow key={state} label={label} state={state} />
          ))}
        </div>
      </div>
      <div className="mt-8">
        <SubLabel>Button Specs</SubLabel>
        <SpecList
          items={[
            "Height: 44px (default)",
            "Padding: 0 16px (lg), 0 12px (md)",
            "Radius: 12px",
            "Font: Inter Medium (14–16px)",
          ]}
        />
      </div>
    </Panel>
  );
}

function ButtonRow({ label, state }: { label: string; state: ButtonState }) {
  return (
    <>
      <span className="text-body whitespace-nowrap text-neutral-900">
        {label}
      </span>
      <span>
        <Button variant="primary" size="md" state={state}>
          Get Started
        </Button>
      </span>
      <span>
        <Button variant="secondary" size="md" state={state}>
          Explore Courses
        </Button>
      </span>
      <span>
        <Button variant="tertiary" size="md" state={state}>
          View Lesson
          <ExternalLinkIcon size={16} />
        </Button>
      </span>
      <span>
        <Button variant="text" state={state}>
          Watch Video
          <PlayCircleFilledIcon size={18} />
        </Button>
      </span>
    </>
  );
}

/* --- 08 inputs ------------------------------------------------------------ */

function InputsSection() {
  return (
    <Panel>
      <SectionHeading number="08" title="Inputs" />
      <SubLabel>
        <label htmlFor="ds-search">Search / Text Input</label>
      </SubLabel>
      <SearchInput
        id="ds-search"
        placeholder="Search anything..."
        hint="⌘ K"
      />
      <div className="mt-6">
        <SubLabel>
          <label htmlFor="ds-sort">Select</label>
        </SubLabel>
        <Select id="ds-sort" defaultValue="relevant">
          <option value="relevant">Most Relevant</option>
          <option value="recent">Most Recent</option>
          <option value="popular">Most Popular</option>
        </Select>
      </div>
      <div className="mt-8">
        <SubLabel>Field Specs</SubLabel>
        <SpecList
          items={[
            "Height: 44px",
            "Radius: 12px",
            "Border: 1px solid #E2E8F0",
            "Padding: 0 16px",
            "Focus: Border color #FB923C",
          ]}
        />
      </div>
    </Panel>
  );
}

/* --- 09 badges ------------------------------------------------------------ */

function BadgesSection() {
  return (
    <Panel>
      <SectionHeading number="09" title="Badges / Tags" />
      <ul className="flex flex-wrap gap-8">
        <li>
          <p className="text-body mb-3 text-neutral-500">Video</p>
          <Badge tone="video">Video</Badge>
        </li>
        <li>
          <p className="text-body mb-3 text-neutral-500">Lesson</p>
          <Badge tone="lesson">Lesson</Badge>
        </li>
        <li>
          <p className="text-body mb-3 text-neutral-500">Popular</p>
          <Badge tone="popular">Popular</Badge>
        </li>
      </ul>
    </Panel>
  );
}

/* --- 10 status ------------------------------------------------------------ */

function StatusSection() {
  return (
    <Panel>
      <SectionHeading number="10" title="Status / Indicators" />
      <ul className="flex flex-wrap items-center gap-5">
        <li>
          <StatusIndicator status="in-progress" />
        </li>
        <li>
          <StatusIndicator status="completed" />
        </li>
        <li>
          <StatusIndicator status="now-playing" />
        </li>
        <li>
          <StatusIndicator status="locked" />
        </li>
      </ul>
    </Panel>
  );
}

/* --- 11 progress ---------------------------------------------------------- */

function ProgressSection() {
  return (
    <Panel>
      <SectionHeading number="11" title="Progress Bar" />
      <ProgressBar value={35} label="Example course progress" />
    </Panel>
  );
}

/* --- 12 cards ------------------------------------------------------------- */

function CardsSection() {
  return (
    <Panel>
      <SectionHeading number="12" title="Cards" />
      <div className="grid gap-6 @2xl:grid-cols-2 @5xl:grid-cols-4">
        <div>
          <p className="text-body mb-3 text-neutral-500">Course Card</p>
          <CourseCard
            title="Next.js for Production"
            description="Build scalable, high-performance web applications with Next.js."
            level="Intermediate"
            duration="18h 24m"
            moduleCount="12 modules"
            mark={
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-neutral-900 text-[18px] font-semibold text-white"
              >
                N
              </span>
            }
          />
        </div>
        <div>
          <p className="text-body mb-3 text-neutral-500">Lesson Card (Video)</p>
          <LessonVideoCard
            title="Data Fetching in Server Components"
            description="Learn how to fetch data on the server using async/await and Next.js best practices."
            lessonLabel="Lesson 5.1"
            duration="12:45"
            startLabel="12:45"
            href="/design-system"
          />
        </div>
        <div>
          <p className="text-body mb-3 text-neutral-500">Lesson Card (Lesson)</p>
          <LessonCard
            title="Data Fetching & Caching"
            description="Explore different data fetching methods in Next.js and how to cache and revalidate data for optimal performance."
            moduleLabel="Module 5"
            href="/design-system"
          />
        </div>
        <div>
          <p className="text-body mb-3 text-neutral-500">Resource Card</p>
          <ResourceCard
            title="Caching and Revalidation Guide"
            description="Deep dive into Next.js caching strategies."
            fileType="PDF"
            fileSize="1.2 MB"
            href="/design-system"
          />
        </div>
      </div>
    </Panel>
  );
}

/* --- 13 navigation -------------------------------------------------------- */

function NavigationSection() {
  return (
    <Panel>
      <SectionHeading number="13" title="Navigation" />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_minmax(0,1fr)] lg:divide-x lg:divide-neutral-200">
        <div className="lg:pr-8">
          <Navbar
            links={[
              { label: "Courses", href: "/design-system", active: true },
              { label: "My Learning", href: "/design-system" },
            ]}
          />
        </div>
        <div className="lg:px-8">
          <p className="text-body mb-3 text-neutral-500">Breadcrumbs</p>
          <Breadcrumbs
            items={[
              { label: "All Courses", href: "/design-system" },
              { label: "Next.js for Production", href: "/design-system" },
              { label: "Data Fetching & Caching" },
            ]}
          />
        </div>
        <div className="lg:pl-8">
          <p className="text-body mb-3 text-neutral-500">Pagination</p>
          <Pagination
            page={1}
            totalPages={8}
            hrefFor={(page) => `/design-system?page=${page}`}
          />
        </div>
      </div>
    </Panel>
  );
}

/* --- 14 principles -------------------------------------------------------- */

const principles = [
  {
    title: "Clarity First",
    description: "Every element should communicate clearly.",
    Icon: EyeIcon,
    emphasised: false,
  },
  {
    title: "Consistency",
    description: "Use components and patterns consistently across the platform.",
    Icon: SquaresIcon,
    emphasised: false,
  },
  {
    title: "Focus & Calm",
    description: "Remove noise and help learners focus on what matters.",
    Icon: TargetIcon,
    emphasised: false,
  },
  {
    title: "Accessible",
    description: "Design with accessibility and inclusivity in mind.",
    Icon: AccessibilityIcon,
    emphasised: true,
  },
];

function PrinciplesSection() {
  return (
    <Panel>
      <SectionHeading number="14" title="Principles" />
      <ul className="grid gap-6 @2xl:grid-cols-2 @5xl:grid-cols-4">
        {principles.map(({ title, description, Icon, emphasised }) => (
          <li key={title} className="flex gap-4">
            <span
              className={cn(
                "shrink-0 text-neutral-900",
                emphasised && "rounded-full bg-primary-100 p-2",
              )}
            >
              <Icon size={24} />
            </span>
            <div>
              <p className="text-body font-semibold text-neutral-900">
                {title}
              </p>
              <p className="text-body mt-1 text-neutral-500">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
