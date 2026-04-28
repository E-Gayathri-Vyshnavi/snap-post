import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This is the key fix for Next.js 15/16 + Prisma
  serverExternalPackages: ["@prisma/client"], 
};

export default nextConfig;
