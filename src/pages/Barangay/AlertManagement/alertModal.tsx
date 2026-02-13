import { Bell, X } from "lucide-react";
import { useEffect, useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import api_endpoint from "../../../config/coreApi";

interface Alert {
  id: number;
  alertId: string;
  buoy_id: string;
  description: string;
  alert_level: string;
  sensor_type: string;
  recorded_at: string;
  alert_shown: boolean;
}

interface AlertModalProps {
  isOpen: boolean;
  alert: Alert | null;
  onClose: () => void;
  isSending?: boolean;
}

const AlertModal = ({ isOpen, alert, onClose }: AlertModalProps) => {
  const { user, token } = useContext(AppContext)!;
  const [isSending, setIsSending] = useState(false);
  // const buoyId = user?.barangay?.buoys?.[0]?.id;
  const buoyCode = user?.barangay?.buoys?.[0]?.buoyCode;
  const sensor = alert?.sensor_type;

  useEffect(() => {
    if (isOpen) {
      const audio = new Audio("/sound/dangersound.mp3");
      audio.play().catch((e) => console.log("Audio play failed:", e));
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!alert) return;
    setIsSending(true);
    try {
      const response = await fetch(`${api_endpoint}/broadcast-monitoring`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          alert_id: alert.id,
          buoy_code: String(buoyCode),
          sensor_stype: String(sensor),
        }),
      });
      console.log("testing", sensor);

      if (!response.ok) {
        throw new Error(`Failed to send alert: ${response.status}`);
      }
      const result = await response.json();
      if (result.reset > 0) {
        const endPoint = `${api_endpoint}/reset-relay-modal`;
        setTimeout(async () => {
          await fetch(endPoint, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ buoy_code: String(buoyCode) }),
          });
        }, result.reset * 1000);
      }
      onClose();
    } catch (error) {
      console.error("Failed to send alert:", error);
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen || !alert) return null;

  const getAlertTitle = (level: string): string => {
    if (level === "Red") return "RED ALERT";
    if (level === "Blue") return "BLUE ALERT";
    return "ALERT";
  };

  // for dynamic color based don sa alert
  const isRed = alert.alert_level === "Red";
  const theme = {
    overlay: isRed ? "bg-red-900/40" : "bg-blue-900/40",
    iconBg: isRed ? "bg-red-500" : "bg-blue-600",
    textDesc: isRed ? "text-red-600" : "text-blue-600",
    sendBtn: isRed
      ? "bg-red-500 hover:bg-red-600"
      : "bg-blue-600 hover:bg-blue-700",
  };

  return (
    <div
      className={`fixed inset-0 ${theme.overlay} backdrop-blur-sm flex items-center justify-center z-[9999] p-4`}
    >
      <div className="relative bg-white/95 dark:bg-gray-900/95 border border-white/20 rounded-2xl shadow-2xl w-full max-w-lg p-8 z-[10000] overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          disabled={isSending}
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div
            className={`${theme.iconBg} rounded-2xl p-5 mb-4 shadow-lg shadow-black/10`}
          >
            <Bell size={30} className="text-white" />
          </div>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {getAlertTitle(alert.alert_level)}
          </h3>

          <p
            className={`text-s font-semibold mb-6 break-words ${theme.textDesc}`}
          >
            {alert.description}
          </p>

          <div className="w-full bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-8 text-left text-sm space-y-2 border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between">
              <span className="text-gray-500">Sensor:</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {alert.sensor_type}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Buoy:</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {buoyCode}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Time:</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {new Date(alert.recorded_at).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Date:</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {new Date(alert.recorded_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
          <div className="flex gap-4 w-full">
            <button
              onClick={onClose}
              disabled={isSending}
              className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-xl font-bold hover:bg-gray-300 transition-all active:scale-95 disabled:opacity-50"
            >
              Close
            </button>
            <button
              onClick={handleSend}
              disabled={isSending}
              className={`flex-1 px-4 py-3 ${theme.sendBtn} text-white rounded-xl font-bold shadow-md transition-all active:scale-95 disabled:opacity-50`}
            >
              {isSending ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
