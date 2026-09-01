import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { BarChartIcon, ClockIcon, DocumentIcon } from "@/components/icons";
import { cn } from "@/lib/cn";
import { urlForImage } from "@/sanity/image";
import type { COURSES_QUERY_RESULT } from "@/sanity.types";

export interface CourseCatalogCardProps {
  title: string;
  description: string;
  /** Where selecting the card goes. */
  href: string;
  level?: string | null;
  duration?: string | null;
  moduleCount?: string | null;
  /** Square course mark, 76px. */
  mark: ReactNode;
  className?: string;
}

/** Catalog card: large mark, serif title, a rule, and the meta row pinned to
 *  the bottom so a row of cards aligns. The whole card is the link to the
 *  course. Used by the home page and the catalog. */
export function CourseCatalogCard({
  title,
  description,
  href,
  level,
  duration,
  moduleCount,
  mark,
  className,
}: CourseCatalogCardProps) {
  const meta = [
    { icon: <BarChartIcon size={14} />, value: level },
    { icon: <ClockIcon size={14} />, value: duration },
    { icon: <DocumentIcon size={14} />, value: moduleCount },
  ].filter((item) => item.value);

  return (
    <Link
      href={href}
      className={cn(
        "flex h-full min-h-[360px] flex-col rounded-lg border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:border-neutral-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400",
        className,
      )}
    >
      {mark}
      <h3 className="mt-7 font-display text-[22px] leading-[30px] font-bold text-neutral-900">
        {title}
      </h3>
      <p className="text-body mt-3 text-neutral-500">{description}</p>
      {meta.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 border-t border-neutral-200/70 pt-5">
          {meta.map((item) => (
            <Meta key={item.value} icon={item.icon}>
              {item.value}
            </Meta>
          ))}
        </div>
      )}
    </Link>
  );
}

function Meta({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="text-small inline-flex items-center gap-1 whitespace-nowrap text-neutral-500">
      {icon}
      {children}
    </span>
  );
}

/** The 76px square mark beside the title. Sanity stores a cover image per
 *  course, so that is what fills it; a course without one falls back to its
 *  initial. */
export function CourseMark({
  course,
}: {
  course: Pick<COURSES_QUERY_RESULT[number], "title" | "coverImage">;
}) {
  const cover = course.coverImage;

  if (!cover?.asset) {
    return (
      <span
        aria-hidden="true"
        className="flex size-19 items-center justify-center rounded-lg bg-neutral-100 font-display text-[34px] font-bold text-neutral-500"
      >
        {course.title?.charAt(0) ?? "?"}
      </span>
    );
  }

  return (
    <Image
      src={urlForImage(cover).width(152).height(152).url()}
      alt=""
      width={152}
      height={152}
      className="size-19 rounded-lg object-cover"
    />
  );
}
