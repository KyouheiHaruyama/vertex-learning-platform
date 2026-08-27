import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "text";
export type ButtonSize = "md" | "lg";
export type ButtonState = "default" | "hover" | "disabled";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /**
   * Forces a visual state. Normal usage leaves this alone and lets `:hover`
   * and `:disabled` drive it; the design system page uses it to show every
   * state side by side.
   */
  state?: ButtonState;
}

/* 07 BUTTONS — height 44px, radius 12px, Inter Medium 14–16px. */
const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400";

const variantStyles: Record<ButtonVariant, Record<ButtonState, string>> = {
  primary: {
    default: "bg-primary-500 text-white shadow-sm hover:bg-primary-600",
    hover: "bg-primary-600 text-white shadow-sm",
    disabled: "bg-primary-100 text-primary-300",
  },
  secondary: {
    default:
      "border border-primary-500 bg-white text-primary-500 hover:bg-primary-100",
    hover: "border border-primary-500 bg-primary-100 text-primary-500",
    disabled: "border border-primary-200 bg-white text-primary-200",
  },
  tertiary: {
    default:
      "border border-neutral-200 bg-white text-neutral-900 shadow-sm hover:shadow-md",
    hover: "border border-neutral-200 bg-white text-neutral-900 shadow-md",
    disabled: "border border-neutral-200 bg-neutral-50 text-neutral-300",
  },
  text: {
    default: "text-primary-500 hover:text-primary-600",
    hover: "text-primary-600",
    disabled: "text-primary-200",
  },
};

const sizes: Record<ButtonSize, string> = {
  lg: "h-11 px-4 text-[16px]",
  md: "h-11 px-3 text-[14px]",
};

export function Button({
  variant = "primary",
  size = "lg",
  state = "default",
  className,
  type = "button",
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled ?? state === "disabled";
  const resolvedState: ButtonState = isDisabled ? "disabled" : state;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={cn(
        base,
        variantStyles[variant][resolvedState],
        variant === "text" ? "h-11 px-0 text-[14px]" : sizes[size],
        isDisabled && "cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
}
