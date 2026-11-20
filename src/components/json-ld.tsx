import { DATA } from "@/data/resume";

function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) {
    return path;
  }
  const base = DATA.url.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}

/**
 * Emits Person + BreadcrumbList JSON-LD so Google can render rich results.
 * Everything is derived from DATA so it stays in sync with the site content.
 */
export default function JsonLd() {
  const cleanName = DATA.name
    .replace(/\s*\(.*?\)\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const sameAs = Object.values(DATA.contact.social)
    .map((social) => social.url)
    .filter((url) => typeof url === "string" && url.startsWith("http"));

  const currentJob = DATA.work[0];
  const school = DATA.education[0];

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: cleanName,
    alternateName: DATA.name,
    url: DATA.url,
    image: absoluteUrl(DATA.avatarUrl),
    jobTitle: currentJob?.title,
    description: DATA.summary,
    email: `mailto:${DATA.contact.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bolzano",
      addressCountry: "IT",
    },
    worksFor: currentJob
      ? {
          "@type": "Organization",
          name: currentJob.company,
          url: currentJob.href,
        }
      : undefined,
    alumniOf: school
      ? { "@type": "CollegeOrUniversity", name: school.school }
      : undefined,
    knowsAbout: [
      ...DATA.skills.map((skill) => skill.name),
      "Natural Language Processing",
      "Large Language Models",
      "Information Extraction",
    ],
    sameAs,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: DATA.url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
