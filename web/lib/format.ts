/** Display formatting for values that Sanity stores raw. */

/**
 * Runtime as it appears in the UI: "18h 24m", "45m", "1h".
 * Returns null for missing or empty durations so callers can drop the row
 * rather than print a zero.
 */
export function formatDuration(seconds: number | null | undefined) {
  if (!seconds || seconds <= 0) {
    return null;
  }

  const totalMinutes = Math.round(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes}m`;
  }

  return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}m`;
}

/** Student counts, shortened the way the design shows them: "2.1k". */
export function formatCount(count: number | null | undefined) {
  if (count === null || count === undefined) {
    return null;
  }

  if (count < 1000) {
    return String(count);
  }

  const thousands = count / 1000;
  // One decimal, but "18.0k" reads worse than "18k".
  return `${thousands.toFixed(thousands < 100 ? 1 : 0).replace(/\.0$/, "")}k`;
}

/** Level is stored lowercase and shown capitalised. */
export function formatLevel(level: string | null | undefined) {
  if (!level) {
    return null;
  }

  return level.charAt(0).toUpperCase() + level.slice(1);
}

/** "1 module" / "12 modules". */
export function pluralize(count: number, singular: string, plural?: string) {
  return `${count} ${count === 1 ? singular : (plural ?? `${singular}s`)}`;
}
