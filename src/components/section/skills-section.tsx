"use client";

import type { ComponentType } from "react";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import { AnchorHeading } from "@/components/ui/anchor-heading";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";

const BLUR_FADE_DELAY = 0.04;
const HIDDEN_SKILL_NAMES = new Set(["Django", "Typescript", "React", "Next.js"]);

function SkillChip({
  name,
  icon: Icon,
}: {
  name: string;
  icon?: ComponentType<{ className?: string }>;
}) {
  return (
    <div className="border bg-background border-border ring-2 ring-border/20 rounded-xl h-8 w-fit px-4 flex items-center gap-2">
      {Icon ? (
        <Icon className="size-4 rounded overflow-hidden object-contain" />
      ) : null}
      <span className="text-foreground text-sm font-medium">{name}</span>
    </div>
  );
}

export default function SkillsSection() {
  const [showMore, setShowMore] = useState(false);

  const visibleSkills = DATA.skills.filter(
    (skill) => !HIDDEN_SKILL_NAMES.has(skill.name)
  );
  const hiddenSkills = DATA.skills.filter((skill) =>
    HIDDEN_SKILL_NAMES.has(skill.name)
  );

  return (
    <div className="flex min-h-0 flex-col gap-y-4">
      <BlurFade delay={BLUR_FADE_DELAY * 9}>
        <AnchorHeading id="skills">Skills</AnchorHeading>
      </BlurFade>
      <div className="flex flex-wrap gap-2">
        {visibleSkills.map((skill, id) => (
          <BlurFade key={skill.name} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
            <SkillChip name={skill.name} icon={skill.icon} />
          </BlurFade>
        ))}
        {hiddenSkills.length > 0 && !showMore ? (
          <BlurFade
            delay={BLUR_FADE_DELAY * 10 + visibleSkills.length * 0.05}
          >
            <button
              type="button"
              data-state="closed"
              onClick={() => setShowMore(true)}
              className="group border bg-background border-border/70 ring-2 ring-border/10 rounded-xl h-8 w-fit px-3 flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <div className="flex items-center -space-x-1">
                {hiddenSkills.map((skill) => {
                  const Icon = skill.icon;

                  return Icon ? (
                    <span
                      key={skill.name}
                      className="flex size-4 items-center justify-center rounded-full border border-border bg-background"
                    >
                      <Icon className="size-2.5 rounded overflow-hidden object-contain" />
                    </span>
                  ) : null;
                })}
              </div>
              <span className="text-xs">More...</span>
              <span className="relative inline-flex items-center w-3.5 h-3.5">
                <ChevronRight
                  className={cn(
                    "absolute h-3.5 w-3.5 shrink-0 stroke-2 transition-all duration-300 ease-out",
                    "translate-x-0 opacity-100",
                    "group-hover:translate-x-0.5"
                  )}
                />
              </span>
            </button>
          </BlurFade>
        ) : null}
        {showMore
          ? hiddenSkills.map((skill, id) => (
              <div
                key={skill.name}
                className={cn(
                  "transition-all duration-200 ease-out",
                  "animate-in fade-in slide-in-from-left-1"
                )}
              >
                <SkillChip name={skill.name} icon={skill.icon} />
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
