import { defineQuery } from "next-sanity";

/**
 * Every query projects the fields it needs. Nothing returns `*`, and Portable
 * Text (`notes`) is only fetched by the single-lesson query.
 */

const courseCardFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  summary,
  coverImage,
  level,
  price,
  popular,
  studentCount,
  instructor->{ _id, name, "slug": slug.current },
  category->{ _id, title, "slug": slug.current },
  "moduleCount": count(modules),
  "lessonCount": count(modules[].lessons[]),
  "totalSeconds": math::sum(modules[].lessons[]->duration)
`;

/** Catalog listing, most recently created first with popular courses on top. */
export const COURSES_QUERY = defineQuery(/* groq */ `
  *[_type == "course" && defined(slug.current)]
    | order(popular desc, _createdAt desc) {
      ${courseCardFields}
    }
`);

/** The three cards the home page shows, sharing the catalog's ordering. */
export const HOME_COURSES_QUERY = defineQuery(/* groq */ `
  *[_type == "course" && defined(slug.current)]
    | order(popular desc, _createdAt desc)[0...3] {
      ${courseCardFields}
    }
`);

export const COURSE_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "course" && slug.current == $slug][0] {
    ${courseCardFields},
    instructor->{ _id, name, "slug": slug.current, photo, expertise, bio },
    learningOutcomes[]{ _key, icon, title, description },
    modules[]{
      _key,
      title,
      summary,
      lessons[]->{
        _id,
        title,
        "slug": slug.current,
        duration,
        freePreview
      }
    }
  }
`);

/**
 * A lesson does not store its parent course, so the course is derived with a
 * reverse reference. Module and lesson numbering is left to the frontend,
 * which reads it off the returned order.
 */
export const LESSON_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "lesson" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    videoUrl,
    thumbnail,
    duration,
    freePreview,
    studentCount,
    keyPoints,
    notes,
    proTip,
    resources[]{ _key, type, title, description, url },
    "course": *[_type == "course" && references(^._id)][0] {
      _id,
      title,
      "slug": slug.current,
      instructor->{ _id, name, "slug": slug.current },
      modules[]{
        _key,
        title,
        "lessonIds": lessons[]._ref
      }
    }
  }
`);

export const INSTRUCTOR_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "instructor" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    photo,
    expertise,
    bio,
    "courses": *[_type == "course" && instructor._ref == ^._id]
      | order(popular desc, _createdAt desc) {
        ${courseCardFields}
      }
  }
`);

export const CATEGORIES_QUERY = defineQuery(/* groq */ `
  *[_type == "category" && defined(slug.current)] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "courseCount": count(*[_type == "course" && category._ref == ^._id])
  }
`);

/** Slug lists for static generation. */
export const COURSE_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "course" && defined(slug.current)]{ "slug": slug.current }
`);

export const LESSON_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "lesson" && defined(slug.current)]{ "slug": slug.current }
`);
