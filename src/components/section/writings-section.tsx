import { AnchorPill } from "@/components/ui/anchor-heading";
import WritingCard from "@/components/section/writing-card";
import { DATA } from "@/data/resume";

export default function WritingsSection() {
  return (
    <section id="writings" className="overflow-hidden scroll-mt-4">
      <div className="flex min-h-0 w-full flex-col gap-y-6 sm:gap-y-8">
        <div className="flex items-center w-full">
          <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
          <AnchorPill id="writings">Technical Writings</AnchorPill>
          <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 auto-rows-fr">
          {DATA.writings.map((item) => (
            <WritingCard
              key={item.title}
              title={item.title}
              href={item.href}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
