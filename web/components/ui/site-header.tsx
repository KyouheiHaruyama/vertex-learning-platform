import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { BellIcon } from "@/components/icons";
import { buttonClasses } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";

const links = [
  { label: "Courses", href: "/courses" },
  { label: "My Learning", href: "/my-learning" },
];

export interface SiteHeaderProps {
  /** Marks the matching nav link as the current page. */
  activeHref?: string;
}

/** The site's primary header. Shared by every page inside the frame. */
export function SiteHeader({ activeHref }: SiteHeaderProps) {
  return (
    <Navbar
      density="page"
      logoSize="lg"
      className="shrink-0 border-b border-neutral-200/70 px-6 py-4 sm:h-24 sm:py-0 sm:px-10"
      links={links.map((link) => ({
        ...link,
        active: link.href === activeHref,
      }))}
      actions={
        <>
          {/* Display only: there is no notification store behind this yet. */}
          <button
            type="button"
            aria-label="Notifications"
            className="rounded-xs text-neutral-900 transition-colors hover:text-primary-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-400"
          >
            <BellIcon size={24} />
          </button>
          <Show when="signed-out">
            <div className="flex items-center gap-3">
              <SignInButton>
                <button
                  type="button"
                  className={buttonClasses({ variant: "tertiary", size: "md" })}
                >
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton>
                <button
                  type="button"
                  className={buttonClasses({ variant: "primary", size: "md" })}
                >
                  Sign up
                </button>
              </SignUpButton>
            </div>
          </Show>
          <Show when="signed-in">
            <UserButton appearance={{ elements: { avatarBox: "size-10" } }} />
          </Show>
        </>
      }
    />
  );
}
