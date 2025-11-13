/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { fetchAlertsAlerts } from "../../api_hooks/fetchAllAlerts";
import { useBroadcastAlert } from "../../core_api_fetching/broadCastAlert";
import { useAlert } from "../../context/AlertContext";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
// --- Custom Icons (Pure SVG) ---
const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const SendIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

interface AlertData {
  id: number;
  dateTime: string;
  sensorType: string;
  alertLevel: "White" | "Blue" | "Red";
  alertReadings: string;
}

const AlertRow: React.FC<{
  alert: any;
  selectedAlertId: number | null;
  onSelect: (id: number) => void;
}> = ({ alert, selectedAlertId, onSelect }) => {
  const getAlertStyle = (level: string) => {
    switch (level?.toLowerCase()) {
      case "white":
        return "bg-white text-gray-800 border border-gray-300 dark:bg-gray-100 dark:text-gray-800";
      case "blue":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-800 dark:text-blue-100";
      case "red":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-800 dark:text-red-100";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  const formattedDateTime = alert.recorded_at?.replace(" ", "\n") || "N/A";

  return (
    <div
      className="grid text-sm bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-200 dark:border-gray-700"
      style={{
        gridTemplateColumns: "1fr 0.8fr 1fr 2.5fr 0.5fr",
      }}
    >
      {/* Date/Time */}
      <div className="p-3 whitespace-pre-line flex items-center text-xs text-gray-700 dark:text-gray-300">
        {formattedDateTime}
      </div>

      {/* Sensor Type */}
      <div className="p-3 flex items-center text-xs text-gray-700 dark:text-gray-300">
        {alert.sensor_type || "N/A"}
      </div>

      {/* Alert Level */}
      <div className="p-3 flex items-center justify-center">
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-medium border ${getAlertStyle(
            alert.alert_level
          )}`}
        >
          {alert.alert_level || "N/A"}
        </span>
      </div>

      {/* Alert Readings */}
      <div className="p-3 text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed flex items-center">
        {alert.description || "No description"}
      </div>

      {/* Action (Radio Button for Selection) */}
      <div className="p-3 flex items-center justify-center">
        <input
          type="radio"
          name="selectedAlert"
          checked={selectedAlertId === alert.id}
          onChange={() => onSelect(alert.id)}
          className="h-4 w-4 text-[#453EFE] focus:ring-[#453EFE] border-gray-300 cursor-pointer"
        />
      </div>
    </div>
  );
};

const AlertManagement: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const { showAlert } = useAlert();
  const { alertsGet, loading, error } = fetchAlertsAlerts();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAlertId, setSelectedAlertId] = useState<number | null>(null);
  const { broadcastToSelected } = useBroadcastAlert();
  const itemsPerPage = 5;
  const [newAlertData, setNewAlertData] = useState({
    searchBuoy: "",
    dateTime: "",
    sensorType: "Select sensor type",
    alert_level: "Blue" as "White" | "Blue" | "Red",
    alertReadings: "",
  });

  // Handle radio button selection
  const handleSelectAlert = (id: number) => {
    setSelectedAlertId(id);
  };
  const handleBroadcast = async () => {
    await broadcastToSelected(selectedAlertId);
    showAlert("success", "Success", "Notification sent to al user");
    setSelectedAlertId(null);
  };
  const handleSaveNewAlert = () => {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 10);
    const formattedTime = now.toTimeString().slice(0, 8);
    const newDateTime = `${formattedDate} ${formattedTime}`;

    const newAlert: AlertData = {
      id: alerts.length > 0 ? Math.max(...alerts.map((s) => s.id)) + 1 : 1,
      dateTime: newDateTime,
      sensorType:
        newAlertData.sensorType === "Select sensor type"
          ? "Unknown"
          : newAlertData.sensorType,
      alertLevel: newAlertData.alert_level,
      alertReadings: newAlertData.alertReadings || "No additional message.",
    };
    setAlerts([newAlert, ...alerts]);
  };

  const filteredAlerts = alertsGet || [];
  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAlerts = filteredAlerts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen relative text-gray-900 dark:text-white">
      <PageBreadcrumb pageTitle="Alert Management" />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        {/* Header Section */}
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <label className="block text-xl sm:text-2xl text-gray-500 dark:text-gray-300">
            Create New Alert
          </label>
        </div>

        {/* Main Content (Left: Create Alert, Right: Recent Alerts) */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Create New Alert Form */}
            <div className="space-y-6 lg:pr-8 lg:border-r border-gray-200 dark:border-gray-700">
              {/* Search Buoy */}
              <div>
                <h3 className="block text-lg sm:text-xl font-normal text-gray-500 dark:text-gray-300 mb-2">
                  Search
                </h3>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <SearchIcon className="h-5 w-5" />
                  </span>
                  <input
                    id="search-buoy"
                    type="text"
                    placeholder="Search"
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                    <ChevronDownIcon className="h-5 w-5" />
                  </span>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value=""
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Longitude & Latitude */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-2">
                    Longitude
                  </label>
                  <input
                    type="text"
                    value=""
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-2">
                    Latitude
                  </label>
                  <input
                    type="text"
                    value=""
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Alert Status Radio Buttons */}
              <div>
                <label className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-2">
                  Select Alert Status
                </label>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 p-2 border border-gray-200 rounded-xl shadow-sm bg-gray-50 dark:bg-gray-700">
                  {["White Alert", "Blue Alert", "Red Alert"].map((status) => {
                    const isChecked = newAlertData.alert_level === status;
                    return (
                      <label
                        key={status}
                        className={`flex items-center justify-start flex-1 space-x-2 rounded-full px-4 py-2 cursor-pointer transition-all duration-200 
                          ${
                            isChecked
                              ? "border border-[#453EFE] bg-white dark:bg-gray-600 shadow-md"
                              : "border border-gray-300 hover:border-gray-400 bg-white dark:bg-gray-800"
                          }`}
                      >
                        <input
                          type="radio"
                          name="alertStatus"
                          value={status}
                          checked={isChecked}
                          onChange={(e) =>
                            setNewAlertData({
                              ...newAlertData,
                              alert_level: e.target.value as
                                | "White"
                                | "Blue"
                                | "Red",
                            })
                          }
                          className={`h-5 w-5 appearance-none rounded-full border-2 transition-all duration-200 cursor-pointer 
                            ${
                              isChecked
                                ? "border-[#453EFE] bg-[#453EFE] checked:bg-[#453EFE]"
                                : "border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-800"
                            }`}
                        />
                        <span className="flex-1 text-center text-gray-700 dark:text-gray-300 text-sm font-medium">
                          {status.split(" ")[0]} Alert
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Sensor Type and Preview Button */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
                <div>
                  <label className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-2">
                    Sensor Type
                  </label>
                  <select
                    value={newAlertData.sensorType}
                    onChange={(e) =>
                      setNewAlertData({
                        ...newAlertData,
                        sensorType: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option disabled>Select sensor type</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </div>
                <div>
                  <button
                    type="button"
                    className="w-full px-4 py-3 text-[#453EFE] border border-[#453EFE] rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                  >
                    test
                  </button>
                </div>
              </div>

              {/* Additional Message */}
              <div>
                <label className="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-2">
                  Additional Message
                </label>
                <textarea
                  placeholder="Enter alert message..."
                  rows={4}
                  value={newAlertData.alertReadings}
                  onChange={(e) =>
                    setNewAlertData({
                      ...newAlertData,
                      alertReadings: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="flex justify-end ">
                <button
                  onClick={handleSaveNewAlert}
                  className="bg-[#453EFE] text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center shadow-md font-medium"
                >
                  <SendIcon className="h-5 w-5 mr-2" /> Broadcast Alert
                </button>
              </div>
            </div>

            {/* Right Column - Recent Alerts Table */}
            <div className="space-y-4 lg:pl-8">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-normal text-gray-500 dark:text-white">
                  Recent Alerts
                </h3>
                <div className="flex items-center gap-3">
                  <select className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
                    <option>Last 24 hours</option>
                    <option>Last 7 days</option>
                  </select>
                  <button
                    onClick={handleBroadcast}
                    disabled={!selectedAlertId}
                    className={`bg-[#453EFE] text-white px-4 py-2 rounded-lg flex items-center shadow-md font-medium text-sm transition-colors hover:bg-blue-700 ${
                      !selectedAlertId ? "cursor-not-allowed" : ""
                    }`}
                  >
                    <SendIcon className="h-4 w-4 mr-1" /> Broadcast Selected
                  </button>
                </div>
              </div>

              {/* Table Container */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-x-auto">
                <div className="min-w-full">
                  {/* Table Header */}
                  <div
                    className="grid text-left text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700"
                    style={{ gridTemplateColumns: "1fr 0.8fr 1fr 2.5fr 0.5fr" }}
                  >
                    <div className="p-3">Date/Time</div>
                    <div className="p-3">Sensor Type</div>
                    <div className="p-3 text-center">CCDRRMD Alert Level</div>
                    <div className="p-3">Alert Readings</div>
                    <div className="p-3 text-center">Action</div>
                  </div>

                  <div>
                    {loading ? (
                      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                        Loading alerts...
                      </div>
                    ) : error ? (
                      <div className="p-4 text-center text-red-500">
                        Error loading alerts
                      </div>
                    ) : currentAlerts.length > 0 ? (
                      currentAlerts.map((alert: any) => (
                        <AlertRow
                          key={alert.id}
                          alert={alert}
                          selectedAlertId={selectedAlertId}
                          onSelect={handleSelectAlert}
                        />
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                        No alerts found.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Table Footer/Pagination */}
              <div className="flex flex-col sm:flex-row items-center justify-between pt-2 space-y-2 sm:space-y-0">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(startIndex + itemsPerPage, filteredAlerts.length)}{" "}
                  of {filteredAlerts.length} Entries
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1 sm:space-x-2">
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="px-2 sm:px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50"
                    >
                      Previous
                    </button>
                    {[...Array(Math.min(totalPages, 5))].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 text-sm rounded ${
                          currentPage === i + 1
                            ? "bg-[#453EFE] text-white"
                            : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="px-2 sm:px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertManagement;
