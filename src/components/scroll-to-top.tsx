"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

// Starts to show at 90% of the page and is fully visible at the very bottom
const SHOW_FROM = 0.9;

export default function ScrollToTop() {
  const [visibility, setVisibility] = useState(0);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        setVisibility(0);
        return;
      }
      const progress = Math.min(window.scrollY / scrollable, 1);
      setVisibility(Math.max(0, (progress - SHOW_FROM) / (1 - SHOW_FROM)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, []);

  const shown = visibility > 0.05;

  const scrollUp = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <div
      style={{ opacity: visibility }}
      className={`fixed z-30 right-4 bottom-[calc(env(safe-area-inset-bottom)+4.875rem)] sm:right-6 sm:bottom-[calc(env(safe-area-inset-bottom)+1rem)] rounded-full border dark:border-white/25 bg-card/90 p-2 backdrop-blur-3xl shadow-[0_0_10px_3px] shadow-primary/5 ${shown ? "" : "pointer-events-none"}`}
    >
      <button
        type="button"
        onClick={scrollUp}
        aria-label="Back to top"
        aria-hidden={!shown}
        tabIndex={shown ? 0 : -1}
        className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-foreground bg-foreground text-background transition-colors hover:bg-foreground/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <ArrowUp aria-hidden="true" className="size-5" />
      </button>
    </div>
  );
}
