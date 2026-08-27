import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";
import { ChevronDownIcon, SearchIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

/* 08 INPUTS — height 44px, radius 12px, 1px #E2E8F0 border, padding 0 16px,
   focus border #FB923C (primary 400). The hero size is the home page's
   88px search bar; the design system's default is unchanged. */
export type FieldSize = "md" | "hero";

const fieldBase =
  "flex items-center border border-neutral-200 bg-white transition-colors focus-within:border-primary-400";

const fieldSizes: Record<
  FieldSize,
  { wrap: string; input: string; gap: string; icon: number; kbd: string }
> = {
  md: {
    wrap: "h-11 rounded-md px-4",
    input: "text-body",
    gap: "gap-3",
    icon: 20,
    kbd: "text-small rounded-xs px-2 py-1",
  },
  hero: {
    wrap: "h-16 rounded-lg px-4 shadow-sm sm:h-22 sm:px-7",
    input: "text-[16px] sm:text-[20px]",
    gap: "gap-3 sm:gap-4",
    icon: 24,
    kbd: "h-9 rounded-sm px-2 text-[13px] sm:h-11 sm:px-3 sm:text-[14px]",
  },
};

export interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Keyboard shortcut rendered on the right, e.g. "⌘ K". */
  hint?: string;
  size?: FieldSize;
  containerClassName?: string;
}

export function SearchInput({
  hint,
  size = "md",
  containerClassName,
  className,
  type = "search",
  ...props
}: SearchInputProps) {
  const field = fieldSizes[size];

  return (
    <div className={cn(fieldBase, field.wrap, field.gap, containerClassName)}>
      <SearchIcon size={field.icon} className="shrink-0 text-neutral-900" />
      <input
        type={type}
        className={cn(
          "h-full min-w-0 flex-1 bg-transparent text-neutral-900 placeholder:text-neutral-500 focus:outline-none",
          field.input,
          className,
        )}
        {...props}
      />
      {hint && (
        <kbd
          className={cn(
            "inline-flex shrink-0 items-center border border-neutral-200 bg-white font-sans font-medium text-neutral-500",
            field.kbd,
          )}
        >
          {hint}
        </kbd>
      )}
    </div>
  );
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  containerClassName?: string;
}

export function Select({
  containerClassName,
  className,
  children,
  ...props
}: SelectProps) {
  return (
    <div className={cn("relative", containerClassName)}>
      <select
        className={cn(
          "text-body h-11 w-full appearance-none rounded-md border border-neutral-200 bg-white px-4 pr-11 font-medium text-neutral-900 transition-colors focus:border-primary-400 focus:outline-none",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDownIcon
        size={20}
        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-neutral-900"
      />
    </div>
  );
}
