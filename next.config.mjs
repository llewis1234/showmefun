/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Keeps builds fast and predictable for an app of this size
    optimizePackageImports: ["@supabase/supabase-js", "clsx"],
  },
};
export default nextConfig;
