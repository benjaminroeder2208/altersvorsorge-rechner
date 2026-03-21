import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import RechnerPage from "./pages/RechnerPage";
import HubPage from "./pages/HubPage";
import FoerderungPage from "./pages/FoerderungPage";
import AuszahlungPage from "./pages/AuszahlungPage";
import GesetzPage from "./pages/GesetzPage";
import VsRiesterPage from "./pages/VsRiesterPage";
import VsEtfPage from "./pages/VsEtfPage";
import ImpressumPage from "./pages/ImpressumPage";
import DatenschutzPage from "./pages/DatenschutzPage";
import NotFound from "./pages/NotFound";
import BlogAltersvorsorgedepot2027 from "./pages/BlogAltersvorsorgedepot2027";
import BlogVsEtf from "./pages/BlogVsEtf";
import BlogRentenluecke from "./pages/BlogRentenluecke";
import BlogRentenlueckeMit30_40_50 from "./pages/BlogRentenlueckeMit30_40_50";
import BlogVsRiester from "./pages/BlogVsRiester";
import BlogIndexPage from "./pages/BlogIndexPage";
import BlogZinseszins from "./pages/BlogZinseszins";
import BlogBav from "./pages/BlogBav";
import BlogSelbststaendige from "./pages/BlogSelbststaendige";
import RentenlueckenRechnerPage from "./pages/RentenlueckenRechnerPage";
import UnsubscribePage from "./pages/UnsubscribePage";
import BlogBerufseinsteiger from "./pages/BlogBerufseinsteiger";
import BlogRiesterKuendigen from "./pages/BlogRiesterKuendigen";
import BlogEtfSteuern from "./pages/BlogEtfSteuern";
import BlogRentenpunkteKaufen from "./pages/BlogRentenpunkteKaufen";
import BlogRuerupRente from "./pages/BlogRuerupRente";
import ScrollToHash from "./components/ScrollToHash";
import ChatWidgetWrapper from "./components/chat/ChatWidgetWrapper";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
          <BrowserRouter>
            <ScrollToHash />
            <ChatWidgetWrapper />
          <Routes>
            <Route path="/" element={<RechnerPage />} />
            <Route path="/altersvorsorgedepot" element={<HubPage />} />
            <Route path="/altersvorsorgedepot-foerderung" element={<FoerderungPage />} />
            <Route path="/altersvorsorgedepot-auszahlung" element={<AuszahlungPage />} />
            <Route path="/altersvorsorgedepot-gesetz" element={<GesetzPage />} />
            <Route path="/altersvorsorgedepot-vs-riester" element={<VsRiesterPage />} />
            <Route path="/altersvorsorgedepot-vs-etf-sparplan" element={<VsEtfPage />} />
            <Route path="/impressum" element={<ImpressumPage />} />
            <Route path="/datenschutz" element={<DatenschutzPage />} />
            <Route path="/altersvorsorgedepot-rechner" element={<Navigate to="/" replace />} />
            <Route path="/altersvorsorgedepot-gesetzesentwurf" element={<Navigate to="/altersvorsorgedepot-gesetz" replace />} />
            <Route path="/rentenluecken-rechner" element={<RentenlueckenRechnerPage />} />
            <Route path="/blog" element={<BlogIndexPage />} />
            <Route path="/blog/altersvorsorgedepot-2027" element={<BlogAltersvorsorgedepot2027 />} />
            <Route path="/blog/altersvorsorgedepot-vs-etf-sparplan" element={<BlogVsEtf />} />
            <Route path="/blog/rentenlucke-was-sie-ist-und-was-du-tun-kannst" element={<BlogRentenluecke />} />
            <Route path="/blog/rentenlucke-mit-30-40-50" element={<BlogRentenlueckeMit30_40_50 />} />
            <Route path="/blog/altersvorsorgedepot-vs-riester" element={<BlogVsRiester />} />
            <Route path="/blog/zinseszins-frueh-starten" element={<BlogZinseszins />} />
            <Route path="/blog/betriebliche-altersvorsorge" element={<BlogBav />} />
            <Route path="/blog/altersvorsorge-selbststaendige" element={<BlogSelbststaendige />} />
            <Route path="/blog/altersvorsorge-berufseinsteiger" element={<BlogBerufseinsteiger />} />
            <Route path="/blog/riester-kuendigen" element={<BlogRiesterKuendigen />} />
            <Route path="/blog/etf-sparplan-steuern" element={<BlogEtfSteuern />} />
            <Route path="/blog/rentenpunkte-kaufen" element={<BlogRentenpunkteKaufen />} />
            <Route path="/blog/ruerup-rente" element={<BlogRuerupRente />} />
            <Route path="/unsubscribe" element={<UnsubscribePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
