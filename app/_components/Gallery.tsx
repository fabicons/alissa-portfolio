"use client";

import { useState } from "react";
import Lightbox from "@/app/_components/Lightbox";
import PaintingFrame from "@/app/_components/PaintingFrame";
import type { Painting } from "@/app/_data/paintings";

/**
 * A vertical stack of clickable paintings. Clicking one opens a full-screen
 * slideshow (Lightbox) for viewing the work in detail.
 */
export default function Gallery({ paintings }: { paintings: Painting[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="mt-14 flex w-full flex-col gap-20 sm:mt-16 sm:gap-24">
        {paintings.map((painting, index) => (
          <button
            key={painting.title}
            type="button"
            onClick={() => setOpenIndex(index)}
            aria-label={`View ${painting.title} larger`}
            className="group block cursor-zoom-in rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#011f60]/40 focus-visible:ring-offset-4"
          >
            <PaintingFrame painting={painting} priority={index === 0} />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          paintings={paintings}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onIndexChange={setOpenIndex}
        />
      )}
    </>
  );
}
