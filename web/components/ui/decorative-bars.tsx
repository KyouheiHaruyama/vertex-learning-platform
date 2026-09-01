import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Relative width and height of each bar, matching the reference silhouette. */
const leftBars = [
  { w: 7.3, h: 55 },
  { w: 5.5, h: 74 },
  { w: 4.2, h: 86 },
  { w: 5.5, h: 100 },
  { w: 9, h: 72 },
  { w: 5.1, h: 58 },
];

const rightBars = [
  { w: 2.9, h: 46 },
  { w: 8.2, h: 60 },
  { w: 7.8, h: 76 },
  { w: 4.8, h: 88 },
  { w: 6.4, h: 100 },
  { w: 4.8, h: 62 },
  { w: 4.6, h: 72 },
  { w: 9.3, h: 90 },
];

/**
 * Blurred bar silhouette that closes a page. The caller owns the top margin,
 * since the course page pulls the bars up behind the progress card.
 */
export function DecorativeBars({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("h-50 overflow-hidden", className)}>
      <div className="flex h-full w-full items-end gap-[3px] blur-[6px]">
        {leftBars.map((bar, index) => (
          <Bar key={`l${index}`} {...bar} />
        ))}
        <span className="h-px w-[10%]" />
        {rightBars.map((bar, index) => (
          <Bar key={`r${index}`} {...bar} />
        ))}
      </div>
    </div>
  );
}

function Bar({ w, h }: { w: number; h: number }): ReactNode {
  return (
    <span
      style={{ width: `${w}%`, height: `${h}%` }}
      className="bg-gradient-to-t from-transparent via-primary-400/75 to-transparent"
    />
  );
}
