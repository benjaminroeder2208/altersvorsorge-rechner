import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import CalculatorPreview from "@/components/landing/CalculatorPreview";
import ExplainerBlocks from "@/components/landing/ExplainerBlocks";
import FaqSection from "@/components/landing/FaqSection";
import FooterSection from "@/components/landing/FooterSection";

const Index = () => (
  <>
    <Navbar />
    <main>
      <HeroSection />
      <CalculatorPreview />
      <ExplainerBlocks />
      <FaqSection />
      <FooterSection />
    </main>
  </>
);

export default Index;
