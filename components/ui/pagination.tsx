import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

export interface PaginationProps {
  page: number;
  totalPages: number;
  hrefFor: (page: number) => string;
  className?: string;
}

const cell =
  "inline-flex h-8 w-8 items-center justify-center rounded-sm text-body transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400";

/* 13 NAVIGATION — pagination */
export function Pagination({
  page,
  totalPages,
  hrefFor,
  className,
}: PaginationProps) {
  const pages = buildPages(page, totalPages);

  return (
    <nav aria-label="Pagination" className={className}>
      <ol className="flex items-center gap-2">
        <li>
          <Arrow
            href={hrefFor(page - 1)}
            label="Previous page"
            disabled={page <= 1}
          >
            <ChevronLeftIcon size={16} />
          </Arrow>
        </li>
        {pages.map((item, index) =>
          item === "ellipsis" ? (
            <li
              key={`ellipsis-${index}`}
              aria-hidden="true"
              className={cn(cell, "text-neutral-500")}
            >
              &hellip;
            </li>
          ) : (
            <li key={item}>
              <Link
                href={hrefFor(item)}
                aria-current={item === page ? "page" : undefined}
                className={cn(
                  cell,
                  item === page
                    ? "border border-primary-500 font-medium text-primary-500"
                    : "text-neutral-900 hover:text-primary-500",
                )}
              >
                {item}
              </Link>
            </li>
          ),
        )}
        <li>
          <Arrow
            href={hrefFor(page + 1)}
            label="Next page"
            disabled={page >= totalPages}
          >
            <ChevronRightIcon size={16} />
          </Arrow>
        </li>
      </ol>
    </nav>
  );
}

function Arrow({
  href,
  label,
  disabled,
  children,
}: {
  href: string;
  label: string;
  disabled: boolean;
  children: React.ReactNode;
}) {
  if (disabled) {
    return (
      <span aria-hidden="true" className={cn(cell, "text-neutral-300")}>
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(cell, "text-neutral-900 hover:text-primary-500")}
    >
      {children}
    </Link>
  );
}

/** First pages, an ellipsis when there is a gap, then the last page. */
function buildPages(page: number, totalPages: number): (number | "ellipsis")[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const window = new Set([1, 2, 3, page, totalPages]);
  const sorted = [...window].filter((n) => n >= 1 && n <= totalPages).sort((a, b) => a - b);
  const result: (number | "ellipsis")[] = [];

  sorted.forEach((value, index) => {
    if (index > 0 && value - sorted[index - 1] > 1) {
      result.push("ellipsis");
    }
    result.push(value);
  });

  return result;
}
