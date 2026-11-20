/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type LightboxImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  wrapperClassName?: string;
  lightboxClassName?: string;
  preloadOnWindowLoad?: boolean;
  trigger?: ReactNode;
};

export default function LightboxImage({
  src,
  alt,
  width,
  height,
  className,
  wrapperClassName,
  lightboxClassName,
  preloadOnWindowLoad = false,
  trigger,
}: LightboxImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!preloadOnWindowLoad) {
      return;
    }

    let preloadedImage: HTMLImageElement | null = null;

    const preloadImage = () => {
      if (preloadedImage) {
        return;
      }

      preloadedImage = new window.Image();
      preloadedImage.decoding = "async";
      preloadedImage.src = src;
      void preloadedImage.decode?.().catch(() => undefined);
    };

    if (document.readyState === "complete") {
      preloadImage();
      return;
    }

    window.addEventListener("load", preloadImage, { once: true });

    return () => {
      window.removeEventListener("load", preloadImage);
    };
  }, [preloadOnWindowLoad, src]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    const blockScroll = (event: Event) => event.preventDefault();

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", blockScroll, { passive: false });
    window.addEventListener("touchmove", blockScroll, { passive: false });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", blockScroll);
      window.removeEventListener("touchmove", blockScroll);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={cn(
          "block w-full cursor-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-[inherit]",
          wrapperClassName
        )}
      >
        {trigger ?? (
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={preloadOnWindowLoad ? "eager" : undefined}
            fetchPriority={preloadOnWindowLoad ? "high" : undefined}
            decoding="async"
            className={className}
          />
        )}
      </button>
      {isMounted
        ? createPortal(
            <AnimatePresence>
              {isOpen ? (
                <motion.div
                  className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm px-4 py-6 sm:px-8 sm:py-10"
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <motion.img
                      src={src}
                      alt={alt}
                      width={width}
                      height={height}
                      decoding="async"
                      className={cn(
                        "max-h-[88vh] max-w-[92vw] rounded-xl border border-border bg-background object-contain shadow-2xl",
                        lightboxClassName
                      )}
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
    </>
  );
}
