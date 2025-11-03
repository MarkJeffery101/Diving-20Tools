import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Tables from "./pages/Tables";
import TableDetail from "./pages/TableDetail";
import TableSelection from "./pages/TableSelection";
import TableUse from "./pages/TableUse";
import SupportingInfo from "./pages/SupportingInfo";
import Tools from "./pages/Tools";
import Share from "./pages/Share";
import TreatmentProtocols from "./pages/TreatmentProtocols";
import EmergencyProcedures from "./pages/EmergencyProcedures";

const queryClient = new QueryClient();

function UpdateChecker() {
  const { toast } = useToast();

  useEffect(() => {
    let lastVersion: string | null = null;

    const checkForUpdates = async () => {
      try {
        const response = await fetch('/manifest.json?bust=' + Date.now(), {
          headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' }
        });
        const manifest = await response.json();
        const currentVersion = manifest.version || new Date().getTime().toString();

        if (lastVersion === null) {
          lastVersion = currentVersion;
        } else if (lastVersion !== currentVersion) {
          // New version detected
          toast({
            title: "App Updated",
            description: "A new version is available. Please refresh your browser (F5 or Ctrl+R).",
            duration: 0,
          });
          lastVersion = currentVersion;
        }
      } catch (error) {
        console.debug('Update check failed:', error);
      }
    };

    // Check immediately
    checkForUpdates();

    // Check every 30 seconds
    const interval = setInterval(checkForUpdates, 30000);
    return () => clearInterval(interval);
  }, [toast]);

  return null;
}

function AppContent() {
  return (
    <>
      <UpdateChecker />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/tables/:id" element={<TableDetail />} />
          <Route path="/table-selection" element={<TableSelection />} />
          <Route path="/table-use" element={<TableUse />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/share" element={<Share />} />
          <Route path="/supporting-info" element={<SupportingInfo />} />
          <Route
            path="/treatment-protocols"
            element={<TreatmentProtocols />}
          />
          <Route
            path="/emergency-procedures"
            element={<EmergencyProcedures />}
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
