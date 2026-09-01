import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { buttonClasses } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";

export interface CourseProgressProps {
  /**
   * Completion between 0 and 100. Progress is not modelled yet, so the page
   * passes 0 — the shape is here so the real store can drop straight in.
   */
  percentComplete: number;
  resumeHref: string | null;
  resumeLabel: string;
}

export function CourseProgress({
  percentComplete,
  resumeHref,
  resumeLabel,
}: CourseProgressProps) {
  const clamped = Math.min(100, Math.max(0, Math.round(percentComplete)));

  return (
    <section
      aria-label="Your progress"
      className="mt-14 px-6 sm:px-13"
    >
      <div className="flex flex-col gap-6 rounded-lg border border-neutral-200/70 bg-canvas px-6 py-6 shadow-sm sm:px-8 md:flex-row md:items-center md:gap-10">
        <div className="shrink-0">
          <p className="text-body text-neutral-500">Your Progress</p>
          <p className="text-body-lg mt-1 text-neutral-500">
            <span className="font-semibold text-neutral-900">{clamped}%</span>{" "}
            complete
          </p>
        </div>

        <ProgressBar
          value={clamped}
          showValue={false}
          label="Course progress"
          className="min-w-0 flex-1"
        />

        {resumeHref ? (
          <Link
            href={resumeHref}
            className={buttonClasses({
              size: "hero",
              className: "w-full shrink-0 md:w-auto",
            })}
          >
            {resumeLabel}
            <ArrowRightIcon size={20} />
          </Link>
        ) : (
          <span
            className={buttonClasses({
              size: "hero",
              state: "disabled",
              className: "w-full shrink-0 md:w-auto",
            })}
          >
            {resumeLabel}
            <ArrowRightIcon size={20} />
          </span>
        )}
      </div>
    </section>
  );
}
