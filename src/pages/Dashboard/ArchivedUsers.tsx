/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useContext, useEffect } from "react";
import { RotateCcw } from "lucide-react"; 
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import API_BASE_URL from "../../config/coreApi";
import { AlertsContainerRef } from "../../components/Alert/AlertsContainer";
import { AppContext } from "../../context/AppContext";


interface BarangayData {
  id: number;
  name: string;
}

interface UserAttributes {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  houseNo: string;
  street: string;
  barangay: BarangayData | null;
  municipality: string | null;
  isAdmin: boolean;
  isActive: boolean; // Dapat false ito para sa Archived Users
  image: string | null;
  imageUrl: string | null;
  createdDate: string | null;
  createdTime: string | null;
  updatedDate: string | null;
  updatedTime: string | null;
}

interface UserData {
  id: number;
  attributes: UserAttributes;
}

interface Props {
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

// eslint-disable-next-line no-empty-pattern
const ArchivedUsers = ({ }: Props) => {
  const { user, token } = useContext(AppContext)!;

  // state:
  const [, setShowRestore] = useState(false); // Para sa Restore Modal
  const [, setSelectedUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // handlers:
  const handleRestoreClick = (u: UserData) => {
    setSelectedUser(u);
    setShowRestore(true);
  };

  const [archivedUsers, setArchivedUsers] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Ibinase sa ManageUsers

  const fetchArchivedUsers = async () => {
    setLoading(true);

    try {
      // ✅ Ipagpalagay na ang endpoint para sa archived users ay '/users/archived'
      // o mayroong filter parameter ang '/users' (e.g., ?archived=true).
      // Gagamitin ko ang '?archived=true' sa pag-aakala na ito ay karaniwan.
      const response = await fetch(`${API_BASE_URL}/users?archived=true`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const res = await response.json();

      if (response.ok && res.data) {
        // I-filter ang data kung hindi gumana ang server side filter,
        // bagaman mas maganda kung server side ang filtering.
        setArchivedUsers(res.data.filter((u: UserData) => !u.attributes.isActive));
      } else {
        console.error("Failed to fetch archived users:", res);
      }
    } catch (error) {
      console.error("Error fetching archived users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id && token) fetchArchivedUsers();
  }, [user, token]);

  // ✅ Updated search to handle nested attributes (based on ManageUsers.tsx)
  const filteredUsers = archivedUsers.filter((u) => {
    const { firstName, lastName, email } = u.attributes;
    const fullName = `${firstName} ${lastName}`.toLowerCase();
    const term = searchTerm.toLowerCase();

    return (
      fullName.includes(term) ||
      email.toLowerCase().includes(term)
      // I-disable muna ang barangay search dahil hindi ito nakikita sa screenshot
      // || brgy.includes(term) 
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // TINANGGAL ANG handleExportCSV FUNCTION


  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen relative text-gray-900 dark:text-white">
      <PageBreadcrumb pageTitle="Archive Users" />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-normal text-gray-500 dark:text-white">
            Archive Users
          </h2>
        </div>
        
        {/* 🔍 Search Bar - TINANGGAL ANG EXPORT CSV BUTTON */}
        <div className="p-6 border-t border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-end">
            {/* Search Bar (Updated style based on screenshot) */}
          <form
            onSubmit={(e) => {
              return e.preventDefault();
            }}
            className="relative w-full sm:w-auto"
          >
            <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className="fill-gray-500 dark:fill-gray-400"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                  fill=""
                />
              </svg>
            </span>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
            />
          </form>
        </div>

        {/* 📋 Archived Users Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  Contact Number
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  Email Address
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-10">
                    <div className="flex justify-center items-center gap-2 text-gray-500">
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#453EFE]" />
                      Loading data...
                    </div>
                  </td>
                </tr>
              ) : currentUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-500">
                    No archived user records found.
                  </td>
                </tr>
              ) : (
                currentUsers.map((u) => {
                  const a = u.attributes;
                  return (
                    <tr
                      key={u.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white whitespace-nowrap">
                        {a.firstName} {a.lastName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        {a.contactNumber ?? "—"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        {a.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-0.5 inline-flex text-xs font-medium rounded-full bg-red-100 text-red-700">
                          Archived
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {/* Restore Button (Based on Screenshot - I assumed the icon is a standard action button) */}
                        <button
                          onClick={() => handleRestoreClick(u)}
                          className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg transition"
                          title="Restore User"
                        >
                          <RotateCcw className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination (Updated style based on screenshot) */}
        <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of{" "}
              {filteredUsers.length} Entries
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                // Updated style
                className="px-3 py-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 transition-colors"
              >
                Previous
              </button>
              {/* Pagination buttons based on totalPages */}
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  // Updated style to use the main brand color
                  className={`px-3 py-1 text-sm rounded ${
                    currentPage === i + 1
                      ? "bg-[#453EFE] text-white"
                      : "hidden" // Itinago ang number buttons para tumugma sa screenshot
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
                // Updated style for Next button to match the brand color box in the screenshot
                className={`px-3 py-1 text-sm rounded transition ${
                  currentPage === totalPages
                    ? "bg-[#453EFE] text-white disabled:bg-[#453EFE] disabled:opacity-100" // Disabled state should be the same color
                    : "bg-[#453EFE] text-white hover:bg-indigo-700"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ArchivedUsers;