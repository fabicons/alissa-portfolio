import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CollectionView from "@/app/_components/CollectionView";
import { getCollection } from "@/app/_data/paintings";

export const metadata: Metadata = {
  title: "Collection II — Alissa Borsani",
  description: "Collection II by contemporary Mallorcan painter Alissa Borsani.",
};

export default async function CollectionTwoPage() {
  const collection = await getCollection("collection-2");
  if (!collection) notFound();
  return <CollectionView collection={collection} />;
}
