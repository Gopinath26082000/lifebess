import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import Sitemap from "vite-plugin-sitemap";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const hostname = (env.VITE_SITE_URL || "https://www.lifebess.com").replace(/\/$/, "");

  return {
    plugins: [
      react(),
      Sitemap({
        hostname,
        dynamicRoutes: ["/#about", "/#services", "/#products", "/#projects", "/#residential", "/#utility"],
        exclude: ["/#quote", "/#submitted"],
        robots: [{ userAgent: "*", allow: "/" }]
      })
    ]
  };
});
