import { BookIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

/** A course is the top level. Modules are embedded; lessons are referenced. */
export const course = defineType({
  name: "course",
  title: "Course",
  type: "document",
  icon: BookIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "curriculum", title: "Curriculum" },
    { name: "marketing", title: "Marketing" },
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
      name: "summary",
      title: "Summary",
      type: "text",
      group: "content",
      rows: 3,
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "instructor",
      title: "Instructor",
      type: "reference",
      group: "content",
      to: [{ type: "instructor" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      group: "content",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "learningOutcomes",
      title: "Learning outcomes",
      description: 'Drives the "what you\'ll learn" section.',
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "learningOutcome" })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "modules",
      title: "Modules",
      description: "Ordered. Module numbering follows this order.",
      type: "array",
      group: "curriculum",
      of: [defineArrayMember({ type: "module" })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "level",
      title: "Level",
      type: "string",
      group: "marketing",
      options: {
        list: [
          { title: "Beginner", value: "beginner" },
          { title: "Intermediate", value: "intermediate" },
          { title: "Advanced", value: "advanced" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      description: "In the smallest currency unit. Zero means free.",
      type: "number",
      group: "marketing",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "popular",
      title: "Popular",
      type: "boolean",
      group: "marketing",
      initialValue: false,
    }),
    defineField({
      name: "studentCount",
      title: "Student count",
      description: "Display only.",
      type: "number",
      group: "marketing",
      validation: (rule) => rule.integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: "title",
      level: "level",
      instructor: "instructor.name",
      media: "coverImage",
    },
    prepare({ title, level, instructor, media }) {
      return {
        title: title ?? "Untitled course",
        subtitle: [level, instructor].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
