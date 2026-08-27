import Link from "next/link";
import { Fragment } from "react";
import { ChevronRightIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

export interface Crumb {
  label: string;
  /** Omit on the current page. */
  href?: string;
}

export interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
}

/* 13 NAVIGATION — breadcrumbs */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <Fragment key={item.label}>
              <li>
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="text-body rounded-xs text-neutral-500 transition-colors hover:text-primary-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-400"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className={cn(
                      "text-body",
                      isLast ? "text-neutral-900" : "text-neutral-500",
                    )}
                  >
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast && (
                <li aria-hidden="true" className="flex text-neutral-300">
                  <ChevronRightIcon size={16} />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
