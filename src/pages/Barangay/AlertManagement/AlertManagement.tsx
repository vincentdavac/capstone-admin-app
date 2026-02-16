import React, { useState, useEffect } from "react";
import { fetchAlertsAlerts } from "../../../api_hooks/fetchAllAlerts";
import { useBroadcastAlert } from "../../../core_api_fetching/broadCastAlert";
import { useAlert } from "../../../context/AlertContext";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import { RecentAlertsTable } from "../../../components/Alert Management/RecentAlertsTable";
import { insertingAlerts } from "../../../api_hooks/dashboardHooks";
import { AppContext } from "../../../context/AppContext";
import { useContext } from "react";
import { useAlertMonitor } from "../../../api_hooks/alertMonitoringHooks";
import AlertModal from "../../Barangay/AlertManagement/alertModal";
import DisasterFlowChart from "../../../components/DisasterFlowChart";

const AlertManagement: React.FC = () => {
  const { user } = useContext(AppContext)!;
  const buoyCode = user?.barangay?.buoys?.[0]?.buoyCode;
  const buoyId = user?.barangay?.buoys?.[0]?.id;
  // if (!buoyId) {
  //    return <div>Loading...</div>;
  // }
  const { showAlert, currentAlert, handleClose } = useAlertMonitor(
    buoyCode?.toString() ?? "",
    5000,
    buoyId?.toString() ?? ""
  );
  insertingAlerts();
  useAlert();
  const { alertsGet, loading, error } = fetchAlertsAlerts();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAlertId, setSelectedAlertId] = useState<number | null>(null);
  const { broadcastToSelected } = useBroadcastAlert();
  const [sensorTypes, setSensor] = useState<string | null>(null);
  useBroadcastAlert();

  const itemsPerPage = 5;

  useEffect(() => {
    document.title = "Alert Management | X-Stream";
  }, []);

  const handleSelectAlert = (id: number, sensors: string) => {
    setSelectedAlertId(id);
    setSensor(sensors);
  };

  const handleBroadcast = async () => {
    await broadcastToSelected(selectedAlertId, sensorTypes);
    setSelectedAlertId(null);
    setSensor(null);
  };

  const filteredAlerts = alertsGet || [];
  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAlerts = filteredAlerts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  /* ================= Disaster Alert ================= */
  const [selected, setSelected] = useState<"WHITE" | "BLUE" | "RED">("WHITE");

  const alertStatus = {
    WHITE:
      "Normal operations are maintained with continuous monitoring, coordinated efforts among teams, and systematic reporting to ensure smooth processes and timely issue resolution.",
    BLUE: "Early stage of emergency: heightened monitoring, coordination, & reporting. 50% of the DRRMD personnel shall remain on duty and on standby for possible deployment.",
    RED: "Imminent emergency: highest level monitoring, coordination, and Reporting. 100% of the DRRMD personnel shall remain on duty and on standby for immediate deployment.",
  };

  const getButtonClass = (color: "WHITE" | "BLUE" | "RED") => {
    const base =
      "flex items-center justify-center w-full h-[35px] rounded-full px-3 cursor-pointer border transition-colors";

    switch (color) {
      case "WHITE":
        return `${base} ${
          selected === "WHITE"
            ? "bg-gray-100 border-gray-400 dark:bg-gray-700 dark:border-gray-500 text-gray-900 dark:text-white"
            : "bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600"
        }`;
      case "BLUE":
        return `${base} ${
          selected === "BLUE"
            ? "bg-blue-500 text-white border-blue-600"
            : "border-blue-400 text-blue-600 dark:text-blue-400"
        }`;
      case "RED":
        return `${base} ${
          selected === "RED"
            ? "bg-red-500 text-white border-red-600"
            : "border-red-500 text-red-600 dark:text-red-400"
        }`;
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen relative text-gray-900 dark:text-white">
      <PageBreadcrumb pageTitle="Alert Management" />
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        {/* Main Content (Left: Create Alert, Right: Recent Alerts) */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - New Layout (Create Alert and Flowchart) */}
            <div className="space-y-6 lg:pr-12 lg:border-r border-gray-200 dark:border-gray-700">
              <div className="space-y-6">
                {/* ================= DISASTER ALERT ================= */}
                <div className="w-full lg:w-[648px] bg-white dark:bg-gray-800 shadow rounded-2xl border border-[#D9D9D9] dark:border-gray-700 flex flex-col">
                  <div className="w-full px-4 pt-4 text-center">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Disaster Alert Level
                    </h3>
                  </div>

                  <hr className="my-3 border-gray-300 dark:border-gray-600" />

                  <div className="grid grid-cols-3 gap-3 px-4">
                    {(["WHITE", "BLUE", "RED"] as const).map((color) => (
                      <button
                        key={color}
                        className={getButtonClass(color)}
                        onClick={() => setSelected(color)}
                      >
                        {color}
                      </button>
                    ))}
                  </div>

                  <p className="px-4 py-4 text-sm text-center text-gray-700 dark:text-gray-400">
                    {alertStatus[selected]}
                  </p>
                </div>

              {/* Disaster Response Flowchart */}
                <div className="w-full min-h-[495px]">
                    <DisasterFlowChart />
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
              sensorTypes={sensorTypes}
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