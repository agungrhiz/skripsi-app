import { FormResetPassword } from "@/components/organisms/form-reset-password";

export const metadata = {
  title: "Aktivasi Akun",
};

export default function Page({ params }: { params: { slug: string } }) {
  const props = {
    title: "Aktivasi Akun",
    token: params.slug,
  };

  return <FormResetPassword {...props} />;
}
