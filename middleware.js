import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Build an auth-enabled handler we can call conditionally
const authMiddleware = withAuth({
  pages: { signIn: "/login" }, // where unauthenticated users are sent
});

export default function middleware(req) {
  const { pathname } = req.nextUrl;

  // 1) Skip Next.js internals and public assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/images") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }

  // 2) Skip auth/public APIs from protection
  if (pathname.startsWith("/api/auth") || pathname.startsWith("/api/public")) {
    return NextResponse.next();
  }

  // 3) Protect dashboard and other API routes
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/api")) {
    return authMiddleware(req);
  }

  // 4) Everything else: proceed
  return NextResponse.next();
}

// Keep the matcher SIMPLE; no lookaheads/optional groups here
export const config = {
  matcher: [
    "/dashboard/:path*", // all dashboard routes
    "/api/:path*",       // all API routes (we skip auth/public in code)
    "/((?!_next/static|_next/image|favicon.ico).*)", // optional: catch other pages if needed
  ],
};
