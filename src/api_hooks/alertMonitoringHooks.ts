import { useState, useEffect, useRef, useCallback } from 'react';
import { alertMonitoring } from '../core_api_fetching/alertMonitoring';

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
export const useAlertMonitor = (prototypeId: string, pollInterval: number = 5000) => {
  const [currentAlert, setCurrentAlert] = useState<Alert | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [previousLevels, setPreviousLevels] = useState<any>({});
  const [shownAlertIds, setShownAlertIds] = useState(new Set<number>());
  const [isSending, setIsSending] = useState(false);
  const checkAlerts = async () => {
    try {
      const status = await alertMonitoring.checkAlertStatus(prototypeId);
      if (status.current_level === 'White') {
        setPreviousLevels({}); 
        setShownAlertIds(new Set());
        return;
      }
      const { alerts, has_new_alerts } = await alertMonitoring.getActiveAlerts(prototypeId);
      if (has_new_alerts && alerts.length > 0) {
        const newAlert = alerts[0];
        if (shownAlertIds.has(newAlert.id)) {
          return;
        }
        const currentLvl = newAlert.alert_level;
        const prevLvl = previousLevels[newAlert.sensor_type];
        const danger = currentLvl === 'Blue' || currentLvl === 'Red';
        const lvlChange = prevLvl !== currentLvl;
        if (danger && lvlChange) {
          setCurrentAlert(newAlert);
          setShowAlert(true);
          setPreviousLevels({
            ...previousLevels,
            [newAlert.sensor_type]: currentLvl
          });
          setShownAlertIds(new Set(shownAlertIds).add(newAlert.id));
        }
      }
    } catch (error) {
      console.error('Error checking alerts:', error);
    }
  };
  useEffect(() => {
    checkAlerts();
    const interval = setInterval(checkAlerts, 5000);
    return () => clearInterval(interval);
  }, [prototypeId]);

  const handleClose = async () => {
    if (currentAlert) {
      await alertMonitoring.markAlertAsShown(currentAlert.id);
      setShowAlert(false);
      setCurrentAlert(null);
    }
  };
  return {
    showAlert,
    currentAlert,
    handleClose,
  };
};