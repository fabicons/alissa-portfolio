import Image from "next/image";
import { backgroundPainting } from "@/app/_data/paintings";

/**
 * Soft, light-blue washed painting used as a fixed page background
 * (per the "light blue background / painting background" notes in the mockups).
 */
export default function BackgroundArt() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <Image
        src={backgroundPainting}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-linear-to-b from-[#eaf1fb]/80 via-white/85 to-[#eaf1fb]/80" />
    </div>
  );
}
