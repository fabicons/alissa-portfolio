import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CollectionView from "@/app/_components/CollectionView";
import { getCollection } from "@/app/_data/paintings";

export const metadata: Metadata = {
  title: "Collection I — Alissa Borsani",
  description: "Collection I by contemporary Mallorcan painter Alissa Borsani.",
};

export default async function CollectionOnePage() {
  const collection = await getCollection("collection-1");
  if (!collection) notFound();
  return <CollectionView collection={collection} />;
}
