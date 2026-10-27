import type { Metadata } from "next";
import CollectionView from "@/app/_components/CollectionView";
import { collectionTwo } from "@/app/_data/paintings";

export const metadata: Metadata = {
  title: "Collection II — Alissa Borsani",
  description: "Collection II by contemporary Mallorcan painter Alissa Borsani.",
};

export default function CollectionTwoPage() {
  return <CollectionView collection={collectionTwo} />;
}
