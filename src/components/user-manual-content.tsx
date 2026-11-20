"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import Markdown from "react-markdown";
import {
  manualLanguages,
  manualTranslations,
  type ManualLanguage,
} from "@/data/user-manual-translations";

export default function UserManualContent({ initialLanguage = "en" }: { initialLanguage?: ManualLanguage }) {
  const [language, setLanguage] = useState<ManualLanguage>(initialLanguage);
  const menuRef = useRef<HTMLDetailsElement>(null);
  const languageButtonRef = useRef<HTMLElement>(null);
  const selected = manualLanguages.find((item) => item.code === language)!;
  const markdown = manualTranslations[language];
  const titleEnd = markdown.indexOf("\n");
  const title = markdown.slice(2, titleEnd);
  const body = markdown.slice(titleEnd + 1);
  const fontFamily = language === "fa"
    ? "var(--font-persian), sans-serif"
    : language === "ar"
      ? "var(--font-arabic), sans-serif"
      : undefined;

  useLayoutEffect(() => {
    // Preserve the page's top padding instead of Next scrolling to the heading
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) {
        menuRef.current?.removeAttribute("open");
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuRef.current?.open) {
        menuRef.current.removeAttribute("open");
        languageButtonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div lang={language} style={{ fontFamily }}>
            <header dir={selected.direction} className="not-prose mb-8 flex items-start justify-between gap-3">
              <h1 dir={selected.direction} className="min-w-0 break-words text-3xl font-semibold tracking-tighter text-foreground sm:text-4xl">
                {title}
              </h1>
              <details ref={menuRef} lang="en" dir="ltr" suppressHydrationWarning className="relative shrink-0 font-sans">
                <summary
                  ref={languageButtonRef}
                  aria-label={`Language: ${selected.name}`}
                  className="flex size-10 cursor-pointer list-none items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden"
                >
                  <span aria-hidden="true" style={{ fontFamily }} className="flex size-6 items-center justify-center rounded border border-current text-xs font-medium leading-none">
                    {selected.icon}
                  </span>
                </summary>
                <ul aria-label="Languages" className={`absolute ${selected.direction === "rtl" ? "left-0" : "right-0"} z-40 mt-2 w-44 rounded-xl border border-border bg-background p-1.5 text-sm text-foreground shadow-lg`}>
                  {manualLanguages.map((item) => (
                    <li key={item.code}>
                      <button
                        type="button"
                        aria-pressed={item.code === language}
                        onClick={() => {
                          setLanguage(item.code);
                          const url = new URL(window.location.href);
                          if (item.code === "en") url.searchParams.delete("lang");
                          else url.searchParams.set("lang", item.code);
                          window.history.replaceState(window.history.state, "", url);
                          menuRef.current?.removeAttribute("open");
                          languageButtonRef.current?.focus();
                        }}
                        className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                      >
                        <span aria-hidden="true" style={{ fontFamily: item.code === "fa" ? "var(--font-persian)" : item.code === "ar" ? "var(--font-arabic)" : undefined }} className="flex size-6 shrink-0 items-center justify-center rounded border border-current text-xs font-medium leading-none text-muted-foreground">
                          {item.icon}
                        </span>
                        <span>{item.name}</span>
                        {item.code === language && <Check aria-hidden="true" className="ms-auto size-3.5" />}
                      </button>
                    </li>
                  ))}
                </ul>
              </details>
            </header>
      <article
        dir={selected.direction}
        style={{ fontFamily }}
        className="prose w-full max-w-none font-sans leading-relaxed text-muted-foreground dark:prose-invert prose-headings:text-foreground prose-h2:text-xl prose-h2:tracking-tight prose-strong:text-foreground prose-hr:border-border [&_ul]:ps-[1.625em] [&_ul]:pe-0 [&_li]:ps-[0.375em] [&_li]:pe-0"
      >
        <Markdown>{body}</Markdown>
      </article>
    </div>
  );
}
