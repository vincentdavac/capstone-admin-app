/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { X } from "lucide-react";
import { AlertsContainerRef } from "../../../../components/Alert/AlertsContainer";
import API_BASE_URL from "../../../../config/coreApi";

interface Props {
  show: boolean;
  onClose: () => void;
  token: string;
  onAdded: () => void;
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

const CardAdd = ({ show, onClose, token, alertsRef, onAdded }: Props) => {
  const [cardTitle, setCardTitle] = useState<string>("");
  const [cardDescription, setCardDescription] = useState<string>("");

  if (!show) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cardTitle || !cardDescription) {
      alertsRef.current?.addAlert(
        "error",
        "Please fill in both the title and description."
      );
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/about-cards`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          card_title: cardTitle,
          card_description: cardDescription,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        alertsRef.current?.addAlert("success", "Card added successfully!");
        onAdded();
        onClose();
      } else {
        console.error("Add failed:", result);
        if (result.errors) {
          Object.values(result.errors).forEach((err: any) => {
            alertsRef.current?.addAlert("error", (err as string[])[0]);
          });
        } else {
          alertsRef.current?.addAlert(
            "error",
            result.message || "Failed to add card."
          );
        }
      }
    } catch (err: any) {
      console.error("Error:", err);
      alertsRef.current?.addAlert("error", "Error adding card.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-[9999]">
      <div className="relative bg-gradient-to-br from-white/95 to-gray-100/95 dark:from-gray-900/95 dark:to-gray-800/95 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl w-full max-w-lg p-8 z-[10000] transition-transform transform scale-100 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white text-center tracking-tight">
          Add New Card
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Card Title */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Card Title
            </label>
            <input
              type="text"
              value={cardTitle}
              onChange={(e) => setCardTitle(e.target.value)}
              placeholder="Card Title"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Card Description */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Card Description
            </label>
            <textarea
              value={cardDescription}
              onChange={(e) => setCardDescription(e.target.value)}
              placeholder="Card Description"
              rows={4}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl shadow-md hover:shadow-lg transition"
            >
              Add Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardAdd;
