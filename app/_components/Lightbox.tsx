"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import type { Painting } from "@/app/_data/paintings";

/**
 * Full-screen slideshow for viewing a painting in detail. Supports previous /
 * next navigation (buttons, arrow keys), closing (button, Escape, backdrop
 * click) and wraps around the collection.
 */
export default function Lightbox({
  paintings,
  index,
  onClose,
  onIndexChange,
}: {
  paintings: Painting[];
  index: number;
  onClose: () => void;
  onIndexChange: (next: number) => void;
}) {
  const count = paintings.length;
  const painting = paintings[index];
  const closeRef = useRef<HTMLButtonElement>(null);

  const goPrev = useCallback(
    () => onIndexChange((index - 1 + count) % count),
    [index, count, onIndexChange],
  );
  const goNext = useCallback(
    () => onIndexChange((index + 1) % count),
    [index, count, onIndexChange],
  );

  // Keyboard controls.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowLeft") goPrev();
      else if (event.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, goPrev, goNext]);

  // Lock background scroll while open and move focus into the dialog.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!painting) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${painting.title}, ${painting.size}`}
      onClick={onClose}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#06143a]/92 p-4 backdrop-blur-sm sm:p-8"
    >
      {/* Close */}
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:top-6 sm:right-6"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          className="h-6 w-6"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      {/* Previous */}
      {count > 1 && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            goPrev();
          }}
          aria-label="Previous painting"
          className="absolute top-1/2 left-2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:left-6"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7"
          >
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
      )}

      {/* Image + caption */}
      <figure
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-full max-w-full flex-col items-center"
      >
        <Image
          key={painting.title}
          src={painting.image}
          alt={`${painting.title}, ${painting.size}`}
          placeholder="blur"
          sizes="92vw"
          priority
          className="h-auto max-h-[78vh] w-auto max-w-[92vw] rounded-sm object-contain shadow-2xl"
        />
        <figcaption className="mt-5 text-center text-white">
          <span className="block text-lg tracking-wide italic sm:text-xl">
            {painting.title}
          </span>
          <span className="mt-1 block text-sm text-white/60">
            {painting.size}
            {count > 1 && (
              <span className="ml-3 tabular-nums">
                {index + 1} / {count}
              </span>
            )}
          </span>
        </figcaption>
      </figure>

      {/* Next */}
      {count > 1 && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            goNext();
          }}
          aria-label="Next painting"
          className="absolute top-1/2 right-2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:right-6"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      )}
    </div>
  );
}
