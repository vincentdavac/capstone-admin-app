import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { BrowserRouter } from "react-router";

// ✅ Keep the AlertProvider
import { AlertProvider } from "./context/AlertContext.tsx";

// ❌ Remove reCAPTCHA v3 import & provider
// import { GoogleReCAPTCHAReCaptchaProvider } from "react-google-recaptcha-v3";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AppWrapper>
      <BrowserRouter>  
      <AlertProvider>
          <App />
      </AlertProvider>
      </BrowserRouter>  
      </AppWrapper>
    </ThemeProvider>
  </StrictMode>,
);
