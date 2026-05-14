import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoindexRedirect from "./components/seo/NoindexRedirect";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToHash from "./components/ScrollToHash";
import ChatWidgetWrapper from "./components/chat/ChatWidgetWrapper";
import UpdateBanner from "@/components/landing/UpdateBanner";
// Lazy: only loaded when an /admin/* route is visited
const ProtectedAdminRoute = lazy(() => import("./components/admin/ProtectedAdminRoute"));

// Eager: landing page (LCP-critical)
import RechnerPage from "./pages/RechnerPage";

// Lazy-load all other routes — keeps initial bundle small
const HubPage = lazy(() => import("./pages/HubPage"));
const FoerderungPage = lazy(() => import("./pages/FoerderungPage"));
const AuszahlungPage = lazy(() => import("./pages/AuszahlungPage"));
const GesetzPage = lazy(() => import("./pages/GesetzPage"));
const VsRiesterPage = lazy(() => import("./pages/VsRiesterPage"));
const VsEtfPage = lazy(() => import("./pages/VsEtfPage"));
const ImpressumPage = lazy(() => import("./pages/ImpressumPage"));
const DatenschutzPage = lazy(() => import("./pages/DatenschutzPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const RentenlueckenRechnerPage = lazy(() => import("./pages/RentenlueckenRechnerPage"));
const UnsubscribePage = lazy(() => import("./pages/UnsubscribePage"));
const ConfirmPage = lazy(() => import("./pages/ConfirmPage"));
const EmbedPage = lazy(() => import("./pages/EmbedPage"));
const EinbettenPage = lazy(() => import("./pages/EinbettenPage"));
const ReichtMeineRentePage = lazy(() => import("./pages/ReichtMeineRentePage"));
const RentenCheckPage = lazy(() => import("./pages/RentenCheckPage"));
const RentenCheckResultPage = lazy(() => import("./pages/RentenCheckResultPage"));
const NewsletterLandingPage = lazy(() => import("./pages/NewsletterLandingPage"));

// Blog routes
const BlogIndexPage = lazy(() => import("./pages/BlogIndexPage"));
const BlogAltersvorsorgedepot2027 = lazy(() => import("./pages/BlogAltersvorsorgedepot2027"));
const BlogVsEtf = lazy(() => import("./pages/BlogVsEtf"));
const BlogRentenluecke = lazy(() => import("./pages/BlogRentenluecke"));
const BlogRentenlueckeMit30_40_50 = lazy(() => import("./pages/BlogRentenlueckeMit30_40_50"));
const BlogVsRiester = lazy(() => import("./pages/BlogVsRiester"));
const BlogZinseszins = lazy(() => import("./pages/BlogZinseszins"));
const BlogBav = lazy(() => import("./pages/BlogBav"));
const BlogSelbststaendige = lazy(() => import("./pages/BlogSelbststaendige"));
const BlogBerufseinsteiger = lazy(() => import("./pages/BlogBerufseinsteiger"));
const BlogAltersvorsorge30Jahre = lazy(() => import("./pages/BlogAltersvorsorge30Jahre"));
const BlogRentenluckeBerechnen = lazy(() => import("./pages/BlogRentenluckeBerechnen"));
const BlogDepotVsEtf = lazy(() => import("./pages/BlogDepotVsEtf"));
const BlogEtfSparplanAnfaenger = lazy(() => import("./pages/BlogEtfSparplanAnfaenger"));
const BlogWieVielRenteReichtAus = lazy(() => import("./pages/BlogWieVielRenteReichtAus"));
const BlogSteuernSparenAltersvorsorge = lazy(() => import("./pages/BlogSteuernSparenAltersvorsorge"));
const BlogAltersvorsorgeAb40 = lazy(() => import("./pages/BlogAltersvorsorgeAb40"));
const BlogAltersvorsorge50Jahre = lazy(() => import("./pages/BlogAltersvorsorge50Jahre"));
const BlogWieVielGeldAlter = lazy(() => import("./pages/BlogWieVielGeldAlter"));
const BlogAltersvorsorgeFragen = lazy(() => import("./pages/BlogAltersvorsorgeFragen"));
const BlogAltersvorsorgeFreiberufler = lazy(() => import("./pages/BlogAltersvorsorgeFreiberufler"));
const BlogAltersvorsorgeBerechnen = lazy(() => import("./pages/BlogAltersvorsorgeBerechnen"));
const BlogRiesterKuendigen = lazy(() => import("./pages/BlogRiesterKuendigen"));
const BlogEtfSteuern = lazy(() => import("./pages/BlogEtfSteuern"));
const BlogRentenpunkteKaufen = lazy(() => import("./pages/BlogRentenpunkteKaufen"));
const BlogRuerupRente = lazy(() => import("./pages/BlogRuerupRente"));
const BlogPortfolio = lazy(() => import("./pages/BlogPortfolio"));
const BlogWasDarfInsDepot = lazy(() => import("./pages/BlogWasDarfInsDepot"));
const BlogKoalitionseinigung = lazy(() => import("./pages/BlogKoalitionseinigung"));
const BlogBeschlossen = lazy(() => import("./pages/BlogBeschlossen"));

// Admin routes
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));
const AdminNewsletterListPage = lazy(() => import("./pages/admin/AdminNewsletterListPage"));
const AdminNewsletterEditPage = lazy(() => import("./pages/admin/AdminNewsletterEditPage"));
const AdminLeadsPage = lazy(() => import("./pages/admin/AdminLeadsPage"));
const AdminNewsletterSubscribersPage = lazy(() => import("./pages/admin/AdminNewsletterSubscribersPage"));

// Internal QA — not linked, noindex
const AnalyticsTestPage = lazy(() => import("./pages/internal/AnalyticsTestPage"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" aria-label="Lädt…" />
  </div>
);

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
          <Suspense fallback={<RouteFallback />}>
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
              <Route path="/altersvorsorgedepot-rechner" element={<NoindexRedirect to="/" />} />
              <Route
                path="/altersvorsorgedepot-gesetzesentwurf"
                element={<NoindexRedirect to="/altersvorsorgedepot-gesetz" />}
              />
              <Route path="/rentenluecken-rechner" element={<RentenlueckenRechnerPage />} />
              <Route path="/blog" element={<BlogIndexPage />} />
              <Route path="/blog/altersvorsorgedepot-2027" element={<BlogAltersvorsorgedepot2027 />} />
              <Route path="/blog/altersvorsorgedepot-vs-etf-sparplan" element={<BlogVsEtf />} />
              <Route
                path="/blog/rentenlucke-was-sie-ist-und-was-du-tun-kannst"
                element={<BlogRentenluecke />}
              />
              <Route path="/blog/rentenlucke-mit-30-40-50" element={<BlogRentenlueckeMit30_40_50 />} />
              <Route path="/blog/altersvorsorgedepot-vs-riester" element={<BlogVsRiester />} />
              <Route path="/blog/zinseszins-frueh-starten" element={<BlogZinseszins />} />
              <Route path="/blog/betriebliche-altersvorsorge" element={<BlogBav />} />
              <Route path="/blog/altersvorsorge-selbststaendige" element={<BlogSelbststaendige />} />
              <Route path="/blog/altersvorsorge-30-jahre" element={<BlogAltersvorsorge30Jahre />} />
              <Route path="/blog/rentenlucke-berechnen" element={<BlogRentenluckeBerechnen />} />
              <Route path="/blog/etf-sparplan-anfaenger" element={<BlogEtfSparplanAnfaenger />} />
              <Route path="/blog/altersvorsorge-fuer-frauen" element={<BlogAltersvorsorgeFragen />} />
              <Route
                path="/blog/altersvorsorge-fuer-freiberufler"
                element={<BlogAltersvorsorgeFreiberufler />}
              />
              <Route path="/blog/altersvorsorge-berechnen" element={<BlogAltersvorsorgeBerechnen />} />
              <Route path="/blog/altersvorsorge-ab-40" element={<BlogAltersvorsorgeAb40 />} />
              <Route path="/blog/altersvorsorge-50-jahre" element={<BlogAltersvorsorge50Jahre />} />
              <Route path="/blog/wie-viel-geld-braucht-man-im-alter" element={<BlogWieVielGeldAlter />} />
              <Route path="/blog/wie-viel-rente-reicht-aus" element={<BlogWieVielRenteReichtAus />} />
              <Route
                path="/blog/steuern-sparen-altersvorsorge"
                element={<BlogSteuernSparenAltersvorsorge />}
              />
              <Route path="/blog/altersvorsorgedepot-vs-etf-sparplan" element={<BlogDepotVsEtf />} />
              <Route path="/blog/altersvorsorge-berufseinsteiger" element={<BlogBerufseinsteiger />} />
              <Route path="/blog/riester-kuendigen" element={<BlogRiesterKuendigen />} />
              <Route path="/blog/etf-sparplan-steuern" element={<BlogEtfSteuern />} />
              <Route path="/blog/rentenpunkte-kaufen" element={<BlogRentenpunkteKaufen />} />
              <Route path="/blog/ruerup-rente" element={<BlogRuerupRente />} />
              <Route path="/blog/altersvorsorge-portfolio" element={<BlogPortfolio />} />
              <Route path="/blog/was-darf-ins-altersvorsorgedepot" element={<BlogWasDarfInsDepot />} />
              <Route
                path="/blog/altersvorsorgedepot-koalitionseinigung"
                element={<BlogKoalitionseinigung />}
              />
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
              <Route path="/internal/analytics-test" element={<AnalyticsTestPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
