import { useState, useImperativeHandle, forwardRef } from 'react';
import Alert from './Alert';

export type AlertType = 'success' | 'warning' | 'error';

export interface AlertsContainerRef {
  addAlert: (type: AlertType, message: string) => void;
  clearAlerts: () => void;
}

const AlertsContainer = forwardRef<AlertsContainerRef>((_props, ref) => {
  const [alerts, setAlerts] = useState<
    { id: string; type: AlertType; message: string }[]
  >([]);

  // inside your AlertsContainer
  const clearAlerts = () => setAlerts([]);

  const addAlert = (type: AlertType, message: string) => {
    const id = crypto.randomUUID();
    setAlerts((prev) => [...prev, { id, type, message }]);
  };

  const removeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  // Expose addAlert() to parent via ref
  useImperativeHandle(ref, () => ({
    addAlert,
    clearAlerts,
  }));

  return (
    <div className="fixed top-5 right-5 z-[9999] flex flex-col items-end">
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          type={alert.type}
          message={alert.message}
          onClose={() => removeAlert(alert.id)}
        />
      ))}
    </div>
  );
});

export default AlertsContainer;
