/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { X } from "lucide-react";
import { AlertsContainerRef } from "../../../../components/Alert/AlertsContainer";
import API_BASE_URL from "../../../../config/coreApi";

export interface AboutData {
  id: number;
  attributes: {
    title: string;
    caption: string;
    sideTitle: string;
    sideDescription: string;
    image: string;
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
  token: string;
  onAdded: () => void;
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

const AboutAdd = ({ show, onClose, token, alertsRef, onAdded }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [caption, setCaption] = useState<string>("");
  const [sideTitle, setSideTitle] = useState<string>("");
  const [sideDescription, setSideDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  if (!show) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !caption || !sideTitle || !sideDescription || !image) {
      alertsRef.current?.addAlert(
        "error",
        "Please fill in all fields and select an image."
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("caption", caption);
      formData.append("side_title", sideTitle);
      formData.append("side_description", sideDescription);
      formData.append("image", image);

      const res = await fetch(`${API_BASE_URL}/abouts`, {
        method: "POST",
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
          "Homepage About section added successfully!"
        );
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
            result.message || "Failed to add About section."
          );
        }
      }
    } catch (err: any) {
      console.error("Error:", err);
      alertsRef.current?.addAlert("error", "Error adding About section.");
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
          Add New About Section
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="About Title"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Caption */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Caption
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="About Caption"
              rows={3}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
            />
          </div>

          {/* Side Title */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Side Title
            </label>
            <input
              type="text"
              value={sideTitle}
              onChange={(e) => setSideTitle(e.target.value)}
              placeholder="Side Title"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Side Description */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Side Description
            </label>
            <textarea
              value={sideDescription}
              onChange={(e) => setSideDescription(e.target.value)}
              placeholder="Side Description"
              rows={3}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
            />
          </div>

          {/* Upload Image */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Upload Image
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

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl shadow-md hover:shadow-lg transition"
            >
              Add About
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AboutAdd;
