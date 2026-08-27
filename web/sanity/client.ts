import "server-only";

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

/**
 * Server-only Sanity client. The dataset is private, so every read carries a
 * token — which is why this module must never reach the browser. The
 * `server-only` import above turns that into a build error rather than a leak.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // The token bypasses the CDN anyway, and we want published content to be
  // fresh; Next.js does the caching for us.
  useCdn: false,
  perspective: "published",
  token: process.env.SANITY_API_READ_TOKEN,
});

export const hasReadToken = Boolean(process.env.SANITY_API_READ_TOKEN);
