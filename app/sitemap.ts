import type { MetadataRoute } from "next";
import { pages } from "./content";

const REDESIGN_LAST_MODIFIED = new Date("2026-08-04T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://corporate-gpt.ai";
  const routes = ["", ...Object.keys(pages), "briefing"];
  return routes.map((route) => ({
    url: `${base}/${route}`,
    lastModified: REDESIGN_LAST_MODIFIED,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("legal/") ? 0.3 : 0.7,
  }));
}
