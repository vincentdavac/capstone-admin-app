import React, { useRef } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";

// Contexts and wrappers
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import AppProvider from "./context/AppContext";

// If you have a global AlertsContainer like in the reference, you can include it:
import AlertsContainer, {
  AlertsContainerRef,
} from "./components/Alert/AlertsContainer"; // optional

// eslint-disable-next-line react-refresh/only-export-components
function Root() {
  const alertsRef = useRef<AlertsContainerRef>(null);

  return (
    <ThemeProvider>
      <AppWrapper>
        <Router>
          <AppProvider>
            <AlertsContainer ref={alertsRef} />
            <App alertsRef={alertsRef} />
          </AppProvider>
        </Router>
      </AppWrapper>
    </ThemeProvider>
  );
}

const container = document.getElementById("root")!;
ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
