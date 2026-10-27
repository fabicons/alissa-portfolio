import type { Metadata } from "next";
import CollectionView from "@/app/_components/CollectionView";
import { collectionOne } from "@/app/_data/paintings";

export const metadata: Metadata = {
  title: "Collection I — Alissa Borsani",
  description: "Collection I by contemporary Mallorcan painter Alissa Borsani.",
};

export default function CollectionOnePage() {
  return <CollectionView collection={collectionOne} />;
}
