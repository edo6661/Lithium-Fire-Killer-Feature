import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const savedLanguage = localStorage.getItem("app-language") || "id";

i18n.use(initReactI18next).init({
  resources: {},
  lng: savedLanguage,
  fallbackLng: "id",
  interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  localStorage.setItem("app-language", lng);
});

export default i18n;
