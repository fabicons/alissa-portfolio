"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Painting } from "@/app/_data/paintings";

/**
 * The current painting on stage. Kept as its own component (keyed by index in
 * the parent) so that each time the painting changes it remounts, replaying the
 * fade / slide-in animation and resetting the skeleton loading state.
 */
function Stage({ painting }: { painting: Painting }) {
  const [loaded, setLoaded] = useState(false);
  const { image, title, size } = painting;

  // Size the stage to the largest box that fits both the available height
  // (--lb-h, set responsively on the figure) and width (92vw) while keeping the
  // painting's aspect ratio. This scales smaller source images up so every
  // painting fills the same amount of space.
  return (
    <div
      className="relative animate-[lb-enter_360ms_cubic-bezier(0.22,1,0.36,1)]"
      style={{
        width: `min(92vw, calc(var(--lb-h) * ${image.width} / ${image.height}))`,
        aspectRatio: `${image.width} / ${image.height}`,
      }}
    >
      {/* Skeleton shown until the full-resolution image has loaded. It fills the
          explicitly sized box, so it matches the final image exactly. */}
      {!loaded && (
        <div className="absolute inset-0 animate-pulse rounded-sm bg-white/10 ring-1 ring-white/10" />
      )}
      <Image
        src={image}
        alt={`${title}, ${size}`}
        fill
        sizes="92vw"
        priority
        onLoad={() => setLoaded(true)}
        className={`rounded-sm object-contain shadow-2xl transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

/**
 * Full-screen slideshow for viewing a painting in detail. Supports previous /
 * next navigation (buttons, arrow keys, thumbnail strip), closing (button,
 * Escape, backdrop click), a loading skeleton and a subtle slide-in between
 * paintings. Wraps around the collection.
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
  const activeThumbRef = useRef<HTMLButtonElement>(null);

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

  // Keep the active thumbnail in view as the selection moves.
  useEffect(() => {
    activeThumbRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [index]);

  if (!painting) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${painting.title}, ${painting.size}`}
      onClick={onClose}
      className="fixed inset-0 z-50 flex flex-col bg-[#06143a]/92 backdrop-blur-sm"
    >
      {/* Close */}
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 z-10 flex h-11 w-11 touch-manipulation items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:top-6 sm:right-6"
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
          className="absolute top-1/2 left-2 z-10 flex h-12 w-12 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:left-6"
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

      {/* Stage + caption */}
      <figure
        onClick={(event) => event.stopPropagation()}
        className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 pt-16 pb-4 [--lb-h:56svh] sm:[--lb-h:70svh]"
      >
        <Stage key={index} painting={painting} />
        <figcaption className="mt-5 shrink-0 text-center text-white">
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
          className="absolute top-1/2 right-2 z-10 flex h-12 w-12 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:right-6"
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

      {/* Thumbnail strip */}
      {count > 1 && (
        <div
          onClick={(event) => event.stopPropagation()}
          className="shrink-0 border-t border-white/10 bg-black/25"
        >
          <div className="mx-auto flex max-w-3xl items-center gap-2 overflow-x-auto px-4 py-3">
            {paintings.map((item, i) => {
              const active = i === index;
              return (
                <button
                  key={item.title}
                  ref={active ? activeThumbRef : undefined}
                  type="button"
                  onClick={() => onIndexChange(i)}
                  aria-label={`View ${item.title}`}
                  aria-current={active ? "true" : undefined}
                  className={`relative h-14 w-14 shrink-0 touch-manipulation overflow-hidden rounded-sm transition duration-200 sm:h-16 sm:w-16 ${
                    active
                      ? "ring-2 ring-white"
                      : "opacity-55 ring-1 ring-white/20 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
