type ClassValue = string | false | null | undefined;

/**
 * Joins class names, dropping falsy values. Variant maps in this project are
 * written so their classes never collide, so no merge resolution is needed.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
