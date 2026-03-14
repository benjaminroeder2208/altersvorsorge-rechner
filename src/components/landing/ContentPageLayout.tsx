import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import FooterSection from "@/components/landing/FooterSection";
import AnimatedSection from "@/components/landing/AnimatedSection";
import PageHead from "@/components/seo/PageHead";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface RelatedLink {
  to: string;
  label: string;
}

interface Props {
  title: string;
  breadcrumbLabel: string;
  path: string;
  description: string;
  children: ReactNode;
  relatedLinks?: RelatedLink[];
}

const BASE = "https://altersvorsorge-rechner.com";

const ContentPageLayout = ({ title, breadcrumbLabel, path, description, children, relatedLinks }: Props) => {
  const url = `${BASE}${path}`;

  const jsonLd = [
    {
      "@type": "WebPage",
      name: title,
      url,
      description,
      isPartOf: { "@type": "WebSite", url: `${BASE}/` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${BASE}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Altersvorsorgedepot",
          item: `${BASE}/altersvorsorgedepot`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: breadcrumbLabel,
          item: url,
        },
      ],
    },
  ];

  return (
    <>
      <PageHead title={title} description={description} path={path} jsonLd={jsonLd} />
      <Navbar />
      <main className="pt-24 pb-20">
        <article className="container max-w-2xl mx-auto px-6">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/altersvorsorgedepot">Altersvorsorgedepot</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{breadcrumbLabel}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <AnimatedSection>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6" style={{ letterSpacing: "-0.02em" }}>
              {title}
            </h1>
          </AnimatedSection>

          <div className="prose-custom space-y-8">{children}</div>

          <div className="mt-16 p-6 bg-secondary rounded-2xl text-center">
            <p className="font-semibold mb-2">Jetzt berechnen</p>
            <p className="text-sm text-muted-foreground mb-4">
              Mit unserem Altersvorsorgedepot Rechner können Sie berechnen, wie sich monatliche Beiträge langfristig entwickeln.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Altersvorsorgedepot Rechner starten
            </Link>
          </div>

          {relatedLinks && relatedLinks.length > 0 && (
            <div className="mt-12">
              <p className="text-sm font-semibold mb-4">Weiterführende Themen</p>
              <div className="space-y-2">
                {relatedLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/70 transition-colors text-sm"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          <p className="mt-12 text-xs text-muted-foreground/60 leading-relaxed">
            Alle Angaben basieren auf dem aktuellen Gesetzentwurf. Änderungen im Gesetzgebungsverfahren sind möglich.
            Diese Seite stellt keine Anlage-, Steuer- oder Rechtsberatung dar.
          </p>
        </article>
      </main>
      <FooterSection />
    </>
  );
};

export default ContentPageLayout;
