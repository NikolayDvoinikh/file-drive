/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "avid-chickadee-537.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
