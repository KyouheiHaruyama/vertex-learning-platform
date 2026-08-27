import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon, BellIcon, StarIcon } from "@/components/icons";
import { buttonClasses } from "@/components/ui/button";
import { HomeCourseCard } from "@/components/ui/home-course-card";
import { SearchInput } from "@/components/ui/input";
import { Navbar } from "@/components/ui/navbar";
import { PageFrame } from "@/components/ui/page-frame";

export default function Home() {
  return (
    <PageFrame>
      <SiteHeader />
      <Hero />
      <AllCourses />
      <UpdateNote />
      <DecorativeBars />
    </PageFrame>
  );
}

/* --- header --------------------------------------------------------------- */

function SiteHeader() {
  return (
    <Navbar
      density="page"
      logoSize="lg"
      className="shrink-0 border-b border-neutral-200/70 px-6 py-4 sm:h-24 sm:py-0 sm:px-10"
      links={[
        { label: "Courses", href: "/courses" },
        { label: "My Learning", href: "/my-learning" },
      ]}
      actions={
        <>
          <button
            type="button"
            aria-label="Notifications"
            className="rounded-xs text-neutral-900 transition-colors hover:text-primary-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-400"
          >
            <BellIcon size={24} />
          </button>
          <Show when="signed-out">
            <div className="flex items-center gap-3">
              <SignInButton>
                <button
                  type="button"
                  className={buttonClasses({ variant: "tertiary", size: "md" })}
                >
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton>
                <button
                  type="button"
                  className={buttonClasses({ variant: "primary", size: "md" })}
                >
                  Sign up
                </button>
              </SignUpButton>
            </div>
          </Show>
          <Show when="signed-in">
            <UserButton
              appearance={{ elements: { avatarBox: "size-10" } }}
            />
          </Show>
        </>
      }
    />
  );
}

/* --- hero ----------------------------------------------------------------- */

function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="border-b border-neutral-200/70 px-6 pt-14 pb-10 text-center sm:px-13 sm:pt-18 sm:pb-13"
    >
      <p className="text-eyebrow inline-flex h-10 items-center rounded-full border border-neutral-200/80 bg-white/70 px-4 tracking-[0.15em] text-primary-500">
        Intelligent Learning
      </p>

      <h1
        id="hero-title"
        className="mx-auto mt-10 max-w-[640px] font-display text-[40px] leading-[48px] font-bold text-neutral-900 sm:text-display-hero"
      >
        Search your learning in plain English.
      </h1>

      <p className="text-body-lg mx-auto mt-8 max-w-[460px] text-neutral-700 sm:text-lead">
        Vertex understands what you want to learn and finds the exact lessons
        across all your courses.
      </p>

      <div className="mt-10 flex justify-center">
        <Link
          href="/courses"
          className={buttonClasses({
            size: "hero",
            className: "w-full sm:w-auto",
          })}
        >
          Explore Courses
          <ArrowRightIcon size={20} />
        </Link>
      </div>

      <SearchInput
        size="hero"
        aria-label="Ask anything about your learning"
        placeholder="Ask anything about your learning..."
        hint="⌘ K"
        containerClassName="mx-auto mt-10 max-w-[860px]"
      />
    </section>
  );
}

/* --- all courses ---------------------------------------------------------- */

const NEXT_BLACK = "#0B0B0B";
const DOCKER_BLUE = "#2496ED";
const TYPESCRIPT_BLUE = "#3178C6";

/** Placeholder course marks. These become real logo assets from Sanity once
 *  courses are modelled; the shape of each entry matches a course document. */
const courses = [
  {
    title: "Next.js for Production",
    description:
      "Build scalable, high-performance web applications with Next.js.",
    level: "Intermediate",
    duration: "18h 24m",
    moduleCount: "12 modules",
    initials: "N",
    background: NEXT_BLACK,
    serif: true,
  },
  {
    title: "Docker Essentials",
    description:
      "Containerize applications and streamline your development workflow.",
    level: "Beginner",
    duration: "10h 12m",
    moduleCount: "8 modules",
    initials: "D",
    background: DOCKER_BLUE,
    serif: false,
  },
  {
    title: "TypeScript Deep Dive",
    description:
      "Go beyond the basics and write safer, more expressive code.",
    level: "Intermediate",
    duration: "14h 36m",
    moduleCount: "10 modules",
    initials: "TS",
    background: TYPESCRIPT_BLUE,
    serif: false,
  },
];

function CourseMark({
  initials,
  background,
  serif,
}: {
  initials: string;
  background: string;
  serif: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      style={{ backgroundColor: background }}
      className={`flex size-19 items-center justify-center rounded-lg font-bold text-white ${
        serif ? "font-display text-[34px]" : "text-[26px]"
      }`}
    >
      {initials}
    </span>
  );
}

function AllCourses() {
  return (
    <section
      aria-labelledby="all-courses-title"
      className="px-6 pt-10 sm:px-13 sm:pt-13"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2
          id="all-courses-title"
          className="font-display text-[28px] leading-9 font-bold text-neutral-900"
        >
          All Courses
        </h2>
        <Link
          href="/courses"
          className="text-body-lg inline-flex items-center gap-3 rounded-xs font-normal text-primary-500 transition-colors hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-400"
        >
          View all courses
          <ArrowRightIcon size={16} />
        </Link>
      </div>

      <ul className="mt-8 grid gap-5 md:grid-cols-3">
        {courses.map((course) => (
          <li key={course.title} className="flex">
            <HomeCourseCard
              title={course.title}
              description={course.description}
              level={course.level}
              duration={course.duration}
              moduleCount={course.moduleCount}
              mark={
                <CourseMark
                  initials={course.initials}
                  background={course.background}
                  serif={course.serif}
                />
              }
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

/* --- update note ---------------------------------------------------------- */

function UpdateNote() {
  return (
    <div className="mt-14 flex items-center gap-6 px-6 sm:mt-18 sm:px-13">
      <Rule className="hidden bg-gradient-to-r from-transparent to-neutral-200 sm:block" />
      <p className="text-body-lg inline-flex min-w-0 items-center gap-4 text-center text-neutral-700 sm:shrink-0 sm:text-left">
        <StarIcon size={24} className="text-primary-500" />
        New courses and lessons added every week.
      </p>
      <Rule className="hidden bg-gradient-to-r from-neutral-200 to-transparent sm:block" />
    </div>
  );
}

function Rule({ className }: { className: string }) {
  return <span aria-hidden="true" className={`h-px min-w-0 flex-1 ${className}`} />;
}

/* --- decorative bars ------------------------------------------------------ */

/** Relative width and height of each bar, matching the reference silhouette. */
const leftBars = [
  { w: 7.3, h: 55 },
  { w: 5.5, h: 74 },
  { w: 4.2, h: 86 },
  { w: 5.5, h: 100 },
  { w: 9, h: 72 },
  { w: 5.1, h: 58 },
];

const rightBars = [
  { w: 2.9, h: 46 },
  { w: 8.2, h: 60 },
  { w: 7.8, h: 76 },
  { w: 4.8, h: 88 },
  { w: 6.4, h: 100 },
  { w: 4.8, h: 62 },
  { w: 4.6, h: 72 },
  { w: 9.3, h: 90 },
];

function DecorativeBars() {
  return (
    <div aria-hidden="true" className="mt-10 h-50 overflow-hidden">
      <div className="flex h-full w-full items-end gap-[3px] blur-[6px]">
        {leftBars.map((bar, index) => (
          <Bar key={`l${index}`} {...bar} />
        ))}
        <span className="h-px w-[10%]" />
        {rightBars.map((bar, index) => (
          <Bar key={`r${index}`} {...bar} />
        ))}
      </div>
    </div>
  );
}

function Bar({ w, h }: { w: number; h: number }): ReactNode {
  return (
    <span
      style={{ width: `${w}%`, height: `${h}%` }}
      className="bg-gradient-to-t from-transparent via-primary-400/75 to-transparent"
    />
  );
}
