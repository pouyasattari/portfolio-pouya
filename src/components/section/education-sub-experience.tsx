"use client";

import { CornerDownRight } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { WorkAccordionItem } from "@/components/section/work-section";
import { DATA } from "@/data/resume";

type WorkEntry = (typeof DATA.work)[number];

/**
 * Hangs a full work/research entry off an Education item as a nested
 * sub-experience. The corner arrow (↳) is the only added visual cue — the
 * entry itself keeps every bit of its original behaviour (expandable
 * description, highlighted phrases, gallery image, "Read the paper" link),
 * since it renders the exact same {@link WorkAccordionItem} used elsewhere.
 */
export function EducationSubExperience({ work }: { work: WorkEntry }) {
  return (
    <div className="flex items-start gap-2 pl-4 md:pl-5">
      <CornerDownRight
        aria-hidden
        className="mt-1 size-4 flex-none text-muted-foreground/50 md:size-5"
      />
      <Accordion type="single" collapsible className="w-full">
        {/* Pull the expanded details flush with this entry's logo (no extra
            indent), instead of the default alignment to the title text. */}
        <WorkAccordionItem
          work={work}
          hideLocation
          compactDates
          contentClassName="ml-0 md:ml-0"
        />
      </Accordion>
    </div>
  );
}
