import Image from "next/image";
import Link from "next/link";
import alissa from "@/public/images/alissa.jpg";
import BackgroundArt from "@/app/_components/BackgroundArt";
import SiteNav from "@/app/_components/SiteNav";
import { getCollections } from "@/app/_data/paintings";

export default async function Home() {
  const collections = await getCollections();

  return (
    <>
      <BackgroundArt />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center px-5 py-12 sm:px-8 sm:py-16">
        {/* Hero */}
        <header className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-semibold tracking-[0.15em] sm:text-6xl lg:text-7xl">
            ALISSA BORSANI
          </h1>
          <p className="mt-4 text-sm tracking-[0.3em] text-[#011f60]/70 uppercase sm:text-base">
            Contemporary artist · Mallorca
          </p>
          <div className="mt-10">
            <SiteNav variant="hero" />
          </div>
        </header>

        {/* Collection preview cards */}
        <section
          aria-label="Collections"
          className="mt-16 grid w-full gap-8 sm:mt-20 sm:grid-cols-2"
        >
          {collections.map((collection) => {
            const cover = collection.paintings[0]?.image;
            return (
              <Link
                key={collection.slug}
                href={`/${collection.slug}`}
                className="group flex flex-col"
              >
                <div className="relative aspect-4/5 w-full overflow-hidden rounded-sm bg-white shadow-[0_15px_50px_-20px_rgba(1,31,96,0.4)] ring-1 ring-[#011f60]/10">
                  {cover && (
                    <Image
                      src={cover}
                      alt={`${collection.name} cover painting`}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-[#011f60]/55 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5 text-white">
                    <span className="text-2xl tracking-wide sm:text-3xl">
                      {collection.name}
                    </span>
                    <span className="text-sm opacity-80 transition-transform duration-300 group-hover:translate-x-1">
                      View →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </section>

        {/* About / artist */}
        <section
          aria-labelledby="about-heading"
          className="mt-20 grid w-full gap-10 sm:mt-24 md:grid-cols-2 md:items-center"
        >
          <div className="relative mx-auto aspect-4/5 w-full max-w-md overflow-hidden rounded-sm bg-white shadow-[0_15px_50px_-20px_rgba(1,31,96,0.4)] ring-1 ring-[#011f60]/10">
            <Image
              src={alissa}
              alt="Alissa Borsani in her studio"
              fill
              sizes="(min-width: 768px) 28rem, 100vw"
              className="object-cover"
            />
          </div>
          <div className="space-y-5">
            <h2
              id="about-heading"
              className="text-3xl tracking-wide sm:text-4xl"
            >
              About the artist
            </h2>
            <p className="text-base leading-relaxed text-[#011f60]/80 sm:text-lg">
              {/* TODO: Replace with Alissa's real bio. */}
              Alissa Borsani is a contemporary painter based in Mallorca, where
              the Mediterranean light and the endless blue of the sea shape
              every canvas. Her work moves between stillness and motion,
              searching for that feeling of freedom found on the water&apos;s
              horizon.
            </p>
            <p className="text-base leading-relaxed text-[#011f60]/80 sm:text-lg">
              {/* TODO: Replace with Alissa's real bio. */}
              Working primarily in blues and soft, luminous whites, each piece
              is an invitation to pause, breathe, and look a little longer.
            </p>
          </div>
        </section>

        {/* Quote / poem */}
        <section className="mt-20 w-full max-w-3xl sm:mt-24">
          <blockquote className="border-l-2 border-[#011f60]/40 pl-6 text-center text-2xl leading-relaxed italic sm:text-3xl">
            {/* TODO: Replace with Alissa's chosen poem or quote. */}
            &quot;The sea does not ask permission to be blue — it simply is, and
            in its stillness I find my own.&quot;
          </blockquote>
        </section>
      </main>
    </>
  );
}
