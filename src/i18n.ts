import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import common_fr from "./translations/fr/translation.json";
import common_en from "./translations/en/translation.json";

const resources = {
  en: {
    translation: common_en
  },
  fr: {
    translation: common_fr
  }
};

i18n.use(initReactI18next).init({
  /*     debug: true, */
  resources,
  lng: "fr",
  fallbackLng: "fr",
  whitelist: ["fr", "en"],

  interpolation: {
    escapeValue: false
  }
});

export default i18n;
