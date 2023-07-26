import { FormItem } from "@/components/form-item";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Form User",
  };

export default function Page() {
    return <FormItem />;
}