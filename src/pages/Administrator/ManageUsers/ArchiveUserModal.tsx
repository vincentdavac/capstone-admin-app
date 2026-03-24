/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { X, Archive, UserX } from "lucide-react";
import API_BASE_URL from "../../../config/coreApi";
import { AlertsContainerRef } from "../../../components/Alert/AlertsContainer";

// ... (Interfaces remain unchanged to ensure logic stability)
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
        `${API_BASE_URL}/admin/archived-barangay/${userId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ is_active: 0 }),
        },
      );

      if (res.ok) {
        alertsRef.current?.addAlert(
          "success",
          `User has been archived successfully!`,
        );
        onArchived?.();
        onClose();
      } else {
        const errorData = await res.json();
        if (errorData.errors) {
          Object.values(errorData.errors).forEach((messages) => {
            (messages as string[]).forEach((msg) => {
              alertsRef.current?.addAlert("error", msg);
            });
          });
        } else {
          const errorMessage =
            typeof errorData.message === "string"
              ? errorData.message
              : "An error occurred while processing your request.";
          alertsRef.current?.addAlert("error", errorMessage);
        }
      }
    } catch (error) {
      alertsRef.current?.addAlert(
        "error",
        "An error occurred while updating user.",
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[9999] p-4">
      <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Top Decorative Danger Bar */}
        <div className="h-2 w-full bg-red-500" />

        <div className="p-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col items-center text-center">
            {/* Warning Icon Container */}
            <div className="w-20 h-20 rounded-3xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-6 ring-8 ring-red-50/50 dark:ring-red-900/10">
              <UserX className="text-red-500" size={40} />
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Archive User?
            </h3>

            <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
              You are about to archive{" "}
              <span className="font-bold text-slate-900 dark:text-slate-200">
                {formData?.firstName} {formData?.lastName}
              </span>
              . This will restrict their access to the system, but their data
              will remain preserved in the archives.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col w-full gap-3">
              <button
                onClick={handleArchive}
                className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold shadow-lg shadow-red-200 dark:shadow-none transition-all flex items-center justify-center gap-2"
              >
                <Archive size={18} />
                Confirm Archive
              </button>

              <button
                onClick={onClose}
                className="w-full py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-bold transition-all"
              >
                Cancel
              </button>
            </div>

            <p className="mt-6 text-[11px] text-slate-400 uppercase tracking-widest font-medium">
              This action can be reversed by an administrator
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchiveUserModal;
