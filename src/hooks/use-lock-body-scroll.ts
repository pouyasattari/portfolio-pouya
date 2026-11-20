import { useEffect } from "react";

/**
 * Locks background page scroll while `locked` is true.
 *
 * Uses the `position: fixed` technique instead of `overflow: hidden`, because
 * on touch devices (notably iOS Safari) `overflow: hidden` does not stop scroll
 * chaining — scrolling inside a modal still bubbles up and moves the page
 * behind it. Pinning the body and restoring the scroll position on cleanup
 * prevents that reliably. It intentionally does not touch `overflow`, so it can
 * safely coexist with Radix's own scroll lock.
 */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) {
      return;
    }

    const { body } = document;
    const scrollY = window.scrollY;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    return () => {
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.left = previous.left;
      body.style.right = previous.right;
      body.style.width = previous.width;
      window.scrollTo(0, scrollY);
    };
  }, [locked]);
}
