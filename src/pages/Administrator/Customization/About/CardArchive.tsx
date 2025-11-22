/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertTriangle, X } from "lucide-react";
import API_BASE_URL from "../../../../config/coreApi";
import { AlertsContainerRef } from "../../../../components/Alert/AlertsContainer";

export interface CardData {
  id: number;
  attributes: {
    card_title: string;
    card_description: string;
    is_archive: boolean;
    createdDate: string;
    createdTime: string;
    updatedDate: string;
    updatedTime: string;
  };
}

interface Props {
  show: boolean;
  onClose: () => void;
  cardId: number | null; // ID of the card to archive
  token: string;
  onArchived?: () => void;
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

const CardArchive: React.FC<Props> = ({
  show,
  onClose,
  cardId,
  token,
  onArchived,
  alertsRef,
}) => {
  if (!show || !cardId) return null;

  const handleArchive = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/about-cards/${cardId}?_method=PATCH`,
        {
          method: "POST", // Laravel method spoofing
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            is_archive: true, // archive the card
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alertsRef.current?.addAlert(
          "success",
          "Card has been archived successfully!"
        );
        onArchived?.();
        onClose();
      } else {
        if (data.errors) {
          Object.values(data.errors).forEach((messages) => {
            (messages as string[]).forEach((msg) => {
              alertsRef.current?.addAlert("error", msg);
            });
          });
        } else {
          alertsRef.current?.addAlert(
            "error",
            data.message || "Failed to archive card."
          );
        }
      }
    } catch (error: any) {
      console.error("Error archiving card:", error);
      alertsRef.current?.addAlert(
        "error",
        "An unexpected error occurred while archiving the card."
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
            Archive Card?
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            This action will move the card to archive. You can restore it at any
            time.
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

export default CardArchive;
