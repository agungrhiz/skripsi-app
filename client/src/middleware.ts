import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const accessToken = request.cookies.get("access_token");
  const payloadToken = JSON.parse(
    request.cookies.get("payload_token")?.value || "{}"
  );

  switch (true) {
    case pathname === "/admin":
      return NextResponse.redirect(`${origin}/admin/user`);
    case pathname.startsWith("/dashboard") && !accessToken:
      return NextResponse.redirect(`${origin}/login`);
    case pathname.startsWith("/admin") && payloadToken.role !== "ADMINISTRATOR":
      return NextResponse.redirect(`${origin}/dashboard`);
    default:
      return NextResponse.next();
  }
}
