/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useContext, useEffect } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import API_BASE_URL from "../../../config/coreApi";
import { AlertsContainerRef } from "../../../components/Alert/AlertsContainer";
import { AppContext } from "../../../context/AppContext";

import UsersTableHeader from "../../../components/Manage User/UsersTableHeader";
import UsersTable from "./UsersTable";
import UsersPagination from "../../../components/Manage User/UsersPagination";

import UpdateUserModal from "./UpdateUserModal";
import ArchiveUserModal from "./ArchiveUserModal";
import { Users, UserCheck } from "lucide-react";

interface BuoyData {
  id: number;
  buoyCode: string;
  riverName: string;
  status: string;
}

interface BarangayData {
  id: number;
  name: string;
  number?: number | null;
  buoys?: BuoyData[];
}

interface VerifierData {
  id: number;
  name: string;
}

export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  houseNo: string;
  street: string;
  barangay: BarangayData | null;
  municipality: string | null;
  userType: "admin" | "barangay" | "user";
  isActive: boolean;
  registrationStatus: boolean;
  image: string | null;
  idDocument: string | null;
  dateVerified: string | null;
  emailVerifiedAt?: string | null;
  verifiedBy?: number | null;
  verifier?: VerifierData | null;
  createdDate?: string | null;
  createdTime?: string | null;
  updatedDate?: string | null;
  updatedTime?: string | null;
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
  const [users, setUsers] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const inputRef = useRef<HTMLInputElement>(
    null,
  ) as React.RefObject<HTMLInputElement>;

  useEffect(() => {
    document.title = "Manage Users | X-Stream";
  }, []);

  // Helper function to convert string to Pascal Case
  const toPascalCase = (str: string | null | undefined) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // handlers:
  const handleUpdateClick = (u: UserData) => {
    setSelectedUser(u);
    setShowUpdate(true);
  };

  const handleArchiveClick = (u: UserData) => {
    setSelectedUser(u);
    setShowArchive(true);
  };

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/active-users`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const res = await response.json();

      if (response.ok && res.data) {
        // Normalize data to Pascal Case before setting state
        const normalizedData = res.data.map((u: UserData) => ({
          ...u,
          firstName: toPascalCase(u.firstName),
          lastName: toPascalCase(u.lastName),
          street: toPascalCase(u.street),
          municipality: toPascalCase(u.municipality),
          barangay: u.barangay
            ? { ...u.barangay, name: toPascalCase(u.barangay.name) }
            : null,
          verifier: u.verifier
            ? { ...u.verifier, name: toPascalCase(u.verifier.name) }
            : null,
        }));
        setUsers(normalizedData);
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

  // --- Filtering and Pagination Logic ---
  const filteredUsers = users.filter((u) => {
    const { firstName, lastName, email, barangay } = u;
    const fullName = `${firstName} ${lastName}`.toLowerCase();
    const brgy = barangay?.name?.toLowerCase() ?? "";
    const term = searchTerm.toLowerCase();

    return (
      fullName.includes(term) ||
      email.toLowerCase().includes(term) ||
      brgy.includes(term)
    );
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );
  // --- END Logic ---

  return (
    <div className="p-4 md:p-8 bg-[#F8FAFC] dark:bg-[#0F172A] min-h-screen relative text-slate-900 dark:text-slate-100">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <PageBreadcrumb pageTitle="Manage Users" />
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Maintain and monitor user accounts and registration statuses.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                <Users size={18} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-1">
                  Total
                </p>
                <p className="text-lg font-bold leading-none">{users.length}</p>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-3">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                <UserCheck size={18} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-1">
                  Active
                </p>
                <p className="text-lg font-bold leading-none">
                  {users.filter((u) => u.isActive).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Table Container Card */}
        <div className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-all duration-300">
          {/* 1. Header (Search Bar Area) */}
          <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/30">
            <UsersTableHeader
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              inputRef={inputRef}
            />
          </div>

          {/* 2. Users Table - Wrapped for better overflow handling */}
          <div className="relative overflow-hidden">
            <UsersTable
              currentUsers={currentUsers}
              loading={loading}
              startIndex={startIndex}
              handleUpdateClick={handleUpdateClick}
              handleArchiveClick={handleArchiveClick}
            />
          </div>

          {/* 3. Pagination Footer */}
          <div className="px-6 py-5 border-t border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/30">
            <UsersPagination
              currentPage={currentPage}
              totalPages={totalPages}
              filteredUsersLength={filteredUsers.length}
              itemsPerPage={itemsPerPage}
              startIndex={startIndex}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>

      {/* Modals remain functionally identical */}
      <UpdateUserModal
        show={showUpdate}
        onClose={() => setShowUpdate(false)}
        token={token ?? ""}
        userId={selectedUser?.id ?? null}
        userData={selectedUser ?? undefined}
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
        userData={selectedUser ?? undefined}
      />
    </div>
  );
};

export default ManageUsers;
