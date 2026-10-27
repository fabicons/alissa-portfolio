import type { StaticImageData } from "next/image";

// Collection I
import col1AiguaCristalina from "@/public/images/col1_aigua-cristalina_50x60.jpg";
import col1Calma from "@/public/images/col1_calma_80x80.jpg";
import col1EntreMarYCel from "@/public/images/col1_entre-mar-y-cel_100x100.jpg";
import col1FullMoon from "@/public/images/col1_full-moon_50x80.jpg";
import col1Horizon from "@/public/images/col1_horizon_60x60.jpg";
import col1IslaBonita from "@/public/images/col1_isla-bonita_150x300.jpg";
import col1LaBahia from "@/public/images/col1_la-bahia_100x100.jpg";
import col1Midnight from "@/public/images/col1_midnight_50x70.jpg";
import col1RiversRun from "@/public/images/col1_rivers-run_100x100.jpg";
import col1TheCalling from "@/public/images/col1_the-calling_50x80.jpg";

// Collection II
import col2ChicaBugambilia from "@/public/images/col2_chica-bugambilia_60x80.jpg";
import col2Daylight from "@/public/images/col2_daylight_80x80.jpg";
import col2Delfina from "@/public/images/col2_delfina_60x50.jpg";
import col2Dusk from "@/public/images/col2_dusk_110x110.jpg";
import col2Ella from "@/public/images/col2_ella_100x100.jpg";
import col2Ellas from "@/public/images/col2_ellas_50x80.jpg";
import col2LagrimasDeLuna from "@/public/images/col2_lagrimas-de-luna_100x100.jpg";
import col2Tamed from "@/public/images/col2_tamed_60x60.jpg";
import col2Vaimiti from "@/public/images/col2_vaimiti_110x100.jpg";

// Current work / others
import othersAmor from "@/public/images/others_amor_130x100.jpg";
import othersParadise from "@/public/images/others_paradise_60x80.jpg";

export type Painting = {
  /** Display title of the piece. */
  title: string;
  /** Statically imported image (provides real pixel dimensions). */
  image: StaticImageData;
  /** Physical canvas size in centimetres, e.g. "50 × 60 cm". */
  size: string;
};

export type Collection = {
  /** URL slug, e.g. "collection-1". */
  slug: string;
  /** Short label used in navigation, e.g. "Collection I". */
  name: string;
  /** Roman-numeral styled heading, e.g. "— Collection I —". */
  heading: string;
  paintings: Painting[];
};

const cm = (size: string) => size.replace("x", " × ") + " cm";

export const collectionOne: Collection = {
  slug: "collection-1",
  name: "Collection I",
  heading: "Collection I",
  paintings: [
    { title: "Aigua Cristalina", image: col1AiguaCristalina, size: cm("50x60") },
    { title: "Calma", image: col1Calma, size: cm("80x80") },
    { title: "Entre Mar y Cel", image: col1EntreMarYCel, size: cm("100x100") },
    { title: "Full Moon", image: col1FullMoon, size: cm("50x80") },
    { title: "Horizon", image: col1Horizon, size: cm("60x60") },
    { title: "Isla Bonita", image: col1IslaBonita, size: cm("150x300") },
    { title: "La Bahía", image: col1LaBahia, size: cm("100x100") },
    { title: "Midnight", image: col1Midnight, size: cm("50x70") },
    { title: "Rivers Run", image: col1RiversRun, size: cm("100x100") },
    { title: "The Calling", image: col1TheCalling, size: cm("50x80") },
  ],
};

export const collectionTwo: Collection = {
  slug: "collection-2",
  name: "Collection II",
  heading: "Collection II",
  paintings: [
    { title: "Chica Bugambilia", image: col2ChicaBugambilia, size: cm("60x80") },
    { title: "Daylight", image: col2Daylight, size: cm("80x80") },
    { title: "Delfina", image: col2Delfina, size: cm("60x50") },
    { title: "Dusk", image: col2Dusk, size: cm("110x110") },
    { title: "Ella", image: col2Ella, size: cm("100x100") },
    { title: "Ellas", image: col2Ellas, size: cm("50x80") },
    { title: "Lágrimas de Luna", image: col2LagrimasDeLuna, size: cm("100x100") },
    { title: "Tamed", image: col2Tamed, size: cm("60x60") },
    { title: "Vaimiti", image: col2Vaimiti, size: cm("110x100") },
  ],
};

export const currentWork: Painting[] = [
  { title: "Amor", image: othersAmor, size: cm("130x100") },
  { title: "Paradise", image: othersParadise, size: cm("60x80") },
];

export const collections: Collection[] = [collectionOne, collectionTwo];

/** The piece used as the subtle background across the site. */
export const backgroundPainting = col1IslaBonita;

/** Representative cover images for the home-page collection links. */
export const collectionCovers = {
  "collection-1": col1EntreMarYCel,
  "collection-2": col2Ella,
} as const;
