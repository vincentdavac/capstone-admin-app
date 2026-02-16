/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefreshCw, X } from "lucide-react";
import API_BASE_URL from "../../../../config/coreApi";
import { AlertsContainerRef } from "../../../../components/Alert/AlertsContainer";

interface Props {
  show: boolean;
  onClose: () => void;
  FeedbackId: number | null; // ID of the feedback to restore
  token: string;
  onRestored?: () => void;
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

const FeedbackRestore: React.FC<Props> = ({
  show,
  onClose,
  FeedbackId,
  token,
  onRestored,
  alertsRef,
}) => {
  // 🛠 Helper function for Pascal Casing (Normalization)
  const toPascalCase = (str: string) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (!show || !FeedbackId) return null;

  const handleRestore = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/feedbacks/${FeedbackId}?_method=PATCH`,
        {
          method: "POST", // Laravel method spoofing for PATCH
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            is_archived: false, // mark as active
          }),
        }
      );

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
          alertsRef.current?.addAlert("error", "Failed to restore feedback.");
        }
        return;
      }

      // SUCCESS
      alertsRef.current?.addAlert("success", "Feedback restored successfully!");
      onRestored?.();
      onClose();
    } catch (error: any) {
      console.error("Error restoring feedback:", error);
      alertsRef.current?.addAlert(
        "error",
        "An unexpected error occurred while restoring the feedback."
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
          <RefreshCw className="text-green-500 mb-3" size={40} />

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {toPascalCase("Restore Feedback?")}
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {toPascalCase(
              "This action will mark the feedback as active. You can archive it later if needed."
            )}
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
              onClick={handleRestore}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Confirm Restore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackRestore;