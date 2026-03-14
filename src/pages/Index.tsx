import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import ApproachSection from "@/components/landing/ApproachSection";
import CalculatorPreview from "@/components/landing/CalculatorPreview";
import ScenarioSection from "@/components/landing/ScenarioSection";
import TrustSection from "@/components/landing/TrustSection";
import WaitlistSection from "@/components/landing/WaitlistSection";
import FaqSection from "@/components/landing/FaqSection";
import FooterSection from "@/components/landing/FooterSection";

const Index = () => (
  <>
    <Navbar />
    <main>
      <HeroSection />
      <ProblemSection />
      <ApproachSection />
      <CalculatorPreview />
      <ScenarioSection />
      <TrustSection />
      <WaitlistSection />
      <FaqSection />
      <FooterSection />
    </main>
  </>
);

export default Index;
