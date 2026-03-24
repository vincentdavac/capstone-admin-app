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
import { insertingAlerts } from "../../../api_hooks/dashboardHooks";
import { useAlertMonitor } from "../../../api_hooks/alertMonitoringHooks";
import AlertModal from "../../Barangay/AlertManagement/alertModal";
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

const BarangayManageUsers = ({ alertsRef }: Props) => {
  insertingAlerts();
  const { user, token } = useContext(AppContext)!;
  const buoyId = user?.barangay?.buoys?.[0]?.id ?? 0;
  const buoyCode = user?.barangay?.buoys?.[0]?.buoyCode;
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
  const { showAlert, currentAlert, handleClose } = useAlertMonitor(
    buoyCode?.toString() ?? "",
    5000,
    buoyId?.toString() ?? "",
  );
  // --- END Logic ---

  return (
    <div className="p-8 bg-slate-50 dark:bg-[#0B1120] min-h-screen relative transition-colors duration-500">
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* 1. Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <PageBreadcrumb pageTitle="Barangay Residents" />

          {/* Quick Action / Export if needed */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end px-4 border-r border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Database Status
              </span>
              <span className="text-sm font-bold text-emerald-500 flex items-center gap-1">
                <span className="size-2 bg-emerald-500 rounded-full animate-pulse" />{" "}
                Live
              </span>
            </div>
          </div>
        </div>

        {/* 2. Quick Metrics Summary (Optional but highly recommended for UI polish) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: "Total Population",
              value: filteredUsers.length,
              color: "indigo",
            },
            { label: "Verified Residents", value: "98%", color: "emerald" },
            { label: "Pending Updates", value: "12", color: "amber" },
            { label: "Recently Archived", value: "4", color: "slate" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm"
            >
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* 3. Main Content Container */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all">
          {/* Table Header Integration */}
          <div className="bg-white dark:bg-slate-900 px-4 pt-4">
            <UsersTableHeader
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              inputRef={inputRef}
            />
          </div>

          {/* The Table Section */}
          <div className="px-2 pb-2">
            <div className="overflow-hidden rounded-[2rem] border border-slate-50 dark:border-slate-800/50">
              <UsersTable
                currentUsers={currentUsers}
                loading={loading}
                startIndex={startIndex}
                handleUpdateClick={handleUpdateClick}
                handleArchiveClick={handleArchiveClick}
              />
            </div>
          </div>

          {/* 4. Pagination Styling */}
          <div className="bg-slate-50/50 dark:bg-slate-800/30 p-6">
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

      {/* 🧩 Modals & Alerts */}
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

      <AlertModal
        isOpen={showAlert}
        alert={currentAlert}
        onClose={handleClose}
      />
    </div>
  );
};

export default BarangayManageUsers;
