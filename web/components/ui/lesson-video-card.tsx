import Link from "next/link";
import { PlayCircleFilledIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Card, CardFooter } from "@/components/ui/card";

export interface LessonVideoCardProps {
  title: string;
  description: string;
  /** e.g. "Lesson 5.1" */
  lessonLabel: string;
  /** e.g. "12:45" */
  duration: string;
  /** Timestamp the match starts at, e.g. "12:45". */
  startLabel: string;
  href: string;
  className?: string;
}

export function LessonVideoCard({
  title,
  description,
  lessonLabel,
  duration,
  startLabel,
  href,
  className,
}: LessonVideoCardProps) {
  return (
    <Card className={className}>
      <Badge tone="video" className="self-start">
        Video
      </Badge>
      <h3 className="text-heading-3 mt-3 font-semibold text-neutral-900">
        {title}
      </h3>
      <p className="text-body mt-1 text-neutral-500">{description}</p>
      <CardFooter>
        <span className="text-body">
          {lessonLabel} &middot; {duration}
        </span>
        <Link
          href={href}
          className="text-body inline-flex items-center gap-2 font-medium text-primary-500 transition-colors hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
        >
          <PlayCircleFilledIcon size={18} />
          Watch from {startLabel}
        </Link>
      </CardFooter>
    </Card>
  );
}
