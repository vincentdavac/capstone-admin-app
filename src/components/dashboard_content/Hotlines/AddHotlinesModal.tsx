/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { X } from "lucide-react";
import API_BASE_URL from "../../../config/coreApi";
import { AlertsContainerRef } from "../../../components/Alert/AlertsContainer";

interface Props {
  show: boolean;
  onClose: () => void;
  token: string;
  onAdded: () => void;
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

const AddHotlinesModal = ({
  show,
  onClose,
  token,
  alertsRef,
  onAdded,
}: Props) => {
  const [form, setForm] = useState({
    description: "",
    number: "",
  });

  const [submitting, setSubmitting] = useState(false);

  if (!show) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.description || !form.number) {
      alertsRef.current?.addAlert(
        "error",
        "Description and number are required."
      );
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch(`${API_BASE_URL}/hotlines`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: form.description,
          number: form.number,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        alertsRef.current?.addAlert("success", "Hotline added successfully!");
        onAdded();
        onClose();
      } else {
        if (result.errors) {
          Object.values(result.errors).forEach((err: any) => {
            alertsRef.current?.addAlert("error", err[0]);
          });
        } else {
          alertsRef.current?.addAlert(
            "error",
            result.message || "Failed to add hotline."
          );
        }
      }
    } catch (error: any) {
      alertsRef.current?.addAlert(
        "error",
        error.message || "Something went wrong."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl w-full max-w-md p-6">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <X size={22} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-5 text-gray-900 dark:text-white text-center">
          Add Emergency Hotline
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="e.g. Fire Department"
              className="w-full h-11 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#453EFE]"
            />
          </div>

          {/* Number */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Hotline Number
            </label>
            <input
              type="text"
              name="number"
              value={form.number}
              onChange={handleChange}
              placeholder="e.g. 911"
              className="w-full h-11 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#453EFE]"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-[#453EFE] hover:bg-indigo-700 disabled:opacity-60 text-white rounded-lg transition"
            >
              {submitting ? "Adding..." : "Add Hotline"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHotlinesModal;
