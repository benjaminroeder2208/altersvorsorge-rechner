import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import FooterSection from "@/components/landing/FooterSection";
import AnimatedSection from "@/components/landing/AnimatedSection";
import PageHead from "@/components/seo/PageHead";

const articles = [
  {
    slug: "/blog/altersvorsorgedepot-2027",
    title: "Altersvorsorgedepot 2027: Alles, was du wissen musst",
    description:
      "Das Altersvorsorgedepot kommt 2027 und löst Riester ab. Wir erklären, wie die Förderung funktioniert, was du bekommst — und für wen es sich wirklich lohnt.",
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
