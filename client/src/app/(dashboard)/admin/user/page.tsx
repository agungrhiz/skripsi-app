import { ListUser } from "@/components/list-user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "List User",
};

export const dynamic = "force-dynamic";

export default function Page() {
  return <ListUser />;
}
