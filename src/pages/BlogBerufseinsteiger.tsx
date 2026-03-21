import ContentPageLayout from "@/components/landing/ContentPageLayout";
import PageHead from "@/components/seo/PageHead";

const BASE = "https://altersvorsorge-rechner.com";
const PATH = "/blog/altersvorsorge-berufseinsteiger";

const BlogBerufseinsteiger = () => (
  <>
    <PageHead
      title="Altersvorsorge mit 20: Warum jetzt der beste Zeitpunkt ist — altersvorsorge-rechner.com"
      description="Mit 20 fühlt sich die Rente abstrakt an. Aber kein Berufstätiger hat mehr Zeit als du gerade — und Zeit ist das einzige was du später nicht kaufen kannst."
      canonical={`${BASE}${PATH}`}
    />
    <ContentPageLayout
      title="Altersvorsorge mit 20: Warum jetzt der beste Zeitpunkt ist — und wie du startest"
      breadcrumbLabel="Altersvorsorge mit 20"
    >
      <p className="text-muted-foreground">Dieser Artikel wird in Kürze veröffentlicht.</p>
    </ContentPageLayout>
  </>
);

export default BlogBerufseinsteiger;
