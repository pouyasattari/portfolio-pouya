"use client";
import { Fragment } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { ChevronDown, ChevronRight, ArrowUpRight, GraduationCap, ScrollText } from "lucide-react";
import GradientText from "@/components/ui/gradient-text";
import { cn } from "@/lib/utils";
import {
  getPublications,
  scholarlyArticleLd,
  type PublicationAuthor,
} from "@/lib/publications";
import PublicationCite from "@/components/section/publication-cite";

export default function PublicationsSection() {
  return (
    <Accordion type="single" collapsible className="w-full grid gap-6">
      {getPublications().map((publication) => {
        const authors = publication.authors as ReadonlyArray<PublicationAuthor>;
        const status = publication.status;
        const itemValue = publication.title;
        const hasExpandableContent = Boolean(
          publication.abstract ||
            authors.length > 0 ||
            publication.repoUrl ||
            publication.bibtex
        );

        return (
          <AccordionItem
            key={itemValue}
            value={itemValue}
            className="w-full border-b-0 grid gap-2"
          >
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(scholarlyArticleLd(publication)),
              }}
            />
            <AccordionTrigger
              disabled={!hasExpandableContent}
              className={cn(
                "p-0 transition-colors rounded-none group hover:no-underline [&>svg]:hidden",
                hasExpandableContent ? "cursor-pointer" : "cursor-default"
              )}
            >
              <div className="flex w-full flex-col gap-2 text-left sm:flex-row sm:items-center sm:justify-between">
                <div className="flex w-full min-w-0 items-center gap-x-3 sm:flex-1">
                  <div className="flex size-8 md:size-10 flex-none items-center justify-center rounded-full border bg-card p-1 shadow ring-2 ring-border">
                    {publication.logoUrl ? (
                      <Image
                        src={publication.logoUrl}
                        alt="Springer Nature logo"
                        width={40}
                        height={40}
                        className="size-full rounded-full object-contain"
                      />
                    ) : (
                      <ScrollText className="size-4 md:size-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 gap-0.5 flex flex-col">
                    <div className="font-semibold text-sm leading-tight sm:text-base sm:leading-snug">
                      {publication.title}
                      {hasExpandableContent ? (
                        <span className="relative ml-2 inline-flex h-3.5 w-3.5 shrink-0 items-center align-middle">
                          <ChevronRight
                            className={cn(
                              "absolute h-3.5 w-3.5 shrink-0 text-muted-foreground stroke-2 transition-all duration-300 ease-out sm:hidden",
                              "translate-x-0 opacity-100",
                              "group-data-[state=open]:opacity-0 group-data-[state=open]:translate-x-0"
                            )}
                          />
                          <ChevronRight
                            className={cn(
                              "absolute hidden h-3.5 w-3.5 shrink-0 text-muted-foreground stroke-2 transition-all duration-300 ease-out sm:block",
                              "sm:translate-x-0 sm:opacity-0",
                              "sm:group-hover:translate-x-1 sm:group-hover:opacity-100",
                              "sm:group-data-[state=open]:opacity-0 sm:group-data-[state=open]:translate-x-0"
                            )}
                          />
                          <ChevronDown
                            className={cn(
                              "absolute h-3.5 w-3.5 shrink-0 text-muted-foreground stroke-2 transition-all duration-200",
                              "opacity-0 rotate-0",
                              "group-data-[state=open]:opacity-100 group-data-[state=open]:rotate-180"
                            )}
                          />
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
                {status ? (
                  <span className="inline-flex shrink-0 items-center pl-11 text-xs font-medium sm:pl-0">
                    <GradientText
                      colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
                      animationSpeed={1.5}
                      showBorder={false}
                      className="leading-none whitespace-nowrap"
                    >
                      {status}
                    </GradientText>
                  </span>
                ) : null}
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-0 ml-11 md:ml-13">
              <div className="flex flex-col gap-3 text-xs sm:text-sm text-muted-foreground">
                {publication.venue || publication.venueLong ? (
                  <div>
                    {publication.venue ? (
                      <p className="text-sm font-medium text-foreground">
                        {publication.venue}
                        {publication.dates ? (
                          <span className="font-normal text-muted-foreground/80">
                            {` · ${publication.dates}`}
                          </span>
                        ) : null}
                        {publication.location ? (
                          <span className="font-normal text-muted-foreground/80">
                            {` · ${publication.location}`}
                          </span>
                        ) : null}
                      </p>
                    ) : null}
                    {publication.venueLong ? (
                      <p className="text-xs text-muted-foreground/80">
                        {publication.venueLong}
                      </p>
                    ) : null}
                  </div>
                ) : null}
                {authors.length > 0 ? (
                  <p className="text-foreground/90">
                    {authors.map((author, idx) => (
                      <Fragment key={author.name}>
                        <span
                          className={
                            author.isMe ? "font-semibold text-foreground" : ""
                          }
                        >
                          {author.name}
                        </span>
                        {idx < authors.length - 1 ? ", " : ""}
                      </Fragment>
                    ))}
                  </p>
                ) : null}
                {publication.abstract ? (
                  <div className="whitespace-pre-line leading-relaxed">
                    <span className="font-semibold text-foreground">
                      Abstract:{" "}
                    </span>
                    {publication.abstract}
                    {publication.repoUrl ? (
                      <>
                        {" "}
                        <Link
                          href={publication.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-foreground hover:text-foreground/80 wrap-anywhere"
                        >
                          {publication.repoUrl.replace(/\/$/, "")}
                        </Link>
                      </>
                    ) : null}
                  </div>
                ) : null}
                <PublicationCite publication={publication} />
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  {publication.slug ? (
                    <Link
                      href={`/publications/${publication.slug}`}
                      className="inline-flex w-fit items-center gap-1.5 text-xs font-medium text-foreground/90 underline-offset-4 transition-colors hover:text-foreground hover:underline"
                    >
                      View full publication page
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  ) : null}
                  <Link
                    href="https://scholar.google.com/citations?user=_6pPgFUAAAAJ&hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-1.5 text-xs font-medium text-foreground/90 underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    <GraduationCap className="size-3.5" />
                    Google Scholar
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
