/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { AlertsContainerRef } from "../../../../components/Alert/AlertsContainer";
import API_BASE_URL from "../../../../config/coreApi";

interface FAQData {
  id: number;
  attributes: {
    question: string;
    answer: string;
    isArchived: boolean;
    createdDate: string;
    createdTime: string;
    updatedDate: string;
    updatedTime: string;
  };
}

interface Props {
  show: boolean;
  onClose: () => void;
  data: FAQData;
  token: string;
  onUpdated: () => void;
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

const FAQsUpdate = ({
  show,
  onClose,
  data,
  token,
  alertsRef,
  onUpdated,
}: Props) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isArchived, setIsArchived] = useState(false);

  if (!show || !data) return null;

  // Load initial data
  useEffect(() => {
    if (data) {
      setQuestion(data.attributes.question);
      setAnswer(data.attributes.answer);
      setIsArchived(Boolean(data.attributes.isArchived));
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        question,
        answer,
        is_archived: isArchived ? 1 : 0,
        _method: "PATCH",
      };

      const res = await fetch(`${API_BASE_URL}/faqs/${data.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        if (result.errors && typeof result.errors === "object") {
          Object.values(result.errors).forEach((errArray: any) => {
            if (Array.isArray(errArray)) {
              errArray.forEach((msg) =>
                alertsRef.current?.addAlert("error", msg)
              );
            }
          });
        }

        if (result.message) {
          alertsRef.current?.addAlert("error", result.message);
        }

        if (!result.errors && !result.message) {
          alertsRef.current?.addAlert("error", "Failed to update FAQ.");
        }

        return;
      }

      alertsRef.current?.addAlert("success", "FAQ updated successfully!");
      onUpdated();
      onClose();
    } catch (error: any) {
      alertsRef.current?.addAlert("error", "An unexpected error occurred.");
      console.error(error);
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

        <h2 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white text-center">
          Update FAQ
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Question */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Question *
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full p-3 rounded-xl border bg-gray-50 dark:bg-gray-800"
            />
          </div>

          {/* Answer */}
          <div>
            <label className="block text-sm font-semibold mb-2">Answer *</label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full p-3 rounded-xl border bg-gray-50 dark:bg-gray-800"
              rows={4}
            />
          </div>

          {/* Archived */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Archived?
            </label>
            <select
              value={isArchived ? "1" : "0"}
              onChange={(e) => setIsArchived(e.target.value === "1")}
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
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FAQsUpdate;
