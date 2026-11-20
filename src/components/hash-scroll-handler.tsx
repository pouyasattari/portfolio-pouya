"use client";

import { useEffect } from "react";

/**
 * On a fresh page load with a URL hash (e.g. /#digital-resources), the browser
 * tries to scroll to the target during initial paint — but this page loads many
 * images afterwards, which shift layout and leave the early scroll in the wrong
 * spot (or it never fires after hydration). This re-scrolls to the hash target
 * once after mount, and again once all images have finished loading.
 */
export default function HashScrollHandler() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash.length < 2) return;

    let cancelled = false;
    const id = decodeURIComponent(hash.slice(1));

    const scrollToTarget = (behavior: ScrollBehavior) => {
      if (cancelled) return;
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior, block: "start" });
      }
    };

    // Glide to the target after the current frame so the DOM has hydrated.
    // Matches the smooth behavior of in-page anchor clicks.
    const raf = requestAnimationFrame(() => scrollToTarget("smooth"));

    // Once all images/fonts have loaded and shifted layout, silently snap to
    // the final position instead of animating a second time.
    const correctOnLoad = () => scrollToTarget("auto");
    if (document.readyState === "complete") {
      requestAnimationFrame(correctOnLoad);
    } else {
      window.addEventListener("load", correctOnLoad, { once: true });
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("load", correctOnLoad);
    };
  }, []);

  return null;
}
