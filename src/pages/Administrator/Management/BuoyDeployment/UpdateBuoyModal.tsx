/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { X, ImageOff } from "lucide-react";
import { AlertsContainerRef } from "../../../../components/Alert/AlertsContainer";
import API_BASE_URL from "../../../../config/coreApi";

interface Attributes {
  buoyCode: string;
  riverName: string;
  wallHeight: string;
  riverHectare: string;
  latitude: string;
  longitude: string;
  barangayId: string;
  attachment: string | File | null;
  status: string;
  maintenanceAt: string;
  createdDate: string;
  createdTime: string;
  updatedDate: string;
  updatedTime: string;
}

interface Barangay {
  id: number;
  attributes: {
    barangayCode: string;
    name: string;
  };
}

interface barangay {
  id: number;
  barangayCode: string;
  name: string;
  number: number;
  riverWallHeight: string;
  squareMeter: string;
  hectare: string;
  whiteLevelAlert: string;
  blueLevelAlert: string;
  redLevelAlert: string;
  description: string;
  attachment: string;
}

interface BuoyData {
  id: number;
  attributes: Attributes;
  barangay: barangay;
}

interface Props {
  show: boolean;
  onClose: () => void;
  data: BuoyData;
  token: string;
  onUpdated: () => void;
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

const UpdateBuoyModal = ({
  show,
  onClose,
  data,
  token,
  alertsRef,
  onUpdated,
}: Props) => {
  const [form, setForm] = useState<Attributes>(
    data?.attributes ?? ({} as Attributes)
  );
  const [barangays, setBarangays] = useState<Barangay[]>([]);
  const [loadingBarangays, setLoadingBarangays] = useState<boolean>(true);
  const [attachmentPreview, setAttachmentPreview] = useState<string>("");

  if (!show || !data) return null;

  useEffect(() => {
    const fetchBarangays = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/barangays`, {
          method: "GET",
          headers: { Accept: "application/json" },
        });

        const result = await res.json();

        if (!res.ok) {
          alertsRef.current?.addAlert(
            "error",
            result.message || "Failed to load barangays"
          );
          setLoadingBarangays(false);
          return;
        }

        setBarangays(result.data);

        if (data?.barangay?.id) {
          setForm((prev) => ({
            ...prev,
            barangayId: String(data.barangay.id),
          }));
        }
      } catch (error: any) {
        alertsRef.current?.addAlert(
          "error",
          error.message || "Unable to fetch barangays."
        );
      } finally {
        setLoadingBarangays(false);
      }
    };

    fetchBarangays();
  }, [alertsRef, data]);

  // ✅ Initialize preview with existing attachment
  useEffect(() => {
    if (
      data?.attributes?.attachment &&
      typeof data.attributes.attachment === "string"
    ) {
      setAttachmentPreview(data.attributes.attachment);
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle file change with preview update
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setForm({ ...form, attachment: file });
      // Create preview URL for the new file
      setAttachmentPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // ✅ Use snake_case names expected by Laravel (only send what's being updated)
      if (form.riverName) formData.append("river_name", form.riverName);
      if (form.wallHeight) formData.append("wall_height", form.wallHeight);
      if (form.riverHectare)
        formData.append("river_hectare", form.riverHectare);
      if (form.latitude) formData.append("latitude", form.latitude);
      if (form.longitude) formData.append("longitude", form.longitude);
      if (form.barangayId) formData.append("barangay_id", form.barangayId);
      if (form.status) formData.append("status", form.status);

      // ✅ CRITICAL: Only append attachment if it's a NEW File object
      // Never send the old string URL back to the server
      if (form.attachment instanceof File) {
        formData.append("attachment", form.attachment);
        console.log(
          "Uploading new file:",
          form.attachment.name,
          form.attachment.type
        );
      } else {
        console.log("No new file to upload, keeping existing attachment");
      }

      // Laravel PATCH support through _method override
      formData.append("_method", "PATCH");

      console.log("Submitting form data...");

      const res = await fetch(`${API_BASE_URL}/buoys/${data.id}`, {
        method: "POST", // Laravel requires POST + _method for FormData
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        alertsRef.current?.addAlert("success", "Buoy updated successfully!");
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
            result.message || "Failed to update buoy."
          );
        }
      }
    } catch (err: any) {
      console.error("Error:", err);
      alertsRef.current?.addAlert("error", "Error updating buoy.");
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
          Update Buoy Information
        </h2>

        {/* Image Preview */}
        <div className="w-full mb-5">
          {attachmentPreview ? (
            <img
              src={attachmentPreview}
              alt="Buoy Attachment"
              className="w-full h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-700 shadow-md"
            />
          ) : (
            <div className="w-full h-48 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400">
              <ImageOff size={32} className="mb-2" />
              <span>No Image Available</span>
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Buoy Code & River Name */}
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">
                Buoy Code
              </label>
              <input
                type="text"
                name="buoyCode"
                value={form.buoyCode || ""}
                onChange={handleChange}
                placeholder="Buoy Code"
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">
                River Name
              </label>
              <input
                type="text"
                name="riverName"
                value={form.riverName || ""}
                onChange={handleChange}
                placeholder="River Name"
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800"
              />
            </div>
          </div>

          {/* Wall Height & River Hectare */}
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">
                Wall Height
              </label>
              <input
                type="text"
                name="wallHeight"
                value={form.wallHeight || ""}
                onChange={handleChange}
                placeholder="Wall Height (m)"
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">
                River Hectare
              </label>
              <input
                type="text"
                name="riverHectare"
                value={form.riverHectare || ""}
                onChange={handleChange}
                placeholder="River Hectare"
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800"
              />
            </div>
          </div>

          {/* Coordinates */}
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Latitude</label>
              <input
                type="text"
                name="latitude"
                value={form.latitude || ""}
                onChange={handleChange}
                placeholder="Latitude"
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">
                Longitude
              </label>
              <input
                type="text"
                name="longitude"
                value={form.longitude || ""}
                onChange={handleChange}
                placeholder="Longitude"
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800"
              />
            </div>
          </div>

          {/* Barangay & Status */}
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Barangay</label>
              <select
                name="barangayId"
                value={form.barangayId || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800"
                disabled={loadingBarangays}
              >
                <option value="">Select Barangay</option>
                {barangays.map((brgy) => (
                  <option key={brgy.id} value={brgy.id.toString()}>
                    {brgy.attributes.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                value={form.status || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          {/* Upload Image */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Upload Image
            </label>
            <input
              type="file"
              name="attachment"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
            />

            {form.attachment instanceof File && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Selected file: {form.attachment.name}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBuoyModal;
