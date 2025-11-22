/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { AlertsContainerRef } from "../../../../components/Alert/AlertsContainer";
import API_BASE_URL from "../../../../config/coreApi";

export interface PrototypeData {
  id: number;
  attributes: {
    title: string;
    description: string;
    image: string;
    position: "left" | "right";
    isArchived: boolean;
  };
}

interface Props {
  show: boolean;
  onClose: () => void;
  data: PrototypeData;
  token: string;
  onUpdated: () => void;
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

const PrototypeUpdate = ({
  show,
  onClose,
  data,
  token,
  alertsRef,
  onUpdated,
}: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [position, setPosition] = useState<"left" | "right">("left");
  const [isArchived, setIsArchived] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  if (!show || !data) return null;

  // Load initial data
  useEffect(() => {
    if (data) {
      setTitle(data.attributes.title);
      setDescription(data.attributes.description);
      setPosition(data.attributes.position);
      setIsArchived(Boolean(data.attributes.isArchived));
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("position", position);
      formData.append("is_archived", isArchived ? "1" : "0");
      if (image) formData.append("image", image);

      // Use POST with _method PATCH for file upload
      formData.append("_method", "PATCH");

      const res = await fetch(`${API_BASE_URL}/prototypes/${data.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        // Show field-specific errors
        if (result.errors && typeof result.errors === "object") {
          Object.values(result.errors).forEach((errArray: any) => {
            if (Array.isArray(errArray)) {
              errArray.forEach((msg) =>
                alertsRef.current?.addAlert("error", msg)
              );
            }
          });
        }

        // Show general message if exists
        if (result.message) {
          alertsRef.current?.addAlert("error", result.message);
        }

        // Fallback
        if (!result.errors && !result.message) {
          alertsRef.current?.addAlert("error", "Failed to update prototype.");
        }
        return;
      }

      alertsRef.current?.addAlert("success", "Prototype updated successfully!");
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
          Update Prototype
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-xl border bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-xl border bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 transition resize-none"
            />
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Position
            </label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value as "left" | "right")}
              className="w-full p-3 rounded-xl border bg-gray-50 dark:bg-gray-800"
            >
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>

          {/* Archive */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
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

          {/* Upload Image */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Upload Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setImage(e.target.files[0]);
                }
              }}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 transition"
            />
            {image && (
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Selected file: {image.name}
              </p>
            )}
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

export default PrototypeUpdate;
