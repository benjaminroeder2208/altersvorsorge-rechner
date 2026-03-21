import ContentPageLayout from "@/components/landing/ContentPageLayout";
import PageHead from "@/components/seo/PageHead";

const BASE = "https://altersvorsorge-rechner.com";
const PATH = "/blog/rentenpunkte-kaufen";

const BlogRentenpunkteKaufen = () => (
  <>
    <PageHead
      title="Rentenpunkte kaufen: Lohnt es sich wirklich? — altersvorsorge-rechner.com"
      description="Wer freiwillig in die gesetzliche Rente einzahlt, kann seine Rente erhöhen. Aber die Rendite-Rechnung ist ernüchternd — wir zeigen die Zahlen ehrlich."
      canonical={`${BASE}${PATH}`}
    />
    <ContentPageLayout
      title="Rentenpunkte kaufen: Lohnt es sich wirklich?"
      breadcrumbLabel="Rentenpunkte kaufen"
    >
      <p className="text-muted-foreground">Dieser Artikel wird in Kürze veröffentlicht.</p>
    </ContentPageLayout>
  </>
);

export default BlogRentenpunkteKaufen;
