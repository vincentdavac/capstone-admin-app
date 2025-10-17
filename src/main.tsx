import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";

// ✅ Keep the AlertProvider
import { AlertProvider } from "./context/AlertContext.tsx";

// ❌ Remove reCAPTCHA v3 import & provider
// import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AppWrapper>
        <AlertProvider>
          {/* ✅ No more v3 provider, just mount the app */}
          <App />
        </AlertProvider>
      </AppWrapper>
    </ThemeProvider>
  </StrictMode>,
);
