import { NextResponse } from "next/server";

export default function middleware(req: any) {
  const authenticated = req.cookies.get("access_token");
  const { pathname, origin } = req.nextUrl;

  if (!authenticated && pathname === "/Dashboard") {
    return NextResponse.redirect(`${origin}/`);
  }

  if (authenticated && pathname === "/") {
    return NextResponse.redirect(`${origin}/Dashboard`);
  }
}
