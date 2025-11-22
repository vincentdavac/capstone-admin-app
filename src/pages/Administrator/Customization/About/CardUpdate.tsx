/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { AlertsContainerRef } from "../../../../components/Alert/AlertsContainer";
import API_BASE_URL from "../../../../config/coreApi";

export interface CardData {
  id: number;
  attributes: {
    cardTitle: string;
    cardDescription: string;
    isArchive: boolean;
  };
}

interface Props {
  show: boolean;
  onClose: () => void;
  data: CardData;
  token: string;
  onUpdated: () => void;
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

const CardUpdate = ({
  show,
  onClose,
  data,
  token,
  alertsRef,
  onUpdated,
}: Props) => {
  const [cardTitle, setCardTitle] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const [isArchive, setIsArchive] = useState<boolean>(false);

  if (!show || !data) return null;

  // Load initial data
  useEffect(() => {
    if (data) {
      setCardTitle(data.attributes.cardTitle);
      setCardDescription(data.attributes.cardDescription);
      setIsArchive(Boolean(data.attributes.isArchive));
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/about-cards/${data.id}`, {
        method: "POST", // using POST with _method PATCH
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          card_title: cardTitle,
          card_description: cardDescription,
          is_archive: isArchive,
          _method: "PATCH",
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        if (result.errors) {
          Object.values(result.errors).forEach((msg: any) =>
            alertsRef.current?.addAlert("error", (msg as string[])[0])
          );
        } else {
          alertsRef.current?.addAlert("error", result.message);
        }
        return;
      }

      alertsRef.current?.addAlert("success", "Card updated successfully!");
      onUpdated();
      onClose();
    } catch (error: any) {
      alertsRef.current?.addAlert("error", error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-[9999]">
      <div className="relative bg-gradient-to-br from-white/95 to-gray-100/95 dark:from-gray-900/95 dark:to-gray-800/95 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl w-full max-w-lg p-8 z-[10000] transition">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white text-center">
          Update Card
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Card Title */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Card Title
            </label>
            <input
              type="text"
              value={cardTitle}
              onChange={(e) => setCardTitle(e.target.value)}
              className="w-full p-3 rounded-xl border bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Card Description */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Card Description
            </label>
            <textarea
              rows={4}
              value={cardDescription}
              onChange={(e) => setCardDescription(e.target.value)}
              className="w-full p-3 rounded-xl border bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 transition resize-none"
            />
          </div>

          {/* Archive */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Archived?
            </label>
            <select
              value={isArchive ? "1" : "0"}
              onChange={(e) => setIsArchive(e.target.value === "1")}
              className="w-full p-3 rounded-xl border bg-gray-50 dark:bg-gray-800"
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardUpdate;
