/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { Upload, Plus, Archive } from "lucide-react";
import API_BASE_URL from "../../../../config/coreApi";
import { AppContext } from "../../../../context/AppContext";
import { AlertsContainerRef } from "../../../../components/Alert/AlertsContainer";

import ArchiveSlider from "./TeamArchive";
import UpdateSlider from "./TeamUpdate";
import AddSlider from "./TeamAdd";

// 🧩 Team Interface
export interface TeamData {
  id: number;
  attributes: {
    userName: string;
    role: string;
    image: string;
    facebookLink: string | null;
    twitterLink: string | null;
    linkedinLink: string | null;
    instagramLink: string | null;
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

const TeamTable = ({ alertsRef, onRefresh }: Props) => {
  const { token } = useContext(AppContext)!;

  // 🔹 State
  const [teams, setTeams] = useState<TeamData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedData, setSelectedData] = useState<TeamData | null>(null);
  const [showArchive, setShowArchive] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;

  // 🛠 Helper function for Pascal Casing (Normalization)
  const toPascalCase = (str: string) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Fetch Active Teams
  const fetchTeams = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/teams`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();

      if (res.ok && data.data) {
        setTeams(data.data);
      } else {
        console.error("Failed to fetch team members:", data);
      }
    } catch (error) {
      console.error("Error fetching teammates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchTeams();
  }, [token]);

  // 🔍 Filter teams
  const filteredTeams = teams.filter((t) => {
    const term = searchTerm.toLowerCase();
    const { userName, role, createdDate } = t.attributes;

    return (
      userName.toLowerCase().includes(term) ||
      role.toLowerCase().includes(term) ||
      createdDate.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredTeams.length / itemsPerPage);
  const currentItems = filteredTeams.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-[auto]">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        {/* Search and Add Button */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search by name, role, or date..."
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
                {["No.", "Image", "Name", "Role", "Status", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                // Loading
                <tr>
                  <td colSpan={6} className="text-center py-10">
                    <div className="flex justify-center items-center gap-2 text-gray-500">
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#453EFE]" />
                      Loading team data...
                    </div>
                  </td>
                </tr>
              ) : currentItems.length === 0 ? (
                // Empty
                <tr>
                  <td colSpan={6} className="py-10 text-gray-500 text-center">
                    No team member records found.
                  </td>
                </tr>
              ) : (
                // Team Rows
                currentItems.map((t, i) => {
                  const a = t.attributes;
                  return (
                    <tr
                      key={t.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm">
                        {startIndex + i + 1}
                      </td>

                      <td className="px-6 py-4 text-sm">
                        <img
                          src={a.image}
                          alt={a.userName}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                        />
                      </td>

                      <td className="px-6 py-4 text-sm">
                        {toPascalCase(a.userName)}
                      </td>

                      <td className="px-6 py-4 text-sm">
                        {toPascalCase(a.role)}
                      </td>

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
                        {/* Update */}
                        <button
                          onClick={() => {
                            setSelectedData(t);
                            setShowUpdate(true);
                          }}
                          className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg"
                        >
                          <Upload className="w-5 h-5" />
                        </button>

                        {/* Archive */}
                        <button
                          onClick={() => {
                            setSelectedData(t);
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
            {Math.min(startIndex + itemsPerPage, filteredTeams.length)} of{" "}
            {filteredTeams.length}
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

      {/* Modals */}
      {showAdd && (
        <AddSlider
          show={showAdd}
          onClose={() => setShowAdd(false)}
          token={token ?? ""}
          alertsRef={alertsRef}
          onAdded={() => {
            fetchTeams();
            onRefresh?.();
          }}
        />
      )}

      {showUpdate && selectedData && (
        <UpdateSlider
          show={showUpdate}
          onClose={() => setShowUpdate(false)}
          data={selectedData}
          token={token ?? ""}
          alertsRef={alertsRef}
          onUpdated={() => {
            fetchTeams();
            onRefresh?.();
          }}
        />
      )}

      {showArchive && selectedData && (
        <ArchiveSlider
          show={showArchive}
          onClose={() => setShowArchive(false)}
          token={token ?? ""}
          TeamId={selectedData.id}
          alertsRef={alertsRef}
          onArchived={() => {
            fetchTeams();
            onRefresh?.();
          }}
        />
      )}
    </div>
  );
};

export default TeamTable;