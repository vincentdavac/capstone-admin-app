/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertTriangle, X } from "lucide-react";
import API_BASE_URL from "../../../../config/coreApi";
import { AlertsContainerRef } from "../../../../components/Alert/AlertsContainer";

export interface PrototypeData {
  id: number;
  attributes: {
    title: string;
    description: string;
    image: string;
    position: "left" | "right";
    isArchived: boolean;
  };
}

interface Props {
  show: boolean;
  onClose: () => void;
  prototypeId: number | null; // ID of the prototype to archive
  token: string;
  onArchived?: () => void;
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

const PrototypeArchive: React.FC<Props> = ({
  show,
  onClose,
  prototypeId,
  token,
  onArchived,
  alertsRef,
}) => {
  if (!show || !prototypeId) return null;

  const handleArchive = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/prototypes/${prototypeId}?_method=PATCH`,
        {
          method: "POST", // Laravel method spoofing
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            is_archived: true,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        // Handle field-specific errors
        if (data.errors && typeof data.errors === "object") {
          Object.values(data.errors).forEach((errArray: any) => {
            if (Array.isArray(errArray)) {
              errArray.forEach((msg) =>
                alertsRef.current?.addAlert("error", msg)
              );
            }
          });
        }

        // Handle general message
        if (data.message) {
          alertsRef.current?.addAlert("error", data.message);
        }

        // Fallback
        if (!data.errors && !data.message) {
          alertsRef.current?.addAlert("error", "Failed to archive prototype.");
        }
        return;
      }

      alertsRef.current?.addAlert(
        "success",
        "Prototype archived successfully!"
      );
      onArchived?.();
      onClose();
    } catch (error: any) {
      console.error("Error archiving prototype:", error);
      alertsRef.current?.addAlert(
        "error",
        "An unexpected error occurred while archiving the prototype."
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
            Archive Prototype?
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            This action will move the prototype to archive. You can restore it
            at any time.
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

export default PrototypeArchive;
