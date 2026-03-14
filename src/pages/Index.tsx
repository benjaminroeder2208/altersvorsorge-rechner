import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import RealitySection from "@/components/landing/RealitySection";
import ProblemSection from "@/components/landing/ProblemSection";
import ReformSection from "@/components/landing/ReformSection";
import BigIdeaSection from "@/components/landing/BigIdeaSection";
import StandardProductSection from "@/components/landing/StandardProductSection";
import StateSupportSection from "@/components/landing/StateSupportSection";
import FlexiblePayoutSection from "@/components/landing/FlexiblePayoutSection";
import CalculatorPreview from "@/components/landing/CalculatorPreview";
import TransparencySection from "@/components/landing/TransparencySection";
import FaqSection from "@/components/landing/FaqSection";
import ClosingSection from "@/components/landing/ClosingSection";
import FooterSection from "@/components/landing/FooterSection";

const Index = () => (
  <>
    <Navbar />
    <main>
      <HeroSection />
      <RealitySection />
      <ProblemSection />
      <ReformSection />
      <BigIdeaSection />
      <StandardProductSection />
      <StateSupportSection />
      <FlexiblePayoutSection />
      <CalculatorPreview />
      <TransparencySection />
      <FaqSection />
      <ClosingSection />
      <FooterSection />
    </main>
  </>
);

export default Index;