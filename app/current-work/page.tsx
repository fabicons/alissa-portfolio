import type { Metadata } from "next";
import Link from "next/link";
import BackgroundArt from "@/app/_components/BackgroundArt";
import Gallery from "@/app/_components/Gallery";
import SiteFooterNav from "@/app/_components/SiteFooterNav";
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
          <p className="mt-6 text-sm tracking-[0.3em] text-[#011f60]/60 uppercase">
            — Current Work —
          </p>
        </header>

        <Gallery paintings={currentWork} />

        <SiteFooterNav />
      </main>
    </>
  );
}
