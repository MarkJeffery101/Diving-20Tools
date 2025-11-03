import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useAppUpdate = () => {
  const { toast } = useToast();
  const versionCheckRef = useRef<NodeJS.Timeout | null>(null);
  const lastVersionRef = useRef<string | null>(null);

  useEffect(() => {
    // Get initial version from meta tag or data attribute
    const getAppVersion = async () => {
      try {
        // Check the manifest.json which updates on every build
        const response = await fetch('/manifest.json?bust=' + Date.now(), {
          headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' }
        });
        const manifest = await response.json();
        return manifest.version || new Date().getTime().toString();
      } catch (error) {
        // Fallback: use index.html's last modified time
        return new Date().getTime().toString();
      }
    };

    const checkForUpdates = async () => {
      try {
        const currentVersion = await getAppVersion();
        
        if (lastVersionRef.current === null) {
          // First check - store the version
          lastVersionRef.current = currentVersion;
        } else if (lastVersionRef.current !== currentVersion) {
          // Version changed - update is available
          toast({
            title: "Update Available",
            description: "A new version of the app is available. Please refresh to get the latest features and fixes.",
            action: {
              label: "Refresh",
              onClick: () => {
                // Clear all caches and reload
                if ('caches' in window) {
                  caches.keys().then(cacheNames => {
                    cacheNames.forEach(cacheName => {
                      caches.delete(cacheName);
                    });
                  });
                }
                window.location.reload();
              }
            },
            duration: 0, // Show until dismissed
          });

          // Update the reference
          lastVersionRef.current = currentVersion;
        }
      } catch (error) {
        console.debug('Update check error:', error);
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
