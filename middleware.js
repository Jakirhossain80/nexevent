// middleware.js
import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

// Keep page redirects to /login for unauthenticated users
const authMiddleware = withAuth({
  pages: { signIn: "/login" },
});

export default async function middleware(req) {
  const { pathname } = req.nextUrl;
  const method = req.method;

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

  // 3) Protect dashboard pages (use withAuth so unauthenticated users get redirected to /login)
  if (pathname.startsWith("/dashboard")) {
    return authMiddleware(req);
  }

  // 4) Protect API routes
  if (pathname.startsWith("/api")) {
    // For write operations on events/bookings, require an auth token and return 401 (JSON) if missing
    const isWrite =
      method !== "GET" &&
      (pathname.startsWith("/api/events") || pathname.startsWith("/api/bookings"));

    // For any other API route (read or write), also require auth (matches your previous behavior),
    // except those we explicitly skipped above.
    const mustBeAuthed = true;

    if (isWrite || mustBeAuthed) {
      const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
      if (!token) {
        // For APIs, return JSON 401 instead of redirecting
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }
    return NextResponse.next();
  }

  // 5) Everything else: proceed
  return NextResponse.next();
}

// Keep the matcher SIMPLE; mirrors your existing behavior
export const config = {
  matcher: [
    "/dashboard/:path*", // all dashboard routes
    "/api/:path*",       // all API routes (auth/public skipped above)
    "/((?!_next/static|_next/image|favicon.ico).*)", // optional: catch other pages if needed
  ],
};
