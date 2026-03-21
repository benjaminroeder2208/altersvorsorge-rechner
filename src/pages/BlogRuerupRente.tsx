import ContentPageLayout from "@/components/landing/ContentPageLayout";
import PageHead from "@/components/seo/PageHead";

const BASE = "https://altersvorsorge-rechner.com";
const PATH = "/blog/ruerup-rente";

const BlogRuerupRente = () => (
  <>
    <PageHead
      title="Rürup Rente: Für wen sie sich wirklich lohnt — altersvorsorge-rechner.com"
      description="Für Selbstständige und Gutverdiener das stärkste Steuersparinstrument. Für alle anderen oft eine teure Falle. Der Unterschied liegt im Einkommen."
      canonical={`${BASE}${PATH}`}
    />
    <ContentPageLayout
      title="Rürup Rente: Für wen sie sich wirklich lohnt — und für wen nicht"
      breadcrumbLabel="Rürup Rente"
    >
      <p className="text-muted-foreground">Dieser Artikel wird in Kürze veröffentlicht.</p>
    </ContentPageLayout>
  </>
);

export default BlogRuerupRente;
