import ContentPageLayout from "@/components/landing/ContentPageLayout";
import PageHead from "@/components/seo/PageHead";

const BASE = "https://altersvorsorge-rechner.com";
const PATH = "/blog/riester-kuendigen";

const BlogRiesterKuendigen = () => (
  <>
    <PageHead
      title="Riester kündigen: Wann es sich lohnt und was du wirklich verlierst — altersvorsorge-rechner.com"
      description="Kündigen klingt verlockend — kostet aber fast immer mehr als es bringt. Wir zeigen die vier Alternativen und wann eine Kündigung trotzdem sinnvoll ist."
      canonical={`${BASE}${PATH}`}
    />
    <ContentPageLayout
      title="Riester kündigen: Wann es sich lohnt und was du wirklich verlierst"
      breadcrumbLabel="Riester kündigen"
    >
      <p className="text-muted-foreground">Dieser Artikel wird in Kürze veröffentlicht.</p>
    </ContentPageLayout>
  </>
);

export default BlogRiesterKuendigen;
