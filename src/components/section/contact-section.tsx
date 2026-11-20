"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Link from "next/link";
import DecryptedText from "@/components/ui/decrypted-text";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnchorPill } from "@/components/ui/anchor-heading";
import { DATA } from "@/data/resume";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import { Check, Copy, ExternalLink } from "lucide-react";

const BOOKING_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0a32JZdO9B9JZey_vCjkXiRISrX2N1T0uq6jgOD_XmQOcSuCLkr4zvJ6ruFfMNRCFGPBLtrAxP?gv=true";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [emailAnimationTick, setEmailAnimationTick] = useState(0);
  const [emailHasEnteredView, setEmailHasEnteredView] = useState(false);
  const [emailAnimationDisabled, setEmailAnimationDisabled] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const emailButtonRef = useRef<HTMLButtonElement>(null);

  useLockBodyScroll(bookingOpen);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setCopied(false);
    }, 1000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [copied]);

  useEffect(() => {
    const currentButton = emailButtonRef.current;
    if (!currentButton || emailHasEnteredView) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEmailHasEnteredView(true);
          setEmailAnimationTick(1);
          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(currentButton);

    return () => {
      observer.disconnect();
    };
  }, [emailHasEnteredView]);

  useEffect(() => {
    if (!emailHasEnteredView || emailAnimationDisabled) {
      return;
    }

    const interval = window.setInterval(() => {
      setEmailAnimationTick((currentValue) => currentValue + 1);
    }, 3000);

    return () => {
      window.clearInterval(interval);
    };
  }, [emailAnimationDisabled, emailHasEnteredView]);

  const handleCopyEmail = useCallback(async () => {
    setEmailAnimationDisabled(true);

    try {
      await navigator.clipboard.writeText(DATA.contact.email);
      setCopied(true);
      setHasCopied(true);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = DATA.contact.email;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setHasCopied(true);
    }
  }, []);

  const actionClassName =
    "text-black underline decoration-black underline-offset-4 transition-colors hover:text-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm dark:text-foreground dark:decoration-foreground dark:hover:text-foreground/80";

  const emailClassName =
    "font-mono text-[0.98em] tabular-nums tracking-tight";

  return (
    <div className="border rounded-xl p-10 relative">
      <AnchorPill
        id="contact"
        className="absolute -top-4 left-1/2 -translate-x-1/2"
      >
        Contact
      </AnchorPill>
      <div className="absolute inset-0 top-0 left-0 right-0 h-1/2 rounded-xl overflow-hidden">
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
      <div className="relative flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Get in Touch
        </h2>
        <div className="mx-auto max-w-lg text-muted-foreground text-balance">
          <p>
            Reach out at{" "}
            <span className="group/email relative inline-flex items-center justify-center">
              <button
                ref={emailButtonRef}
                type="button"
                onClick={handleCopyEmail}
                className={actionClassName}
              >
                <DecryptedText
                  text={DATA.contact.email}
                  speed={90}
                  maxIterations={14}
                  animateOn="manual"
                  disabled={emailAnimationDisabled}
                  triggerKey={emailAnimationTick}
                  revealDirection="start"
                  sequential
                  className={emailClassName}
                  encryptedClassName={emailClassName}
                  parentClassName={emailClassName}
                />
              </button>
              <span
                aria-live="polite"
                className="pointer-events-none absolute left-full top-1/2 ml-2 inline-flex size-3.5 -translate-y-1/2 items-center justify-center"
              >
                <Copy
                  aria-hidden
                  className={`absolute size-3.5 text-muted-foreground transition-opacity duration-100 ${
                    copied || hasCopied
                      ? "opacity-0"
                      : "opacity-0 group-hover/email:opacity-100 group-focus-within/email:opacity-100"
                  }`}
                />
                <Check
                  aria-hidden
                  className={`absolute size-3.5 text-emerald-600 transition-all duration-100 dark:text-emerald-400 ${
                    copied
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-1 opacity-0"
                  }`}
                />
              </span>
            </span>
          </p>
          <p className="mt-2">
            Connect on{" "}
            <Link
              href={DATA.contact.social.LinkedIn.url}
              target="_blank"
              rel="noopener noreferrer"
              className={actionClassName}
            >
              LinkedIn
            </Link>
            , or book a{" "}
            <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
              <TooltipProvider delayDuration={150}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                      <button type="button" className={actionClassName}>
                        Free Mentorship session
                      </button>
                    </DialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="max-w-[15rem] text-balance text-center"
                  >
                    Helped 15+ people land their first job in Data &amp; AI
                    <TooltipArrow />
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DialogContent className="flex h-[90vh] w-full max-w-5xl flex-col p-0 overflow-hidden">
                <DialogHeader className="flex flex-row items-center justify-between gap-4 border-b px-5 py-4 pr-20 text-left">
                  <div className="space-y-1">
                    <DialogTitle>Book a Free Mentorship session</DialogTitle>
                    <DialogDescription>
                      Pick a time that works for you.
                    </DialogDescription>
                  </div>
                  <Link
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open scheduling page in a new tab"
                    className="absolute right-12 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <ExternalLink className="size-4" />
                  </Link>
                </DialogHeader>
                <iframe
                  src={BOOKING_URL}
                  title="Schedule a Free Mentorship session"
                  className="h-full w-full flex-1 border-0"
                  loading="lazy"
                />
              </DialogContent>
            </Dialog>
          </p>
        </div>
      </div>
    </div>
  );
}
