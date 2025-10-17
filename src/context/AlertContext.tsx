import{ createContext, useContext, useState, ReactNode } from "react";
import Alert from "../components/ui/alert/Alert";

type AlertVariant = "success" | "warning" | "error" | "info";

interface AlertMessage {
  id: number;
  variant: AlertVariant;
  title: string;
  message: string;
}

interface AlertContextProps {
  showAlert: (variant: AlertVariant, title: string, message: string) => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<AlertMessage[]>([]);

  const showAlert = (variant: AlertVariant, title: string, message: string) => {
    const newAlert: AlertMessage = {
      id: Date.now(),
      variant,
      title,
      message,
    };
    setAlerts((prev) => [...prev, newAlert]);

    // Auto-remove after 4s
    setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.id !== newAlert.id));
    }, 4000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      {/* Global alert container (fixed at top-right) */}
<div className="fixed top-5 right-5 space-y-2 z-[2147483647]">
  {alerts.map((a) => (
    <Alert
      key={a.id}
      variant={a.variant}
      title={a.title}
      message={a.message}
      showLink={false}
    />
  ))}
</div>


    </AlertContext.Provider>
  );
};
