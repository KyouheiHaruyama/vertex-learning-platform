"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { formatDuration, pluralize } from "@/lib/format";

export interface ContentLesson {
  id: string;
  title: string;
  duration: number | null;
  freePreview: boolean;
}

export interface ContentModule {
  key: string;
  title: string;
  summary: string | null;
  /** Sum of this module's lesson durations, in seconds. */
  seconds: number;
  lessons: ContentLesson[];
}

/** Modules shown before the "show all" toggle appears. */
const COLLAPSED_COUNT = 6;

export interface CourseContentProps {
  modules: ContentModule[];
  totalSeconds: number;
}

export function CourseContent({ modules, totalSeconds }: CourseContentProps) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  if (modules.length === 0) {
    return null;
  }

  const isTruncated = modules.length > COLLAPSED_COUNT;
  const visible = showAll ? modules : modules.slice(0, COLLAPSED_COUNT);
  const total = formatDuration(totalSeconds);

  return (
    <section aria-labelledby="course-content" className="mt-14 px-6 sm:px-13">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2
          id="course-content"
          className="font-display text-[28px] leading-9 font-bold text-neutral-900"
        >
          Course Content
        </h2>
        <p className="text-body text-neutral-500">
          {pluralize(modules.length, "module")}
          {total && <> &middot; {total}</>}
        </p>
      </div>

      <div className="relative mt-6 overflow-hidden rounded-lg border border-neutral-200/70">
        {/* Timeline running through the centre of the numbered circles. */}
        <span
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-[46px] w-px bg-neutral-200/70"
        />

        <ul className="divide-y divide-neutral-200/70">
          {visible.map((module, index) => (
            <ModuleRow
              key={module.key}
              module={module}
              number={index + 1}
              open={openKey === module.key}
              onToggle={() =>
                setOpenKey((current) =>
                  current === module.key ? null : module.key,
                )
              }
            />
          ))}
        </ul>
      </div>

      {isTruncated && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            className={buttonClasses({ variant: "tertiary", size: "lg" })}
          >
            {showAll
              ? "Show fewer modules"
              : `Show all ${modules.length} modules`}
            <ChevronDownIcon
              size={20}
              className={cn("transition-transform", showAll && "rotate-180")}
            />
          </button>
        </div>
      )}
    </section>
  );
}

function ModuleRow({
  module,
  number,
  open,
  onToggle,
}: {
  module: ContentModule;
  number: number;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `module-panel-${module.key}`;
  const duration = formatDuration(module.seconds);

  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full min-h-[70px] items-center gap-4 px-6 py-4 text-left transition-colors hover:bg-white/50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-400"
      >
        <span className="relative flex size-11 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-canvas">
          <span className="text-body text-neutral-700">{number}</span>
        </span>

        <span className="min-w-0 flex-1">
          <span className="text-body block font-semibold text-neutral-900">
            {module.title}
          </span>
          {module.summary && (
            <span className="text-body mt-0.5 block text-neutral-500">
              {module.summary}
            </span>
          )}
          {duration && (
            <span className="text-body mt-1 block text-neutral-500 sm:hidden">
              {duration}
            </span>
          )}
        </span>

        {duration && (
          <span className="text-body hidden shrink-0 text-neutral-500 sm:block">
            {duration}
          </span>
        )}
        <ChevronDownIcon
          size={20}
          className={cn(
            "shrink-0 text-neutral-500 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div id={panelId} className="border-t border-neutral-200/70 bg-white/40">
          <ul className="divide-y divide-neutral-200/50">
            {module.lessons.map((lesson, index) => {
              const lessonDuration = formatDuration(lesson.duration);

              return (
                <li
                  key={lesson.id}
                  className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3 pr-6 pl-[70px]"
                >
                  <span className="text-body shrink-0 text-neutral-500">
                    Lesson {number}.{index + 1}
                  </span>
                  <span className="text-body min-w-0 flex-1 text-neutral-900">
                    {lesson.title}
                  </span>
                  {lesson.freePreview && (
                    <Badge tone="lesson">Free preview</Badge>
                  )}
                  {lessonDuration && (
                    <span className="text-body shrink-0 text-neutral-500">
                      {lessonDuration}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </li>
  );
}
