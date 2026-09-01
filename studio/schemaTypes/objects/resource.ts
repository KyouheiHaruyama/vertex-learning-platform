import { defineField, defineType } from "sanity";

/** A downloadable or external resource attached to a lesson. */
export const resource = defineType({
  name: "resource",
  title: "Resource",
  type: "object",
  fields: [
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Link", value: "link" },
          { title: "PDF", value: "pdf" },
          { title: "Article", value: "article" },
          { title: "Repository", value: "repository" },
          { title: "Documentation", value: "documentation" },
          { title: "Template", value: "template" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "type" },
  },
});
