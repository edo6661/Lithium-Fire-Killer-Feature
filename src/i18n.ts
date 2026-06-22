import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import globalID from "./locales/id/global.json";
import globalEN from "./locales/en/global.json";
import homeID from "./locales/id/home.json";
import homeEN from "./locales/en/home.json";
import aboutID from "./locales/id/about.json"; // <-- Tambahkan ini
import aboutEN from "./locales/en/about.json"; // <-- Tambahkan ini

const savedLanguage = localStorage.getItem("app-language") || "id";

const resources = {
  id: {
    global: globalID,
    home: homeID,
    about: aboutID, // <-- Tambahkan ini
  },
  en: {
    global: globalEN,
    home: homeEN,
    about: aboutEN, // <-- Tambahkan ini
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: "id",
  ns: ["global", "home", "about"], // <-- Tambahkan "about"
  defaultNS: "global",
  interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  localStorage.setItem("app-language", lng);
});

export default i18n;