import { FormGallery } from "@/components/form-gallery";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Form Gallery",
};

export default function Page({ params }: { params: { id: string } }) {
  return <FormGallery id={params.id} />;
}
