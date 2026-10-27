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
      <div className="rounded-sm bg-white p-3 shadow-[0_10px_40px_-15px_rgba(1,31,96,0.35)] ring-1 ring-[#011f60]/10 sm:p-5">
        <Image
          src={image}
          alt={`${title}, ${size}`}
          placeholder="blur"
          sizes="(min-width: 768px) 42rem, 100vw"
          priority={priority}
          className="h-auto w-full rounded-sm"
        />
      </div>
      <figcaption className="mt-4 text-center">
        <span className="block text-xl italic tracking-wide sm:text-2xl">
          {title}
        </span>
        <span className="mt-1 block text-sm text-[#011f60]/60">{size}</span>
      </figcaption>
    </figure>
  );
}
