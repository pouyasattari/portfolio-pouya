"use client";

import { useState } from "react";
import { Check, Copy, FileDown, ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Publication } from "@/lib/publications";
import { formatCitation, paperExternalUrl } from "@/lib/publications";

function CopyButton({
  label,
  value,
  iconOnly = false,
  className,
}: {
  label: string;
  value: string;
  iconOnly?: boolean;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable — no-op; the text is still visible/selectable.
    }
  }

  if (iconOnly) {
    return (
      <button
        type="button"
        onClick={handleCopy}
        aria-label={label}
        title={label}
        className={cn(
          "inline-flex size-7 items-center justify-center rounded-md border bg-card text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground",
          className
        )}
      >
        {copied ? (
          <Check className="size-3.5 text-emerald-500" />
        ) : (
          <Copy className="size-3.5" />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border bg-card px-2.5 py-1 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground",
        className
      )}
    >
      {copied ? (
        <Check className="size-3.5 text-emerald-500" />
      ) : (
        <Copy className="size-3.5" />
      )}
      {copied ? "Copied" : label}
    </button>
  );
}

export default function PublicationCite({ publication }: { publication: Publication }) {
  const citation = formatCitation(publication);
  const external = paperExternalUrl(publication);

  return (
    <div className="grid gap-3 rounded-lg border bg-card/50 p-3 sm:p-4">
      <span className="text-xs font-semibold text-foreground">Cite this paper</span>

      <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
        {citation}
      </p>

      {publication.bibtex ? (
        <div className="group relative">
          <pre className="whitespace-pre-wrap [overflow-wrap:anywhere] rounded-md border bg-muted/40 p-3 pr-12 text-[11px] leading-relaxed text-foreground sm:text-xs">
            <code>{publication.bibtex}</code>
          </pre>
          <CopyButton
            iconOnly
            label="Copy citation"
            value={publication.bibtex}
            className="absolute right-2 top-2 opacity-100 transition-opacity duration-150 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
          />
        </div>
      ) : null}

      {(external || publication.pdfUrl || publication.repoUrl) && (
        <div className="flex flex-wrap gap-2">
          {external ? (
            <a
              href={external}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md border bg-card px-3 py-1.5 text-xs font-medium",
                "text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <ExternalLink className="size-3.5" />
              View on arXiv
            </a>
          ) : null}
          {publication.pdfUrl ? (
            <a
              href={publication.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md border bg-card px-3 py-1.5 text-xs font-medium",
                "text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <FileDown className="size-3.5" />
              Download PDF
            </a>
          ) : null}
          {publication.repoUrl ? (
            <a
              href={publication.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md border bg-card px-3 py-1.5 text-xs font-medium",
                "text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Github className="size-3.5" />
              Code
            </a>
          ) : null}
        </div>
      )}
    </div>
  );
}
