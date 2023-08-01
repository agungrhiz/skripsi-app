import { ListItem } from "@/components/list-item";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "List Item",
};

export const dynamic = "force-dynamic";

export default function ItemPage() {
  return <ListItem />;
}
