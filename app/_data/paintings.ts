import fs from "node:fs";
import path from "node:path";
import type { StaticImageData } from "next/image";

/**
 * Filename-driven painting data.
 *
 * Alissa can manage the whole site just by adding / renaming / removing image
 * files in `public/images` — no code changes required. Every image must follow
 * this naming convention (lower-case, words separated by dashes):
 *
 *     {group}_{name-of-the-painting}_{widthXheight}.{jpg|png|webp|avif}
 *
 *   • group  →  "col1", "col2", "col3", … for a collection, or "others" for
 *               the Current Work page. (Adding a "col3_…" file automatically
 *               creates a Collection III — no code needed.)
 *   • name   →  dashes become spaces and each word is capitalised,
 *               e.g. "entre-mar-y-cel" → "Entre Mar y Cel".
 *   • size   →  canvas size in centimetres, e.g. "50x60" → "50 × 60 cm".
 *
 * Examples:
 *     col1_aigua-cristalina_50x60.jpg
 *     col2_delfina_60x50.jpg
 *     others_amor_130x100.jpg
 *
 * IMPORTANT: images must be JPG, PNG, WebP or AVIF. Photos straight from an
 * iPhone are usually `.heic` and must be exported/converted to `.jpg` first.
 *
 * Next.js image optimizations are fully preserved: each file is loaded with a
 * dynamic `import()` (documented Next.js pattern) which provides automatic
 * width, height and a blur-up placeholder, on top of the usual resizing,
 * modern formats (AVIF/WebP) and lazy loading.
 */

export type Painting = {
  /** Display title, derived from the file name. */
  title: string;
  /** Statically analysed image (real pixel size + blur placeholder). */
  image: StaticImageData;
  /** Physical canvas size in centimetres, e.g. "50 × 60 cm". */
  size: string;
};

export type Collection = {
  /** URL slug, e.g. "collection-1". */
  slug: string;
  /** Display label, e.g. "Collection I". */
  name: string;
  /** Heading shown on the collection page, e.g. "Collection I". */
  heading: string;
  paintings: Painting[];
};

const IMAGES_DIR = path.join(process.cwd(), "public", "images");

/**
 * Preferred image used as the site-wide textured background. If this file is
 * missing it falls back to the first available painting.
 */
const BACKGROUND_FILE = "col1_aigua-cristalina_50x60.jpg";

/** {group}_{name}_{WxH}.{ext} — e.g. col1_aigua-cristalina_50x60.jpg */
const FILE_RE =
  /^(col\d+|others)_(.+)_(\d+(?:\.\d+)?)x(\d+(?:\.\d+)?)\.(?:jpe?g|png|webp|avif)$/i;

/** Small connector words kept lower-case in titles (unless first word). */
const MINOR_WORDS = new Set([
  "de",
  "del",
  "la",
  "las",
  "el",
  "los",
  "y",
  "o",
  "en",
  "con",
  "a",
  "the",
  "of",
  "and",
]);

type ParsedFile = {
  group: string;
  /** Collection number if the group is "colN", otherwise null. */
  collectionNumber: number | null;
  title: string;
  size: string;
  file: string;
};

function toRoman(value: number): string {
  const numerals: [number, string][] = [
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let remaining = value;
  let result = "";
  for (const [amount, symbol] of numerals) {
    while (remaining >= amount) {
      result += symbol;
      remaining -= amount;
    }
  }
  return result || String(value);
}

function toTitle(nameSlug: string): string {
  return nameSlug
    .split("-")
    .filter(Boolean)
    .map((word, index) =>
      index > 0 && MINOR_WORDS.has(word.toLowerCase())
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join(" ");
}

function parseFile(file: string): ParsedFile | null {
  const match = FILE_RE.exec(file);
  if (!match) return null;
  const [, groupRaw, nameRaw, width, height] = match;
  const group = groupRaw.toLowerCase();
  const collectionMatch = /^col(\d+)$/.exec(group);
  return {
    group,
    collectionNumber: collectionMatch ? Number(collectionMatch[1]) : null,
    title: toTitle(nameRaw),
    size: `${width} × ${height} cm`,
    file,
  };
}

/** Read and parse every conforming image file, sorted alphabetically by title. */
function listParsedFiles(): ParsedFile[] {
  let files: string[];
  try {
    files = fs.readdirSync(IMAGES_DIR);
  } catch {
    return [];
  }
  return files
    .map(parseFile)
    .filter((parsed): parsed is ParsedFile => parsed !== null)
    .sort((a, b) => a.title.localeCompare(b.title));
}

/**
 * Dynamically import a local image so Next.js still provides width, height and
 * a blur placeholder. The static `@/public/images/` prefix means only files in
 * that folder are ever bundled.
 */
async function toPainting(parsed: ParsedFile): Promise<Painting> {
  const { default: image } = (await import(
    `@/public/images/${parsed.file}`
  )) as { default: StaticImageData };
  return { title: parsed.title, image, size: parsed.size };
}

function collectionMeta(collectionNumber: number) {
  const name = `Collection ${toRoman(collectionNumber)}`;
  return { slug: `collection-${collectionNumber}`, name, heading: name };
}

/** All collections (col1, col2, …), ordered by number. */
export async function getCollections(): Promise<Collection[]> {
  const grouped = new Map<number, ParsedFile[]>();
  for (const parsed of listParsedFiles()) {
    if (parsed.collectionNumber === null) continue;
    const bucket = grouped.get(parsed.collectionNumber) ?? [];
    bucket.push(parsed);
    grouped.set(parsed.collectionNumber, bucket);
  }

  const numbers = [...grouped.keys()].sort((a, b) => a - b);
  return Promise.all(
    numbers.map(async (number) => ({
      ...collectionMeta(number),
      paintings: await Promise.all(grouped.get(number)!.map(toPainting)),
    })),
  );
}

/** A single collection by slug ("collection-1"), or undefined if it has no images. */
export async function getCollection(
  slug: string,
): Promise<Collection | undefined> {
  const match = /^collection-(\d+)$/.exec(slug);
  if (!match) return undefined;
  const number = Number(match[1]);
  const paintings = await Promise.all(
    listParsedFiles()
      .filter((parsed) => parsed.collectionNumber === number)
      .map(toPainting),
  );
  if (paintings.length === 0) return undefined;
  return { ...collectionMeta(number), paintings };
}

/** Paintings in the "others" group, shown on the Current Work page. */
export async function getCurrentWork(): Promise<Painting[]> {
  return Promise.all(
    listParsedFiles()
      .filter((parsed) => parsed.group === "others")
      .map(toPainting),
  );
}

/** First painting of each collection, used as the home-page link covers. */
export async function getCollectionCovers(): Promise<
  Record<string, StaticImageData>
> {
  const collections = await getCollections();
  const covers: Record<string, StaticImageData> = {};
  for (const collection of collections) {
    const cover = collection.paintings[0];
    if (cover) covers[collection.slug] = cover.image;
  }
  return covers;
}

/** The piece used as the textured background across the site. */
export async function getBackgroundPainting(): Promise<StaticImageData | null> {
  const parsed = listParsedFiles();
  const choice =
    parsed.find((file) => file.file === BACKGROUND_FILE) ?? parsed[0];
  if (!choice) return null;
  const { image } = await toPainting(choice);
  return image;
}
