import "server-only";

import type { QueryParams } from "next-sanity";
import { client, hasReadToken } from "./client";

/** Default cache lifetime for content reads, in seconds. */
const DEFAULT_REVALIDATE = 3600;

export interface SanityFetchOptions<QueryString extends string> {
  query: QueryString;
  params?: QueryParams;
  /** Cache tags, so a webhook can revalidate exactly what changed. */
  tags?: string[];
  revalidate?: number | false;
}

/**
 * Typed read against Sanity. TypeGen overloads `client.fetch` on the query
 * string, so the return type follows the query with no annotation needed.
 */
export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  tags = [],
  revalidate = DEFAULT_REVALIDATE,
}: SanityFetchOptions<QueryString>) {
  if (!hasReadToken) {
    throw new Error(
      "Missing environment variable: SANITY_API_READ_TOKEN. The dataset is private, so reads need a Viewer token.",
    );
  }

  return client.fetch(query, params, {
    next: { revalidate: tags.length > 0 ? false : revalidate, tags },
  });
}
