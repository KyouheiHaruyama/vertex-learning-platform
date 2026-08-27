import type { SVGProps } from "react";

/**
 * 06 ICONS — 24x24 grid, 2px stroke (outline), rounded line caps, currentColor.
 * Every icon ships in an Outline and a Filled style, matching the design sheet.
 */
export type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Outline({ size = 24, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

function Filled({ size = 24, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/* --- bell ---------------------------------------------------------------- */

export function BellIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M18 8.5a6 6 0 1 0-12 0c0 6-2.5 8-2.5 8h17S18 14.5 18 8.5Z" />
      <path d="M10.2 20a2.1 2.1 0 0 0 3.6 0" />
    </Outline>
  );
}

export function BellFilledIcon(props: IconProps) {
  return (
    <Filled {...props}>
      <path d="M12 2.5a6 6 0 0 1 6 6c0 6 2.5 8 2.5 8h-17s2.5-2 2.5-8a6 6 0 0 1 6-6Z" />
      <path d="M9.9 19.5h4.2a2.1 2.1 0 0 1-4.2 0Z" />
    </Filled>
  );
}

/* --- search -------------------------------------------------------------- */

export function SearchIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.9-3.9" />
    </Outline>
  );
}

export function SearchFilledIcon(props: IconProps) {
  return (
    <Filled {...props}>
      <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth={3.2} />
      <path
        d="m20.2 20.2-3.7-3.7"
        fill="none"
        stroke="currentColor"
        strokeWidth={3.2}
        strokeLinecap="round"
      />
    </Filled>
  );
}

/* --- play in a circle ---------------------------------------------------- */

export function PlayCircleIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M10.4 8.6l5.4 3.4-5.4 3.4Z" fill="currentColor" strokeWidth={1.4} />
    </Outline>
  );
}

export function PlayCircleFilledIcon(props: IconProps) {
  return (
    <Filled {...props}>
      <path
        fillRule="evenodd"
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.7 6.1 6 3.9-6 3.9Z"
      />
    </Filled>
  );
}

/* --- document ------------------------------------------------------------ */

export function DocumentIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6" />
      <path d="M9 17h4" />
    </Outline>
  );
}

export function DocumentFilledIcon(props: IconProps) {
  return (
    <Filled {...props}>
      <path
        fillRule="evenodd"
        d="M14 2.5H7a2.5 2.5 0 0 0-2.5 2.5v14A2.5 2.5 0 0 0 7 21.5h10a2.5 2.5 0 0 0 2.5-2.5V8L14 2.5Zm-5 10h6v1.6H9v-1.6Zm0 4h4v1.6H9v-1.6Z"
      />
    </Filled>
  );
}

/* --- bookmark ------------------------------------------------------------ */

export function BookmarkIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M6 4.8A1.8 1.8 0 0 1 7.8 3h8.4A1.8 1.8 0 0 1 18 4.8V21l-6-3.6L6 21Z" />
    </Outline>
  );
}

export function BookmarkFilledIcon(props: IconProps) {
  return (
    <Filled {...props}>
      <path d="M6 4.8A1.8 1.8 0 0 1 7.8 3h8.4A1.8 1.8 0 0 1 18 4.8V21l-6-3.6L6 21Z" />
    </Filled>
  );
}

/* --- bar chart ----------------------------------------------------------- */

export function BarChartIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M5.5 20v-4.5" />
      <path d="M12 20V10" />
      <path d="M18.5 20V4.5" />
    </Outline>
  );
}

export function BarChartFilledIcon(props: IconProps) {
  return (
    <Filled {...props}>
      <rect x="4" y="14" width="4" height="6" rx="1.2" />
      <rect x="10" y="9" width="4" height="11" rx="1.2" />
      <rect x="16" y="4" width="4" height="16" rx="1.2" />
    </Filled>
  );
}

/* --- clock --------------------------------------------------------------- */

export function ClockIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.4 2" />
    </Outline>
  );
}

export function ClockFilledIcon(props: IconProps) {
  return (
    <Filled {...props}>
      <path
        fillRule="evenodd"
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 4v5.4l3.4 2-1 1.7-4.4-2.6V6Z"
      />
    </Filled>
  );
}

/* --- user ---------------------------------------------------------------- */

export function UserIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <circle cx="12" cy="8.2" r="3.7" />
      <path d="M4.6 20.5a7.4 7.4 0 0 1 14.8 0" />
    </Outline>
  );
}

export function UserFilledIcon(props: IconProps) {
  return (
    <Filled {...props}>
      <circle cx="12" cy="8.2" r="3.9" />
      <path d="M4.4 20.8a7.6 7.6 0 0 1 15.2 0Z" />
    </Filled>
  );
}

/* --- chevrons ------------------------------------------------------------ */

export function ChevronRightIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="m9.5 5 7 7-7 7" />
    </Outline>
  );
}

export function ChevronRightFilledIcon(props: IconProps) {
  return (
    <Filled {...props}>
      <path
        d="m9.5 5 7 7-7 7"
        fill="none"
        stroke="currentColor"
        strokeWidth={3.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Filled>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M4 12h15.5" />
      <path d="m13.5 6 6 6-6 6" />
    </Outline>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="m12 3.4 2.7 5.5 6 .9-4.35 4.25 1.03 6L12 17.25 6.62 20.05l1.03-6L3.3 9.8l6-.9L12 3.4Z" />
    </Outline>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="m14.5 5-7 7 7 7" />
    </Outline>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="m5 9 7 7 7-7" />
    </Outline>
  );
}

/* --- supporting icons ---------------------------------------------------- */

export function ExternalLinkIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M14 4h6v6" />
      <path d="m20 4-8.5 8.5" />
      <path d="M18 14.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.5" />
    </Outline>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <rect x="4.5" y="10" width="15" height="10.5" rx="2.2" />
      <path d="M8.2 10V7.2a3.8 3.8 0 0 1 7.6 0V10" />
    </Outline>
  );
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.3 12.2 2.6 2.6 4.8-5.4" />
    </Outline>
  );
}

export function FolderIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M3.5 6.8A2 2 0 0 1 5.5 4.8h3.4l2 2.6h7.6a2 2 0 0 1 2 2v7.8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2Z" />
    </Outline>
  );
}

export function SpinnerIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5" />
    </Outline>
  );
}

export function EyeIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <path d="M2.5 12S6 6.2 12 6.2 21.5 12 21.5 12 18 17.8 12 17.8 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.9" />
    </Outline>
  );
}

export function SquaresIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <rect x="3.5" y="3.5" width="7.4" height="7.4" rx="1.6" />
      <rect x="13.1" y="3.5" width="7.4" height="7.4" rx="1.6" />
      <rect x="3.5" y="13.1" width="7.4" height="7.4" rx="1.6" />
      <rect x="13.1" y="13.1" width="7.4" height="7.4" rx="1.6" />
    </Outline>
  );
}

export function TargetIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <circle cx="11.2" cy="12.8" r="8.2" />
      <circle cx="11.2" cy="12.8" r="3.6" />
      <path d="m13.6 10.4 6.4-6.4" />
    </Outline>
  );
}

export function AccessibilityIcon(props: IconProps) {
  return (
    <Outline {...props}>
      <circle cx="12" cy="4.4" r="1.9" />
      <path d="M4.6 8.4 12 9.9l7.4-1.5" />
      <path d="M12 9.9v4.3" />
      <path d="m8.3 20.8 3.7-6.6 3.7 6.6" />
    </Outline>
  );
}
