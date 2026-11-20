"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";

type PdfLightboxProps = {
  src: string;
  title?: string;
  trigger: ReactNode;
  triggerClassName?: string;
};

export default function PdfLightbox({
  src,
  title,
  trigger,
  triggerClassName,
}: PdfLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  // Mobile/touch browsers (notably iOS WebKit) render an embedded PDF as a
  // static first-page image with no scrolling. On those devices we skip the
  // in-page iframe and hand the file to the platform's native PDF viewer,
  // which gives proper multi-page scrolling and native pinch-zoom.
  const [useNativeViewer, setUseNativeViewer] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setUseNativeViewer(
      window.matchMedia("(pointer: coarse)").matches
    );
  }, []);

  useLockBodyScroll(isOpen && !useNativeViewer);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          if (useNativeViewer) {
            window.open(src, "_blank", "noopener,noreferrer");
            return;
          }
          setIsOpen(true);
        }}
        className={cn(
          "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md",
          triggerClassName
        )}
      >
        {trigger}
      </button>
      {isMounted && !useNativeViewer
        ? createPortal(
            <AnimatePresence>
              {isOpen ? (
                <motion.div
                  className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 px-4 py-4 backdrop-blur-sm sm:px-8 sm:py-6"
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  <motion.div
                    onClick={(event) => event.stopPropagation()}
                    className="relative flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-border bg-background shadow-2xl"
                    initial={{ opacity: 0, scale: 0.965, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.985, y: 4 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-2.5">
                      {title ? (
                        <span className="truncate text-sm font-medium text-foreground">
                          {title}
                        </span>
                      ) : (
                        <span />
                      )}
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close"
                        className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                    <iframe
                      src={src}
                      title={title ?? "PDF"}
                      className="h-full w-full flex-1 bg-muted"
                    />
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </>
  );
}
