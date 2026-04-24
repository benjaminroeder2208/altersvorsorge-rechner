import { useLocation } from "react-router-dom";
import CookieSettingsButton from "./CookieSettingsButton";

// Hide on embed (iframe) and admin views to keep them clean.
const HIDDEN_PREFIXES = ["/embed", "/admin"];

const CookieSettingsWrapper = () => {
  const { pathname } = useLocation();

  if (HIDDEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return null;
  }

  return <CookieSettingsButton />;
};

export default CookieSettingsWrapper;
