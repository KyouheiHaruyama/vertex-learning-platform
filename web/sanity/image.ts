import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

/** Build a CDN URL for a Sanity image. Safe on the client — no token needed. */
export function urlForImage(source: SanityImageSource) {
  return builder.image(source).auto("format").fit("max");
}
