/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { ArchiveRestore, Phone } from "lucide-react";
import API_BASE_URL from "../../../../config/coreApi";
import { AppContext } from "../../../../context/AppContext";
import { AlertsContainerRef } from "../../../../components/Alert/AlertsContainer";
import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";

import RestoreHotlineModal from "./HotlinesRestore";
import { insertingAlerts } from "../../../../api_hooks/dashboardHooks";
import { useAlertMonitor } from "../../../../api_hooks/alertMonitoringHooks";
import AlertModal from "../../../Barangay/AlertManagement/alertModal";
export interface HotlineData {
  id: number;
  attributes: {
    number: string;
    description: string;
    isArchived: boolean;
    createdDate: string;
    createdTime: string;
    updatedDate: string;
    updatedTime: string;
  };
}

interface Props {
  alertsRef: React.RefObject<AlertsContainerRef | null>;
  onRefresh?: () => void;
}

const HotlinesArchivedTable: React.FC<Props> = ({ alertsRef, onRefresh }) => {
  const { token,user } = useContext(AppContext)!;

  /* 🔹 State */
  const [hotlines, setHotlines] = useState<HotlineData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedHotline, setSelectedHotline] = useState<HotlineData | null>(
    null
  );
  const [showRestore, setShowRestore] = useState(false);

  /* Pagination */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;

  useEffect(() => {
    document.title = "Archived Hotlines | X-Stream";
  }, []);

  /* 🔄 Fetch Archived Hotlines */
  const fetchArchivedHotlines = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/hotlines/archived`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();

      if (res.ok && data.data) {
        setHotlines(data.data);
      } else {
        console.error("Failed to fetch archived hotlines:", data);
      }
    } catch (error) {
      console.error("Error fetching archived hotlines:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchArchivedHotlines();
  }, [token]);

  /* 🔍 Search */
  const filteredHotlines = hotlines.filter((h) => {
    const term = searchTerm.toLowerCase();
    return (
      h.attributes.description.toLowerCase().includes(term) ||
      h.attributes.number.toLowerCase().includes(term) ||
      h.attributes.createdDate.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredHotlines.length / itemsPerPage);
  const currentItems = filteredHotlines.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const buoyCode = user?.barangay?.buoys?.[0]?.buoyCode;
  const buoyId = user?.barangay?.buoys?.[0]?.id;
  const { showAlert, currentAlert, handleClose } = useAlertMonitor(
    buoyCode?.toString() ?? "",
    5000,
    buoyId?.toString() ?? "",
  );
  insertingAlerts();
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <PageBreadcrumb pageTitle="Archived Hotlines" />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-normal text-gray-500 dark:text-white">
            Manage Archived Hotlines
          </h2>
        </div>

        {/* Search */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <input
            type="text"
            placeholder="Search by description, number, or date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-11 w-full sm:w-96 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-4 text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-[#453EFE]"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 dark:border-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {[
                  "No.",
                  "Hotline",
                  "Description",
                  "Status",
                  "Created",
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
                  <td colSpan={6} className="py-10 text-center">
                    <div className="flex justify-center items-center gap-2 text-gray-500">
                      <span className="animate-spin h-5 w-5 rounded-full border-b-2 border-[#453EFE]" />
                      Loading archived hotlines...
                    </div>
                  </td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-gray-500">
                    No archived hotlines found.
                  </td>
                </tr>
              ) : (
                currentItems.map((h, i) => {
                  const a = h.attributes;
                  return (
                    <tr
                      key={h.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 text-sm">
                        {startIndex + i + 1}
                      </td>

                      <td className="px-6 py-4 text-sm flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        {a.number}
                      </td>

                      <td className="px-6 py-4 text-sm">{a.description}</td>

                      <td className="px-6 py-4 text-sm">
                        <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-700">
                          Archived
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm">
                        {a.createdDate} <br />
                        <span className="text-xs text-gray-500">
                          {a.createdTime}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setSelectedHotline(h);
                            setShowRestore(true);
                          }}
                          className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg"
                        >
                          <ArchiveRestore className="w-5 h-5" />
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
            {Math.min(startIndex + itemsPerPage, filteredHotlines.length)} of{" "}
            {filteredHotlines.length}
          </span>

          <div className="flex gap-2">
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

      {/* Restore Modal */}
      {showRestore && selectedHotline && (
        <RestoreHotlineModal
          show={showRestore}
          onClose={() => setShowRestore(false)}
          hotlineId={selectedHotline.id}
          token={token ?? ""}
          alertsRef={alertsRef}
          onRestored={() => {
            fetchArchivedHotlines();
            onRefresh?.();
          }}
        />
      )}
      <AlertModal
          isOpen={showAlert}
          alert={currentAlert}
          onClose={handleClose}
        />
    </div>
  );
};

export default HotlinesArchivedTable;
