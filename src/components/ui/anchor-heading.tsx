"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Builds the absolute, shareable URL for an in-page anchor (e.g.
 * https://www.sattari.org/#research) from the current location.
 */
function anchorUrl(id: string) {
  return `${window.location.origin}${window.location.pathname}#${id}`;
}

/**
 * Copies the anchor URL to the clipboard and reports whether it succeeded,
 * with a legacy fallback for browsers without the async Clipboard API.
 */
async function copyAnchorUrl(id: string) {
  const url = anchorUrl(id);
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      return true;
    }
  } catch {
    // fall through to the legacy path below
  }
  try {
    const textarea = document.createElement("textarea");
    textarea.value = url;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

/**
 * Hook that copies the anchor URL on click and exposes a short-lived `copied`
 * flag for "Copied!" feedback. The browser still follows the `#id` link, so
 * the page scrolls and the address bar updates as before.
 */
function useCopyAnchor(id: string) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClick = () => {
    void copyAnchorUrl(id).then((ok) => {
      if (!ok) return;
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 800);
    });
  };

  return { copied, handleClick };
}

/**
 * Section heading that doubles as a shareable in-page anchor.
 * Clicking it scrolls to the section, updates the URL hash (e.g. /#research)
 * and copies the full link to the clipboard, briefly showing "Copied!".
 */
export function AnchorHeading({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  const { copied, handleClick } = useCopyAnchor(id);

  return (
    <h2 className={cn("group/anchor text-xl font-bold", className)}>
      <a
        href={`#${id}`}
        onClick={handleClick}
        aria-label={`${typeof children === "string" ? children : "Section"} — copy link`}
        className="inline-flex items-center gap-2 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {children}
        <span className="relative inline-flex size-4 shrink-0 items-center justify-center">
          <Link2
            aria-hidden="true"
            className={cn(
              "absolute size-4 text-muted-foreground opacity-0 transition-opacity duration-200 group-hover/anchor:opacity-100 group-focus-within/anchor:opacity-100",
              copied && "opacity-0 group-hover/anchor:opacity-0 group-focus-within/anchor:opacity-0"
            )}
          />
          <Check
            aria-hidden="true"
            className={cn(
              "absolute size-4 text-muted-foreground transition-all duration-150 ease-in",
              copied ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
            )}
          />
        </span>
      </a>
    </h2>
  );
}

/**
 * The centered "pill" section label (Hackathons, Workshops, …) rendered as a
 * shareable in-page anchor. Clicking scrolls to the section, updates the URL
 * hash and copies the full link to the clipboard, briefly showing "Copied!".
 */
export function AnchorPill({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  const { copied, handleClick } = useCopyAnchor(id);

  return (
    <a
      href={`#${id}`}
      onClick={handleClick}
      aria-label={`${typeof children === "string" ? children : "Section"} — copy link`}
      className={cn(
        "group/anchor z-10 inline-flex items-center rounded-xl border bg-primary px-4 py-1 outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      <span className="text-background text-sm font-medium">{children}</span>
      <span
        className={cn(
          "relative inline-flex h-3 shrink-0 items-center overflow-hidden transition-all duration-150 ease-in",
          copied
            ? "ml-1.5 w-3"
            : "w-0 group-hover/anchor:ml-1.5 group-hover/anchor:w-3 group-focus-within/anchor:ml-1.5 group-focus-within/anchor:w-3"
        )}
      >
        <Link2
          aria-hidden="true"
          className={cn(
            "absolute left-0 h-3 w-3 text-background/70 opacity-0 transition-opacity duration-150 group-hover/anchor:opacity-100 group-focus-within/anchor:opacity-100",
            copied && "opacity-0 group-hover/anchor:opacity-0 group-focus-within/anchor:opacity-0"
          )}
        />
        <Check
          aria-hidden="true"
          className={cn(
            "absolute left-0 h-3 w-3 text-background transition-all duration-150 ease-in",
            copied ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
          )}
        />
      </span>
    </a>
  );
}
