/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { Upload, Fullscreen, Plus } from "lucide-react";
import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import API_BASE_URL from "../../../../config/coreApi";
import { AppContext } from "../../../../context/AppContext";
import { AlertsContainerRef } from "../../../../components/Alert/AlertsContainer";
import ViewBuoyModal from "./ViewBuoyModal";
import UpdateBuoyModal from "./UpdateBuoyModal";
import AddBuoyModal from "./AddBuoyModal";

// 🧩 Interfaces
interface Attributes {
  buoyCode: string;
  riverName: string;
  wallHeight: string;
  riverHectare: string;
  latitude: string;
  longitude: string;
  barangayId: string;
  attachment: string;
  status: string;
  maintenanceAt: string;
  createdDate: string;
  createdTime: string;
  updatedDate: string;
  updatedTime: string;
}

interface barangay {
  id: number;
  barangayCode: string;
  name: string;
  number: number;
  riverWallHeight: string;
  squareMeter: string;
  hectare: string;
  whiteLevelAlert: string;
  blueLevelAlert: string;
  redLevelAlert: string;
  description: string;
  attachment: string;
}

interface BuoyData {
  id: number;
  attributes: Attributes;
  barangay: barangay;
}

interface Props {
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

const BuoyDeployment = ({ alertsRef }: Props) => {
  const { token } = useContext(AppContext)!;

  // 🔹 State
  const [buoys, setBuoys] = useState<BuoyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBuoy, setSelectedBuoy] = useState<BuoyData | null>(null);
  const [showView, setShowView] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;

  useEffect(() => {
    document.title = "Buoy Deployment | X-Stream";
  }, []);

  const fetchBuoys = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/buoys`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setBuoys(data.data);
      } else {
        console.error("Failed to fetch buoys:", data);
      }
    } catch (error) {
      console.error("Error fetching buoys:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchBuoys();
  }, [token]);

  // 🔍 Filter by river name or code
  const filteredBuoys = buoys.filter((b) => {
    const term = searchTerm.toLowerCase();
    const { buoyCode, riverName, status } = b.attributes;
    return (
      buoyCode.toLowerCase().includes(term) ||
      riverName.toLowerCase().includes(term) ||
      status.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredBuoys.length / itemsPerPage);
  const currentBuoys = filteredBuoys.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <PageBreadcrumb pageTitle="Buoy Deployment" />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        {/* Search and Add Button */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search by code, river name, or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-11 w-full sm:w-96 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-4 text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-[#453EFE] focus:border-[#453EFE]"
          />

          {/* Add Buoy Button */}
          <button
            onClick={() => setShowAdd(true)}
            className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg transition"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {[
                  "No.",
                  "Buoy Code",
                  "Attachment",
                  "River",
                  "Barangay",
                  "Status",
                  "Hectare",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={9} className="text-center py-10">
                    <div className="flex justify-center items-center gap-2 text-gray-500">
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#453EFE]" />
                      Loading data...
                    </div>
                  </td>
                </tr>
              ) : currentBuoys.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-10 text-gray-500">
                    <div className="flex items-center justify-center h-full">
                      No buoy records found.
                    </div>
                  </td>
                </tr>
              ) : (
                currentBuoys.map((b, i) => {
                  const a = b.attributes;
                  return (
                    <tr
                      key={b.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm">
                        {startIndex + i + 1}
                      </td>
                      <td className="px-6 py-4 text-sm">{a.buoyCode}</td>

                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white whitespace-nowrap">
                        <img
                          src={a.attachment ?? "N/A"}
                          alt="Feedback"
                          className="w-10 h-10 rounded-md object-cover" // smaller and neat image
                        />
                      </td>
                      <td className="px-6 py-4 text-sm">{a.riverName}</td>
                      <td className="px-6 py-4 text-sm">
                        {b.barangay?.name || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-0.5 inline-flex text-xs font-medium rounded-full ${
                            a.status === "active"
                              ? "bg-green-100 text-green-700"
                              : a.status === "inactive"
                                ? "bg-red-100 text-red-700"
                                : a.status === "maintenance"
                                  ? "bg-gray-200 text-gray-700"
                                  : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {a.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">{a.riverHectare}</td>

                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedBuoy(b);
                            setShowView(true);
                          }}
                          className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg transition"
                        >
                          <Fullscreen className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedBuoy(b);
                            setShowUpdate(true);
                          }}
                          className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg transition"
                        >
                          <Upload className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Showing {startIndex + 1}–
            {Math.min(startIndex + itemsPerPage, filteredBuoys.length)} of{" "}
            {filteredBuoys.length}
          </span>
          <div className="flex space-x-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
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
          </div>
        </div>
      </div>

      {/* 🧩 Modals */}
      {showView && selectedBuoy && (
        <ViewBuoyModal
          show={showView}
          onClose={() => setShowView(false)}
          data={selectedBuoy}
        />
      )}

      {showUpdate && selectedBuoy && (
        <UpdateBuoyModal
          show={showUpdate}
          onClose={() => setShowUpdate(false)}
          data={selectedBuoy}
          token={token ?? ""}
          alertsRef={alertsRef}
          onUpdated={fetchBuoys}
        />
      )}

      {showAdd && (
        <AddBuoyModal
          show={showAdd}
          onClose={() => setShowAdd(false)}
          token={token ?? ""}
          alertsRef={alertsRef}
          onAdded={fetchBuoys}
        />
      )}
    </div>
  );
};

export default BuoyDeployment;
