import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")!).render(<App />);

// Register service worker for offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (registration) => {
        console.log('Service Worker registered successfully:', registration);
      },
      (error) => {
        console.log('Service Worker registration failed:', error);
      }
    );
  });
}
