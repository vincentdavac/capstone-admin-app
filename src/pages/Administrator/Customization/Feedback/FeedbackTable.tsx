/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { Archive } from "lucide-react";
import API_BASE_URL from "../../../../config/coreApi";
import { AppContext } from "../../../../context/AppContext";
import { AlertsContainerRef } from "../../../../components/Alert/AlertsContainer";

import ArchiveSlider from "./FeedbackArchive";

// 🧩 Feedback Interface
export interface FeedbackData {
  id: number;
  attributes: {
    userName: string;
    userImage: string;
    rate: number;
    feedback: string;
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

const FeedbackTable = ({ alertsRef, onRefresh }: Props) => {
  const { token } = useContext(AppContext)!;

  // 🔹 State
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedData, setSelectedData] = useState<FeedbackData | null>(null);
  const [showArchive, setShowArchive] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;

  // Fetch Feedbacks
  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/active-feedbacks`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();

      if (res.ok && data.data) {
        setFeedbacks(data.data);
      } else {
        console.error("Failed to fetch feedbacks:", data);
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchFeedbacks();
  }, [token]);

  // 🔍 Filter feedbacks
  const filteredFeedbacks = feedbacks.filter((f) => {
    const term = searchTerm.toLowerCase();
    const { userName, feedback, createdDate } = f.attributes;

    return (
      userName.toLowerCase().includes(term) ||
      feedback.toLowerCase().includes(term) ||
      createdDate.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage);
  const currentItems = filteredFeedbacks.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-[auto]">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        {/* Search */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search by name, feedback, or date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-11 w-full sm:w-96 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-4 text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-[#453EFE] focus:border-[#453EFE]"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {[
                  "No.",
                  "Image",
                  "Name",
                  "Feedback",
                  "Rating",
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
                  <td colSpan={7} className="text-center py-10">
                    <div className="flex justify-center items-center gap-2 text-gray-500">
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#453EFE]" />
                      Loading feedbacks...
                    </div>
                  </td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-gray-500 text-center">
                    No feedback records found.
                  </td>
                </tr>
              ) : (
                currentItems.map((f, i) => {
                  const a = f.attributes;
                  return (
                    <tr
                      key={f.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm">
                        {startIndex + i + 1}
                      </td>

                      <td className="px-6 py-4 text-sm">
                        <img
                          src={a.userImage}
                          alt={a.userName}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                        />
                      </td>

                      <td className="px-6 py-4 text-sm">{a.userName}</td>

                      <td className="px-6 py-4 text-sm">{a.feedback}</td>

                      <td className="px-6 py-4 text-sm">{a.rate}</td>

                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-0.5 inline-flex text-xs font-medium rounded-full ${
                            a.isArchived
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {a.isArchived ? "Archived" : "Active"}
                        </span>
                      </td>

                      <td className="px-6 py-4 flex gap-2">
                        {/* Archive */}
                        <button
                          onClick={() => {
                            setSelectedData(f);
                            setShowArchive(true);
                          }}
                          className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg"
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
            {Math.min(startIndex + itemsPerPage, filteredFeedbacks.length)} of{" "}
            {filteredFeedbacks.length}
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

      {showArchive && selectedData && (
        <ArchiveSlider
          show={showArchive}
          onClose={() => setShowArchive(false)}
          token={token ?? ""}
          FeedbackId={selectedData.id}
          alertsRef={alertsRef}
          onArchived={() => {
            fetchFeedbacks();
            onRefresh?.();
          }}
        />
      )}
    </div>
  );
};

export default FeedbackTable;
