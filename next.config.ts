import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "yash-g-portfolio\\.vercel\\.app" }],
        destination: "https://yashghugardare.vercel.app/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
