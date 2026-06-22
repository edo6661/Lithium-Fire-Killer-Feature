import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import file JSON terjemahan (kita akan buat filenya setelah ini)
import globalID from "./locales/id/global.json";
import globalEN from "./locales/en/global.json";

const savedLanguage = localStorage.getItem("app-language") || "id";

// Gabungkan semua terjemahan di sini nantinya
const resources = {
  id: {
    global: globalID,
  },
  en: {
    global: globalEN,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: "id",
  ns: ["global"], // namespace default
  defaultNS: "global",
  interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  localStorage.setItem("app-language", lng);
});

export default i18n;