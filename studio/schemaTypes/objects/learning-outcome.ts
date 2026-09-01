import { defineField, defineType } from "sanity";

/** One "what you'll learn" bullet on a course. */
export const learningOutcome = defineType({
  name: "learningOutcome",
  title: "Learning outcome",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Name of the icon to show beside the outcome.",
      options: {
        list: [
          { title: "Layers", value: "layers" },
          { title: "Workflow", value: "workflow" },
          { title: "Gauge", value: "gauge" },
          { title: "Rocket", value: "rocket" },
          { title: "Sparkles", value: "sparkles" },
          { title: "Shield", value: "shield" },
          { title: "Puzzle", value: "puzzle" },
          { title: "Code", value: "code" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required().max(200),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
});
