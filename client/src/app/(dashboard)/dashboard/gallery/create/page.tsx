import { FormGallery } from "@/components/form-gallery";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Form Gallery",
};

export default function Page() {
  return <FormGallery />;
}
