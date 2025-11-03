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
    // Listen for service worker update messages
    if ('serviceWorker' in navigator) {
      const handleServiceWorkerMessage = (event: any) => {
        if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
          console.log('[App] Update available, version:', event.data.version);

          // Show notification and auto-reload after 5 seconds
          toast({
            title: "App Updated",
            description: "A new version is ready. Reloading in 5 seconds...",
            duration: 5000,
          });

          // Auto-reload after 5 seconds
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        }
      };

      navigator.serviceWorker.addEventListener('message', handleServiceWorkerMessage);

      return () => {
        navigator.serviceWorker.removeEventListener('message', handleServiceWorkerMessage);
      };
    }
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
