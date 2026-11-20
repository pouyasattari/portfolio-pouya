/* eslint-disable @next/next/no-img-element */
import type { ComponentType } from "react";
import Link from "next/link";
import { DATA } from "@/data/resume";
import {
  Timeline,
  TimelineItem,
  TimelineConnectItem,
} from "@/components/timeline";
import { AnchorPill } from "@/components/ui/anchor-heading";
import GradientText from "@/components/ui/gradient-text";
import GradientArrowUpRight from "@/components/ui/gradient-arrow-up-right";
import GradientEye from "@/components/ui/gradient-eye";
import PdfLightbox from "@/components/ui/pdf-lightbox";

const GRADIENT_COLORS = ["#5227FF", "#FF9FFC", "#B19EEF"];

type ResourceLink = {
  title: string;
  href: string;
};

type ResourceIcon = ComponentType<{ className?: string }>;

type GradientTagIcon = ComponentType<{
  className?: string;
  colors?: string[];
  animationSpeed?: number;
}>;

function GradientTag({
  label,
  Icon = GradientArrowUpRight,
}: {
  label: string;
  Icon?: GradientTagIcon;
}) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium">
      <GradientText
        colors={GRADIENT_COLORS}
        animationSpeed={1.5}
        showBorder={false}
        className="leading-none whitespace-nowrap"
      >
        {label}
      </GradientText>
      <Icon
        className="h-3.5 w-3.5 translate-x-0 opacity-100 transition-all duration-200 sm:-translate-x-1 sm:opacity-0 sm:group-hover:translate-x-0 sm:group-hover:opacity-100"
        colors={GRADIENT_COLORS}
        animationSpeed={1.5}
      />
    </span>
  );
}

export default function DigitalResourcesSection() {
  return (
    <section id="digital-resources" className="overflow-hidden scroll-mt-4">
      <div className="flex min-h-0 w-full flex-col gap-y-6 sm:gap-y-8">
        <div className="flex items-center w-full">
          <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
          <AnchorPill id="digital-resources">Digital Resources</AnchorPill>
          <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
        </div>
        <Timeline>
          {DATA.digitalResources.map((item) => {
            const links = item.links as ReadonlyArray<ResourceLink>;
            const Icon = item.icon as ResourceIcon | undefined;
            const pdf = "pdf" in item ? (item.pdf as string) : undefined;

            return (
              <TimelineItem
                key={`${item.title}-${item.dates}`}
                className="group flex w-full items-center justify-between gap-x-3"
              >
                <TimelineConnectItem className="flex items-center justify-center">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="size-12 bg-card z-10 shrink-0 overflow-hidden p-1 border rounded-full shadow ring-2 ring-border object-contain flex-none"
                    />
                  ) : Icon ? (
                    <div className="size-12 bg-card z-10 shrink-0 flex items-center justify-center border rounded-full shadow ring-2 ring-border flex-none">
                      <Icon className="size-8 object-contain" />
                    </div>
                  ) : (
                    <div className="size-12 bg-card z-10 shrink-0 overflow-hidden p-1 border rounded-full shadow ring-2 ring-border flex-none" />
                  )}
                </TimelineConnectItem>
                <div className="flex flex-1 min-w-0 flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                  {pdf ? (
                    <PdfLightbox
                      src={pdf}
                      title={item.title}
                      triggerClassName="w-full"
                      trigger={
                        <span className="flex w-full items-center justify-between gap-3 text-left">
                          <span className="flex min-w-0 flex-col gap-0.5">
                            <span className="text-sm leading-snug sm:text-base sm:leading-tight">
                              <span className="font-bold">
                                {item.title.split(" ")[0]}
                              </span>
                              <span className="font-medium">
                                {item.title.slice(item.title.indexOf(" "))}
                              </span>
                            </span>
                            {"description" in item && item.description ? (
                              <span className="font-sans text-sm text-muted-foreground">
                                {item.description}
                              </span>
                            ) : null}
                          </span>
                          <GradientTag label="View pdf" Icon={GradientEye} />
                        </span>
                      }
                    />
                  ) : (
                    <>
                      {item.title && (
                        <h3 className="text-sm font-semibold leading-snug sm:text-base sm:leading-tight">
                          {item.title}
                        </h3>
                      )}
                      {links.length > 0 && (
                        <div className="flex shrink-0 flex-row flex-wrap items-center gap-3">
                          {links.map((link, idx) => (
                            <Link
                              href={link.href}
                              key={idx}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <GradientTag label={link.title} />
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
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
