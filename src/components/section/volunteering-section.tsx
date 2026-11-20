/* eslint-disable @next/next/no-img-element */
import type { ComponentType, ReactNode } from "react";
import { AnchorPill } from "@/components/ui/anchor-heading";
import { Badge } from "@/components/ui/badge";
import LightboxImage from "@/components/ui/lightbox-image";
import Link from "next/link";
import { DATA } from "@/data/resume";
import {
  Timeline,
  TimelineItem,
  TimelineConnectItem,
} from "@/components/timeline";

type VolunteeringTechnology = {
  name: string;
  icon?: ComponentType<{ className?: string }>;
};

type VolunteeringLink = {
  title: string;
  href: string;
  icon: ReactNode;
};

export default function VolunteeringSection() {
  return (
    <section id="volunteering" className="overflow-hidden scroll-mt-4">
      <div className="flex min-h-0 w-full flex-col gap-y-6 sm:gap-y-8">
        <div className="flex items-center w-full">
          <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
          <AnchorPill id="volunteering">Volunteering? Why not!</AnchorPill>
          <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
        </div>
        <Timeline>
          {DATA.volunteering.map((item) => {
            const technologies =
              item.technologies as ReadonlyArray<VolunteeringTechnology>;
            const links = item.links as ReadonlyArray<VolunteeringLink>;

            return (
              <TimelineItem
                key={`${item.title}-${item.dates}`}
                className="flex w-full items-start justify-between gap-x-3"
              >
                <TimelineConnectItem className="flex items-start justify-center">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="size-10 bg-card z-10 shrink-0 overflow-hidden p-1 border rounded-full shadow ring-2 ring-border object-contain flex-none"
                    />
                  ) : (
                    <div className="size-10 bg-card z-10 shrink-0 overflow-hidden p-1 border rounded-full shadow ring-2 ring-border flex-none" />
                  )}
                </TimelineConnectItem>
                <div className="flex flex-1 flex-col justify-start gap-2 min-w-0">
                  {item.dates && (
                    <time className="text-xs text-muted-foreground">
                      {item.dates}
                    </time>
                  )}
                  {item.title && (
                    <h3 className="text-sm font-semibold leading-tight sm:text-base sm:leading-none">
                      {item.title}
                    </h3>
                  )}
                  {item.organization && (
                    <p className="text-sm text-muted-foreground">
                      {item.organization}
                    </p>
                  )}
                  {item.location && (
                    <p className="text-sm text-muted-foreground">
                      {item.location}
                    </p>
                  )}
                  {item.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed wrap-break-word">
                      {item.description}
                    </p>
                  )}
                  {item.galleryImage && (
                    <div className="relative mt-1 w-full max-w-xl overflow-hidden rounded-2xl border shadow ring-1 ring-border">
                      <LightboxImage
                        src={item.galleryImage}
                        alt={`${item.title} snapshot`}
                        width={
                          "galleryImageWidth" in item
                            ? item.galleryImageWidth
                            : undefined
                        }
                        height={
                          "galleryImageHeight" in item
                            ? item.galleryImageHeight
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
                  )}
                  {technologies.length > 0 && (
                    <div className="mt-1 flex flex-row flex-wrap items-start gap-2">
                      {technologies.map((technology, idx) => (
                        <div
                          key={`${item.title}-tech-${idx}`}
                          className="border bg-background border-border ring-2 ring-border/20 rounded-xl h-8 w-fit px-4 flex items-center gap-2"
                        >
                          {technology.icon && (
                            <technology.icon className="size-4 rounded overflow-hidden object-contain" />
                          )}
                          <span className="text-foreground text-sm font-medium">
                            {technology.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  {links.length > 0 && !item.galleryImage && (
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
                  )}
                </div>
              </TimelineItem>
            );
          })}
        </Timeline>
      </div>
    </section>
  );
}
