/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import ProfileHoverPreview from "@/components/ui/profile-hover-preview";
import { DATA } from "@/data/resume";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import DigitalResourcesSection from "@/components/section/digital-resources-section";
import ExperienceView from "@/components/section/experience-view";
import HackathonsSection from "@/components/section/hackathons-section";
import HashScrollHandler from "@/components/hash-scroll-handler";
import JsonLd from "@/components/json-ld";
import PublicationsSection from "@/components/section/publications-section";
import SkillsSection from "@/components/section/skills-section";
import WritingsSection from "@/components/section/writings-section";
import VolunteeringSection from "@/components/section/volunteering-section";
import WorkshopsSection from "@/components/section/workshops-section";
import { AnchorHeading } from "@/components/ui/anchor-heading";

const BLUR_FADE_DELAY = 0.04;
const WORK_EXPERIENCE_COMPANIES = new Set([
  "Soource",
  "Microsoft",
  "Le Mummarelle",
]);
const RESEARCH_EXPERIENCE_COMPANIES = new Set(["Kara Group", "Eurac"]);

export default function Page() {
  const [nameBeforePeter, nameAfterPeter = ""] = DATA.name.split("(Peter)");
  const [descriptionBeforeAnd, descriptionAfterAnd = ""] =
    DATA.description.split(" and ");
  const workExperience = DATA.work.filter((item) =>
    WORK_EXPERIENCE_COMPANIES.has(item.company)
  );
  const researchExperience = DATA.work.filter((item) =>
    RESEARCH_EXPERIENCE_COMPANIES.has(item.company)
  );

  return (
    <main className="min-h-dvh flex flex-col gap-7 relative">
      <JsonLd />
      <HashScrollHandler />
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 gap-y-6 flex flex-col md:flex-row justify-between">
            <div className="gap-2 flex flex-col order-2 md:order-1">
              <BlurFade delay={BLUR_FADE_DELAY}>
                <h1 className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl">
                  {nameBeforePeter}
                  <span className="text-muted-foreground">(Peter)</span>
                  {nameAfterPeter}
                </h1>
              </BlurFade>
              <BlurFade
                delay={BLUR_FADE_DELAY}
                className="max-w-[600px] text-muted-foreground md:text-lg lg:text-xl"
              >
                <div className="space-y-4">
                  <div>{DATA.subDescription}</div>
                  <div className="text-base leading-relaxed">
                    <span className="text-foreground">{descriptionBeforeAnd}</span>
                    <span className="text-muted-foreground"> and </span>
                    <span className="text-foreground">{descriptionAfterAnd}</span>
                  </div>
                </div>
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
              <ProfileHoverPreview
                src={DATA.avatarUrl}
                alt={DATA.name}
                fallback={DATA.initials}
              />
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about" className="scroll-mt-4">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <AnchorHeading id="about">About</AnchorHeading>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose w-full max-w-none font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>
                {DATA.summary}
              </Markdown>
            </div>
          </BlurFade>
        </div>
      </section>
      <ExperienceView
        work={workExperience}
        research={researchExperience}
        education={DATA.education}
      />
      <section id="publications" className="scroll-mt-4">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <AnchorHeading id="publications">Publications</AnchorHeading>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <PublicationsSection />
          </BlurFade>
        </div>
      </section>
      <section id="skills" className="scroll-mt-4">
        <SkillsSection />
      </section>
      <section>
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <HackathonsSection />
        </BlurFade>
      </section>
      <section>
        <BlurFade delay={BLUR_FADE_DELAY * 13.5}>
          <WorkshopsSection />
        </BlurFade>
      </section>
      <section>
        <BlurFade delay={BLUR_FADE_DELAY * 14}>
          <VolunteeringSection />
        </BlurFade>
      </section>
      <section>
        <BlurFade delay={BLUR_FADE_DELAY * 15}>
          <DigitalResourcesSection />
        </BlurFade>
      </section>
      <section>
        <BlurFade delay={BLUR_FADE_DELAY * 15.5}>
          <WritingsSection />
        </BlurFade>
      </section>
      <section id="contact" className="mt-4 scroll-mt-4">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
