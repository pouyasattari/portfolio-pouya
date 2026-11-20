"use client";

import { useId } from "react";

import { cn } from "@/lib/utils";

type GradientArrowUpRightProps = {
  className?: string;
  colors?: string[];
  animationSpeed?: number;
};

export default function GradientArrowUpRight({
  className,
  colors = ["#5227FF", "#FF9FFC", "#B19EEF"],
  animationSpeed = 1.5,
}: GradientArrowUpRightProps) {
  const gradientId = useId().replace(/:/g, "");
  const gradientColors = [...colors, colors[0]];

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={cn("shrink-0", className)}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <animate
            attributeName="x1"
            values="0%;100%;0%"
            dur={`${animationSpeed}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="x2"
            values="100%;200%;100%"
            dur={`${animationSpeed}s`}
            repeatCount="indefinite"
          />
          {gradientColors.map((color, index) => (
            <stop
              key={`${color}-${index}`}
              offset={`${(index / (gradientColors.length - 1)) * 100}%`}
              stopColor={color}
            />
          ))}
        </linearGradient>
      </defs>
      <path
        d="M7 7h10v10"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 17 17 7"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
