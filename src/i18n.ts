import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import common_fr from "./translations/fr/common.json";
import common_en from "./translations/en/common.json";

const resources = {
  en: {
    common: common_en
  },
  fr: {
    common: common_fr
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "fr",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
