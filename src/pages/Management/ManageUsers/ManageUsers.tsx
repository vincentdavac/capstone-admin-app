/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useContext, useEffect } from "react";
import { Archive, Fullscreen } from "lucide-react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import API_BASE_URL from "../../../config/coreApi";
import { AlertsContainerRef } from "../../../components/Alert/AlertsContainer";
import { AppContext } from "../../../context/AppContext";

import UpdateUserModal from ".//UpdateUserModal";
import ArchiveUserModal from "./ArchiveUserModal";

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
  isActive: boolean;
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

const ManageUsers = ({ alertsRef }: Props) => {
  const { user, token } = useContext(AppContext)!;

  // state:
  const [showUpdate, setShowUpdate] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // handlers:
  const handleUpdateClick = (u: UserData) => {
    setSelectedUser(u);
    setShowUpdate(true);
  };

  const handleArchiveClick = (u: UserData) => {
    setSelectedUser(u);
    setShowArchive(true);
  };

  const [users, setUsers] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const res = await response.json();

      if (response.ok && res.data) {
        setUsers(res.data);
      } else {
        console.error("Failed to fetch users:", res);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id && token) fetchUsers();
  }, [user, token]);

  // ✅ Updated search to handle nested attributes
  const filteredUsers = users.filter((u) => {
    const { firstName, lastName, email, barangay } = u.attributes;
    const fullName = `${firstName} ${lastName}`.toLowerCase();
    const brgy = barangay?.name?.toLowerCase() ?? "";
    const term = searchTerm.toLowerCase();

    return (
      fullName.includes(term) ||
      email.toLowerCase().includes(term) ||
      brgy.includes(term)
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen relative text-gray-900 dark:text-white">
      <PageBreadcrumb pageTitle="Manage Users" />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        {/* 🔍 Search Bar */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
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
              placeholder="Search by name, email, or barangay..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
            />
          </form>
        </div>

        {/* 📋 Users Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  No.
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  Profile
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  Contact No.
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  Email
                </th>

                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  Barangay
                </th>

                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  Actions
                </th>
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
              ) : currentUsers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-10 text-gray-500">
                    No user records found.
                  </td>
                </tr>
              ) : (
                currentUsers.map((u, i) => {
                  const a = u.attributes;
                  return (
                    <tr
                      key={u.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white whitespace-nowrap">
                        {startIndex + i + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white whitespace-nowrap">
                        <img
                          src={a.image ?? ""}
                          alt="User"
                          className="w-10 h-10 rounded-md object-cover"
                        />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white whitespace-nowrap">
                        {a.firstName} {a.lastName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        {a.contactNumber ?? "—"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        {a.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        {a.barangay?.name ?? "—"}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <span
                          className={`px-3 py-0.5 inline-flex text-xs font-medium rounded-full ${
                            a.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {a.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        {a.isAdmin ? "Admin" : "User"}
                      </td>
                      <td className="px-6 py-4 flex flex-row gap-2">
                        <button
                          onClick={() => handleUpdateClick(u)}
                          className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg transition"
                        >
                          <Fullscreen className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleArchiveClick(u)}
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
        <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of{" "}
              {filteredUsers.length} entries
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50"
              >
                Previous
              </button>
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
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <UpdateUserModal
        show={showUpdate}
        onClose={() => setShowUpdate(false)}
        token={token ?? ""}
        userId={selectedUser?.id ?? null}
        userData={selectedUser?.attributes}
        onUpdated={fetchUsers}
        alertsRef={alertsRef}
      />

      <ArchiveUserModal
        show={showArchive}
        onClose={() => setShowArchive(false)}
        token={token ?? ""}
        userId={selectedUser?.id ?? null}
        onArchived={fetchUsers}
        alertsRef={alertsRef}
        userData={selectedUser?.attributes}
      />
    </div>
  );
};

export default ManageUsers;
