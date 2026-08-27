import { cn } from "@/lib/cn";

export interface ProgressBarProps {
  /** Completion between 0 and 100. */
  value: number;
  label?: string;
  className?: string;
}

/* 11 PROGRESS BAR */
export function ProgressBar({ value, label, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, Math.round(value)));

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "Course progress"}
        className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100"
      >
        <div
          className="h-full rounded-full bg-primary-500"
          style={{ width: `${clamped}%` }}
        />
      </div>
      <p className="text-body whitespace-nowrap text-neutral-500">
        <span className="font-semibold text-neutral-900">{clamped}%</span>{" "}
        complete
      </p>
    </div>
  );
}
