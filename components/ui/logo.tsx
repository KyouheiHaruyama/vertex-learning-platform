import { cn } from "@/lib/cn";

export type LogoSize = "sm" | "lg";

export interface LogoProps {
  className?: string;
  size?: LogoSize;
  /** Hide the wordmark and show the mark only. */
  markOnly?: boolean;
}

const sizes: Record<LogoSize, { mark: number; wordmark: string; gap: string }> = {
  sm: { mark: 24, wordmark: "text-[18px]", gap: "gap-2" },
  lg: { mark: 32, wordmark: "text-[24px]", gap: "gap-3" },
};

export function Logo({ className, size = "sm", markOnly = false }: LogoProps) {
  const { mark, wordmark, gap } = sizes[size];

  return (
    <span className={cn("inline-flex items-center", gap, className)}>
      <svg
        width={mark}
        height={mark}
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
          className={cn(
            "font-semibold tracking-tight text-neutral-900",
            wordmark,
          )}
        >
          Vertex
        </span>
      )}
    </span>
  );
}
