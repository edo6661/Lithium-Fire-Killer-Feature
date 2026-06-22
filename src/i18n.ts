import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import globalID from "./locales/id/global.json";
import globalEN from "./locales/en/global.json";
import homeID from "./locales/id/home.json";
import homeEN from "./locales/en/home.json";
import aboutID from "./locales/id/about.json";
import aboutEN from "./locales/en/about.json";
import lfsID from "./locales/id/lithium-fire-safety.json";
import lfsEN from "./locales/en/lithium-fire-safety.json";
import contactID from "./locales/id/contact.json";
import contactEN from "./locales/en/contact.json";
import arkivID from "./locales/id/lfk-x-arkiv.json"; // <-- Tambahkan ini
import arkivEN from "./locales/en/lfk-x-arkiv.json"; // <-- Tambahkan ini

const savedLanguage = localStorage.getItem("app-language") || "id";

const resources = {
  id: {
    global: globalID,
    home: homeID,
    about: aboutID,
    "lithium-fire-safety": lfsID,
    contact: contactID,
    "lfk-x-arkiv": arkivID, // <-- Tambahkan ini
  },
  en: {
    global: globalEN,
    home: homeEN,
    about: aboutEN,
    "lithium-fire-safety": lfsEN,
    contact: contactEN,
    "lfk-x-arkiv": arkivEN, // <-- Tambahkan ini
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: "id",
  ns: ["global", "home", "about", "lithium-fire-safety", "contact", "lfk-x-arkiv"], // <-- Tambahkan ini
  defaultNS: "global",
  interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  localStorage.setItem("app-language", lng);
});

export default i18n;