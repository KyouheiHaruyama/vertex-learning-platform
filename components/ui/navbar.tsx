import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/cn";

export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface NavbarProps {
  links: NavLink[];
  className?: string;
}

/* 13 NAVIGATION — primary bar */
export function Navbar({ links, className }: NavbarProps) {
  return (
    <header className={cn("flex items-center gap-8", className)}>
      <Link
        href="/"
        className="rounded-xs focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-400"
      >
        <Logo />
      </Link>
      <nav aria-label="Main">
        <ul className="flex items-center gap-6">
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
    </header>
  );
}
