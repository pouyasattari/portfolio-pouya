/* eslint-disable @next/next/no-img-element */
import type { ComponentType, ReactNode } from "react";
import { AnchorPill } from "@/components/ui/anchor-heading";
import { Badge } from "@/components/ui/badge";
import GradientText from "@/components/ui/gradient-text";
import LightboxImage from "@/components/ui/lightbox-image";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { Timeline, TimelineItem, TimelineConnectItem } from "@/components/timeline";

type HackathonTechnology = {
  name: string;
  icon?: ComponentType<{ className?: string }>;
};

type HackathonLink = {
  title: string;
  href: string;
  icon: ReactNode;
};

export default function HackathonsSection() {
  return (
    <section id="hackathons" className="overflow-hidden scroll-mt-4">
      <div className="flex min-h-0 w-full flex-col gap-y-6 sm:gap-y-8">
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <AnchorPill id="hackathons">Hackathons</AnchorPill>
            <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>
          <div className="flex w-full flex-col items-start justify-center gap-y-3 sm:items-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl sm:text-center">
              I like building things as a team!
            </h2>
            <p className="w-full text-left text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed sm:text-center">
              During my Master&apos;s, I attended European hackathons where
              passionate people built incredible things in just 1-2 days
            </p>
          </div>
        </div>
        <Timeline>
          {DATA.hackathons.map((hackathon) => {
            const technologies =
              hackathon.technologies as ReadonlyArray<HackathonTechnology>;
            const links = hackathon.links as ReadonlyArray<HackathonLink>;
            const galleryImage =
              "galleryImage" in hackathon ? hackathon.galleryImage : undefined;
            const award = "award" in hackathon ? hackathon.award : undefined;

            return (
              <TimelineItem
                key={hackathon.title + hackathon.dates}
                className="flex w-full items-start justify-between gap-x-3"
              >
                <TimelineConnectItem className="flex items-start justify-center">
                  {hackathon.image ? (
                    <img
                      src={hackathon.image}
                      alt={hackathon.title}
                      className="size-10 bg-card z-10 shrink-0 overflow-hidden p-1 border rounded-full shadow ring-2 ring-border object-contain flex-none"
                    />
                  ) : (
                    <div className="size-10 bg-card z-10 shrink-0 overflow-hidden p-1 border rounded-full shadow ring-2 ring-border flex-none" />
                  )}
                </TimelineConnectItem>
                <div className="flex flex-1 flex-col justify-start gap-2 min-w-0">
                  {hackathon.dates && (
                    <time className="text-xs text-muted-foreground">{hackathon.dates}</time>
                  )}
                  {hackathon.title && (
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-sm font-semibold leading-tight sm:text-base sm:leading-none">
                        {hackathon.title}
                      </h3>
                      {award ? (
                        <GradientText
                          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
                          animationSpeed={1.5}
                          showBorder
                          className="shrink-0 text-[11px] leading-none cursor-default"
                        >
                          <span className="inline-flex items-center gap-1">
                            <span aria-hidden className="text-[12px] leading-none">
                              👑
                            </span>
                            {award}
                          </span>
                        </GradientText>
                      ) : null}
                    </div>
                  )}
                  {hackathon.location && (
                    <p className="text-sm text-muted-foreground">{hackathon.location}</p>
                  )}
                  {hackathon.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed wrap-break-word">
                      {hackathon.description}
                    </p>
                  )}
                  {galleryImage ? (
                    <div className="relative mt-1 w-full max-w-xl overflow-hidden rounded-2xl border shadow ring-1 ring-border">
                      <LightboxImage
                        src={galleryImage}
                        alt={`${hackathon.title} snapshot`}
                        width={
                          "galleryImageWidth" in hackathon
                            ? hackathon.galleryImageWidth
                            : undefined
                        }
                        height={
                          "galleryImageHeight" in hackathon
                            ? hackathon.galleryImageHeight
                            : undefined
                        }
                        wrapperClassName="block w-full"
                        className="w-full object-cover"
                      />
                      {links.length > 0 ? (
                        <div className="absolute top-2 right-2 flex flex-wrap gap-2">
                          {links.map((link, idx) => (
                            <Link
                              href={link.href}
                              key={idx}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Badge className="flex items-center gap-1.5 text-xs bg-black text-white hover:bg-black/90">
                                {link.icon}
                                {link.title}
                              </Badge>
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                  {technologies.length > 0 ? (
                    <div className="mt-1 flex flex-row flex-nowrap items-center gap-1.5 sm:gap-2">
                      {technologies.map((technology, idx) => (
                        <div
                          key={`${hackathon.title}-tech-${idx}`}
                          className="flex h-[26px] min-w-0 items-center gap-1.5 rounded-lg border border-border bg-background px-2 ring-2 ring-border/20 sm:h-8 sm:gap-2 sm:rounded-xl sm:px-4"
                        >
                          {technology.icon ? (
                            <technology.icon className="size-3.5 shrink-0 rounded overflow-hidden object-contain sm:size-4" />
                          ) : null}
                          <span className="truncate text-[11px] font-medium text-foreground sm:text-sm">
                            {technology.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {links.length > 0 && !galleryImage ? (
                    <div className="mt-1 flex flex-row flex-wrap items-start gap-2">
                      {links.map((link, idx) => (
                        <Link
                          href={link.href}
                          key={idx}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Badge className="flex items-center gap-1.5 text-xs bg-primary text-primary-foreground">
                            {link.icon}
                            {link.title}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              </TimelineItem>
            );
          })}
        </Timeline>
      </div>
    </section>
  );
}
