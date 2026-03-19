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

const articles = [
  {
    slug: "/blog/altersvorsorgedepot-vs-riester",
    title: "Altersvorsorgedepot vs. Riester: Die wichtigsten Unterschiede",
    description:
      "Riester war die Hoffnung — das Altersvorsorgedepot ist der Neustart. Wir zeigen die wichtigsten Unterschiede, was mit bestehenden Riester-Verträgen passiert und für wen sich was lohnt.",
    readingTime: "8 Min.",
    tag: "Vergleich",
  },
  {
    slug: "/blog/rentenlucke-mit-30-40-50",
    title: "Rentenlücke mit 30, 40 oder 50: Was du jetzt noch tun kannst",
    description:
      "Zu spät für die Altersvorsorge? Drei konkrete Szenarien mit echten Zahlen zeigen, was mit 30, 40 und 50 Jahren noch möglich ist — und wie das Altersvorsorgedepot ab 2027 hilft.",
    readingTime: "8 Min.",
    tag: "Ratgeber",
  },
  {
    slug: "/blog/altersvorsorgedepot-2027",
    title: "Altersvorsorgedepot 2027: Alles, was du wissen musst",
    description:
      "Das Altersvorsorgedepot kommt 2027 und löst Riester ab. Wir erklären, wie die Förderung funktioniert, was du bekommst — und für wen es sich wirklich lohnt.",
    readingTime: "8 Min.",
    tag: "Ratgeber",
  },
  {
    slug: "/blog/altersvorsorgedepot-vs-etf-sparplan",
    title: "Altersvorsorgedepot oder ETF-Sparplan? So triffst du die richtige Entscheidung",
    description:
      "Beide investieren in ETFs — aber nur einer wird staatlich gefördert. Wir zeigen den konkreten Unterschied in Zahlen und helfen dir, die richtige Wahl zu treffen.",
    readingTime: "7 Min.",
    tag: "Vergleich",
  },
  {
    slug: "/blog/rentenlucke-was-sie-ist-und-was-du-tun-kannst",
    title: "Rentenlücke: Was sie ist, wie groß sie wirklich ist — und was du tun kannst",
    description:
      "Die gesetzliche Rente reicht für die meisten nicht. Wir zeigen konkret, wie groß die Rentenlücke ist — und wie du sie mit dem Altersvorsorgedepot ab 2027 schließen kannst.",
    readingTime: "8 Min.",
    tag: "Ratgeber",
  },
];

const jsonLd = [
  {
    "@type": "CollectionPage",
    name: "Blog – altersvorsorge-rechner.com",
    url: "https://altersvorsorge-rechner.com/blog",
    description: "Ratgeber und Analysen rund um das Altersvorsorgedepot, private Altersvorsorge und die Rentenreform 2027.",
    isPartOf: { "@type": "WebSite", url: "https://altersvorsorge-rechner.com/" },
  },
];

const BlogIndexPage = () => (
  <>
    <PageHead
      title="Blog – Altersvorsorgedepot Ratgeber & Analysen"
      description="Ratgeber und Analysen rund um das Altersvorsorgedepot, private Altersvorsorge und die Rentenreform 2027."
      path="/blog"
      jsonLd={jsonLd}
    />
    <Navbar />

    <main className="pt-24 pb-20">
      <div className="container max-w-2xl mx-auto px-6">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Blog</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

        <AnimatedSection>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3" style={{ letterSpacing: "-0.02em" }}>
            Blog
          </h1>
          <p className="text-muted-foreground text-base mb-12">
            Ratgeber und Analysen rund um das Altersvorsorgedepot und die Rentenreform.
          </p>
        </AnimatedSection>

        <div className="space-y-4">
          {articles.map((article) => (
            <Link
              key={article.slug}
              to={article.slug}
              className="group block p-6 rounded-2xl bg-secondary hover:bg-secondary/70 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  {article.tag}
                </span>
                <span className="text-xs text-muted-foreground">{article.readingTime}</span>
              </div>
              <h2 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                {article.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {article.description}
              </p>
              <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                Weiterlesen <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>

    <FooterSection />
  </>
);

export default BlogIndexPage;
