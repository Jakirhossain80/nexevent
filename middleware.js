// /middleware.js
export { default } from "next-auth/middleware";

// Protect only the dashboard (and nested)
export const config = {
  matcher: ["/dashboard/:path*"],
};
