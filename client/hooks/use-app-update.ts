import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

export const useAppUpdate = () => {
  const { toast } = useToast();
  const versionCheckRef = useRef<NodeJS.Timeout | null>(null);
  const lastVersionRef = useRef<string | null>(null);
  const notificationShownRef = useRef(false);

  useEffect(() => {
    // Get initial version from manifest
    const getAppVersion = async () => {
      try {
        const response = await fetch("/manifest.json?bust=" + Date.now(), {
          headers: { "Cache-Control": "no-cache, no-store, must-revalidate" },
        });
        const manifest = await response.json();
        return manifest.version || new Date().getTime().toString();
      } catch (error) {
        return new Date().getTime().toString();
      }
    };

    const refreshApp = () => {
      // Clear all caches and reload
      if ("caches" in window) {
        caches.keys().then((cacheNames) => {
          cacheNames.forEach((cacheName) => {
            caches.delete(cacheName);
          });
        });
      }
      window.location.reload();
    };

    const checkForUpdates = async () => {
      try {
        const currentVersion = await getAppVersion();

        if (lastVersionRef.current === null) {
          // First check - store the version
          lastVersionRef.current = currentVersion;
        } else if (
          lastVersionRef.current !== currentVersion &&
          !notificationShownRef.current
        ) {
          // Version changed - show update notification
          notificationShownRef.current = true;

          // Show notification with description that includes refresh instructions
          toast({
            title: "Update Available",
            description:
              "A new version is ready. Refresh your browser to get the latest updates.",
            duration: 0, // Persistent notification
          });

          // Auto-refresh after 5 seconds if user hasn't interacted
          const autoRefreshTimer = setTimeout(() => {
            refreshApp();
          }, 5000);

          // Cancel auto-refresh on any user interaction
          const handleUserInteraction = () => {
            clearTimeout(autoRefreshTimer);
            document.removeEventListener("click", handleUserInteraction);
            document.removeEventListener("keydown", handleUserInteraction);
          };

          document.addEventListener("click", handleUserInteraction);
          document.addEventListener("keydown", handleUserInteraction);

          lastVersionRef.current = currentVersion;
        }
      } catch (error) {
        console.debug("Update check error:", error);
      }
    };

    // Initial check
    checkForUpdates();

    // Check every 30 seconds for updates
    versionCheckRef.current = setInterval(checkForUpdates, 30000);

    return () => {
      if (versionCheckRef.current) {
        clearInterval(versionCheckRef.current);
      }
    };
  }, [toast]);
};
