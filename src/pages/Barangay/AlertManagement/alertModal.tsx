import { Bell, X } from 'lucide-react';
import { useEffect } from 'react';
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
  onSend: () => void;
}
const AlertModal = ({ isOpen, alert, onClose, onSend }: AlertModalProps) => {
    useEffect(() => {
    if (isOpen) {
      const audio = new Audio('/sound/dangersound.mp3'); 
      audio.play();
    }
  }, [isOpen]);
  
  if (!isOpen || !alert) return null;

  const getAlertTitle = (level: string): string => {
    if (level === 'Red') return 'Red ALERT';
    if (level === 'Blue') return 'Blue ALERT';
    return 'ALERT';
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border-4 border-red-500 animate-scale-in">
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 transition"
          >
            <X size={32} strokeWidth={3} />
          </button>
        </div>

        <div className="px-8 pb-8">
          <div className="bg-red-50 rounded-2xl p-8 mb-6 flex items-start gap-6">
            <div className="bg-red-500 rounded-2xl p-6 flex-shrink-0">
              <Bell size={40} className="text-white" />
            </div>

            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-3">
                {getAlertTitle(alert.alert_level)}
              </h2>
              <p className="text-red-600 mt-1 text-md break-words">
                {alert.description}
              </p>
              <div className="mt-4 text-sm text-gray-600">
                <div>Sensor: {alert.sensor_type}</div>
                <div>Buoy: {alert.buoy_id}</div>
                <div>Time: {new Date(alert.recorded_at).toLocaleString()}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-6">
            <button
              onClick={onClose}
              className="px-12 py-4 border-2 border-red-500 text-black rounded-full font-semibold text-lg hover:bg-red-50 transition min-w-[200px]"
            >
              Close
            </button>
            <button
              onClick={onSend}
              className="px-12 py-4 bg-red-500 text-white rounded-full font-semibold text-lg hover:bg-red-600 transition min-w-[200px]"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;