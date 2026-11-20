"use client";

import { cn } from "@/lib/utils";
import { motion, type MotionValue, useMotionValue, useSpring, useTransform } from "motion/react";
import { createContext, useContext, useLayoutEffect, useRef, type ReactNode } from "react";

interface DockProps {
  className?: string;
  children: ReactNode;
  magnification?: number;
  distance?: number;
}

interface DockIconProps {
  className?: string;
  children?: ReactNode;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 100;
const BASE_SIZE = 40;
const BASE_ICON_SIZE = 20;
const ICON_SIZE_RATIO = 0.5;
const SPRING = { mass: 0.1, stiffness: 150, damping: 12 };
const POINTER_STORAGE_KEY = "portfolio-dock-last-mouse-pointer";
const POINTER_STORAGE_TTL_MS = 4000;
let lastMousePointer: { clientX: number; clientY: number } | null = null;

function persistMousePointer(pointer: { clientX: number; clientY: number } | null) {
  lastMousePointer = pointer;

  if (typeof window === "undefined") {
    return;
  }

  try {
    if (!pointer) {
      window.sessionStorage.removeItem(POINTER_STORAGE_KEY);
      return;
    }

    window.sessionStorage.setItem(
      POINTER_STORAGE_KEY,
      JSON.stringify({
        ...pointer,
        timestamp: Date.now(),
      })
    );
  } catch {}
}

function readStoredMousePointer() {
  if (lastMousePointer) {
    return lastMousePointer;
  }

  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawPointer = window.sessionStorage.getItem(POINTER_STORAGE_KEY);

    if (!rawPointer) {
      return null;
    }

    const parsedPointer = JSON.parse(rawPointer) as {
      clientX?: number;
      clientY?: number;
      timestamp?: number;
    };

    const isValidPointer =
      typeof parsedPointer.clientX === "number" &&
      typeof parsedPointer.clientY === "number" &&
      typeof parsedPointer.timestamp === "number";

    if (!isValidPointer) {
      window.sessionStorage.removeItem(POINTER_STORAGE_KEY);
      return null;
    }

    const { clientX, clientY, timestamp } = parsedPointer as {
      clientX: number;
      clientY: number;
      timestamp: number;
    };

    if (Date.now() - timestamp > POINTER_STORAGE_TTL_MS) {
      window.sessionStorage.removeItem(POINTER_STORAGE_KEY);
      return null;
    }

    lastMousePointer = {
      clientX,
      clientY,
    };

    return lastMousePointer;
  } catch {
    return null;
  }
}

interface DockContextValue {
  mouseX: MotionValue<number>;
  magnification: number;
  distance: number;
}

const DockContext = createContext<DockContextValue | null>(null);

const Dock = ({ className, children, magnification = DEFAULT_MAGNIFICATION, distance = DEFAULT_DISTANCE }: DockProps) => {
  const dockRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(Infinity);

  useLayoutEffect(() => {
    const dock = dockRef.current;
    const pointer = readStoredMousePointer();

    if (!dock || !pointer) {
      mouseX.set(Infinity);
      return;
    }

    const bounds = dock.getBoundingClientRect();
    const isPointerInside =
      pointer.clientX >= bounds.left &&
      pointer.clientX <= bounds.right &&
      pointer.clientY >= bounds.top &&
      pointer.clientY <= bounds.bottom;

    mouseX.set(isPointerInside ? pointer.clientX : Infinity);
  }, [mouseX]);

  return (
    <DockContext.Provider value={{ mouseX, magnification, distance }}>
      <motion.div
        ref={dockRef}
        onPointerEnter={(e) => {
          if (e.pointerType !== "mouse") {
            persistMousePointer(null);
            mouseX.set(Infinity);
            return;
          }

          persistMousePointer({ clientX: e.clientX, clientY: e.clientY });
          mouseX.set(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") {
            return;
          }

          persistMousePointer({ clientX: e.clientX, clientY: e.clientY });
          mouseX.set(e.clientX);
        }}
        onPointerLeave={(e) => {
          if (e.pointerType !== "mouse") {
            return;
          }

          persistMousePointer(null);
          mouseX.set(Infinity);
        }}
        className={cn("mx-auto w-max h-full flex items-end justify-center overflow-visible rounded-full border", className)}
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  );
};

const DockIcon = ({ className, children }: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const context = useContext(DockContext);

  if (!context) {
    throw new Error("DockIcon must be used within a Dock component");
  }

  const { mouseX, magnification, distance } = context;

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const containerSize = useSpring(
    useTransform(distanceCalc, [-distance, 0, distance], [BASE_SIZE, magnification, BASE_SIZE]),
    SPRING
  );
  const iconSize = useSpring(
    useTransform(distanceCalc, [-distance, 0, distance], [BASE_ICON_SIZE, magnification * ICON_SIZE_RATIO, BASE_ICON_SIZE]),
    SPRING
  );

  return (
    <motion.div
      ref={ref}
      style={{ width: containerSize, height: containerSize }}
      className={cn("relative flex aspect-square items-center justify-center rounded-full shrink-0", className)}
    >
      <motion.div
        style={{ width: iconSize, height: iconSize }}
        className="flex items-center justify-center"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export { Dock, DockIcon };
export type { DockProps, DockIconProps };
