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
    let currentVersion: string | null = null;

    // Load initial version from manifest
    const loadInitialVersion = async () => {
      try {
        const response = await fetch("/manifest.json?v=" + Date.now());
        const manifest = await response.json();
        currentVersion = manifest.version;
        console.log("[App] Initial version:", currentVersion);
      } catch (error) {
        console.error("[App] Failed to load manifest:", error);
      }
    };

    // Check for updates periodically
    const checkForUpdate = async () => {
      try {
        const response = await fetch("/manifest.json?v=" + Date.now());
        const manifest = await response.json();
        const newVersion = manifest.version;

        if (currentVersion && currentVersion !== newVersion) {
          console.log("[App] Update detected:", currentVersion, "->", newVersion);

          toast({
            title: "App Updated",
            description: "A new version is ready. Reloading in 5 seconds...",
            duration: 5000,
          });

          setTimeout(() => {
            window.location.reload();
          }, 5000);
        } else if (!currentVersion) {
          currentVersion = newVersion;
        }
      } catch (error) {
        console.error("[App] Update check failed:", error);
      }
    };

    // Initial load
    loadInitialVersion();

    // Check every 20 seconds
    const interval = setInterval(checkForUpdate, 20000);

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
          <Route path="/treatment-protocols" element={<TreatmentProtocols />} />
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
