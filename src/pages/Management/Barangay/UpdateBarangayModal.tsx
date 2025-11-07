/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { ImageOff, X } from "lucide-react";
import API_BASE_URL from "../../../config/coreApi";
import { AlertsContainerRef } from "../../../components/Alert/AlertsContainer";

interface Props {
  show: boolean;
  onClose: () => void;
  data: any;
  token: string;
  alertsRef: React.RefObject<AlertsContainerRef | null>;
  onUpdated: () => void;
}

const UpdateBarangayModal: React.FC<Props> = ({
  show,
  onClose,
  data,
  token,
  alertsRef,
  onUpdated,
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
    attachment: null as File | string | null,
    attachmentPreview: "" as string,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data?.attributes) {
      const a = data.attributes;
      setForm({
        name: a.name || "",
        number: a.number || 0,
        river_wall_height: a.riverWallHeight || 0,
        square_meter: a.squareMeter || 0,
        white_level_alert: a.whiteLevelAlert || 0,
        blue_level_alert: a.blueLevelAlert || 0,
        red_level_alert: a.redLevelAlert || 0,
        description: a.description || "",
        attachment: a.attachment || null,
        attachmentPreview: a.attachment || "",
      });
    }
  }, [data]);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setForm({
        ...form,
        attachment: file,
        attachmentPreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // ✅ Only append fields if they have values
      if (form.name) formData.append("name", form.name);
      if (form.number) formData.append("number", String(form.number));
      if (form.river_wall_height)
        formData.append("river_wall_height", String(form.river_wall_height));
      if (form.square_meter)
        formData.append("square_meter", String(form.square_meter));
      if (form.white_level_alert)
        formData.append("white_level_alert", String(form.white_level_alert));
      if (form.blue_level_alert)
        formData.append("blue_level_alert", String(form.blue_level_alert));
      if (form.red_level_alert)
        formData.append("red_level_alert", String(form.red_level_alert));
      if (form.description) formData.append("description", form.description);

      // ✅ File upload only if user selects a new one
      if (form.attachment instanceof File) {
        formData.append("attachment", form.attachment);
      }

      // ✅ Laravel PATCH support through _method override
      formData.append("_method", "PATCH");

      const res = await fetch(`${API_BASE_URL}/barangays/${data.id}`, {
        method: "POST", // Laravel requires POST + _method for FormData
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        alertsRef.current?.addAlert(
          "success",
          "Barangay updated successfully!"
        );
        onUpdated();
        onClose();
      } else {
        console.error("Update failed:", result);

        // Show backend validation messages if available
        if (result.errors) {
          Object.keys(result.errors).forEach((key) => {
            alertsRef.current?.addAlert("error", result.errors[key][0]);
          });
        } else {
          alertsRef.current?.addAlert(
            "error",
            result.message || "Failed to update barangay."
          );
        }
      }
    } catch (err: any) {
      console.error("Error:", err);
      alertsRef.current?.addAlert("error", "Error updating barangay.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="relative bg-white/90 dark:bg-gray-900/90 border border-white/20 rounded-2xl shadow-2xl w-full max-w-lg p-8 z-[10000] overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-semibold mb-5 text-gray-900 dark:text-white text-center">
          Update Barangay
        </h2>

        <div className="w-full mb-5">
          {form.attachmentPreview ? (
            <img
              src={form.attachmentPreview}
              alt="Barangay Attachment"
              className="w-full h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-700 shadow-md"
            />
          ) : (
            <div className="w-full h-48 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400">
              <ImageOff size={32} className="mb-2" />
              <span>No Image Available</span>
            </div>
          )}
        </div>

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
              onChange={handleFileChange}
              className="block w-full text-sm border border-gray-300 rounded-md cursor-pointer bg-gray-50 dark:bg-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#453EFE] file:text-white hover:file:bg-indigo-600"
            />
            {form.attachment instanceof File && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Selected file: {form.attachment.name}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm rounded-md bg-[#453EFE] text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Barangay"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBarangayModal;
