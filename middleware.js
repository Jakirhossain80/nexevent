// middleware.jsx
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const authMiddleware = withAuth({ pages: { signIn: "/login" } });

export default function middleware(req) {
  const { pathname } = req.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/images") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/public")
  ) return NextResponse.next();

  if (pathname.startsWith("/dashboard")) return authMiddleware(req);
  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*"] };
