import type { Metadata } from "next";
import Link from "next/link";
import BackgroundArt from "@/app/_components/BackgroundArt";
import PaintingFrame from "@/app/_components/PaintingFrame";
import SiteNav from "@/app/_components/SiteNav";
import { getCurrentWork } from "@/app/_data/paintings";

export const metadata: Metadata = {
  title: "Current Work — Alissa Borsani",
  description: "Recent and in-progress paintings by Alissa Borsani.",
};

export default async function CurrentWorkPage() {
  const currentWork = await getCurrentWork();

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
          <p className="mt-6 text-sm uppercase tracking-[0.3em] text-[#011f60]/60">
            — Current Work —
          </p>
        </header>

        <div className="mt-14 flex w-full flex-col gap-20 sm:mt-16 sm:gap-24">
          {currentWork.map((painting, index) => (
            <PaintingFrame
              key={painting.title}
              painting={painting}
              priority={index === 0}
            />
          ))}
        </div>

        <nav className="mt-16 flex w-full flex-col items-center gap-6 border-t border-[#011f60]/15 pt-10">
          <SiteNav variant="inline" />
          <Link
            href="/"
            className="text-sm text-[#011f60]/60 underline-offset-4 transition-colors hover:text-[#011f60] hover:underline"
          >
            ← Back to home
          </Link>
        </nav>
      </main>
    </>
  );
}
