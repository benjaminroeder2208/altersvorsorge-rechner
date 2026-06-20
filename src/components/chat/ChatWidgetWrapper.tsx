import { lazy, Suspense, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Swallow chunk-load failures (e.g. stale hash after redeploy) so the
// global chat widget can never blank the page with a "Script error."
const ChatWidget = lazy(() =>
  import("./ChatWidget").catch((err) => {
    console.warn("[ChatWidget] failed to load chunk, skipping:", err);
    return { default: () => null };
  })
);

const HIDDEN_ROUTES = ["/impressum", "/datenschutz", "/embed", "/ai-vorsorgeassistent"];

const ChatWidgetWrapper = () => {
  const { pathname } = useLocation();
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (HIDDEN_ROUTES.includes(pathname)) return;

    // Defer chat widget until browser is idle / after first interaction.
    // This removes ~50–100 kB from the critical path and improves LCP.
    const trigger = () => setShouldLoad(true);

    const idle = (window as any).requestIdleCallback
      ? (window as any).requestIdleCallback(trigger, { timeout: 4000 })
      : window.setTimeout(trigger, 3000);

    const onInteract = () => trigger();
    window.addEventListener("scroll", onInteract, { once: true, passive: true });
    window.addEventListener("pointerdown", onInteract, { once: true });
    window.addEventListener("keydown", onInteract, { once: true });

    return () => {
      if ((window as any).cancelIdleCallback && typeof idle === "number") {
        (window as any).cancelIdleCallback(idle);
      } else {
        clearTimeout(idle as number);
      }
      window.removeEventListener("scroll", onInteract);
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
    };
  }, [pathname]);

  if (HIDDEN_ROUTES.includes(pathname)) return null;
  if (!shouldLoad) return null;

  return (
    <Suspense fallback={null}>
      <ChatWidget />
    </Suspense>
  );
};

export default ChatWidgetWrapper;
