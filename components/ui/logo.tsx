import { cn } from "@/lib/cn";

export interface LogoProps {
  className?: string;
  /** Hide the wordmark and show the mark only. */
  markOnly?: boolean;
}

export function Logo({ className, markOnly = false }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M2.6 3.5h4.6L12 14.6l4.8-11.1h4.6l-7.6 16.6a2 2 0 0 1-3.6 0L2.6 3.5Z"
          fill="var(--color-primary-500)"
        />
      </svg>
      <span className="sr-only">Vertex</span>
      {!markOnly && (
        <span
          aria-hidden="true"
          className="text-[18px] font-semibold tracking-tight text-neutral-900"
        >
          Vertex
        </span>
      )}
    </span>
  );
}
