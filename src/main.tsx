import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Register Service Worker for long-lived asset caching.
// Production-only; deferred well past TBT window (Lighthouse measures the
// first ~5 s after FCP). Using requestIdleCallback with a 10 s timeout pushes
// the install/activate cost off the critical main-thread budget.
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  const register = () => {
    navigator.serviceWorker
      .register("/sw.js")
      .catch((err) => console.warn("[SW] registration failed:", err));
  };

  const ric = (window as any).requestIdleCallback as
    | ((cb: () => void, opts?: { timeout: number }) => number)
    | undefined;

  if (ric) {
    ric(register, { timeout: 10_000 });
  } else {
    // Safari fallback: simple long delay, also outside the TBT window.
    window.setTimeout(register, 8_000);
  }
}


