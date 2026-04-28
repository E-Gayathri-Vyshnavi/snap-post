import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client"], // 👈 Add this line
};

export default nextConfig;
