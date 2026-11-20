export const scrollResetScript = `
(() => {
  try {
    const resetScroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    resetScroll();

    window.addEventListener("load", resetScroll, { once: true });
  } catch {}
})();
`;
