import Link from "next/link";
import { ExternalLinkIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Card, CardFooter } from "@/components/ui/card";

export interface LessonCardProps {
  title: string;
  description: string;
  /** e.g. "Module 5" */
  moduleLabel: string;
  href: string;
  className?: string;
}

export function LessonCard({
  title,
  description,
  moduleLabel,
  href,
  className,
}: LessonCardProps) {
  return (
    <Card className={className}>
      <Badge tone="lesson" className="self-start">
        Lesson
      </Badge>
      <h3 className="text-heading-3 mt-3 font-semibold text-neutral-900">
        {title}
      </h3>
      <p className="text-body mt-1 text-neutral-500">{description}</p>
      <CardFooter>
        <span className="text-body">{moduleLabel}</span>
        <Link
          href={href}
          className="text-body inline-flex items-center gap-2 font-medium text-primary-500 transition-colors hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
        >
          View lesson
          <ExternalLinkIcon size={16} />
        </Link>
      </CardFooter>
    </Card>
  );
}
