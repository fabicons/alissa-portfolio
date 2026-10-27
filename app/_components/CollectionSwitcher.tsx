import Link from "next/link";
import { getCollections } from "@/app/_data/paintings";

/**
 * Footer navigation shown on collection pages, letting visitors move between
 * collections and back home (the "Coll I / Coll II" switcher in the mockups).
 */
export default async function CollectionSwitcher({
  currentSlug,
}: {
  currentSlug: string;
}) {
  const collections = await getCollections();

  return (
    <nav
      aria-label="Browse collections"
      className="mt-16 flex w-full flex-col items-center gap-6 border-t border-[#011f60]/15 pt-10"
    >
      <div className="flex flex-wrap items-center justify-center gap-4">
        {collections.map((collection) => {
          const active = collection.slug === currentSlug;
          return (
            <Link
              key={collection.slug}
              href={`/${collection.slug}`}
              aria-current={active ? "page" : undefined}
              className={`rounded-full border px-6 py-2 text-base tracking-wide transition-colors sm:text-lg ${
                active
                  ? "border-[#011f60] bg-[#011f60] text-white"
                  : "border-[#011f60]/30 text-[#011f60]/80 hover:border-[#011f60] hover:text-[#011f60]"
              }`}
            >
              {collection.name}
            </Link>
          );
        })}
      </div>
      <Link
        href="/"
        className="text-sm text-[#011f60]/60 underline-offset-4 transition-colors hover:text-[#011f60] hover:underline"
      >
        ← Back to home
      </Link>
    </nav>
  );
}
