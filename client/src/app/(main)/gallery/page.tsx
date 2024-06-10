import { ListGalleryPublished } from "@/components/list-gallery-published";

export const metadata = {
  title: "Gallery",
};

export const dynamic = "force-dynamic";

export default function Page() {
  return <ListGalleryPublished />;
}
