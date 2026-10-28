import Image from "next/image";
import type { Painting } from "@/app/_data/paintings";

/**
 * A single painting presented like a framed, matted piece on a gallery wall:
 * a white mat around the image with the title and canvas size as a caption.
 */
export default function PaintingFrame({
  painting,
  priority = false,
}: {
  painting: Painting;
  priority?: boolean;
}) {
  const { image, title, size } = painting;

  return (
    <figure className="mx-auto w-full max-w-2xl">
      <div className="relative overflow-hidden rounded-sm bg-white p-3 shadow-[0_10px_40px_-15px_rgba(1,31,96,0.35)] ring-1 ring-[#011f60]/10 transition-shadow duration-300 group-hover:shadow-[0_18px_55px_-18px_rgba(1,31,96,0.5)] sm:p-5">
        <Image
          src={image}
          alt={`${title}, ${size}`}
          placeholder="blur"
          sizes="(min-width: 768px) 42rem, 100vw"
          priority={priority}
          className="h-auto w-full rounded-sm transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {/* Hover cue hinting the image can be opened in the slideshow. */}
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#011f60]/80 text-white backdrop-blur-sm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M9 4H4v5M15 4h5v5M15 20h5v-5M9 20H4v-5" />
            </svg>
          </span>
        </span>
      </div>
      <figcaption className="mt-4 text-center">
        <span className="block font-serif text-xl italic sm:text-2xl tracking-tight">
          {title}
        </span>
        <span className="mt-1 block text-sm text-[#011f60]/60">{size}</span>
      </figcaption>
    </figure>
  );
}
