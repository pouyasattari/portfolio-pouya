import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Check, ChevronDown, ChevronUp, Copy } from "lucide-react";

const LINE_THRESHOLD = 25;

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * MDX `pre` override: renders fenced code as a dark code box with a copy
 * button. Code longer than LINE_THRESHOLD lines is collapsed, with a minimal
 * expand/collapse button on the bottom border. Prism (from
 * @mapbox/rehype-prism) highlights the inner <code>.
 */
export function CodeBlock({ children, ...props }) {
  const preRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [collapsible, setCollapsible] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [collapsedHeight, setCollapsedHeight] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const pre = preRef.current;
    if (!pre) {
      return;
    }
    const text = (pre.innerText ?? "").replace(/\n+$/, "");
    const lineCount = text ? text.split("\n").length : 0;

    if (lineCount > LINE_THRESHOLD) {
      const styles = window.getComputedStyle(pre);
      const lineHeight = parseFloat(styles.lineHeight) || 22;
      const paddingTop = parseFloat(styles.paddingTop) || 0;
      setCollapsedHeight(Math.round(paddingTop + lineHeight * LINE_THRESHOLD));
      setCollapsible(true);
    } else {
      setCollapsible(false);
    }
  }, [children]);

  const handleCopy = async () => {
    const text = preRef.current?.innerText ?? "";
    if (!text) {
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — ignore.
    }
  };

  const isCollapsed = collapsible && collapsed;

  return (
    <div className="group relative my-6 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800/80 text-zinc-300 opacity-0 backdrop-blur transition hover:bg-zinc-700 hover:text-white focus-visible:opacity-100 group-hover:opacity-100"
      >
        {copied ? (
          <Check className="h-4 w-4 text-emerald-400" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>

      <div className="relative">
        <pre
          ref={preRef}
          {...props}
          style={
            isCollapsed
              ? { maxHeight: collapsedHeight, overflowY: "hidden" }
              : undefined
          }
          className="overflow-x-auto p-4 text-sm leading-relaxed text-zinc-100"
        >
          {children}
        </pre>
        {isCollapsed ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-zinc-900 to-transparent" />
        ) : null}
      </div>

      {collapsible ? (
        <button
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          className="flex w-full items-center justify-center gap-1.5 border-t border-zinc-800 py-1.5 text-xs font-medium text-zinc-400 transition hover:bg-zinc-800/50 hover:text-zinc-100"
        >
          {collapsed ? (
            <>
              Show more <ChevronDown className="h-3.5 w-3.5" />
            </>
          ) : (
            <>
              Show less <ChevronUp className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      ) : null}
    </div>
  );
}
