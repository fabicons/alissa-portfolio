import Image from "next/image";
import { getBackgroundPainting } from "@/app/_data/paintings";

/**
 * A single painting zoomed in so only its brushwork and texture fill the
 * screen, overlaid with a soft light-blue wash so text stays readable
 * (per the "light blue background / painting background" notes in the mockups).
 */
export default async function BackgroundArt() {
  const background = await getBackgroundPainting();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 h-lvh">
      {background && (
        <Image
          src={background}
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-[1.9] object-cover object-center"
        />
      )}
      <div className="absolute inset-0 bg-linear-to-b from-[#e8eff9]/82 via-white/74 to-[#e8eff9]/84" />
    </div>
  );
}
