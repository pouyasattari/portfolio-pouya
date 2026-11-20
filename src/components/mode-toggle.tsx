"use client";

import type { ReactNode } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ModeToggle({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);

    // Keep the DOM class in sync immediately across both App Router and Pages Router shells.
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(nextTheme);
      document.documentElement.style.colorScheme = nextTheme;
    }
  };

  return (
    <button
      type="button"
      className={cn(
        "rounded-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        className
      )}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {children}
    </button>
  );
}
