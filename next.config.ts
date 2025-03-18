import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env:{
    BACKEND_URL:process.env.MONGODB_URI
  }
  /* config options here */
};

export default nextConfig;
