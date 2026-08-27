import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/* 12 CARDS — shared shell: white surface, 1px neutral border, radius lg, shadow sm. */
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border border-neutral-200 bg-white p-4 shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

export function CardFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mt-4 flex items-center justify-between gap-3 text-neutral-500",
        className,
      )}
      {...props}
    />
  );
}
