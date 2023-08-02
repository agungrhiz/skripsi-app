import { ListGallery } from "@/components/list-gallery";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "List Gallery",
};

export const dynamic = "force-dynamic";

export default function GalleryPage() {
  return <ListGallery />;
}
