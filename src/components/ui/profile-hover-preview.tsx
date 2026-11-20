"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const DESKTOP_HOVER_MEDIA_QUERY =
  "(min-width: 1024px) and (hover: hover) and (pointer: fine)";

const subscribeToDesktopHover = (onStoreChange: () => void) => {
  const mediaQuery = window.matchMedia(DESKTOP_HOVER_MEDIA_QUERY);
  mediaQuery.addEventListener("change", onStoreChange);

  return () => {
    mediaQuery.removeEventListener("change", onStoreChange);
  };
};

const getDesktopHoverSnapshot = () =>
  window.matchMedia(DESKTOP_HOVER_MEDIA_QUERY).matches;

const getDesktopHoverServerSnapshot = () => false;

type ProfileHoverPreviewProps = {
  src: string;
  alt: string;
  fallback: string;
  className?: string;
};

export default function ProfileHoverPreview({
  src,
  alt,
  fallback,
  className,
}: ProfileHoverPreviewProps) {
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const isHoverPreviewEnabled = useSyncExternalStore(
    subscribeToDesktopHover,
    getDesktopHoverSnapshot,
    getDesktopHoverServerSnapshot
  );

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLightboxOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen]);

  return (
    <div
      className={cn("relative inline-flex overflow-visible rounded-full", className)}
    >
      <button
        type="button"
        aria-label={`${alt} profile picture preview`}
        aria-haspopup="dialog"
        className="relative z-10 inline-flex rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        onMouseEnter={() => {
          if (isHoverPreviewEnabled) {
            setIsPreviewVisible(true);
          }
        }}
        onMouseLeave={() => {
          if (isHoverPreviewEnabled) {
            setIsPreviewVisible(false);
          }
        }}
        onClick={() => {
          setIsPreviewVisible(false);
          setIsLightboxOpen(true);
        }}
      >
        <Avatar className="size-24 rounded-full border shadow-lg ring-4 ring-muted md:size-32">
          <AvatarImage alt={alt} src={src} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      </button>

      <AnimatePresence>
        {isHoverPreviewEnabled && isPreviewVisible ? (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 2 }}
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <Avatar className="size-24 rounded-full border border-border/70 bg-background shadow-[0_18px_45px_rgba(15,23,42,0.16)] ring-8 ring-background/90 md:size-32">
              <AvatarImage alt={alt} src={src} />
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {isLightboxOpen ? (
                <motion.div
                  className="fixed inset-0 z-[100] bg-background/80 px-4 py-6 backdrop-blur-sm sm:px-8 sm:py-10"
                  onClick={() => setIsLightboxOpen(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <motion.img
                      src={src}
                      alt={alt}
                      decoding="async"
                      className="max-h-[88vh] max-w-[92vw] rounded-xl border border-border bg-background object-contain shadow-2xl"
                      initial={{ opacity: 0, scale: 0.965, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.985, y: 4 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </div>
  );
}
