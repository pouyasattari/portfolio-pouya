import type { MetadataRoute } from "next";
import { DATA } from "@/data/resume";
import { projectData } from "@/lib/projectData";
import { getPublications } from "@/lib/publications";

const SITE_URL = DATA.url.replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/academic-projects`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projectData.map((project) => ({
    url: `${SITE_URL}/projects-content/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const publicationRoutes: MetadataRoute.Sitemap = getPublications()
    .filter((pub) => pub.slug)
    .map((pub) => ({
      url: `${SITE_URL}/publications/${pub.slug}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.9,
    }));

  return [...staticRoutes, ...publicationRoutes, ...projectRoutes];
}
