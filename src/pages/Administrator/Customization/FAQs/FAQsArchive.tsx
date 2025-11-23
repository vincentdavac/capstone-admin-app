/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertTriangle, X } from "lucide-react";
import API_BASE_URL from "../../../../config/coreApi";
import { AlertsContainerRef } from "../../../../components/Alert/AlertsContainer";

interface Props {
  show: boolean;
  onClose: () => void;
  FAQId: number | null; // ID of the FAQ to archive
  token: string;
  onArchived?: () => void;
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

const FAQsArchive: React.FC<Props> = ({
  show,
  onClose,
  FAQId,
  token,
  onArchived,
  alertsRef,
}) => {
  if (!show || !FAQId) return null;

  const handleArchive = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/faqs/${FAQId}?_method=PATCH`, {
        method: "POST", // Laravel method spoofing for PATCH
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          is_archived: true, // snake_case field for backend
        }),
      });

      const data = await res.json();

      // ERROR HANDLING
      if (!res.ok) {
        if (data.errors && typeof data.errors === "object") {
          Object.values(data.errors).forEach((errArray: any) => {
            if (Array.isArray(errArray)) {
              errArray.forEach((msg) =>
                alertsRef.current?.addAlert("error", msg)
              );
            }
          });
        }

        if (data.message) {
          alertsRef.current?.addAlert("error", data.message);
        }

        if (!data.errors && !data.message) {
          alertsRef.current?.addAlert("error", "Failed to archive FAQ.");
        }

        return;
      }

      // SUCCESS
      alertsRef.current?.addAlert("success", "FAQ archived successfully!");
      onArchived?.();
      onClose();
    } catch (error: any) {
      console.error("Error archiving FAQ:", error);
      alertsRef.current?.addAlert(
        "error",
        "An unexpected error occurred while archiving the FAQ."
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="relative bg-white/90 dark:bg-gray-900/90 border border-white/20 rounded-2xl shadow-2xl w-full max-w-lg p-8 z-[10000] overflow-y-auto max-h-[90vh]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center text-center">
          <AlertTriangle className="text-yellow-500 mb-3" size={40} />

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Archive FAQ?
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            This will move the FAQ to the archive. You can restore it anytime.
          </p>

          {/* Buttons */}
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
              Confirm Archive
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQsArchive;
