import Link from "next/link";
import BackgroundArt from "@/app/_components/BackgroundArt";
import Gallery from "@/app/_components/Gallery";
import SiteFooterNav from "@/app/_components/SiteFooterNav";
import type { Collection } from "@/app/_data/paintings";

/** Renders a full collection page: title, clickable paintings, footer nav. */
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
            className="font-serif text-2xl font-semibold tracking-[0.15em] transition-colors hover:text-[#011f60] sm:text-3xl"
          >
            ALISSA BORSANI
          </Link>
          <p className="mt-6 text-sm tracking-[0.3em] text-[#011f60]/60 uppercase">
            — {collection.heading} —
          </p>
        </header>

        <Gallery paintings={collection.paintings} />

        <SiteFooterNav />
      </main>
    </>
  );
}
