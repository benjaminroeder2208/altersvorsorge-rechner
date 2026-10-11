import { Link } from "react-router-dom";
import AnimatedSection from "@/components/landing/AnimatedSection";
import ChapterHeading from "@/components/landing/ChapterHeading";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface CalculatorPageHeaderProps {
  title: string;
  breadcrumb: string;
  description: string;
}

export default function CalculatorPageHeader({ title, breadcrumb, description }: CalculatorPageHeaderProps) {
  return <header className="mb-12 border-b border-border pb-10 md:mb-16 md:pb-14">
    <Breadcrumb className="mb-14">
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>{breadcrumb}</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <AnimatedSection>
      <ChapterHeading number="01" label="Kostenlos & unverbindlich">
        <h1 className="max-w-4xl break-words font-display text-4xl font-bold leading-[1.12] md:text-5xl lg:text-6xl">{title}</h1>
      </ChapterHeading>
      <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p>
    </AnimatedSection>
  </header>;
}