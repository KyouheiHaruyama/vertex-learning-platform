import type { ComponentType } from "react";
import {
  CodeIcon,
  GaugeIcon,
  type IconProps,
  LayersIcon,
  PuzzleIcon,
  RocketIcon,
  ShieldIcon,
  SparklesIcon,
  SquaresIcon,
  WorkflowIcon,
} from "@/components/icons";
import type { COURSE_BY_SLUG_QUERY_RESULT } from "@/sanity.types";

type Outcome = NonNullable<
  NonNullable<COURSE_BY_SLUG_QUERY_RESULT>["learningOutcomes"]
>[number];

/** Maps the schema's `icon` values onto the icon set. */
const icons: Record<string, ComponentType<IconProps>> = {
  layers: LayersIcon,
  workflow: WorkflowIcon,
  gauge: GaugeIcon,
  rocket: RocketIcon,
  sparkles: SparklesIcon,
  shield: ShieldIcon,
  puzzle: PuzzleIcon,
  code: CodeIcon,
};

export function LearningOutcomes({ outcomes }: { outcomes: Outcome[] }) {
  if (outcomes.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="what-youll-learn"
      className="mt-14 px-6 sm:px-13"
    >
      <div className="rounded-lg border border-neutral-200/70 p-6 sm:p-8">
        <h2
          id="what-youll-learn"
          className="font-display text-[28px] leading-9 font-bold text-neutral-900"
        >
          What you&rsquo;ll learn
        </h2>

        <ul className="mt-7 grid gap-6 md:grid-cols-2">
          {outcomes.map((outcome) => {
            const Icon = icons[outcome.icon ?? ""] ?? SquaresIcon;

            return (
              <li
                key={outcome._key}
                className="flex gap-5 rounded-lg border border-neutral-200/70 p-6 sm:p-7"
              >
                <Icon
                  size={44}
                  strokeWidth={1.5}
                  className="shrink-0 text-primary-500"
                />
                <div className="min-w-0">
                  <h3 className="text-heading-3 text-neutral-900">
                    {outcome.title}
                  </h3>
                  <p className="text-body mt-2 text-neutral-500">
                    {outcome.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
