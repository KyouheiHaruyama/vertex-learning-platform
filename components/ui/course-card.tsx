import type { ReactNode } from "react";
import { BarChartIcon, ClockIcon, FolderIcon } from "@/components/icons";
import { Card, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/cn";

export interface CourseCardProps {
  title: string;
  description: string;
  level: string;
  duration: string;
  moduleCount: string;
  /** Small square course mark shown to the left of the title. */
  mark?: ReactNode;
  className?: string;
}

export function CourseCard({
  title,
  description,
  level,
  duration,
  moduleCount,
  mark,
  className,
}: CourseCardProps) {
  return (
    <Card className={className}>
      <div className="flex gap-3">
        {mark}
        <div className="min-w-0">
          <h3 className="text-heading-3 text-neutral-900">{title}</h3>
          <p className="text-body mt-1 text-neutral-500">{description}</p>
        </div>
      </div>
      <CardFooter className="flex-wrap justify-start gap-x-4 gap-y-2">
        <Meta icon={<BarChartIcon size={16} />}>{level}</Meta>
        <Meta icon={<ClockIcon size={16} />}>{duration}</Meta>
        <Meta icon={<FolderIcon size={16} />}>{moduleCount}</Meta>
      </CardFooter>
    </Card>
  );
}

function Meta({
  icon,
  children,
  className,
}: {
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn("text-small inline-flex items-center gap-2 whitespace-nowrap", className)}
    >
      <span className="text-neutral-500">{icon}</span>
      {children}
    </span>
  );
}
