import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  basePath: basePath || undefined,
  images: { unoptimized: true },
  trailingSlash: true,
  turbopack: {
    root: process.cwd(),
  },
  ...(isDev && {
    async rewrites() {
      return [
        {
          source: "/local-video/:path*",
          destination: "http://localhost:3001/local-video/:path*",
        },
        {
          source: "/bs-video/:path*",
          destination: "http://localhost:3001/bs-video/:path*",
        },
        {
          source: "/jjk-video/:path*",
          destination: "http://localhost:3001/jjk-video/:path*",
        },
        {
          source: "/user-video/:path*",
          destination: "http://localhost:3001/user-video/:path*",
        },
      ];
    },
  }),
};

export default nextConfig;
