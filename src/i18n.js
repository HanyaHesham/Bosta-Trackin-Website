import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import ar from "../src/locales/ar/translation.json";
import en from "../src/locales/en/translation.json";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)

  .init({
    fallbackLng: "ar",
    debug: true,
    saveMissing: true,

    resources: {
      ar: {
        translation: {
          ...ar,
        },
      },
      en: {
        translation: {
          ...en,
        },
      },
    },
  });

export default i18n;
