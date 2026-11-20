"use client";

import { useId } from "react";

import { cn } from "@/lib/utils";

type GradientEyeProps = {
  className?: string;
  colors?: string[];
  animationSpeed?: number;
};

export default function GradientEye({
  className,
  colors = ["#5227FF", "#FF9FFC", "#B19EEF"],
  animationSpeed = 1.5,
}: GradientEyeProps) {
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
        d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
