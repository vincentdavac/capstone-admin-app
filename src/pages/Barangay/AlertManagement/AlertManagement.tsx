import React, { useState, useEffect, useContext } from "react";
import { fetchAlertsAlerts } from "../../../api_hooks/fetchAllAlerts";
import { useAlert } from "../../../context/AlertContext";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import { RecentAlertsTable } from "../../../components/Alert Management/RecentAlertsTable";
import { insertingAlerts } from "../../../api_hooks/dashboardHooks";
import AlertModal from "../../Barangay/AlertManagement/alertModal";
import { useAlertMonitor } from "../../../api_hooks/alertMonitoringHooks";
import { AppContext } from "../../../context/AppContext";
const AlertManagement: React.FC = () => {
  insertingAlerts();
  useAlert();
  const { alertsGet, loading, error } = fetchAlertsAlerts();
  const [selectedAlertId, setSelectedAlertId] = useState<number | null>(null);
  const [sensorTypes, setSensor] = useState<string | null>(null);
  useEffect(() => {
    document.title = "Alert Management | X-Stream";
  }, []);
  const handleSelectAlert = (id: number, sensors: string) => {
    setSelectedAlertId(id);
    setSensor(sensors);
  };
  const { user } = useContext(AppContext)!;
  const buoyId = user?.barangay?.buoys?.[0]?.id ?? 0;
  const buoyCode = user?.barangay?.buoys?.[0]?.buoyCode;
  const { showAlert, currentAlert, handleClose } = useAlertMonitor(
    buoyCode?.toString() ?? "",
    5000,
    buoyId?.toString() ?? "",
  );
  return (
    <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <PageBreadcrumb pageTitle="Alert Management" />
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mt-6">
        <div className="p-4 sm:p-6">
          <div className="w-[95%] mx-auto">
            <div className="w-full max-h-auto overflow-hidden">
              <RecentAlertsTable
                loading={loading}
                error={error}
                alertsGet={alertsGet || []}
                selectedAlertId={selectedAlertId}
                handleSelectAlert={handleSelectAlert}
                sensorTypes={sensorTypes}
              />
            </div>
          </div>
        </div>
      </div>
      <AlertModal
        isOpen={showAlert}
        alert={currentAlert}
        onClose={handleClose}
      />
    </div>
  );
};

export default AlertManagement;
