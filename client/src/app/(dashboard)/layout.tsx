import "@/app/globals.css";
import Providers from "@/app/provider";

export const metadata = {
  title: "Dashboard",
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
         {children}
        </Providers>
      </body>
    </html>
  );
}
