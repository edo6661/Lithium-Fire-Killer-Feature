import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import globalID from "./locales/id/global.json";
import globalEN from "./locales/en/global.json";
import homeID from "./locales/id/home.json"; 
import homeEN from "./locales/en/home.json"; 

const savedLanguage = localStorage.getItem("app-language") || "id";

const resources = {
  id: {
    global: globalID,
    home: homeID, 
  },
  en: {
    global: globalEN,
    home: homeEN, 
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: "id",
  ns: ["global", "home"], // Tambahkan "home" ke dalam array
  defaultNS: "global",
  interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  localStorage.setItem("app-language", lng);
});

export default i18n;