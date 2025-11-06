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
    let failureCount = 0;
    const MAX_FAILURES = 3;

    // Load initial version from manifest
    const loadInitialVersion = async () => {
      try {
        const response = await fetch("/manifest.json", {
          cache: "no-store",
        });

        if (!response.ok) {
          console.error("[App] Manifest fetch status:", response.status);
          return;
        }

        const manifest = await response.json();
        currentVersion = manifest.version;
        console.log("[App] Initial version:", currentVersion);
        failureCount = 0;
      } catch (error) {
        console.error(
          "[App] Failed to load manifest:",
          error instanceof Error ? error.message : String(error),
        );
      }
    };

    // Check for updates periodically
    const checkForUpdate = async () => {
      if (failureCount >= MAX_FAILURES) {
        return;
      }

      try {
        const response = await fetch("/manifest.json", {
          cache: "no-store",
        });

        if (!response.ok) {
          failureCount++;
          console.warn("[App] Manifest fetch failed, status:", response.status);
          return;
        }

        const manifest = await response.json();
        const newVersion = manifest.version;
        failureCount = 0;

        if (currentVersion && currentVersion !== newVersion) {
          console.log(
            "[App] Update detected:",
            currentVersion,
            "->",
            newVersion,
          );

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
        failureCount++;
        if (failureCount >= MAX_FAILURES) {
          console.warn(
            "[App] Stopping update checks after",
            failureCount,
            "failures",
          );
        }
      }
    };

    // Initial load
    loadInitialVersion();

    // Check every 30 seconds
    const interval = setInterval(checkForUpdate, 30000);

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
