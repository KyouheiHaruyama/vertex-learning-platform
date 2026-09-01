import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  type ContentModule,
  CourseContent,
} from "@/components/course/course-content";
import { CourseHero } from "@/components/course/course-hero";
import { CourseProgress } from "@/components/course/course-progress";
import { LearningOutcomes } from "@/components/course/learning-outcomes";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { DecorativeBars } from "@/components/ui/decorative-bars";
import { PageFrame } from "@/components/ui/page-frame";
import { SiteHeader } from "@/components/ui/site-header";
import { COURSE_BY_SLUG_QUERY, COURSE_SLUGS_QUERY } from "@/sanity/queries";
import { sanityFetch } from "@/sanity/fetch";

function getCourse(slug: string) {
  return sanityFetch({
    query: COURSE_BY_SLUG_QUERY,
    params: { slug },
    tags: [`course:${slug}`],
  });
}

export async function generateStaticParams() {
  const courses = await sanityFetch({ query: COURSE_SLUGS_QUERY });

  return courses
    .filter((course) => course.slug !== null)
    .map((course) => ({ slug: course.slug as string }));
}

export async function generateMetadata({
  params,
}: PageProps<"/courses/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    return { title: "Course not found" };
  }

  return {
    title: `${course.title} — Vertex`,
    description: course.summary ?? undefined,
  };
}

export default async function CoursePage({
  params,
}: PageProps<"/courses/[slug]">) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    notFound();
  }

  /* Module and lesson numbering comes from array order, never from a stored
     field — see AGENTS.md section 8. */
  const modules: ContentModule[] = (course.modules ?? []).map((module) => {
    const lessons = (module.lessons ?? []).map((lesson) => ({
      id: lesson._id,
      title: lesson.title ?? "Untitled lesson",
      duration: lesson.duration,
      freePreview: lesson.freePreview ?? false,
    }));

    return {
      key: module._key,
      title: module.title ?? "Untitled module",
      summary: module.summary,
      seconds: lessons.reduce((total, lesson) => total + (lesson.duration ?? 0), 0),
      lessons,
    };
  });

  const totalSeconds = modules.reduce((total, module) => total + module.seconds, 0);
  const firstLessonSlug = course.modules?.[0]?.lessons?.[0]?.slug ?? null;
  const startHref = firstLessonSlug ? `/lessons/${firstLessonSlug}` : null;

  return (
    <PageFrame>
      <SiteHeader activeHref="/courses" />

      <Breadcrumbs
        className="px-6 pt-6 sm:px-13"
        items={[
          { label: "All Courses", href: "/courses" },
          { label: course.title ?? "Course" },
        ]}
      />

      <CourseHero
        course={course}
        totalSeconds={totalSeconds}
        moduleCount={modules.length}
        startHref={startHref}
      />

      <LearningOutcomes outcomes={course.learningOutcomes ?? []} />

      <CourseContent modules={modules} totalSeconds={totalSeconds} />

      {/* Progress has no store yet, so this renders the not-started state. */}
      <div className="relative z-10">
        <CourseProgress
          percentComplete={0}
          resumeHref={startHref}
          resumeLabel="Start Learning"
        />
      </div>

      {/* The reference has the bars rising behind the progress card. */}
      <DecorativeBars className="-mt-24" />
    </PageFrame>
  );
}
