import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";
import { ChevronDownIcon, SearchIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

/* 08 INPUTS — height 44px, radius 12px, 1px #E2E8F0 border, padding 0 16px,
   focus border #FB923C (primary 400). */
const field =
  "flex h-11 items-center rounded-md border border-neutral-200 bg-white px-4 transition-colors focus-within:border-primary-400";

export interface SearchInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  /** Keyboard shortcut rendered on the right, e.g. "⌘ K". */
  hint?: string;
  containerClassName?: string;
}

export function SearchInput({
  hint,
  containerClassName,
  className,
  type = "search",
  ...props
}: SearchInputProps) {
  return (
    <div className={cn(field, containerClassName)}>
      <SearchIcon size={20} className="shrink-0 text-neutral-900" />
      <input
        type={type}
        className={cn(
          "text-body h-full min-w-0 flex-1 bg-transparent px-3 text-neutral-900 placeholder:text-neutral-500 focus:outline-none",
          className,
        )}
        {...props}
      />
      {hint && (
        <kbd className="text-small shrink-0 rounded-xs border border-neutral-200 bg-white px-2 py-1 font-sans font-medium text-neutral-500">
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
