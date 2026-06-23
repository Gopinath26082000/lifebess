import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import Sitemap from "vite-plugin-sitemap";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl = (env.VITE_SITE_URL || "https://gopinath26082000.github.io/lifebess").replace(/\/$/, "");
  const site = new URL(siteUrl);
  const hostname = site.origin;
  const sitemapBasePath = site.pathname === "/" ? "" : site.pathname.replace(/\/$/, "");
  const base = env.VITE_BASE_URL || (mode === "production" ? "/lifebess/" : "/");
  const sitemapRoutes = [
    `${sitemapBasePath}/`,
    `${sitemapBasePath}/#about`,
    `${sitemapBasePath}/#services`,
    `${sitemapBasePath}/#products`,
    `${sitemapBasePath}/#projects`,
    `${sitemapBasePath}/#residential`,
    `${sitemapBasePath}/#utility`
  ];

  return {
    base,
    plugins: [
      react(),
      Sitemap({
        hostname,
        dynamicRoutes: sitemapRoutes,
        exclude: sitemapBasePath ? ["/"] : ["/#quote", "/#submitted"],
        generateRobotsTxt: false,
        robots: [{ userAgent: "*", allow: "/" }]
      })
    ]
  };
});
