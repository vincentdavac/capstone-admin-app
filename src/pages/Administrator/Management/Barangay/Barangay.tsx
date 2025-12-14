/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { Upload, Fullscreen, Plus } from "lucide-react";
import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import API_BASE_URL from "../../../../config/coreApi";
import { AppContext } from "../../../../context/AppContext";
import { AlertsContainerRef } from "../../../../components/Alert/AlertsContainer";

import ViewBarangayModal from "./ViewBarangayModal";
import UpdateBarangayModal from "./UpdateBarangayModal";
import AddBarangayModal from "./AddBarangayModal";

// 🧩 Interfaces
interface Attributes {
  barangayCode: string;
  name: string;
  number: number;
  riverWallHeight: number;
  squareMeter: number;
  hectare: number;
  whiteLevelAlert: number;
  blueLevelAlert: number;
  redLevelAlert: number;
  description: string;
  attachment: string;
  createdDate: string;
  createdTime: string;
  updatedDate: string;
  updatedTime: string;
}

interface Barangay {
  id: number;
  attributes: Attributes;
}

interface Props {
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

const Barangay = ({ alertsRef }: Props) => {
  const { token } = useContext(AppContext)!;

  // 🔹 State
  const [barangays, setBarangays] = useState<Barangay[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBarangay, setSelectedBarangay] = useState<Barangay | null>(
    null
  );
  const [showView, setShowView] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;

  useEffect(() => {
    document.title = "Barangay | X-Stream";
  }, []);

  // ✅ Fetch Barangays
  const fetchBarangays = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/barangays`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setBarangays(data.data);
      } else {
        console.error("Failed to fetch barangays:", data);
      }
    } catch (error) {
      console.error("Error fetching barangays:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchBarangays();
  }, [token]);

  // 🔍 Filter by name or code
  const filteredBarangays = barangays.filter((b) => {
    const term = searchTerm.toLowerCase();
    const { barangayCode, name } = b.attributes;
    return (
      barangayCode.toLowerCase().includes(term) ||
      name.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredBarangays.length / itemsPerPage);
  const currentBarangays = filteredBarangays.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <PageBreadcrumb pageTitle="Barangay Management" />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        {/* Search and Add Button */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search by barangay name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-11 w-full sm:w-96 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-4 text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-[#453EFE] focus:border-[#453EFE]"
          />

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
                  "Barangay Code",
                  "Attachment",
                  "Name",
                  "River Wall Height",
                  "Hectare",
                  "Alerts (W/B/R)",
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
                  <td colSpan={8} className="text-center py-10">
                    <div className="flex justify-center items-center gap-2 text-gray-500">
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#453EFE]" />
                      Loading data...
                    </div>
                  </td>
                </tr>
              ) : currentBarangays.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-gray-500">
                    No barangay records found.
                  </td>
                </tr>
              ) : (
                currentBarangays.map((b, i) => {
                  const a = b.attributes;
                  return (
                    <tr
                      key={b.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm">
                        {startIndex + i + 1}
                      </td>
                      <td className="px-6 py-4 text-sm">{a.barangayCode}</td>
                      <td className="px-6 py-4">
                        {a.attachment ? (
                          <img
                            src={a.attachment}
                            alt={a.name}
                            className="w-10 h-10 rounded-md object-cover"
                          />
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">{a.name}</td>
                      <td className="px-6 py-4 text-sm">{a.riverWallHeight}</td>
                      <td className="px-6 py-4 text-sm">{a.hectare}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="text-gray-700 dark:text-gray-300">
                          {a.whiteLevelAlert}/{a.blueLevelAlert}/
                          {a.redLevelAlert}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedBarangay(b);
                            setShowView(true);
                          }}
                          className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg transition"
                        >
                          <Fullscreen className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedBarangay(b);
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
            {Math.min(startIndex + itemsPerPage, filteredBarangays.length)} of{" "}
            {filteredBarangays.length}
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
      {showView && selectedBarangay && (
        <ViewBarangayModal
          show={showView}
          onClose={() => setShowView(false)}
          data={selectedBarangay}
        />
      )}

      {showUpdate && selectedBarangay && (
        <UpdateBarangayModal
          show={showUpdate}
          onClose={() => setShowUpdate(false)}
          data={selectedBarangay}
          token={token ?? ""}
          alertsRef={alertsRef}
          onUpdated={fetchBarangays}
        />
      )}

      {showAdd && (
        <AddBarangayModal
          show={showAdd}
          onClose={() => setShowAdd(false)}
          token={token ?? ""}
          alertsRef={alertsRef}
          onAdded={fetchBarangays}
        />
      )}
    </div>
  );
};

export default Barangay;
