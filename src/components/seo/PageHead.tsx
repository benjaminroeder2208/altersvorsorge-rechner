import { Helmet } from "react-helmet-async";

interface PageHeadProps {
  title: string;
  description: string;
  path: string;
  jsonLd?: Record<string, unknown>[];
}

const BASE = "https://altersvorsorge-rechner.com";

const PageHead = ({ title, description, path, jsonLd }: PageHeadProps) => {
  const url = `${BASE}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {jsonLd?.map((item, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify({ "@context": "https://schema.org", ...item })}
        </script>
      ))}
    </Helmet>
  );
};

export default PageHead;
