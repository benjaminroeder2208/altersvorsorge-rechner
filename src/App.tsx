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
import BlogAltersvorsorge30Jahre from "./pages/BlogAltersvorsorge30Jahre";
import BlogRentenluckeBerechnen from "./pages/BlogRentenluckeBerechnen";
import BlogDepotVsEtf from "./pages/BlogDepotVsEtf";
import BlogEtfSparplanAnfaenger from "./pages/BlogEtfSparplanAnfaenger";
import BlogWieVielRenteReichtAus from "./pages/BlogWieVielRenteReichtAus";
import BlogSteuernSparenAltersvorsorge from "./pages/BlogSteuernSparenAltersvorsorge";
import BlogAltersvorsorgeAb40 from "./pages/BlogAltersvorsorgeAb40";
import BlogAltersvorsorge50Jahre from "./pages/BlogAltersvorsorge50Jahre";
import BlogWieVielGeldAlter from "./pages/BlogWieVielGeldAlter";
import BlogAltersvorsorgeFragen from "./pages/BlogAltersvorsorgeFragen";
import BlogAltersvorsorgeFreiberufler from "./pages/BlogAltersvorsorgeFreiberufler";
import BlogAltersvorsorgeBerechnen from "./pages/BlogAltersvorsorgeBerechnen";
import BlogRiesterKuendigen from "./pages/BlogRiesterKuendigen";
import BlogEtfSteuern from "./pages/BlogEtfSteuern";
import BlogRentenpunkteKaufen from "./pages/BlogRentenpunkteKaufen";
import BlogRuerupRente from "./pages/BlogRuerupRente";
import BlogPortfolio from "./pages/BlogPortfolio";
import BlogWasDarfInsDepot from "./pages/BlogWasDarfInsDepot";
import BlogKoalitionseinigung from "./pages/BlogKoalitionseinigung";
import BlogBeschlossen from "./pages/BlogBeschlossen";
import ConfirmPage from "./pages/ConfirmPage";
import EmbedPage from "./pages/EmbedPage";
import EinbettenPage from "./pages/EinbettenPage";
import ReichtMeineRentePage from "./pages/ReichtMeineRentePage";
import RentenCheckPage from "./pages/RentenCheckPage";
import RentenCheckResultPage from "./pages/RentenCheckResultPage";
import NewsletterLandingPage from "./pages/NewsletterLandingPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminNewsletterListPage from "./pages/admin/AdminNewsletterListPage";
import AdminNewsletterEditPage from "./pages/admin/AdminNewsletterEditPage";
import AdminLeadsPage from "./pages/admin/AdminLeadsPage";
import AdminNewsletterSubscribersPage from "./pages/admin/AdminNewsletterSubscribersPage";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
import ScrollToHash from "./components/ScrollToHash";
import ChatWidgetWrapper from "./components/chat/ChatWidgetWrapper";
import UpdateBanner from "@/components/landing/UpdateBanner";

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
            {/* TODO: Nach Beschluss am 26.03.2026 entfernen und foerderung.ts aktualisieren */}
            <UpdateBanner />
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
            <Route path="/blog/altersvorsorge-30-jahre" element={<BlogAltersvorsorge30Jahre />} />
            <Route path="/blog/rentenlucke-berechnen" element={<BlogRentenluckeBerechnen />} />
            <Route path="/blog/etf-sparplan-anfaenger" element={<BlogEtfSparplanAnfaenger />} />
            <Route path="/blog/altersvorsorge-fuer-frauen" element={<BlogAltersvorsorgeFragen />} />
            <Route path="/blog/altersvorsorge-fuer-freiberufler" element={<BlogAltersvorsorgeFreiberufler />} />
            <Route path="/blog/altersvorsorge-berechnen" element={<BlogAltersvorsorgeBerechnen />} />
            <Route path="/blog/altersvorsorge-ab-40" element={<BlogAltersvorsorgeAb40 />} />
            <Route path="/blog/altersvorsorge-50-jahre" element={<BlogAltersvorsorge50Jahre />} />
            <Route path="/blog/wie-viel-geld-braucht-man-im-alter" element={<BlogWieVielGeldAlter />} />
            <Route path="/blog/wie-viel-rente-reicht-aus" element={<BlogWieVielRenteReichtAus />} />
            <Route path="/blog/steuern-sparen-altersvorsorge" element={<BlogSteuernSparenAltersvorsorge />} />
            <Route path="/blog/altersvorsorgedepot-vs-etf-sparplan" element={<BlogDepotVsEtf />} />
            <Route path="/blog/altersvorsorge-berufseinsteiger" element={<BlogBerufseinsteiger />} />
            <Route path="/blog/riester-kuendigen" element={<BlogRiesterKuendigen />} />
            <Route path="/blog/etf-sparplan-steuern" element={<BlogEtfSteuern />} />
            <Route path="/blog/rentenpunkte-kaufen" element={<BlogRentenpunkteKaufen />} />
            <Route path="/blog/ruerup-rente" element={<BlogRuerupRente />} />
            <Route path="/blog/altersvorsorge-portfolio" element={<BlogPortfolio />} />
            <Route path="/blog/was-darf-ins-altersvorsorgedepot" element={<BlogWasDarfInsDepot />} />
            <Route path="/blog/altersvorsorgedepot-koalitionseinigung" element={<BlogKoalitionseinigung />} />
            <Route path="/blog/altersvorsorgedepot-beschlossen" element={<BlogBeschlossen />} />
            <Route path="/unsubscribe" element={<UnsubscribePage />} />
            <Route path="/confirm" element={<ConfirmPage />} />
            <Route path="/embed" element={<EmbedPage />} />
            <Route path="/einbetten" element={<EinbettenPage />} />
            <Route path="/reicht-meine-rente" element={<ReichtMeineRentePage />} />
            <Route path="/renten-check" element={<RentenCheckPage />} />
            <Route path="/renten-check/result" element={<RentenCheckResultPage />} />
            <Route path="/newsletter" element={<NewsletterLandingPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin/newsletter"
              element={
                <ProtectedAdminRoute>
                  <AdminNewsletterListPage />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/newsletter/new"
              element={
                <ProtectedAdminRoute>
                  <AdminNewsletterEditPage />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/newsletter/:id"
              element={
                <ProtectedAdminRoute>
                  <AdminNewsletterEditPage />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/leads"
              element={
                <ProtectedAdminRoute>
                  <AdminLeadsPage />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/subscribers"
              element={
                <ProtectedAdminRoute>
                  <AdminNewsletterSubscribersPage />
                </ProtectedAdminRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
