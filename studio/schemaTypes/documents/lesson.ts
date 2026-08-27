import { PlayIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * A lesson does not store its parent course. Derive the course with a reverse
 * reference when you need it.
 *
 * The video lives with its provider (YouTube, Vimeo, Bunny) and only its URL is
 * stored here — never a Sanity file asset.
 */
export const lesson = defineType({
  name: "lesson",
  title: "Lesson",
  type: "document",
  icon: PlayIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "video", title: "Video" },
    { name: "meta", title: "Meta" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      description: "YouTube, Vimeo or Bunny URL. The player is embedded on the lesson page.",
      type: "url",
      group: "video",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "poster",
      title: "Poster",
      description: "Thumbnail shown before playback and in search results.",
      type: "image",
      group: "video",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "durationSeconds",
      title: "Duration (seconds)",
      description: "Runtime of the lesson video. Formatted for display by the frontend.",
      type: "number",
      group: "video",
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({
      name: "keyPoints",
      title: "Key points",
      description: 'Short bullets for the "in this lesson you will" section.',
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.required().min(1).unique(),
    }),
    defineField({
      name: "notes",
      title: "Notes",
      description: "Rich text lesson notes.",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            annotations: [
              defineArrayMember({
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (rule) => rule.required(),
                  }),
                ],
              }),
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "proTip",
      title: "Pro tip",
      type: "text",
      group: "content",
      rows: 3,
      validation: (rule) => rule.max(400),
    }),
    defineField({
      name: "resources",
      title: "Resources",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "resource" })],
    }),
    defineField({
      name: "freePreview",
      title: "Free preview",
      description: "A label on the lesson. This is not access control.",
      type: "boolean",
      group: "meta",
      initialValue: false,
    }),
    defineField({
      name: "studentCount",
      title: "Student count",
      description: "Display only.",
      type: "number",
      group: "meta",
      validation: (rule) => rule.integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: "title",
      duration: "durationSeconds",
      freePreview: "freePreview",
      media: "poster",
    },
    prepare({ title, duration, freePreview, media }) {
      const minutes = typeof duration === "number" ? Math.round(duration / 60) : null;
      const parts = [
        minutes === null ? null : `${minutes} min`,
        freePreview ? "Free preview" : null,
      ].filter(Boolean);
      return { title: title ?? "Untitled lesson", subtitle: parts.join(" · "), media };
    },
  },
});
