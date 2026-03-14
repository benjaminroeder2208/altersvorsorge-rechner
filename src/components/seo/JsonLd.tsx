import { useEffect } from "react";

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

const JsonLd = ({ data }: JsonLdProps) => {
  const items = Array.isArray(data) ? data : [data];

  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...item }) }}
        />
      ))}
    </>
  );
};

export default JsonLd;
