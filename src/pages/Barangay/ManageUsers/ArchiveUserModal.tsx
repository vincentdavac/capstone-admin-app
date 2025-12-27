/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import API_BASE_URL from "../../../config/coreApi";
import { AlertsContainerRef } from "../../../components/Alert/AlertsContainer";

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
  show: boolean;
  onClose: () => void;
  userId: number | null;
  token: string;
  onArchived?: () => void;
  userData?: UserData;

  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

const ArchiveUserModal: React.FC<Props> = ({
  show,
  onClose,
  userId,
  token,
  onArchived,
  userData,
  alertsRef,
}) => {
  if (!show || !userId) return null;

  const [formData, setFormData] = useState<UserData | null>(null);

  useEffect(() => {
    if (userData) setFormData(userData);
  }, [userData]);

  const handleArchive = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/barangay/archived-user/${userId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          // Only send is_active
          body: JSON.stringify({
            is_active: 0,
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        console.log("User updated successfully:", data);

        // Trigger alert
        alertsRef.current?.addAlert(
          "success",
          `User has beena archived successfully!`
        );

        onArchived?.();
        onClose();
      } else {
        const errorData = await res.json();
        console.error("Failed to update user:", errorData);

        // Laravel validation error format { errors: { field: ["msg"] }}
        if (errorData.errors) {
          Object.values(errorData.errors).forEach((messages) => {
            (messages as string[]).forEach((msg) => {
              alertsRef.current?.addAlert("error", msg);
            });
          });
        } else {
          // General API error: { status: "error", message: "...", data: null }
          const errorMessage =
            typeof errorData.message === "string"
              ? errorData.message
              : typeof errorData.data === "string"
              ? errorData.data
              : "An error occurred while processing your request.";

          alertsRef.current?.addAlert("error", errorMessage);
        }
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alertsRef.current?.addAlert(
        "error",
        "An error occurred while updating user."
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="relative bg-white/90 dark:bg-gray-900/90 border border-white/20 rounded-2xl shadow-2xl w-full max-w-lg p-8 z-[10000] overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <AlertTriangle className="text-yellow-500 mb-3" size={40} />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Archive User?
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            This action will mark the user as archived. You can restore this
            user{" "}
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {formData?.firstName} {formData?.lastName}
            </span>{" "}
            later if needed.
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleArchive}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchiveUserModal;
