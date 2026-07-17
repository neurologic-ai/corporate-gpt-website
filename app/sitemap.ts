import type { MetadataRoute } from "next";
import { pages } from "./content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://corporate-gpt.ai";
  const lastModified = new Date("2026-07-17T00:00:00Z");
  const routes = ["", ...Object.keys(pages), "briefing"];
  return routes.map((route) => ({
    url: `${base}/${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("legal/") ? 0.3 : 0.7,
  }));
}
