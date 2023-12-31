import { FormUser } from "@/components/form-user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Form User",
};

export default function Page({ params }: { params: { id: string } }) {
  return <FormUser id={params.id} />;
}
