import { FormItem } from "@/components/form-item";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Form Item",
};

export default function Page({ params }: { params: { id: string } }) {
  return <FormItem id={params.id} />;
}
