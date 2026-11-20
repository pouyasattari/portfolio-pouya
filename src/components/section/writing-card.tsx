/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { Icons } from "@/components/icons";
import GradientArrowUpRight from "@/components/ui/gradient-arrow-up-right";

const GRADIENT_COLORS = ["#5227FF", "#FF9FFC", "#B19EEF"];

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type WritingCardProps = {
  title: string;
  href: string;
  image?: string;
};

export default function WritingCard({ title, href, image }: WritingCardProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const logoRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  // Keep the hover icons on the title's last line. Prefer "[logo] →"; if that
  // would wrap, fall back to just the arrow; if even that wraps, show nothing.
  useIsomorphicLayoutEffect(() => {
    const heading = headingRef.current;
    const logo = logoRef.current;
    const arrow = arrowRef.current;
    if (!heading || !logo || !arrow) {
      return;
    }

    const measure = () => {
      logo.style.display = "inline-flex";
      arrow.style.display = "inline-flex";
      const withBoth = heading.offsetHeight;

      logo.style.display = "none";
      const withArrowOnly = heading.offsetHeight;

      arrow.style.display = "none";
      const base = heading.offsetHeight;

      if (withBoth <= base) {
        logo.style.display = "inline-flex";
        arrow.style.display = "inline-flex";
      } else if (withArrowOnly <= base) {
        arrow.style.display = "inline-flex";
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(heading);
    return () => observer.disconnect();
  }, [title]);

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border transition-all duration-200 hover:ring-2 hover:ring-muted"
    >
      <img
        src={image}
        alt={title}
        className="h-48 w-full shrink-0 object-cover"
      />
      <div className="flex flex-1 flex-col justify-center p-6">
        <h3 ref={headingRef} className="font-semibold leading-snug">
          {title}
          <span
            ref={logoRef}
            className="ml-1.5 inline-flex h-3 w-3 align-middle opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          >
            <Icons.medium className="size-3" />
          </span>
          <span
            ref={arrowRef}
            className="ml-1 inline-flex h-3.5 w-3.5 align-middle opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          >
            <GradientArrowUpRight
              className="h-3.5 w-3.5"
              colors={GRADIENT_COLORS}
              animationSpeed={1.5}
            />
          </span>
        </h3>
      </div>
    </Link>
  );
}
