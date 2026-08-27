import type { ReactNode } from "react";
import { BarChartIcon, ClockIcon, DocumentIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

export interface HomeCourseCardProps {
  title: string;
  description: string;
  level: string;
  duration: string;
  moduleCount: string;
  /** Square course mark, 76px. Comes from Sanity once courses are modelled. */
  mark: ReactNode;
  className?: string;
}

/** Catalog card as it appears on the home page: large mark, serif title,
 *  a rule, and the meta row pinned to the bottom so a row of cards aligns. */
export function HomeCourseCard({
  title,
  description,
  level,
  duration,
  moduleCount,
  mark,
  className,
}: HomeCourseCardProps) {
  return (
    <article
      className={cn(
        "flex h-full min-h-[360px] flex-col rounded-lg border border-neutral-200 bg-white p-6 shadow-sm",
        className,
      )}
    >
      {mark}
      <h3 className="mt-7 font-display text-[22px] leading-[30px] font-bold text-neutral-900">
        {title}
      </h3>
      <p className="text-body mt-3 text-neutral-500">{description}</p>
      <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 border-t border-neutral-200/70 pt-5">
        <Meta icon={<BarChartIcon size={14} />}>{level}</Meta>
        <Meta icon={<ClockIcon size={14} />}>{duration}</Meta>
        <Meta icon={<DocumentIcon size={14} />}>{moduleCount}</Meta>
      </div>
    </article>
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
