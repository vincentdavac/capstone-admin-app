/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useContext, useEffect } from "react";
import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import API_BASE_URL from "../../../../config/coreApi";
import { AlertsContainerRef } from "../../../../components/Alert/AlertsContainer";
import { AppContext } from "../../../../context/AppContext";

import UsersTableHeader from "../../../../components/Manage User/UsersTableHeader";
import UsersTable from "./UsersTable";
import UsersPagination from "../../../../components/Manage User/UsersPagination";
import RestoreUserModal from "./RestoreUserModal";
import { insertingAlerts } from "../../../../api_hooks/dashboardHooks";
import { useAlertMonitor } from "../../../../api_hooks/alertMonitoringHooks";
import AlertModal from "../../../Barangay/AlertManagement/alertModal";
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

const BarangayArchivedUsers = ({ alertsRef }: Props) => {
  const { user, token } = useContext(AppContext)!;

  const [showArchive, setShowArchive] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const inputRef = useRef<HTMLInputElement>(
    null
  ) as React.RefObject<HTMLInputElement>;

  // handlers:
  const handleUpdateClick = (u: UserData) => {
    setSelectedUser(u);
  };

  const handleArchiveClick = (u: UserData) => {
    setSelectedUser(u);
    setShowArchive(true);
  };

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/archived-users`, {
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
    startIndex + itemsPerPage
  );
  insertingAlerts();
  const buoyCode = user?.barangay?.buoys?.[0]?.buoyCode;
  const buoyId = user?.barangay?.buoys?.[0]?.id;
  const { showAlert, currentAlert, handleClose } = useAlertMonitor(
    buoyCode?.toString() ?? "",
    5000,
    buoyId?.toString() ?? "",
  );

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen relative text-gray-900 dark:text-white">
      <PageBreadcrumb pageTitle="Archived Users" />
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <UsersTableHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          inputRef={inputRef}
        />
        <UsersTable
          currentUsers={currentUsers}
          loading={loading}
          startIndex={startIndex}
          handleUpdateClick={handleUpdateClick}
          handleArchiveClick={handleArchiveClick}
        />
        <UsersPagination
          currentPage={currentPage}
          totalPages={totalPages}
          filteredUsersLength={filteredUsers.length}
          itemsPerPage={itemsPerPage}
          startIndex={startIndex}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <RestoreUserModal
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

export default BarangayArchivedUsers;
