"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import BlurFade from "@/components/magicui/blur-fade";
import WorkSection, {
  WorkAccordionItem,
} from "@/components/section/work-section";
import { EducationCard } from "@/components/section/education-card";
import { EducationSubExperience } from "@/components/section/education-sub-experience";
import { AnchorHeading } from "@/components/ui/anchor-heading";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

type WorkEntry = (typeof DATA.work)[number];
type EducationEntry = (typeof DATA.education)[number];

type ExperienceViewProps = {
  work: readonly WorkEntry[];
  research: readonly WorkEntry[];
  education: readonly EducationEntry[];
};

const MONTHS: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

/** Turns "April 2025" / "Jul 2023" / "2022" into a sortable month index. */
function sortKey(value?: string): number {
  if (!value) return Number.POSITIVE_INFINITY; // ongoing → newest
  const tokens = value.trim().toLowerCase().split(/\s+/);
  if (tokens.length === 1) {
    const year = Number.parseInt(tokens[0], 10);
    return Number.isFinite(year) ? year * 12 : 0;
  }
  const month = MONTHS[tokens[0].slice(0, 3)] ?? 0;
  const year = Number.parseInt(tokens[1], 10);
  return (Number.isFinite(year) ? year : 0) * 12 + month;
}

function ViewToggle({
  view,
  onToggle,
}: {
  view: "grouped" | "linear";
  onToggle: () => void;
}) {
  const isLinear = view === "linear";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isLinear}
      aria-label={isLinear ? "Switch to grouped view" : "Switch to timeline view"}
      title={isLinear ? "Grouped view" : "Timeline view"}
      className="inline-flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:size-5"
    >
      {isLinear ? (
        <LayoutGrid className="size-4 sm:size-3" />
      ) : (
        <List className="size-4 sm:size-3" />
      )}
    </button>
  );
}

export default function ExperienceView({
  work,
  research,
  education,
}: ExperienceViewProps) {
  const [view, setView] = useState<"grouped" | "linear">("linear");

  // Timeline merges Work + Research only (Education stays its own section).
  const merged = useMemo<WorkEntry[]>(
    () =>
      [...work, ...research].sort(
        (a, b) => sortKey(b.start) - sortKey(a.start)
      ),
    [work, research]
  );

  const toggle = () =>
    setView((current) => (current === "grouped" ? "linear" : "grouped"));

  return (
    <>
      <section id="work" className="scroll-mt-4">
        <div className="flex min-h-0 flex-col gap-y-6">
          <div className="flex items-center justify-between gap-2.5">
            <BlurFade key={view} delay={BLUR_FADE_DELAY * 5}>
              <AnchorHeading id="work">
                {view === "linear" ? "Experience" : "Work Experience"}
              </AnchorHeading>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <ViewToggle view={view} onToggle={toggle} />
            </BlurFade>
          </div>
          <BlurFade key={view} delay={BLUR_FADE_DELAY * 6}>
            {view === "linear" ? (
              <Accordion type="single" collapsible className="grid w-full gap-6">
                {merged.map((entry, index) => (
                  <div
                    key={`${entry.company}-${entry.start}`}
                    className="relative"
                  >
                    {index < merged.length - 1 ? (
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -bottom-6 left-4 top-4 w-px -translate-x-1/2 bg-border md:left-5"
                      />
                    ) : null}
                    <div className="relative z-10">
                      <WorkAccordionItem work={entry} highlight={index === 0} />
                    </div>
                  </div>
                ))}
              </Accordion>
            ) : (
              <WorkSection items={work} initialVisibleCount={2} />
            )}
          </BlurFade>
        </div>
      </section>

      {view === "grouped" ? (
        <section id="research" className="scroll-mt-4">
          <div className="flex min-h-0 flex-col gap-y-6">
            <BlurFade delay={BLUR_FADE_DELAY * 7}>
              <AnchorHeading id="research">Research Experience</AnchorHeading>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 8}>
              <WorkSection items={research} initialVisibleCount={2} />
            </BlurFade>
          </div>
        </section>
      ) : null}

      <section id="education" className="scroll-mt-4">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <AnchorHeading id="education">Education</AnchorHeading>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {education.map((educationItem, index) => {
              const linkedExperience =
                "linkedExperience" in educationItem &&
                educationItem.linkedExperience
                  ? DATA.work.find(
                      (item) =>
                        item.company === educationItem.linkedExperience
                    )
                  : undefined;

              return (
                <BlurFade
                  key={educationItem.school}
                  delay={BLUR_FADE_DELAY * 12 + index * 0.05}
                >
                  <div className="flex flex-col gap-2.5">
                    <EducationCard education={educationItem} />
                    {linkedExperience ? (
                      <EducationSubExperience work={linkedExperience} />
                    ) : null}
                  </div>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
