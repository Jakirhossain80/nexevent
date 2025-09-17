// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh1.googleusercontent.com" },
      { protocol: "https", hostname: "lh2.googleusercontent.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" }, 
      { protocol: "https", hostname: "lh4.googleusercontent.com" },
      // add more if needed, e.g. GitHub avatars:
      // { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
  // other Next.js options here
};

export default nextConfig;
