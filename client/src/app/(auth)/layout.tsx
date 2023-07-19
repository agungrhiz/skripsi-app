import "@/app/globals.css";
import Providers from "@/app/provider";
import { ApolloWrapper } from "@/lib/apollo-wrapper";

export const metadata = {
  title: "Auth",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="m-0">
        <Providers>
          <ApolloWrapper>{children}</ApolloWrapper>
        </Providers>
      </body>
    </html>
  );
}
