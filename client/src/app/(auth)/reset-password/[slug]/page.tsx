import { FormResetPassword } from "@/components/form-reset-password";

export const metadata = {
  title: "Reset Password",
};

export default function Page({ params }: { params: { slug: string } }) {
  const props = {
    title: "Reset Password",
    token: params.slug,
  };

  return <FormResetPassword {...props} />;
}
