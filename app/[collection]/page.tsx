import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import CollectionView from "@/app/_components/CollectionView";
import {
  getCollection,
  getCollections,
  getCurrentWork,
} from "@/app/_data/paintings";

type CollectionPageProps = {
  params: Promise<{ collection: string }>;
};

const getPageCollection = cache(async (slug: string) => {
  if (slug === "current-work") {
    return {
      slug,
      name: "Current Work",
      heading: "Current Work",
      paintings: await getCurrentWork(),
    };
  }

  const collection = await getCollection(slug);
  if (!collection) notFound();
  return collection;
});

export async function generateStaticParams() {
  const collections = await getCollections();
  return [
    ...collections.map(({ slug }) => ({ collection: slug })),
    { collection: "current-work" },
  ];
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { collection: slug } = await params;
  const collection = await getPageCollection(slug);

  return {
    title: `${collection.name} — Alissa Borsani`,
    description:
      collection.slug === "current-work"
        ? "Recent and in-progress paintings by Alissa Borsani."
        : `${collection.name} by contemporary Mallorcan painter Alissa Borsani.`,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { collection: slug } = await params;
  const collection = await getPageCollection(slug);
  return <CollectionView collection={collection} />;
}