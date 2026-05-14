import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

interface NoindexRedirectProps {
  to: string;
}

/**
 * Client-side redirect for legacy routes. Emits a noindex,nofollow robots meta
 * so crawlers that execute JS won't index the legacy URL while the redirect runs.
 * Consistent with the Disallow entries in public/robots.txt.
 */
const NoindexRedirect = ({ to }: NoindexRedirectProps) => (
  <>
    <Helmet>
      <meta name="robots" content="noindex,nofollow" />
    </Helmet>
    <Navigate to={to} replace />
  </>
);

export default NoindexRedirect;
