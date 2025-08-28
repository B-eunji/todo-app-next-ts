import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // 버킷명이 바뀔 여지가 있으면 아래처럼 와일드카드
        hostname: '**.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**',
      },
    ],
  },

};

export default nextConfig;
