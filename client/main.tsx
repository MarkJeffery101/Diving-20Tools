import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")!).render(<App />);

// Register service worker for offline support and auto-updates
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").then(
      (registration) => {
        console.log("Service Worker registered successfully:", registration);

        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 30000);
      },
      (error) => {
        console.log("Service Worker registration failed:", error);
      },
    );
  });
}
