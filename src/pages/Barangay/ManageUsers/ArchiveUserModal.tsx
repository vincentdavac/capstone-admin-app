/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { X, Trash2, AlertCircle, Loader2 } from "lucide-react";
import API_BASE_URL from "../../../config/coreApi";
import { AlertsContainerRef } from "../../../components/Alert/AlertsContainer";

// ... (Interfaces remain unchanged)
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (userData) setFormData(userData);
  }, [userData]);

  const handleArchive = async () => {
    setIsSubmitting(true);
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
        const errorMessage = errorData.message || "Failed to archive user.";
        alertsRef.current?.addAlert("error", errorMessage);
      }
    } catch (error) {
      alertsRef.current?.addAlert(
        "error",
        "An error occurred while updating user.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[9999] p-4">
      <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden transition-all transform scale-100">
        {/* Subtle top indicator */}
        <div className="h-1.5 w-full bg-red-500/20 dark:bg-red-500/10" />

        <div className="p-10">
          {/* Close Icon */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col items-center text-center">
            {/* Animated/Pulse Warning Icon */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <div className="relative w-20 h-20 rounded-3xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center border border-red-100 dark:border-red-800/50">
                <Trash2 className="text-red-500" size={36} />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Archive Account?
            </h3>

            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed px-2">
              You're about to archive{" "}
              <span className="font-bold text-slate-900 dark:text-slate-100">
                {formData?.firstName} {formData?.lastName}
              </span>
              . This will disable their system access. You can restore them from
              the archives later if needed.
            </p>

            <div className="mt-8 flex flex-col w-full gap-3">
              <button
                disabled={isSubmitting}
                onClick={handleArchive}
                className="w-full h-14 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-2xl font-bold shadow-lg shadow-red-200 dark:shadow-none transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  "Archive User"
                )}
              </button>

              <button
                disabled={isSubmitting}
                onClick={onClose}
                className="w-full h-14 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-bold transition-all"
              >
                Cancel
              </button>
            </div>

            <div className="mt-6 flex items-center gap-2 text-slate-400 dark:text-slate-500">
              <AlertCircle size={14} />
              <span className="text-[10px] uppercase tracking-widest font-bold">
                Safe Action
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchiveUserModal;
