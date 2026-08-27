import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-display-1 text-neutral-900">Vertex</h1>
      <p className="text-body-lg max-w-md text-neutral-500">
        A learning platform with search that takes you to the exact moment a
        topic is taught.
      </p>
      <Link
        href="/design-system"
        className="text-body inline-flex h-11 items-center rounded-md bg-primary-500 px-4 font-medium text-white transition-colors hover:bg-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
      >
        View the design system
      </Link>
    </main>
  );
}
