import React, { useState } from "react";
import { fetchAlertsAlerts } from "../../../api_hooks/fetchAllAlerts";
import { useBroadcastAlert } from "../../../core_api_fetching/broadCastAlert";
import { useAlert } from "../../../context/AlertContext";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import { CustomAlertLevel } from "../../../components/Alert Management/CustomAlertLevel";
import { RecentAlertsTable } from "../../../components/Alert Management/RecentAlertsTable";
import {insertingAlerts } from "../../../api_hooks/dashboardHooks";
import { AppContext } from "../../../context/AppContext";
import { useContext } from "react";
import { useAlertMonitor } from "../../../api_hooks/alertMonitoringHooks";
import AlertModal from "../../Barangay/AlertManagement/alertModal";

const AlertManagement: React.FC = () => {
  const { user } = useContext(AppContext)!;
  const buoyId = user?.barangay?.buoys?.[0]?.id;
  if (!buoyId) {
     return <div>Loading...</div>;
  }
  const {showAlert,currentAlert,handleClose} = useAlertMonitor(buoyId?.toString(),5000);
  insertingAlerts();
  useAlert();
  const { alertsGet, loading, error } = fetchAlertsAlerts();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAlertId, setSelectedAlertId] = useState<number | null>(null);
  const { broadcastToSelected } = useBroadcastAlert();
  useBroadcastAlert();

  const itemsPerPage = 5;
  const [newAlertData, setNewAlertData] = useState({
    searchBuoy: "",
    dateTime: "",
    sensorType: "Select sensor type",
    alert_level: "White" as "White" | "Blue" | "Red",
    alertReadings: "",
  });

  const handleSelectAlert = (id: number) => {
    setSelectedAlertId(id);
  };
  const handleBroadcast = async () => {
    await broadcastToSelected(selectedAlertId);
    setSelectedAlertId(null);
  };

  const filteredAlerts = alertsGet || [];
  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAlerts = filteredAlerts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleLevelChange = (level: "White" | "Blue" | "Red") => {
    setNewAlertData((prev) => ({
      ...prev,
      alert_level: level,
    }));
  };

  const getDescriptionText = (level: "White" | "Blue" | "Red") => {
    switch (level) {
      case "White":
        return (
          <>
            Normal Operation
            <br />
            Monitoring, Coordination and Reporting
          </>
        );
      case "Blue":
        return "Monitoring situation and preparing response capabilities.";
      case "Red":
        return "Imminent emergency situation Highest level monitoring, coordination, and reporting";
      default:
        return "";
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen relative text-gray-900 dark:text-white">
      <PageBreadcrumb pageTitle="Alert Management" />
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl sm:text-2xl font-normal text-gray-500 dark:text-gray-300">
            Create New Alert
          </h2>
        </div>

        {/* Main Content (Left: Create Alert, Right: Recent Alerts) */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - New Layout (Create Alert and Flowchart) */}
            <div className="space-y-6 lg:pr-8 lg:border-r border-gray-200 dark:border-gray-700">
              <div className="space-y-6">
                <div className="w-full bg-white dark:bg-gray-900 shadow rounded-2xl border border-[#D9D9D9] dark:border-gray-700 flex flex-col p-4">
                  <div className="w-full text-center">
                    <h3 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Disaster Alert Level
                    </h3>
                  </div>
                  <hr className="w-full border-t border-gray-300 dark:border-gray-600" />

                  {/* Alert Level Radio Buttons - USING CUSTOM COMPONENT */}
                  <div className="flex gap-4 w-full p-4 self-center mt-2 justify-center">
                    <CustomAlertLevel
                      level="White"
                      colorClass="text-gray-800 dark:text-gray-200"
                      isSelected={newAlertData.alert_level === "White"}
                      onSelect={handleLevelChange}
                    />
                    <CustomAlertLevel
                      level="Blue"
                      colorClass="text-blue-600 dark:text-blue-400"
                      isSelected={newAlertData.alert_level === "Blue"}
                      onSelect={handleLevelChange}
                    />
                    <CustomAlertLevel
                      level="Red"
                      colorClass="text-red-600 dark:text-red-400"
                      isSelected={newAlertData.alert_level === "Red"}
                      onSelect={handleLevelChange}
                    />
                  </div>

                  {/* Dynamic Description Text */}
                  <div className="text-center mt-2 px-4 text-gray-700 dark:text-gray-400 text-sm leading-snug whitespace-pre-line">
                    {getDescriptionText(newAlertData.alert_level)}
                  </div>
                </div>

                {/* Flowchart Image Box */}
                <div className="w-full min-h-[495px] bg-white shadow rounded-2xl border border-[#D9D9D9] dark:border-gray-700 flex items-center justify-center p-4 dark:bg-gray-900">
                  <img
                    className="h-auto w-full object-contain"
                    src="/logo/chart.png"
                    alt="Alert Flowchart"
                  />
                </div>
              </div>
              {/* NEW LAYOUT ENDS HERE */}
            </div>

            {/* Right Column - Recent Alerts Table (Now a Component) */}
            <RecentAlertsTable
              loading={loading}
              error={error}
              currentAlerts={currentAlerts}
              filteredAlerts={filteredAlerts}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              totalPages={totalPages}
              selectedAlertId={selectedAlertId}
              startIndex={startIndex}
              setCurrentPage={setCurrentPage}
              handleSelectAlert={handleSelectAlert}
              handleBroadcast={handleBroadcast}
            />
            <AlertModal
              isOpen={showAlert}
              alert={currentAlert}
              onClose={handleClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertManagement;
