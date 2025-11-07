/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { X } from "lucide-react";
import API_BASE_URL from "../../../config/coreApi";
import { AlertsContainerRef } from "../../../components/Alert/AlertsContainer";

interface Props {
  show: boolean;
  onClose: () => void;
  token: string;
  alertsRef: React.RefObject<AlertsContainerRef | null>;
  onAdded: () => void;
}

const AddBarangayModal: React.FC<Props> = ({
  show,
  onClose,
  token,
  alertsRef,
  onAdded,
}) => {
  const [form, setForm] = useState({
    name: "",
    number: 0,
    river_wall_height: 0,
    square_meter: 0,
    white_level_alert: 0,
    blue_level_alert: 0,
    red_level_alert: 0,
    description: "",
    attachment: null as File | null,
  });

  const [loading, setLoading] = useState(false);

  if (!show) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: e.target.type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null) formData.append(key, value as any);
      });

      const res = await fetch(`${API_BASE_URL}/barangays`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const response = await res.json();
      if (res.ok) {
        alertsRef.current?.addAlert("success", "Barangay added successfully!");
        onAdded();
        onClose();
      } else {
        alertsRef.current?.addAlert(
          response.message || "Failed to add barangay.",
          "error"
        );
      }
    } catch (error) {
      console.error(error);
      alertsRef.current?.addAlert("error", "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="relative bg-white/90 dark:bg-gray-900/90 border border-white/20 rounded-2xl shadow-2xl w-full max-w-lg p-8 z-[10000] overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
        >
          <X size={22} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-5 text-gray-900 dark:text-white text-center">
          Add New Barangay
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Barangay Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Barangay Name"
              className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Number</label>
            <input
              type="number"
              name="number"
              value={form.number}
              onChange={handleChange}
              placeholder="Number"
              className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              River Wall Height
            </label>
            <input
              type="number"
              name="river_wall_height"
              value={form.river_wall_height}
              onChange={handleChange}
              placeholder="River Wall Height (m)"
              className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Square Meter
            </label>
            <input
              type="number"
              name="square_meter"
              value={form.square_meter}
              onChange={handleChange}
              placeholder="Square Meter"
              className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800"
            />
          </div>

          <div className="flex gap-3">
            <div className="w-1/3">
              <label className="block text-sm font-medium mb-1">
                White Level Alert
              </label>
              <input
                type="number"
                name="white_level_alert"
                value={form.white_level_alert}
                onChange={handleChange}
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800"
              />
            </div>
            <div className="w-1/3">
              <label className="block text-sm font-medium mb-1">
                Blue Level Alert
              </label>
              <input
                type="number"
                name="blue_level_alert"
                value={form.blue_level_alert}
                onChange={handleChange}
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800"
              />
            </div>
            <div className="w-1/3">
              <label className="block text-sm font-medium mb-1">
                Red Level Alert
              </label>
              <input
                type="number"
                name="red_level_alert"
                value={form.red_level_alert}
                onChange={handleChange}
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Attachment (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                e.target.files &&
                setForm({ ...form, attachment: e.target.files[0] })
              }
              className="block w-full text-sm border border-gray-300 rounded-md cursor-pointer bg-gray-50 dark:bg-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#453EFE] file:text-white hover:file:bg-indigo-600"
            />
            {form.attachment && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Selected file: {form.attachment.name}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm rounded-md bg-[#453EFE] text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? "Adding..." : "Add Barangay"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBarangayModal;
