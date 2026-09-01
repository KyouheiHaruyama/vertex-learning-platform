import type { Metadata } from "next";
import {
  CourseCatalogCard,
  CourseMark,
} from "@/components/ui/course-catalog-card";
import { DecorativeBars } from "@/components/ui/decorative-bars";
import { PageFrame } from "@/components/ui/page-frame";
import { SiteHeader } from "@/components/ui/site-header";
import { formatDuration, formatLevel, pluralize } from "@/lib/format";
import { sanityFetch } from "@/sanity/fetch";
import { COURSES_QUERY } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "All Courses — Vertex",
  description: "Every course on Vertex, most popular first.",
};

export default async function CoursesPage() {
  const courses = await sanityFetch({
    query: COURSES_QUERY,
    tags: ["courses"],
  });

  const linkable = courses.filter((course) => course.slug !== null);

  return (
    <PageFrame>
      <SiteHeader activeHref="/courses" />

      <section
        aria-labelledby="catalog-title"
        className="px-6 pt-10 sm:px-13 sm:pt-13"
      >
        <h1
          id="catalog-title"
          className="font-display text-[34px] leading-[42px] font-bold text-neutral-900 sm:text-display-1"
        >
          All Courses
        </h1>
        <p className="text-body mt-3 text-neutral-500">
          {pluralize(linkable.length, "course")}
        </p>

        {linkable.length === 0 ? (
          <p className="text-body mt-8 text-neutral-500">
            No courses are published yet.
          </p>
        ) : (
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

      <DecorativeBars className="mt-14" />
    </PageFrame>
  );
}
