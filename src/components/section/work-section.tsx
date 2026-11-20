/* eslint-disable @next/next/no-img-element */
"use client";
import { Fragment, useLayoutEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LightboxImage from "@/components/ui/lightbox-image";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { ChevronDown, ChevronRight, ExternalLink } from "lucide-react";
import { cn, formatLocationWithFlag } from "@/lib/utils";

const INITIAL_VISIBLE_WORK_COUNT = 3;
type WorkEntry = (typeof DATA.work)[number];
type WorkSectionProps = {
  items: readonly WorkEntry[];
  initialVisibleCount?: number;
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderHighlightedText(
  text: string,
  highlightPhrases?: readonly string[]
) {
  if (!highlightPhrases || highlightPhrases.length === 0) {
    return text;
  }

  const orderedPhrases = [...highlightPhrases].sort(
    (a, b) => b.length - a.length
  );
  const matcher = new RegExp(
    `(${orderedPhrases.map((phrase) => escapeRegExp(phrase)).join("|")})`,
    "g"
  );
  const highlightSet = new Set(highlightPhrases);

  return text.split(matcher).map((part, index) =>
    highlightSet.has(part) ? (
      <span key={`${part}-${index}`} className="font-semibold text-foreground">
        {part}
      </span>
    ) : (
      <Fragment key={`text-${index}`}>{part}</Fragment>
    )
  );
}

function LogoImage({
  src,
  alt,
  className,
  highlight = false,
}: {
  src: string;
  alt: string;
  className?: string;
  highlight?: boolean;
}) {
  const [imageError, setImageError] = useState(false);

  // Current role: swap the plain border for the "Academic Projects" gradient ring.
  if (highlight) {
    return (
      <div className={cn("relative size-8 md:size-10 flex-none", className)}>
        <span
          aria-hidden
          className="absolute -inset-px rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, #e01b12, #ffffff, #e01b12)",
            animation: "logo-ring-spin 1.6s linear infinite",
          }}
        />
        {!src || imageError ? (
          <div className="relative size-full rounded-full border bg-muted p-1 shadow" />
        ) : (
          <img
            src={src}
            alt={alt}
            className="relative size-full rounded-full border bg-background p-1 object-contain shadow"
            onError={() => setImageError(true)}
          />
        )}
      </div>
    );
  }

  if (!src || imageError) {
    return (
      <div
        className={cn(
          "size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none",
          className
        )}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        "size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none",
        className
      )}
      onError={() => setImageError(true)}
    />
  );
}

export function WorkAccordionItem({
  work,
  triggerRef,
  className,
  contentClassName,
  highlight = false,
  hideLocation = false,
  compactDates = false,
}: {
  work: WorkEntry;
  triggerRef?: (node: HTMLButtonElement | null) => void;
  className?: string;
  contentClassName?: string;
  highlight?: boolean;
  hideLocation?: boolean;
  compactDates?: boolean;
}) {
  const highlightPhrases =
    "highlightPhrases" in work ? work.highlightPhrases : undefined;
  const itemValue = `${work.company}-${work.start}`;
  const description = work.description?.trim();
  const hasExpandableContent = Boolean(
    description || ("galleryImage" in work && work.galleryImage)
  );

  // Build the date range shown on the right:
  //  • identical start & end ("July 2024" / "July 2024")  → "July 2024"
  //  • compact + shared year ("Jan 2025" / "Jun 2025")     → "Jan - Jun 2025"
  //  • otherwise                                            → "start - end"
  const endLabel = work.end ?? "Present";
  const startYear = work.start?.match(/\d{4}$/)?.[0];
  const endYear = work.end?.match(/\d{4}$/)?.[0];
  const startLabel =
    compactDates && startYear && startYear === endYear
      ? work.start.replace(/\s*\d{4}$/, "")
      : work.start;
  const dateRange =
    work.end && work.start === work.end
      ? work.start
      : `${startLabel} - ${endLabel}`;

  return (
    <AccordionItem
      value={itemValue}
      className={cn("w-full border-b-0 grid gap-2", className)}
    >
      <AccordionTrigger
        ref={triggerRef}
        disabled={!hasExpandableContent}
        className={cn(
          "p-0 transition-colors rounded-none group hover:no-underline [&>svg]:hidden",
          hasExpandableContent
            ? "cursor-pointer"
            : "cursor-default"
        )}
      >
        <div className="flex w-full flex-col gap-2 text-left sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full min-w-0 items-center gap-x-3 sm:flex-1">
            <LogoImage src={work.logoUrl} alt={work.company} highlight={highlight} />
            <div className="flex-1 min-w-0 gap-0.5 flex flex-col">
              <div className="flex items-center gap-2 font-semibold text-sm leading-tight sm:text-base sm:leading-none">
                <span className="truncate">{work.title}</span>
                {hasExpandableContent ? (
                  <span className="relative inline-flex h-3.5 w-3.5 shrink-0 items-center">
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
              <div className="font-sans text-sm text-muted-foreground">
                {work.company}
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-0.5 pl-11 text-left sm:w-auto sm:items-end sm:pl-0 sm:text-right flex-none">
            <span className="text-xs tabular-nums text-muted-foreground">
              {dateRange}
            </span>
            {work.location && !hideLocation ? (
              <span className="text-xs text-muted-foreground/80">
                {formatLocationWithFlag(work.location)}
              </span>
            ) : null}
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className={cn("p-0 ml-11 md:ml-13", contentClassName)}>
        <div className="flex flex-col gap-3 text-xs sm:text-sm text-muted-foreground">
          {"galleryImage" in work && work.galleryImage ? (
            <LightboxImage
              src={work.galleryImage}
              alt={`${work.title} snapshot`}
              width={"galleryImageWidth" in work ? work.galleryImageWidth : undefined}
              height={"galleryImageHeight" in work ? work.galleryImageHeight : undefined}
              preloadOnWindowLoad
              wrapperClassName="block w-full max-w-xl"
              className="block w-full max-w-xl rounded-2xl border shadow ring-1 ring-border object-cover"
            />
          ) : null}
          {description ? (
            <div className="whitespace-pre-line">
              {renderHighlightedText(description, highlightPhrases)}
            </div>
          ) : null}
          {"paperUrl" in work && work.paperUrl ? (
            <Link
              href={work.paperUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-1.5 rounded-md border bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <ExternalLink className="size-3.5" />
              Read the paper
            </Link>
          ) : null}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default function WorkSection({
  items,
  initialVisibleCount = INITIAL_VISIBLE_WORK_COUNT,
}: WorkSectionProps) {
  const [showMore, setShowMore] = useState(false);
  const [openItemValue, setOpenItemValue] = useState("");
  const accordionContainerRef = useRef<HTMLDivElement | null>(null);
  const triggerRefs = useRef(new Map<string, HTMLButtonElement | null>());
  const pendingAnchorRef = useRef<{
    trigger: HTMLButtonElement;
    top: number;
  } | null>(null);
  const scrollSyncObserverRef = useRef<ResizeObserver | null>(null);
  const scrollSyncCleanupTimeoutRef = useRef<number | null>(null);
  const previousOverflowAnchorRef = useRef<string | null>(null);

  const visibleWork = items.slice(0, initialVisibleCount);
  const hiddenWork = items.slice(initialVisibleCount);

  useLayoutEffect(() => {
    const restoreOverflowAnchor = () => {
      if (previousOverflowAnchorRef.current === null) {
        return;
      }

      document.documentElement.style.overflowAnchor =
        previousOverflowAnchorRef.current;
      previousOverflowAnchorRef.current = null;
    };

    const stopScrollSync = () => {
      if (scrollSyncObserverRef.current) {
        scrollSyncObserverRef.current.disconnect();
        scrollSyncObserverRef.current = null;
      }

      if (scrollSyncCleanupTimeoutRef.current !== null) {
        window.clearTimeout(scrollSyncCleanupTimeoutRef.current);
        scrollSyncCleanupTimeoutRef.current = null;
      }

      restoreOverflowAnchor();
    };

    const syncScrollToAnchor = () => {
      const anchor = pendingAnchorRef.current;

      if (!anchor) {
        stopScrollSync();
        return;
      }

      if (previousOverflowAnchorRef.current === null) {
        previousOverflowAnchorRef.current =
          document.documentElement.style.overflowAnchor;
        document.documentElement.style.overflowAnchor = "none";
      }

      const currentTop = anchor.trigger.getBoundingClientRect().top;
      const delta = currentTop - anchor.top;

      if (Math.abs(delta) > 0.5) {
        window.scrollBy({ top: delta, behavior: "auto" });
      }
    };

    const scheduleScrollSyncCleanup = () => {
      if (scrollSyncCleanupTimeoutRef.current !== null) {
        window.clearTimeout(scrollSyncCleanupTimeoutRef.current);
      }

      scrollSyncCleanupTimeoutRef.current = window.setTimeout(() => {
        pendingAnchorRef.current = null;
        stopScrollSync();
      }, 120);
    };

    if (!pendingAnchorRef.current) {
      stopScrollSync();
      return;
    }

    const container = accordionContainerRef.current;

    if (!container) {
      pendingAnchorRef.current = null;
      stopScrollSync();
      return;
    }

    stopScrollSync();
    syncScrollToAnchor();

    const observer = new ResizeObserver(() => {
      syncScrollToAnchor();
      scheduleScrollSyncCleanup();
    });

    observer.observe(container);
    scrollSyncObserverRef.current = observer;
    scheduleScrollSyncCleanup();

    return () => {
      stopScrollSync();
    };
  }, [openItemValue]);

  const registerTriggerRef =
    (itemValue: string) => (node: HTMLButtonElement | null) => {
      triggerRefs.current.set(itemValue, node);
    };

  const handleValueChange = (value: string) => {
    const isSwitchingItems =
      openItemValue !== "" && value !== "" && openItemValue !== value;

    if (isSwitchingItems) {
      const trigger = triggerRefs.current.get(value);

      if (trigger) {
        pendingAnchorRef.current = {
          trigger,
          top: trigger.getBoundingClientRect().top,
        };
      } else {
        pendingAnchorRef.current = null;
      }
    } else {
      pendingAnchorRef.current = null;
    }

    setOpenItemValue(value);
  };

  return (
    <div ref={accordionContainerRef}>
      <Accordion
        type="single"
        collapsible
        value={openItemValue}
        onValueChange={handleValueChange}
        className="w-full grid gap-6"
      >
        {visibleWork.map((work) => (
          <WorkAccordionItem
            key={`${work.company}-${work.start}`}
            work={work}
            triggerRef={registerTriggerRef(`${work.company}-${work.start}`)}
          />
        ))}
        {hiddenWork.length > 0 && !showMore ? (
          <button
            type="button"
            onClick={() => setShowMore(true)}
            className="-mt-3 -mb-3 inline-flex w-8 items-center justify-center text-[11px] text-muted-foreground/80 transition-colors hover:text-foreground md:w-10"
          >
            More
          </button>
        ) : null}
        {showMore
          ? hiddenWork.map((work) => (
              <WorkAccordionItem
                key={`${work.company}-${work.start}`}
                work={work}
                triggerRef={registerTriggerRef(`${work.company}-${work.start}`)}
                className={cn(
                  "transition-all duration-[400ms] ease-out",
                  "animate-in fade-in slide-in-from-top-2"
                )}
              />
            ))
          : null}
      </Accordion>
    </div>
  );
}
