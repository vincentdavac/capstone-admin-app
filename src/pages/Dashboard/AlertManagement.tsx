import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

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
const AlertTriangleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m21.73 18.27-8.94-15.09a2 2 0 0 0-3.58 0L2.27 18.27a2 2 0 0 0 1.79 2.73h17.88a2 2 0 0 0 1.79-2.73Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);
const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
const ArchiveCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
  </svg>
);

interface AlertData {
  id: number;
  dateTime: string;
  sensorType: string;
  alertLevel: "White Alert" | "Blue Alert" | "Red Alert";
  alertReadings: string;
}

const AlertRow: React.FC<{
  alert: AlertData;
  onArchive: (id: number) => void;
}> = ({ alert, onArchive }) => {
  const getAlertStyle = (level: AlertData["alertLevel"]) => {
    switch (level) {
      case "White Alert":
        return "bg-white text-gray-800 border border-gray-300 dark:bg-gray-100 dark:text-gray-800";
      case "Blue Alert":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-800 dark:text-blue-100";
      case "Red Alert":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-800 dark:text-red-100";
      default:
        return "";
    }
  };

  const formattedDateTime = alert.dateTime.replace(" ", "\n");

  return (
    <div
      className="grid text-sm bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      style={{
        gridTemplateColumns: "1fr 0.8fr 1fr 2.5fr 0.5fr",
      }}
    >
      {/* Date/Time */}
      <div className="p-2 sm:p-3 border-b border-gray-200 dark:border-gray-700 whitespace-pre-line flex items-center text-xs text-gray-700 dark:text-gray-300">
        {formattedDateTime}
      </div>

      {/* Sensor Type */}
      <div className="p-2 sm:p-3 border-b border-gray-200 dark:border-gray-700 flex items-center text-xs text-gray-700 dark:text-gray-300">
        {alert.sensorType}
      </div>

      {/* CCORDMD Alert Level */}
      <div className="p-2 sm:p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-center">
        <span
          className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-medium border ${getAlertStyle(
            alert.alertLevel
          )}`}
        >
          {alert.alertLevel.split(" ")[0]}
        </span>
      </div>

      {/* Alert Readings */}
      <div className="p-2 sm:p-3 border-b border-gray-200 dark:border-gray-700 text-[10px] text-gray-600 dark:text-gray-400 leading-relaxed">
        {alert.alertReadings.split(/(\*\*.*?\*\*)/g).map((part, index) =>
          part.startsWith("**") && part.endsWith("**") ? (
            <strong key={index} className="text-red-600 dark:text-red-400">
              {part.slice(2, -2)}
            </strong>
          ) : (
            part
          )
        )}
      </div>

      {/* Action (Archive Button) */}
      <div className="p-2 sm:p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-center">
        <button
          onClick={() => onArchive(alert.id)}
          className="text-gray-400 hover:text-[#453EFE] transition-colors p-1"
          aria-label="Archive Alert"
        >
          <ArchiveCircleIcon className="w-5 h-5 text-gray-400 hover:text-[#453EFE] transition-colors" />
        </button>
      </div>
    </div>
  );
};

const AlertManagement: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertData[]>([
    {
      id: 1,
      dateTime: "2025-08-17 14:30:45",
      sensorType: "Temperature",
      alertLevel: "White Alert",
      alertReadings:
        "27 - 32°C (Caution): A **Heat Alert** host index has reached 30°C in Barangay Zone A, with water temperature around 27°C. Stay alert, prolonged outdoor activity may cause fatigue.",
    },
    {
      id: 2,
      dateTime: "2025-08-17 14:30:45",
      sensorType: "Humidity",
      alertLevel: "Blue Alert",
      alertReadings:
        "27 - 32°C (Caution): A **Heat Alert** host index has reached 30°C in Barangay Zone A, with water temperature around 27°C. Stay alert, prolonged outdoor activity may cause fatigue.",
    },
    {
      id: 3,
      dateTime: "2025-08-17 14:30:45",
      sensorType: "Wind Speed",
      alertLevel: "Red Alert",
      alertReadings:
        "89 - 117 km/h (Storm-Force / TCWS #3) **Wind Alert**. Wind speed has reached 100 km/h in Barangay Zone C. Moderate to significant structural damage possible, widespread tree damage likely.",
    },
    {
      id: 4,
      dateTime: "2025-08-17 14:30:45",
      sensorType: "Temperature",
      alertLevel: "White Alert",
      alertReadings:
        "27 - 32°C (Caution): A **Heat Alert** host index has reached 30°C in Barangay Zone A, with water temperature around 27°C. Stay alert, prolonged outdoor activity may cause fatigue.",
    },
    {
      id: 5,
      dateTime: "2025-08-17 14:30:45",
      sensorType: "Humidity",
      alertLevel: "Blue Alert",
      alertReadings:
        "27 - 32°C (Caution): A **Heat Alert** host index has reached 30°C in Barangay Zone A, with water temperature around 27°C. Stay alert, prolonged outdoor activity may cause fatigue.",
    },
    {
      id: 6,
      dateTime: "2025-08-17 14:30:45",
      sensorType: "Wind Speed",
      alertLevel: "Red Alert",
      alertReadings:
        "89 - 117 km/h (Storm-Force / TCWS #3) **Wind Alert**. Wind speed has reached 100 km/h in Barangay Zone C. Moderate to significant structural damage possible, widespread tree damage likely.",
    },
    {
      id: 7,
      dateTime: "2025-08-18 09:00:00",
      sensorType: "Rainfall",
      alertLevel: "Blue Alert",
      alertReadings:
        "Moderate Rainfall recorded. **Flood Advisory** for low-lying areas. Monitoring continues.",
    },
    {
      id: 8,
      dateTime: "2025-08-18 10:00:00",
      sensorType: "Temperature",
      alertLevel: "White Alert",
      alertReadings:
        "33°C (Extreme Caution). **Heat Warning**. Recommended to limit outdoor activities.",
    },
    {
      id: 9,
      dateTime: "2025-08-18 11:00:00",
      sensorType: "Wind Speed",
      alertLevel: "Red Alert",
      alertReadings:
        "120 km/h (Typhoon-Force / TCWS #4) **Storm Alert**. Severe damage expected. Evacuation in progress.",
    },
    {
      id: 10,
      dateTime: "2025-08-18 12:00:00",
      sensorType: "Humidity",
      alertLevel: "White Alert",
      alertReadings:
        "Humidity at 90%. **High Humidity Alert**. Risk of heat-related illnesses increased.",
    },
  ]);

  const [searchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAlertData, setNewAlertData] = useState({
    searchBuoy: "",
    dateTime: "",
    sensorType: "Select sensor type",
    alertLevel: "Blue Alert" as "White Alert" | "Blue Alert" | "Red Alert",
    alertReadings: "",
  });

  const [isConfirmArchiveOpen, setIsConfirmArchiveOpen] = useState(false);
  const [isArchiveSuccessOpen, setIsArchiveSuccessOpen] = useState(false);
  const [alertToArchive, setAlertToArchive] = useState<number | null>(null);

  const handleOpenAddModal = () => {
    setNewAlertData({
      searchBuoy: "",
      dateTime: "",
      sensorType: "Select sensor type",
      alertLevel: "Blue Alert",
      alertReadings: "",
    });
    setIsAddModalOpen(true);
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
      alertLevel: newAlertData.alertLevel,
      alertReadings: newAlertData.alertReadings || "No additional message.",
    };
    setAlerts([newAlert, ...alerts]);
    setIsAddModalOpen(false);
  };

  const handleArchive = (id: number) => {
    setAlertToArchive(id);
    setIsConfirmArchiveOpen(true);
  };

  const handleConfirmArchive = () => {
    if (alertToArchive !== null) {
      setAlerts(alerts.filter((alert) => alert.id !== alertToArchive));
      setIsConfirmArchiveOpen(false);
      setAlertToArchive(null);
      setIsArchiveSuccessOpen(true);
    }
  };

  const filteredAlerts = alerts.filter(
    (alert) =>
      alert.sensorType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.alertLevel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.dateTime.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.alertReadings.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAlerts = filteredAlerts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen relative text-gray-900 dark:text-white">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        {/* Header Section */}
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <label className="block text-xl sm:text-2xl font-semibold text-gray-500 dark:text-gray-300">
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
                  Search Buoy
                </h3>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <SearchIcon className="h-5 w-5" />
                  </span>
                  <input
                    id="search-buoy"
                    type="text"
                    placeholder="Search Buoy ID..."
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
                  value="170 General Malvar St. Bagong Barrio Caloocan City"
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
                    value="123.456 E"
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
                    value="123.456 N"
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
                    const isChecked = newAlertData.alertLevel === status;
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
                              alertLevel: e.target.value as
                                | "White Alert"
                                | "Blue Alert"
                                | "Red Alert",
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
                    <option>Temperature</option>
                    <option>Humidity</option>
                    <option>Wind Speed</option>
                  </select>
                </div>
                <div>
                  <button
                    type="button"
                    className="w-full px-4 py-3 text-[#453EFE] border border-[#453EFE] rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                  >
                    Preview: 33 - 41°C (Extreme Caution)
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
                {/* Time range dropdown */}
                <select className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
                  <option>Last 24 hours</option>
                  <option>Last 7 days</option>
                </select>
              </div>

              {/* Table Container */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-x-auto">
                <div className="min-w-full inline-block">
                  {/* Table Header */}
                  <div
                    className="grid text-left text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700"
                    style={{ gridTemplateColumns: "1fr 0.8fr 1fr 2.5fr 0.5fr" }}
                  >
                    <div className="p-2 sm:p-3">Date/Time</div>
                    <div className="p-2 sm:p-3">Sensor Type</div>
                    <div className="p-2 sm:p-3 text-center">CCORDMD Alert Level</div>
                    <div className="p-2 sm:p-3">Alert Readings</div>
                    <div className="p-2 sm:p-3 text-center">Action</div>
                  </div>

                  {/* Table Body (Alert Rows) */}
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {currentAlerts.map((alert) => (
                      <AlertRow
                        key={alert.id}
                        alert={alert}
                        onArchive={handleArchive}
                      />
                    ))}
                  </div>
                </div>
              </div>
                            {/* Broadcast Alert Button (Ibinalik dito sa dulo ng Right Column) */}
              <div className="flex justify-end pt-4">
                  <button
                    onClick={handleOpenAddModal}
                    className="bg-[#453EFE] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center shadow-md font-medium"
                  >
                    <SendIcon className="h-5 w-5 mr-2" /> Broadcast Alert
                  </button>
              </div>
              
              {/* Table Footer/Pagination */}
              <div className="flex flex-col sm:flex-row items-center justify-between pt-2 space-y-2 sm:space-y-0">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(startIndex + itemsPerPage, filteredAlerts.length)}{" "}
                  of **100** Entries
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
                    {[...Array(totalPages)].map((_, i) => (
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

      {/* Add Alert Modal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 z-50 transition-opacity duration-300"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-xs sm:max-w-md overflow-hidden transform transition-all"
            style={{ borderRadius: "15px" }}
          >
            <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-500 dark:text-white">
                Create New Alert
              </h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600 transition-colors dark:text-gray-400 dark:hover:text-gray-200"
                onClick={() => setIsAddModalOpen(false)}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {/* Search Buoy */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Search Buoy
                  </label>
                  <input
                    type="text"
                    placeholder="Search Buoy ID..."
                    className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                {/* Sensor Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
                    className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option disabled>Select sensor type</option>
                    <option>Temperature</option>
                    <option>Humidity</option>
                    <option>Wind Speed</option>
                  </select>
                </div>
                {/* Alert Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Alert Level
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {["White Alert", "Blue Alert", "Red Alert"].map(
                      (status) => (
                        <label
                          key={status}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="radio"
                            name="modalAlertStatus"
                            value={status}
                            checked={newAlertData.alertLevel === status}
                            onChange={(e) =>
                              setNewAlertData({
                                ...newAlertData,
                                alertLevel: e.target.value as
                                  | "White Alert"
                                  | "Blue Alert"
                                  | "Red Alert",
                              })
                            }
                            className="form-radio h-4 w-4 text-[#453EFE] focus:ring-[#453EFE] dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-[#453EFE] dark:focus:ring-offset-gray-800"
                          />
                          <span className="text-gray-700 dark:text-gray-300 text-sm">
                            {status.split(" ")[0]} Alert
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </div>
                {/* Alert Readings/Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Alert Readings/Message
                  </label>
                  <textarea
                    placeholder="Enter alert message..."
                    rows={3}
                    value={newAlertData.alertReadings}
                    onChange={(e) =>
                      setNewAlertData({
                        ...newAlertData,
                        alertReadings: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-[#453EFE] rounded-lg focus:ring-2 focus:ring-[#453EFE] focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                className="bg-[#453EFE] text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center text-sm font-medium"
                onClick={handleSaveNewAlert}
              >
                <SendIcon className="h-5 w-5 mr-1" /> Broadcast Alert
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Archive Confirmation Modal */}
      <Transition appear show={isConfirmArchiveOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsConfirmArchiveOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black bg-opacity-25"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
            />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-xs sm:max-w-sm overflow-hidden transform transition-all text-center p-6"
                  style={{ borderRadius: "15px" }}
                >
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors dark:text-gray-400 dark:hover:text-gray-200"
                    onClick={() => setIsConfirmArchiveOpen(false)}
                  >
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div className="flex flex-col items-center">
                    <AlertTriangleIcon className="h-16 w-16 text-red-500 dark:text-red-400" />
                    <h4 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                      Are you sure you want to archive this alert?
                    </h4>
                  </div>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      className="px-6 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors font-medium text-sm"
                      onClick={handleConfirmArchive}
                    >
                      Yes, I'm sure
                    </button>
                    <button
                      type="button"
                      className="px-6 py-2 rounded-lg text-[#453EFE] border border-[#453EFE] hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-sm"
                      onClick={() => setIsConfirmArchiveOpen(false)}
                    >
                      No, Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Archive Success Modal */}
      <Transition appear show={isArchiveSuccessOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsArchiveSuccessOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black bg-opacity-25"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
            />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-xs sm:max-w-sm overflow-hidden transform transition-all text-center p-6"
                  style={{ borderRadius: "15px" }}
                >
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors dark:text-gray-400 dark:hover:text-gray-200"
                    onClick={() => setIsArchiveSuccessOpen(false)}
                  >
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div className="flex flex-col items-center">
                    <CheckCircleIcon className="h-16 w-16 text-[#453EFE]" />
                    <h4 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                      Alert Archived Successfully!
                    </h4>
                    <button
                      type="button"
                      className="mt-4 px-6 py-2 rounded-lg text-white bg-[#453EFE] hover:bg-blue-700 transition-colors font-medium text-sm"
                      onClick={() => setIsArchiveSuccessOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default AlertManagement;