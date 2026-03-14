import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/altersvorsorgedepot-rechner" replace />} />
          <Route path="/altersvorsorgedepot-rechner" element={<RechnerPage />} />
          <Route path="/altersvorsorgedepot" element={<HubPage />} />
          <Route path="/altersvorsorgedepot-foerderung" element={<FoerderungPage />} />
          <Route path="/altersvorsorgedepot-auszahlung" element={<AuszahlungPage />} />
          <Route path="/altersvorsorgedepot-gesetz" element={<GesetzPage />} />
          <Route path="/altersvorsorgedepot-vs-riester" element={<VsRiesterPage />} />
          <Route path="/altersvorsorgedepot-vs-etf-sparplan" element={<VsEtfPage />} />
          {/* legacy redirects */}
          <Route path="/altersvorsorgedepot-gesetzesentwurf" element={<Navigate to="/altersvorsorgedepot-gesetz" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
