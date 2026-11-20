/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import GradientArrowUpRight from "@/components/ui/gradient-arrow-up-right";
import GradientText from "@/components/ui/gradient-text";
import { DATA } from "@/data/resume";
import { formatLocationWithFlag } from "@/lib/utils";

type EducationEntry = (typeof DATA.education)[number];

/**
 * A single Education entry card. Extracted verbatim from the page layout so it
 * can be reused unchanged in both the grouped Education section and the merged
 * linear Experience timeline.
 */
export function EducationCard({ education }: { education: EducationEntry }) {
  const isExternal = education.href.startsWith("http");
  const openInNewTab = isExternal || education.newTab;

  return (
    <Link
      href={education.href}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
      className="group flex flex-col gap-3 text-left sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex w-full min-w-0 items-center gap-x-3 sm:flex-1">
        {education.logoUrl ? (
          <img
            src={education.logoUrl}
            alt={education.school}
            className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
          />
        ) : (
          <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
        )}
        <div className="flex-1 min-w-0 flex flex-col gap-0.5">
          <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-2">
            <span className="block min-w-0 w-full truncate text-sm font-semibold leading-tight sm:w-auto sm:text-base sm:leading-none">
              {education.school}
            </span>
            <span className="hidden shrink-0 items-center gap-1 text-xs font-medium sm:inline-flex">
              <GradientText
                colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
                animationSpeed={1.5}
                showBorder={false}
                className="leading-none whitespace-nowrap"
              >
                Academic Projects
              </GradientText>
              <GradientArrowUpRight
                className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
                animationSpeed={1.5}
              />
            </span>
          </div>
          <div className="font-sans text-sm text-muted-foreground">
            {education.degree}
          </div>
          <span className="mt-1 inline-flex shrink-0 items-center gap-1 text-xs font-medium sm:hidden">
            <GradientText
              colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
              animationSpeed={1.5}
              showBorder={false}
              className="leading-none whitespace-nowrap"
            >
              Academic Projects
            </GradientText>
            <GradientArrowUpRight
              className="h-3.5 w-3.5 translate-x-0 opacity-100 transition-all duration-200"
              colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
              animationSpeed={1.5}
            />
          </span>
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-0.5 pl-11 text-left sm:w-auto sm:items-end sm:pl-0 sm:text-right flex-none">
        <span className="text-xs tabular-nums text-muted-foreground">
          {education.start} - {education.end}
        </span>
        {education.location ? (
          <span className="text-xs text-muted-foreground/80">
            {formatLocationWithFlag(education.location)}
          </span>
        ) : null}
      </div>
    </Link>
  );
}
