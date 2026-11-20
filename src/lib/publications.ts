import { DATA } from "@/data/resume";

export type PublicationAuthor = {
  name: string;
  isMe?: boolean;
};

export type Publication = {
  slug?: string;
  title: string;
  authors: ReadonlyArray<PublicationAuthor>;
  venue?: string;
  venueLong?: string;
  logoUrl?: string;
  location?: string;
  dates?: string;
  year?: string;
  datePublished?: string;
  publisher?: string;
  arxivId?: string;
  pdfUrl?: string;
  paperUrl?: string;
  repoUrl?: string;
  keywords?: ReadonlyArray<string>;
  topics?: ReadonlyArray<string>;
  bibtex?: string;
  abstract?: string;
  status?: string;
};

const SITE_URL = DATA.url.replace(/\/$/, "");

export function getPublications(): Publication[] {
  return DATA.publications as unknown as Publication[];
}

export function getPublicationBySlug(slug: string): Publication | undefined {
  return getPublications().find((pub) => pub.slug === slug);
}

/** Canonical on-site landing URL for a publication. */
export function publicationUrl(pub: Publication): string | undefined {
  return pub.slug ? `${SITE_URL}/publications/${pub.slug}` : undefined;
}

/** The best external link for the paper (arXiv abstract page preferred). */
export function paperExternalUrl(pub: Publication): string | undefined {
  return pub.paperUrl ?? (pub.arxivId ? `https://arxiv.org/abs/${pub.arxivId}` : undefined);
}

/**
 * Full, de-duplicated keyword set for machine consumers (meta keywords,
 * citation_keywords, JSON-LD): the concise visible chips plus the broader
 * related-topic set. Never rendered as visible page chips.
 */
export function allKeywords(pub: Publication): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const term of [...(pub.keywords ?? []), ...(pub.topics ?? [])]) {
    const key = term.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      out.push(term);
    }
  }
  return out;
}

/** Plain-text (APA-ish) citation, e.g. for a "copy citation" button. */
export function formatCitation(pub: Publication): string {
  const authors = pub.authors.map((a) => a.name);
  let authorStr = "";
  if (authors.length === 1) {
    authorStr = authors[0];
  } else if (authors.length === 2) {
    authorStr = `${authors[0]} & ${authors[1]}`;
  } else if (authors.length > 2) {
    authorStr = `${authors.slice(0, -1).join(", ")}, & ${authors[authors.length - 1]}`;
  }
  const year = pub.year ?? (pub.datePublished ? pub.datePublished.slice(0, 4) : "");
  const where = pub.publisher === "arXiv" && pub.arxivId ? `arXiv:${pub.arxivId}` : pub.venue ?? "";
  const url = paperExternalUrl(pub);
  return [
    authorStr,
    year ? `(${year}).` : "",
    `${pub.title}.`,
    where ? `${where}.` : "",
    url ?? "",
  ]
    .filter(Boolean)
    .join(" ")
    .trim();
}

/**
 * schema.org ScholarlyArticle JSON-LD so Google Scholar, search engines,
 * LLMs, and research agents can parse the paper as structured data.
 */
export function scholarlyArticleLd(pub: Publication) {
  const url = publicationUrl(pub);
  const external = paperExternalUrl(pub);
  const sameAs = [external, pub.pdfUrl, pub.repoUrl].filter(Boolean) as string[];

  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: pub.title,
    name: pub.title,
    abstract: pub.abstract,
    inLanguage: "en",
    author: pub.authors.map((a) => ({
      "@type": "Person",
      name: a.name,
      ...(a.isMe
        ? {
            url: DATA.url,
            sameAs: Object.values(DATA.contact.social)
              .map((s) => s.url)
              .filter((u) => typeof u === "string" && u.startsWith("http")),
          }
        : {}),
    })),
    datePublished: pub.datePublished ?? pub.year,
    ...(pub.publisher
      ? { publisher: { "@type": "Organization", name: pub.publisher } }
      : {}),
    ...(pub.arxivId
      ? {
          identifier: {
            "@type": "PropertyValue",
            propertyID: "arXiv",
            value: `arXiv:${pub.arxivId}`,
          },
        }
      : {}),
    ...(allKeywords(pub).length
      ? {
          keywords: allKeywords(pub).join(", "),
          about: allKeywords(pub).map((term) => ({
            "@type": "DefinedTerm",
            name: term,
          })),
        }
      : {}),
    ...(external ? { citation: external } : {}),
    ...(url ? { url, mainEntityOfPage: url } : {}),
    ...(pub.pdfUrl
      ? {
          associatedMedia: {
            "@type": "MediaObject",
            contentUrl: pub.pdfUrl,
            encodingFormat: "application/pdf",
          },
        }
      : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/**
 * Google Scholar Highwire Press (`citation_*`) meta tags. Scholar's crawler
 * reads these off the landing page to index the paper and attribute authors.
 * Shaped for Next.js `metadata.other` (arrays render as repeated meta tags).
 */
export function citationMeta(pub: Publication): Record<string, string | string[]> {
  const meta: Record<string, string | string[]> = {
    citation_title: pub.title,
    citation_author: pub.authors.map((a) => a.name),
  };
  const date = pub.datePublished ?? pub.year;
  if (date) meta.citation_publication_date = date.replace(/-/g, "/");
  if (pub.venueLong) meta.citation_conference_title = pub.venueLong;
  if (pub.publisher === "arXiv") meta.citation_technical_report_institution = "arXiv";
  if (pub.arxivId) meta.citation_arxiv_id = pub.arxivId;
  if (pub.pdfUrl) meta.citation_pdf_url = pub.pdfUrl;
  const abs = paperExternalUrl(pub);
  if (abs) meta.citation_abstract_html_url = abs;
  const kws = allKeywords(pub);
  if (kws.length) meta.citation_keywords = kws.join("; ");
  return meta;
}
