import Link from "next/link";
import { DocumentIcon, ExternalLinkIcon } from "@/components/icons";
import { Card, CardFooter } from "@/components/ui/card";

export interface ResourceCardProps {
  title: string;
  description: string;
  /** e.g. "PDF" */
  fileType: string;
  /** e.g. "1.2 MB" */
  fileSize: string;
  href: string;
  className?: string;
}

export function ResourceCard({
  title,
  description,
  fileType,
  fileSize,
  href,
  className,
}: ResourceCardProps) {
  return (
    <Card className={className}>
      <div className="flex gap-3">
        <DocumentIcon size={24} className="shrink-0 text-neutral-900" />
        <div className="min-w-0">
          <h3 className="text-heading-3 font-semibold text-neutral-900">
            {title}
          </h3>
          <p className="text-body mt-1 text-neutral-500">{description}</p>
        </div>
      </div>
      <CardFooter>
        <span className="text-body">
          {fileType} &middot; {fileSize}
        </span>
        <Link
          href={href}
          aria-label={`Open ${title}`}
          className="text-primary-500 transition-colors hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
        >
          <ExternalLinkIcon size={18} />
        </Link>
      </CardFooter>
    </Card>
  );
}
