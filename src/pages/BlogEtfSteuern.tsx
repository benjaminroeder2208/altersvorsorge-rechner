import ContentPageLayout from "@/components/landing/ContentPageLayout";
import PageHead from "@/components/seo/PageHead";

const BASE = "https://altersvorsorge-rechner.com";
const PATH = "/blog/etf-sparplan-steuern";

const BlogEtfSteuern = () => (
  <>
    <PageHead
      title="ETF Sparplan Steuern: Was du wirklich zahlen musst — altersvorsorge-rechner.com"
      description="Steuern können einen erheblichen Teil der ETF-Rendite auffressen — wenn man sie nicht versteht. Wir erklären Abgeltungsteuer, Vorabpauschale und den Steuerstundungseffekt."
      canonical={`${BASE}${PATH}`}
    />
    <ContentPageLayout
      title="ETF Sparplan Steuern: Was du wirklich zahlen musst — und wie du es optimierst"
      breadcrumbLabel="ETF Sparplan Steuern"
    >
      <p className="text-muted-foreground">Dieser Artikel wird in Kürze veröffentlicht.</p>
    </ContentPageLayout>
  </>
);

export default BlogEtfSteuern;
