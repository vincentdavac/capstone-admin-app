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

const FAQsAdd = ({ show, onClose, token, alertsRef, onAdded }: Props) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  if (!show) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question || !answer) {
      alertsRef.current?.addAlert(
        "error",
        "Please fill both the question and answer fields."
      );
      return;
    }

    try {
      const payload = {
        question,
        answer,
      };

      const res = await fetch(`${API_BASE_URL}/faqs`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        alertsRef.current?.addAlert("success", "FAQ added successfully!");
        onAdded();
        onClose();
      } else {
        console.error("Add failed:", result);

        if (result.errors) {
          Object.keys(result.errors).forEach((key) => {
            const msg = result.errors[key][0];
            alertsRef.current?.addAlert("error", msg);
          });
        } else if (result.message) {
          alertsRef.current?.addAlert("error", result.message);
        } else {
          alertsRef.current?.addAlert("error", "Failed to add FAQ.");
        }
      }
    } catch (err: any) {
      console.error("Error:", err);
      alertsRef.current?.addAlert("error", "An unexpected error occurred.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-[9999]">
      <div className="relative bg-gradient-to-br from-white/95 to-gray-100/95 dark:from-gray-900/95 dark:to-gray-800/95 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl w-full max-w-lg p-8 z-[10000] transition-transform">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white text-center">
          Add FAQ
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Question */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Question *
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter the question"
              className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-800"
            />
          </div>

          {/* Answer */}
          <div>
            <label className="block text-sm font-semibold mb-2">Answer *</label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter the answer"
              className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-800"
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl shadow-md"
            >
              Add FAQ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FAQsAdd;
