"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type AnimateOn = "hover" | "view" | "click" | "manual";
type ClickMode = "toggle" | "once";
type RevealDirection = "start" | "end";

type DecryptedTextProps = {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: AnimateOn;
  clickMode?: ClickMode;
  revealDirection?: RevealDirection;
  sequential?: boolean;
  useOriginalCharsOnly?: boolean;
  disabled?: boolean;
  triggerKey?: number;
};

export default function DecryptedText({
  text,
  speed = 60,
  maxIterations = 10,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  className,
  parentClassName,
  encryptedClassName,
  animateOn = "hover",
  clickMode = "toggle",
  revealDirection = "start",
  sequential = false,
  useOriginalCharsOnly = false,
  disabled = false,
  triggerKey,
}: DecryptedTextProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const timerRef = useRef<number | null>(null);
  const hasPlayedRef = useRef(false);
  const totalIterations = Math.max(1, Math.min(maxIterations, 14));

  const characterSource = useMemo(() => {
    if (useOriginalCharsOnly) {
      const uniqueChars = Array.from(new Set(text.replace(/\s+/g, "").split("")));
      return uniqueChars.length > 0 ? uniqueChars.join("") : characters;
    }

    return characters;
  }, [characters, text, useOriginalCharsOnly]);

  const getDeterministicCharacter = useCallback(
    (index: number, iteration: number) => {
      if (!characterSource.length) {
        return text[index] ?? "";
      }

      const seed =
        text.charCodeAt(index) +
        index * 17 +
        iteration * 31 +
        text.length * 13;
      const normalizedIndex = Math.abs(seed) % characterSource.length;
      return characterSource[normalizedIndex] ?? text[index] ?? "";
    },
    [characterSource, text]
  );

  const buildFrame = useCallback(
    (iteration: number) => {
      if (iteration >= totalIterations) {
        return text;
      }

      const normalized = Math.max(0, Math.min(iteration / totalIterations, 1));
      const revealCount = sequential
        ? Math.floor(normalized * text.length)
        : 0;

      return text
        .split("")
        .map((character, index) => {
          if (character === " ") {
            return character;
          }

          const directionalIndex =
            revealDirection === "start" ? index : text.length - 1 - index;
          const shouldReveal =
            sequential && directionalIndex < revealCount;

          if (shouldReveal) {
            return character;
          }

          return getDeterministicCharacter(index, iteration);
        })
        .join("");
    },
    [getDeterministicCharacter, revealDirection, sequential, text, totalIterations]
  );

  const [displayedText, setDisplayedText] = useState(() => buildFrame(0));

  const stopAnimation = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const playAnimation = useCallback(() => {
    if (!text || disabled) {
      return;
    }

    if (clickMode === "once" && hasPlayedRef.current) {
      return;
    }

    stopAnimation();
    let iteration = 0;
    setDisplayedText(buildFrame(0));

    timerRef.current = window.setInterval(() => {
      iteration += 1;

      if (iteration >= totalIterations) {
        stopAnimation();
        setDisplayedText(text);
        hasPlayedRef.current = true;
        return;
      }

      setDisplayedText(buildFrame(iteration));
    }, speed);
  }, [buildFrame, clickMode, disabled, speed, stopAnimation, text, totalIterations]);

  useEffect(() => {
    hasPlayedRef.current = false;
    stopAnimation();
    const frame = window.requestAnimationFrame(() => {
      setDisplayedText(buildFrame(0));
    });

    return () => {
      window.cancelAnimationFrame(frame);
      stopAnimation();
    };
  }, [buildFrame, stopAnimation, text]);

  useEffect(() => {
    if (!disabled) {
      return;
    }

    stopAnimation();
  }, [disabled, stopAnimation, text]);

  useEffect(() => {
    if (animateOn !== "view") {
      return;
    }

    const currentElement = elementRef.current;
    if (!currentElement) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayedRef.current) {
          playAnimation();
          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(currentElement);

    return () => {
      observer.disconnect();
    };
  }, [animateOn, disabled, playAnimation]);

  useEffect(() => {
    if (animateOn !== "manual" || !triggerKey || disabled) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      playAnimation();
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [animateOn, disabled, playAnimation, triggerKey]);

  const handleMouseEnter = useCallback(() => {
    if (animateOn === "hover") {
      playAnimation();
    }
  }, [animateOn, playAnimation]);

  const handleClick = useCallback(() => {
    if (animateOn === "click") {
      playAnimation();
    }
  }, [animateOn, playAnimation]);

  const resolvedText = disabled ? text : displayedText;
  const textClassName =
    resolvedText === text ? className : cn(className, encryptedClassName);

  return (
    <span
      ref={elementRef}
      className={cn("inline-block align-baseline", parentClassName)}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
    >
      <span className={textClassName}>{resolvedText}</span>
    </span>
  );
}
