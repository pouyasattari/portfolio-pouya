"use client";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SunIcon } from "@radix-ui/react-icons";
import { ArrowUpRight, BookOpen } from "lucide-react";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";

const DESKTOP_DOCK_MEDIA_QUERY =
  "(min-width: 1024px) and (hover: hover) and (pointer: fine)";

const subscribeToDesktopDock = (onStoreChange: () => void) => {
  const mediaQuery = window.matchMedia(DESKTOP_DOCK_MEDIA_QUERY);
  mediaQuery.addEventListener("change", onStoreChange);

  return () => {
    mediaQuery.removeEventListener("change", onStoreChange);
  };
};

const getDesktopDockSnapshot = () =>
  window.matchMedia(DESKTOP_DOCK_MEDIA_QUERY).matches;

const getDesktopDockServerSnapshot = () => false;

export default function Navbar() {
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const isDesktopDock = useSyncExternalStore(
    subscribeToDesktopDock,
    getDesktopDockSnapshot,
    getDesktopDockServerSnapshot
  );
  const socialItems = Object.entries(DATA.contact.social).filter(
    ([_, social]) => social.navbar
  );
  const dockKey = isDesktopDock ? "desktop-dock" : resolvedTheme ?? "pending-theme";

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+0.625rem)] sm:bottom-[calc(env(safe-area-inset-bottom)+1rem)] z-30">
      <Dock
        key={dockKey}
        className="z-50 pointer-events-auto relative h-14 p-2 w-fit mx-auto flex gap-2 border bg-card/90 backdrop-blur-3xl shadow-[0_0_10px_3px] shadow-primary/5"
      >
        {DATA.navbar.map((item) => {
          const isExternal = item.href.startsWith("http");
          return (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                {isExternal ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <DockIcon className="rounded-3xl cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors">
                      <item.icon className="size-full rounded-sm overflow-hidden object-contain" />
                    </DockIcon>
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    onClick={(event) => {
                      if (item.href === pathname) {
                        event.preventDefault();
                        if (window.location.hash) {
                          window.history.replaceState(
                            null,
                            "",
                            window.location.pathname + window.location.search
                          );
                        }
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                  >
                    <DockIcon className="rounded-3xl cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors">
                      <item.icon className="size-full rounded-sm overflow-hidden object-contain" />
                    </DockIcon>
                  </Link>
                )}
              </TooltipTrigger>
              <TooltipContent
                side="top"
                sideOffset={8}
                className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
              >
                <p>{item.label}</p>
                <TooltipArrow className="fill-primary" />
              </TooltipContent>
            </Tooltip>
          );
        })}
        <Separator
          orientation="vertical"
          className="h-2/3 m-auto w-px bg-border"
        />
        {socialItems.map(([name, social], index) => {
          const isExternal = social.url.startsWith("http");
          const IconComponent = social.icon;
          return (
            <Tooltip key={`social-${name}-${index}`}>
              <TooltipTrigger asChild>
                <a
                  href={social.url}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                >
                  <DockIcon className="rounded-3xl cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors">
                    <IconComponent className="size-full rounded-sm overflow-hidden object-contain" />
                  </DockIcon>
                </a>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                sideOffset={8}
                className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
              >
                <p className="flex items-center gap-1">
                  {name}
                  {isExternal ? (
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  ) : null}
                </p>
                <TooltipArrow className="fill-primary" />
              </TooltipContent>
            </Tooltip>
          );
        })}
        <Separator
          orientation="vertical"
          className="h-2/3 m-auto w-px bg-border"
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/user-manual"
              scroll={false}
              onClick={(event) => {
                if (pathname === "/user-manual") {
                  event.preventDefault();
                  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                }
              }}
              aria-label="User Manual"
              aria-current={pathname === "/user-manual" ? "page" : undefined}
            >
              <DockIcon className="rounded-3xl cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors">
                <BookOpen aria-hidden="true" className="size-full rounded-sm overflow-hidden object-contain" />
              </DockIcon>
            </Link>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            sideOffset={8}
            className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
          >
            <p>User Manual</p>
            <TooltipArrow className="fill-primary" />
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <ModeToggle className="rounded-3xl">
              <DockIcon className="rounded-3xl cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors">
                <SunIcon className="size-full rounded-sm overflow-hidden object-contain" />
              </DockIcon>
            </ModeToggle>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            sideOffset={8}
            className="rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
          >
            <p>Theme</p>
            <TooltipArrow className="fill-primary" />
          </TooltipContent>
        </Tooltip>
      </Dock>
    </div>
  );
}
