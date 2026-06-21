import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import { Analytics } from "@vercel/analytics/react"
import "./index.css";
import "./i18n";

// Strict mode dipertahankan untuk dev — tidak ada efek di production build
ReactDOM.createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <Analytics />
    <App />
  </HelmetProvider>
);

// Preload font yang paling kritis setelah JS siap
// (font sudah ada di index.html via <link>, ini sebagai fallback hint)
if ("fonts" in document) {
  document.fonts.ready.then(() => {
    document.documentElement.classList.add("fonts-loaded");
  });
}