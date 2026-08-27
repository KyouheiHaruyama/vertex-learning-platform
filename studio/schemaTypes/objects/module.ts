import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * A module is embedded in its course, not a document of its own. The numbers
 * shown in the UI ("Module 5", "Lesson 5.1") come from array order, never from
 * a stored value.
 */
export const module = defineType({
  name: "module",
  title: "Module",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: "lessons",
      title: "Lessons",
      description: "Ordered. Lesson numbering follows this order.",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "lesson" }] })],
      validation: (rule) => rule.required().min(1).unique(),
    }),
  ],
  preview: {
    select: { title: "title", lessons: "lessons" },
    prepare({ title, lessons }) {
      const count = Array.isArray(lessons) ? lessons.length : 0;
      return {
        title: title ?? "Untitled module",
        subtitle: `${count} lesson${count === 1 ? "" : "s"}`,
      };
    },
  },
});
