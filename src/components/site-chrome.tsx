import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import Navbar from "@/components/navbar";
import ScrollToTop from "@/components/scroll-to-top";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const NAVBAR_CLEARANCE_CLASSNAME =
  "h-[calc(env(safe-area-inset-bottom)+5.5rem)] sm:h-[calc(env(safe-area-inset-bottom)+6rem)]";

export default function SiteChrome({
  children,
  contentClassName,
}: {
  children: ReactNode;
  contentClassName?: string;
}) {
  return (
    <>
      <div className="absolute inset-0 top-0 left-0 right-0 h-[100px] overflow-hidden z-0">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={2}
          gridGap={2}
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>
      <div className={cn("relative z-10", contentClassName)}>
        {children}
        <div
          aria-hidden="true"
          className={NAVBAR_CLEARANCE_CLASSNAME}
        />
      </div>
      <Navbar />
      <ScrollToTop />
    </>
  );
}
