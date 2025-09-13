import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: { signIn: "/login" }, // where to send unauthenticated users
});

export const config = {
  // Protect dashboard and API (except NextAuth's own /api/auth)
  matcher: [
    "/dashboard/:path*",
    "/api/(?!auth|public)(.*)", // allow /api/auth/* and /api/public/*
  ],
};
