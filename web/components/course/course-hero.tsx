import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRightIcon,
  BarChartIcon,
  BookmarkIcon,
  ClockIcon,
  DocumentIcon,
  UsersIcon,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import type { COURSE_BY_SLUG_QUERY_RESULT } from "@/sanity.types";
import { urlForImage } from "@/sanity/image";
import {
  formatCount,
  formatDuration,
  formatLevel,
  pluralize,
} from "@/lib/format";

type Course = NonNullable<COURSE_BY_SLUG_QUERY_RESULT>;

export interface CourseHeroProps {
  course: Course;
  /** Sum of every lesson duration in the course, in seconds. */
  totalSeconds: number;
  moduleCount: number;
  /** Where the primary action goes, or null while lesson pages do not exist. */
  startHref: string | null;
}

export function CourseHero({
  course,
  totalSeconds,
  moduleCount,
  startHref,
}: CourseHeroProps) {
  const cover = course.coverImage;
  const meta = [
    { icon: <BarChartIcon size={16} />, value: formatLevel(course.level) },
    { icon: <ClockIcon size={16} />, value: formatDuration(totalSeconds) },
    {
      icon: <DocumentIcon size={16} />,
      value: moduleCount > 0 ? pluralize(moduleCount, "module") : null,
    },
    {
      icon: <UsersIcon size={16} />,
      value: course.studentCount
        ? `${formatCount(course.studentCount)} students`
        : null,
    },
  ].filter((item) => item.value !== null);

  return (
    <section
      aria-labelledby="course-title"
      className="flex flex-col gap-8 px-6 pt-8 sm:px-13 md:flex-row md:gap-[70px]"
    >
      {cover?.asset && (
        <div className="w-full shrink-0 overflow-hidden rounded-xl md:w-80">
          <Image
            src={urlForImage(cover).width(720).height(838).url()}
            alt={cover.alt ?? ""}
            width={720}
            height={838}
            priority
            className="aspect-[4/4.65] w-full object-cover"
          />
        </div>
      )}

      <div className="min-w-0 flex-1">
        {course.popular && <Badge tone="popular">Popular</Badge>}

        <h1
          id="course-title"
          className="mt-5 font-display text-[34px] leading-[42px] font-bold text-neutral-900 sm:text-display-1"
        >
          {course.title}
        </h1>

        {course.summary && (
          <p className="text-lead mt-6 max-w-[520px] text-neutral-700">
            {course.summary}
          </p>
        )}

        {meta.length > 0 && (
          <ul className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
            {meta.map((item) => (
              <Meta key={item.value} icon={item.icon}>
                {item.value}
              </Meta>
            ))}
          </ul>
        )}

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          {startHref ? (
            <Link
              href={startHref}
              className={buttonClasses({
                size: "hero",
                className: "w-full sm:w-auto",
              })}
            >
              Start Learning
              <ArrowRightIcon size={20} />
            </Link>
          ) : (
            <span
              className={buttonClasses({
                size: "hero",
                state: "disabled",
                className: "w-full sm:w-auto",
              })}
            >
              Start Learning
              <ArrowRightIcon size={20} />
            </span>
          )}

          {/* Display only: there is no bookmark store behind this yet. */}
          <button
            type="button"
            className={buttonClasses({
              variant: "tertiary",
              size: "hero",
              className: "w-full sm:w-auto",
            })}
          >
            <BookmarkIcon size={20} />
            Bookmark
          </button>
        </div>
      </div>
    </section>
  );
}

function Meta({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="text-body inline-flex items-center gap-2 whitespace-nowrap text-neutral-700">
      <span className="text-neutral-500">{icon}</span>
      {children}
    </li>
  );
}
