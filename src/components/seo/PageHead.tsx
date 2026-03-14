import { Helmet } from "react-helmet-async";

interface PageHeadProps {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  robots?: string;
  jsonLd?: Record<string, unknown>[];
}

const BASE = "https://altersvorsorge-rechner.com";
const OG_IMAGE = `${BASE}/og-default.jpg`;
const SITE_NAME = "altersvorsorge-rechner.com";

const PageHead = ({ title, description, path, ogTitle, ogDescription, jsonLd }: PageHeadProps) => {
  const url = `${BASE}${path}`;
  const ogt = ogTitle || title;
  const ogd = ogDescription || description;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={ogt} />
      <meta property="og:description" content={ogd} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="de_DE" />
      <meta property="og:image" content={OG_IMAGE} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogt} />
      <meta name="twitter:description" content={ogd} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {jsonLd?.map((item, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify({ "@context": "https://schema.org", ...item })}
        </script>
      ))}
    </Helmet>
  );
};

export default PageHead;
