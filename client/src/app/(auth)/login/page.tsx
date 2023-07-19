import { FormLogin } from "@/components/organisms/form-login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default async function Page()  {
  return <FormLogin />;
}
