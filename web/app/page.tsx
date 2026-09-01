import Link from "next/link";
import { ArrowRightIcon, StarIcon } from "@/components/icons";
import { buttonClasses } from "@/components/ui/button";
import { DecorativeBars } from "@/components/ui/decorative-bars";
import {
  CourseCatalogCard,
  CourseMark,
} from "@/components/ui/course-catalog-card";
import { SearchInput } from "@/components/ui/input";
import { PageFrame } from "@/components/ui/page-frame";
import { SiteHeader } from "@/components/ui/site-header";
import { formatDuration, formatLevel, pluralize } from "@/lib/format";
import { sanityFetch } from "@/sanity/fetch";
import { HOME_COURSES_QUERY } from "@/sanity/queries";
import type { HOME_COURSES_QUERY_RESULT } from "@/sanity.types";

export default async function Home() {
  const courses = await sanityFetch({ query: HOME_COURSES_QUERY });

  return (
    <PageFrame>
      <SiteHeader />
      <Hero />
      <AllCourses courses={courses} />
      <UpdateNote />
      <DecorativeBars className="mt-10" />
    </PageFrame>
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

function AllCourses({ courses }: { courses: HOME_COURSES_QUERY_RESULT }) {
  const linkable = courses.filter((course) => course.slug !== null);

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

      {linkable.length > 0 && (
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {linkable.map((course) => (
            <li key={course._id} className="flex">
              <CourseCatalogCard
                href={`/courses/${course.slug}`}
                title={course.title ?? "Untitled course"}
                description={course.summary ?? ""}
                level={formatLevel(course.level)}
                duration={formatDuration(course.totalSeconds)}
                moduleCount={
                  course.moduleCount
                    ? pluralize(course.moduleCount, "module")
                    : null
                }
                mark={<CourseMark course={course} />}
              />
            </li>
          ))}
        </ul>
      )}
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
