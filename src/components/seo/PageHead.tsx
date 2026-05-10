import { Helmet } from "react-helmet-async";

interface PageHeadProps {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  robots?: string;
  jsonLd?: Record<string, unknown>[];
}

const BASE = "https://altersvorsorge-rechner.com";
const DEFAULT_OG_IMAGE = `${BASE}/og-image.jpg`;
const SITE_NAME = "altersvorsorge-rechner.com";

const PageHead = ({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
  robots = "index,follow",
  jsonLd,
}: PageHeadProps) => {
  const url = `${BASE}${path}`;
  const ogt = ogTitle || title;
  const ogd = ogDescription || description;
  const img = ogImage
    ? ogImage.startsWith("http")
      ? ogImage
      : `${BASE}${ogImage.startsWith("/") ? "" : "/"}${ogImage}`
    : DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={ogt} />
      <meta property="og:description" content={ogd} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="de_DE" />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={ogt} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogt} />
      <meta name="twitter:description" content={ogd} />
      <meta name="twitter:image" content={img} />
      <meta name="twitter:image:alt" content={ogt} />

      {jsonLd?.map((item, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify({ "@context": "https://schema.org", ...item })}
        </script>
      ))}
    </Helmet>
  );
};

export default PageHead;
