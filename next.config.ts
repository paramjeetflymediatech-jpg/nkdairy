import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['sequelize', 'mysql2'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nkdairyequipments.com',
      },
    ],
  },
};

export default nextConfig;
