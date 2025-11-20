/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { Upload, Plus, Archive } from "lucide-react";
import API_BASE_URL from "../../../../config/coreApi";
import { AppContext } from "../../../../context/AppContext";
import { AlertsContainerRef } from "../../../../components/Alert/AlertsContainer";

import ArchiveSlider from "./ArchiveSlider";
import UpdateSlider from "./UpdateSlider";
import AddSlider from "./AddSlider";

// 🧩 Interfaces

export interface SliderData {
  id: number;
  attributes: {
    title: string;
    description: string;
    isArchive: boolean;
    image: string;
    createdDate: string;
    createdTime: string;
    updatedDate: string;
    updatedTime: string;
  };
}

interface Props {
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

const TableSlider = ({ alertsRef }: Props) => {
  const { token } = useContext(AppContext)!;

  // 🔹 State
  const [data, setData] = useState<SliderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedData, setSelectedData] = useState<SliderData | null>(null);
  const [showArchive, setShowArchive] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;

  const fetchSlider = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/sliders`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setData(data.data);
      } else {
        console.error("Failed to fetch sliders:", data);
      }
    } catch (error) {
      console.error("Error fetching sliders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchSlider();
  }, [token]);

  // 🔍 Filter by river name or code
  const filteredBuoys = data.filter((s) => {
    const term = searchTerm.toLowerCase();
    const { title, description, createdDate } = s.attributes;
    return (
      title.toLowerCase().includes(term) ||
      description.toLowerCase().includes(term) ||
      createdDate.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredBuoys.length / itemsPerPage);
  const currentBuoys = filteredBuoys.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className=" bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
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
                  "Image",
                  "Title",
                  "Description",
                  "Status",
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
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white whitespace-nowrap">
                        <img
                          src={a.image ?? "N/A"}
                          alt="Feedback"
                          className="w-10 h-10 rounded-md object-cover" // smaller and neat image
                        />
                      </td>
                      <td
                        className="px-6 py-4 text-sm max-w-xs truncate"
                        title={a.title}
                      >
                        {a.title}
                      </td>

                      <td
                        className="px-6 py-4 text-sm max-w-sm truncate"
                        title={a.description}
                      >
                        {a.description}
                      </td>

                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-0.5 inline-flex text-xs font-medium rounded-full ${
                            a.isArchive === false
                              ? "bg-green-100 text-green-700" // Not archived
                              : a.isArchive === true
                              ? "bg-red-100 text-red-700" // Archived
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {a.isArchive ? "Archived" : "Active"}
                        </span>
                      </td>

                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedData(b);
                            setShowUpdate(true);
                          }}
                          className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg transition"
                        >
                          <Upload className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedData(b);
                            setShowArchive(true);
                          }}
                          className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg transition"
                        >
                          <Archive className="w-5 h-5" />
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

      {showAdd && (
        <AddSlider
          show={showAdd}
          onClose={() => setShowAdd(false)}
          token={token ?? ""}
          alertsRef={alertsRef}
          onAdded={fetchSlider}
        />
      )}

      {showUpdate && selectedData && (
        <UpdateSlider
          show={showUpdate}
          onClose={() => setShowUpdate(false)}
          data={selectedData}
          token={token ?? ""}
          alertsRef={alertsRef}
          onUpdated={fetchSlider}
        />
      )}

      {/* 🧩 Modals */}
      {showArchive && selectedData && (
        <ArchiveSlider
          show={showArchive}
          onClose={() => setShowArchive(false)}
          token={token ?? ""}
          userId={selectedData.id}
          alertsRef={alertsRef}
          onArchived={fetchSlider}
        />
      )}
    </div>
  );
};

export default TableSlider;
