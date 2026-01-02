/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { AlertTriangle, X } from "lucide-react";
import API_BASE_URL from "../../../config/coreApi";
import { AlertsContainerRef } from "../../../components/Alert/AlertsContainer";

interface HotlineData {
  id: number;
  description: string;
  number: string;
}

interface Props {
  show: boolean;
  onClose: () => void;
  data: HotlineData | null;
  token: string;
  onArchived?: () => void;
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

const ArchiveHotlinesModal: React.FC<Props> = ({
  show,
  onClose,
  data,
  token,
  onArchived,
  alertsRef,
}) => {
  if (!show || !data) return null;

  const handleArchive = async () => {
    try {
      const formData = new FormData();
      formData.append("is_archived", "1");
      formData.append("_method", "PATCH");

      const res = await fetch(`${API_BASE_URL}/hotlines/archive/${data.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        alertsRef.current?.addAlert(
          "success",
          "Hotline archived successfully."
        );

        onArchived?.();
        onClose();
      } else {
        if (result.errors) {
          Object.values(result.errors).forEach((messages: any) => {
            messages.forEach((msg: string) => {
              alertsRef.current?.addAlert("error", msg);
            });
          });
        } else {
          alertsRef.current?.addAlert(
            "error",
            result.message || "Failed to archive hotline."
          );
        }
      }
    } catch (error) {
      console.error("Archive error:", error);
      alertsRef.current?.addAlert(
        "error",
        "An error occurred while archiving the hotline."
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="relative bg-white/90 dark:bg-gray-900/90 border border-white/20 rounded-2xl shadow-2xl w-full max-w-md p-8 z-[10000]">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center text-center">
          <AlertTriangle className="text-yellow-500 mb-3" size={40} />

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Archive Hotline?
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            This will archive the hotline:
            <br />
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {data.description} — {data.number}
            </span>
            <br />
            You can restore it later if needed.
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleArchive}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchiveHotlinesModal;
