import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { DATA } from "@/data/resume";
import {
  getPublications,
  getPublicationBySlug,
  citationMeta,
  scholarlyArticleLd,
  publicationUrl,
  allKeywords,
} from "@/lib/publications";
import PublicationCite from "@/components/section/publication-cite";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPublications()
    .filter((pub) => pub.slug)
    .map((pub) => ({ slug: pub.slug as string }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pub = getPublicationBySlug(slug);
  if (!pub) return {};

  const canonical = publicationUrl(pub);
  const description = pub.abstract
    ? `${pub.abstract.slice(0, 200).trim()}…`
    : DATA.description;

  return {
    title: pub.title,
    description,
    alternates: canonical ? { canonical } : undefined,
    keywords: allKeywords(pub).length ? allKeywords(pub) : undefined,
    authors: pub.authors.map((a) => ({ name: a.name })),
    openGraph: {
      title: pub.title,
      description,
      url: canonical,
      type: "article",
      authors: pub.authors.map((a) => a.name),
      publishedTime: pub.datePublished,
    },
    twitter: {
      card: "summary_large_image",
      title: pub.title,
      description,
    },
    // Google Scholar Highwire Press citation_* meta tags.
    other: citationMeta(pub),
  };
}

export default async function PublicationPage({ params }: PageProps) {
  const { slug } = await params;
  const pub = getPublicationBySlug(slug);
  if (!pub) notFound();

  return (
    <article className="grid gap-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarlyArticleLd(pub)) }}
      />

      <Link
        href="/#publications"
        className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to publications
      </Link>

      <header className="grid gap-3">
        <h1 className="text-xl font-bold leading-tight sm:text-2xl">{pub.title}</h1>

        <p className="text-sm text-foreground/90 sm:text-base">
          {pub.authors.map((author, idx) => (
            <span key={author.name}>
              <span className={author.isMe ? "font-semibold text-foreground" : ""}>
                {author.name}
              </span>
              {idx < pub.authors.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>

        {(pub.venue || pub.venueLong) && (
          <div className="text-sm text-muted-foreground">
            {pub.venue ? (
              <p className="font-medium text-foreground">
                {pub.venue}
                {pub.dates ? <span className="font-normal"> · {pub.dates}</span> : null}
                {pub.location ? <span className="font-normal"> · {pub.location}</span> : null}
              </p>
            ) : null}
            {pub.venueLong ? <p className="text-xs">{pub.venueLong}</p> : null}
          </div>
        )}
      </header>

      {pub.abstract ? (
        <section className="grid gap-2">
          <h2 className="text-sm font-semibold text-foreground">Abstract</h2>
          <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
            {pub.abstract}
          </p>
        </section>
      ) : null}

      {pub.keywords?.length ? (
        <section className="flex flex-wrap gap-2">
          {pub.keywords.map((kw) => (
            <span
              key={kw}
              className="rounded-full border bg-card px-2.5 py-1 text-xs text-muted-foreground"
            >
              {kw}
            </span>
          ))}
        </section>
      ) : null}

      <PublicationCite publication={pub} />
    </article>
  );
}
