import { ListItemPublished } from "@/components/list-item-published";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="grid place-items-center min-h-screen">
      <ListItemPublished />
    </div>
  );
}
