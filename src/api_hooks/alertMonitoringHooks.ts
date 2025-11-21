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
export const useAlertMonitor = (buoyId: string, pollInterval: number = 5000) => {
  const [currentAlert, setCurrentAlert] = useState<Alert | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [previousLevel, setPreviousLevel] = useState<string | null>(null);
  
  const checkAlerts = useCallback(async () => {
    try {
      const status = await alertMonitoring.checkAlertStatus(buoyId);
      
      if (status.current_level === 'White') {
        setPreviousLevel('White');
        return;
      }
      
      const { alerts, has_new_alerts } = await alertMonitoring.getActiveAlerts(buoyId);
      
      if (has_new_alerts && alerts.length > 0) {
        const newAlert = alerts[0];
        
        const isLevelIncrease = 
          (previousLevel === null || previousLevel === 'White') &&
          (newAlert.alert_level === 'Blue' || newAlert.alert_level === 'Red');
        
        if (isLevelIncrease) {
          setCurrentAlert(newAlert);
          setShowAlert(true);
          setPreviousLevel(newAlert.alert_level);
        }
      }
    } catch (error) {
      console.error('Error checking alerts:', error);
    }
  }, [buoyId, previousLevel]);

  useEffect(() => {
    checkAlerts();
    const interval = setInterval(checkAlerts, pollInterval);
    return () => clearInterval(interval);
  }, [checkAlerts, pollInterval]);

  const handleClose = useCallback(async () => {
    if (currentAlert) {
      await alertMonitoring.markAlertAsShown(currentAlert.id);
      setShowAlert(false);
      setCurrentAlert(null);
    }
  }, [currentAlert]);

  const handleSend = useCallback(async () => {
    console.log('Sending alert notification:', currentAlert);
    await handleClose();
  }, [currentAlert, handleClose]);

  return {
    showAlert,
    currentAlert,
    handleClose,
    handleSend,
  };
};