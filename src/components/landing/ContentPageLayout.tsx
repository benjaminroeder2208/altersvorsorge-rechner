import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import FooterSection from "@/components/landing/FooterSection";
import AnimatedSection from "@/components/landing/AnimatedSection";

interface RelatedLink {
  to: string;
  label: string;
}

interface Props {
  title: string;
  children: ReactNode;
  relatedLinks?: RelatedLink[];
}

const ContentPageLayout = ({ title, children, relatedLinks }: Props) => (
  <>
    <Navbar />
    <main className="pt-24 pb-20">
      <article className="container max-w-2xl mx-auto px-6">
        <Link
          to="/altersvorsorgedepot-rechner"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zum Rechner
        </Link>

        <AnimatedSection>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6" style={{ letterSpacing: "-0.02em" }}>
            {title}
          </h1>
        </AnimatedSection>

        <div className="prose-custom space-y-8">
          {children}
        </div>

        {/* Calculator CTA */}
        <div className="mt-16 p-6 bg-secondary rounded-2xl text-center">
          <p className="font-semibold mb-2">Jetzt berechnen</p>
          <p className="text-sm text-muted-foreground mb-4">
            Simulieren Sie Ihr mögliches Altersvorsorgedepot mit dem Rechner.
          </p>
          <Link
            to="/altersvorsorgedepot-rechner"
            className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Altersvorsorgedepot Rechner starten
          </Link>
        </div>

        {/* Related links */}
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

export default ContentPageLayout;
