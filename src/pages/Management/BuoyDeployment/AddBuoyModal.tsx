/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { AlertsContainerRef } from "../../../components/Alert/AlertsContainer";
import API_BASE_URL from "../../../config/coreApi";

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
}

interface Barangay {
  id: number;
  attributes: {
    barangayCode: string;
    name: string;
  };
}

interface Props {
  show: boolean;
  onClose: () => void;
  token: string;
  onAdded: () => void;
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

const AddBuoyModal = ({ show, onClose, token, alertsRef, onAdded }: Props) => {
  const [form, setForm] = useState<Attributes>({
    buoyCode: "",
    riverName: "",
    wallHeight: "",
    riverHectare: "",
    latitude: "",
    longitude: "",
    barangayId: "",
    attachment: null,
    status: "active",
    maintenanceAt: "",
  });

  const [barangays, setBarangays] = useState<Barangay[]>([]);
  const [loadingBarangays, setLoadingBarangays] = useState<boolean>(true);

  if (!show) return null;

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
          return;
        }

        setBarangays(result.data);
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
  }, [alertsRef]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("river_name", form.riverName);
      formData.append("wall_height", form.wallHeight);
      formData.append("river_hectare", form.riverHectare);
      formData.append("latitude", form.latitude);
      formData.append("longitude", form.longitude);
      formData.append("barangay_id", form.barangayId);
      formData.append("status", form.status);
      if (form.maintenanceAt)
        formData.append("maintenance_at", form.maintenanceAt);

      if (form.attachment instanceof File) {
        formData.append("attachment", form.attachment);
      }

      const res = await fetch(`${API_BASE_URL}/buoys`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        alertsRef.current?.addAlert("success", "Buoy added successfully!");
        onAdded();
        onClose();
      } else {
        console.error("Add failed:", result);
        if (result.errors) {
          Object.keys(result.errors).forEach((key) => {
            alertsRef.current?.addAlert("error", result.errors[key][0]);
          });
        } else {
          alertsRef.current?.addAlert(
            "error",
            result.message || "Failed to add buoy."
          );
        }
      }
    } catch (err: any) {
      console.error("Error:", err);
      alertsRef.current?.addAlert("error", "Error adding buoy.");
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
          Add New Buoy
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Buoy Code & River Name */}
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">
                River Name
              </label>
              <input
                type="text"
                name="riverName"
                value={form.riverName}
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
                value={form.wallHeight}
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
                value={form.riverHectare}
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
                value={form.latitude}
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
                value={form.longitude}
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
                value={form.barangayId}
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
                value={form.status}
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
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setForm({ ...form, attachment: e.target.files[0] });
                }
              }}
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
              Add Buoy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBuoyModal;
