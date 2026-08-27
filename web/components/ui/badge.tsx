import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone = "video" | "lesson" | "popular";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

/* 09 BADGES / TAGS */
const tones: Record<BadgeTone, string> = {
  video: "bg-primary-100 text-primary-500",
  lesson: "bg-accent-indigo-bg text-accent-indigo",
  popular: "bg-primary-200 text-primary-600",
};

export function Badge({ tone = "video", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
