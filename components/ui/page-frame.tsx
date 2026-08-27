import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface PageFrameProps {
  children: ReactNode;
  className?: string;
}

/**
 * Centred content frame with the diagonal hatch that fills the page margins.
 * The hatch lives on the outer element and the frame paints the canvas back
 * over it, so the pattern only shows in the gutters.
 */
export function PageFrame({ children, className }: PageFrameProps) {
  return (
    <div className="flex flex-1 flex-col bg-canvas bg-[repeating-linear-gradient(45deg,var(--color-hatch)_0_1px,transparent_1px_13px)]">
      <div
        className={cn(
          "mx-auto flex w-full max-w-[1120px] flex-1 flex-col border-neutral-200/70 bg-canvas sm:border-x",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
