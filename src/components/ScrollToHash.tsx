import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHash = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      // Small delay to ensure DOM is rendered after route change
      const timeout = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timeout);
    }
    // Scroll to top on route change without hash
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [hash, pathname]);

  return null;
};

export default ScrollToHash;
