import Link from "next/link";
import type { ReactNode } from "react";
import { Logo, type LogoSize } from "@/components/ui/logo";
import { cn } from "@/lib/cn";

export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

/** Spacing rhythm: "compact" is the design system spec, "page" the site header. */
export type NavbarDensity = "compact" | "page";

const densities: Record<
  NavbarDensity,
  { root: string; nav: string; list: string }
> = {
  compact: { root: "gap-8", nav: "", list: "gap-6" },
  page: {
    root: "flex-wrap gap-x-6 gap-y-3 sm:flex-nowrap sm:gap-16",
    nav: "order-last w-full sm:order-none sm:w-auto",
    list: "gap-6 sm:gap-11",
  },
};

export interface NavbarProps {
  links: NavLink[];
  density?: NavbarDensity;
  /** Optional trailing slot, pushed to the right edge (notifications, account). */
  actions?: ReactNode;
  logoSize?: LogoSize;
  className?: string;
}

/* 13 NAVIGATION — primary bar */
export function Navbar({
  links,
  density = "compact",
  actions,
  logoSize = "sm",
  className,
}: NavbarProps) {
  const spacing = densities[density];

  return (
    <header className={cn("flex items-center", spacing.root, className)}>
      <Link
        href="/"
        className="rounded-xs focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-400"
      >
        <Logo size={logoSize} />
      </Link>
      <nav aria-label="Main" className={spacing.nav}>
        <ul className={cn("flex items-center", spacing.list)}>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={link.active ? "page" : undefined}
                className={cn(
                  "text-body rounded-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-400",
                  link.active
                    ? "text-primary-500"
                    : "text-neutral-900 hover:text-primary-500",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {actions && <div className="ml-auto flex items-center gap-5">{actions}</div>}
    </header>
  );
}
