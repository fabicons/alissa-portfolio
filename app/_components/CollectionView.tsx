import Link from "next/link";
import BackgroundArt from "@/app/_components/BackgroundArt";
import CollectionSwitcher from "@/app/_components/CollectionSwitcher";
import PaintingFrame from "@/app/_components/PaintingFrame";
import type { Collection } from "@/app/_data/paintings";

/** Renders a full collection page: title, vertically stacked paintings, switcher. */
export default function CollectionView({
  collection,
}: {
  collection: Collection;
}) {
  return (
    <>
      <BackgroundArt />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center px-5 py-12 sm:px-8 sm:py-16">
        <header className="flex flex-col items-center text-center">
          <Link
            href="/"
            className="text-2xl font-semibold tracking-[0.15em] transition-colors hover:text-[#011f60] sm:text-3xl"
          >
            ALISSA BORSANI
          </Link>
          <p className="mt-6 text-sm tracking-[0.3em] text-[#011f60]/60 uppercase">
            — {collection.heading} —
          </p>
        </header>

        <div className="mt-14 flex w-full flex-col gap-20 sm:mt-16 sm:gap-24">
          {collection.paintings.map((painting, index) => (
            <PaintingFrame
              key={painting.title}
              painting={painting}
              priority={index === 0}
            />
          ))}
        </div>

        <CollectionSwitcher currentSlug={collection.slug} />
      </main>
    </>
  );
}
