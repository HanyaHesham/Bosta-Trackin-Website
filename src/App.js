import { useTranslation } from "react-i18next";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./assets/scss/main.scss";
import Header from "./components/Header";
import Router from "./routes";

function App() {
  const { i18n } = useTranslation();

  const theme = createTheme({
    direction: i18n.language === "ar" ? "rtl" : "ltr", // Both here and <body dir="rtl">
  });
  // Create rtl cache
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  function returnedContent(lang) {
    return (
      <div className="App" dir={lang === "ar" ? "rtl" : "ltr"}>
        <Header />
        <Router />
      </div>
    );
  }

  return i18n.language === "ar" ? (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>{returnedContent("ar")}</ThemeProvider>
    </CacheProvider>
  ) : (
    returnedContent("en")
  );
}

export default App;
