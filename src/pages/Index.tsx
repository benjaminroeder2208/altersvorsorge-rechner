import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import WasIstSection from "@/components/landing/WasIstSection";
import FoerderungSection from "@/components/landing/FoerderungSection";
import ModellSection from "@/components/landing/ModellSection";
import ZielgruppeSection from "@/components/landing/ZielgruppeSection";
import CalculatorPreview from "@/components/landing/CalculatorPreview";
import FaqSection from "@/components/landing/FaqSection";
import FooterSection from "@/components/landing/FooterSection";

const Index = () => (
  <>
    <Navbar />
    <main>
      <HeroSection />
      <WasIstSection />
      <FoerderungSection />
      <ModellSection />
      <ZielgruppeSection />
      <CalculatorPreview />
      <FaqSection />
      <FooterSection />
    </main>
  </>
);

export default Index;