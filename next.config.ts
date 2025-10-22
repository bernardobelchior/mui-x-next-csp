import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@mui/x-charts", "@mui/x-charts-pro", "@mui/x-internals"],
  typescript: {
    ignoreBuildErrors: true,
  },
  /* config options here */
};

export default nextConfig;
