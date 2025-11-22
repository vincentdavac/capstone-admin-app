/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { X, ImageOff } from "lucide-react";
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
  };
}

interface Props {
  show: boolean;
  onClose: () => void;
  data: AboutData;
  token: string;
  onUpdated: () => void;
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

const AboutUpdate = ({
  show,
  onClose,
  data,
  token,
  alertsRef,
  onUpdated,
}: Props) => {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [sideTitle, setSideTitle] = useState("");
  const [sideDescription, setSideDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  if (!show || !data) return null;

  // Load initial data
  useEffect(() => {
    if (data) {
      setTitle(data.attributes.title);
      setCaption(data.attributes.caption);
      setSideTitle(data.attributes.sideTitle);
      setSideDescription(data.attributes.sideDescription);
      setPreview(data.attributes.image);
    }
  }, [data]);

  // File Handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !caption || !sideTitle || !sideDescription) {
      alertsRef.current?.addAlert("error", "Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("caption", caption);
    formData.append("side_title", sideTitle);
    formData.append("side_description", sideDescription);
    formData.append("_method", "PATCH");

    if (image instanceof File) {
      formData.append("image", image);
    }

    try {
      const res = await fetch(`${API_BASE_URL}/abouts/${data.id}`, {
        method: "POST", // Laravel expects POST with _method=PATCH
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        if (result.errors) {
          Object.values(result.errors).forEach((msg: any) =>
            alertsRef.current?.addAlert("error", msg)
          );
        } else {
          alertsRef.current?.addAlert("error", result.message);
        }
        return;
      }

      alertsRef.current?.addAlert(
        "success",
        "About section updated successfully!"
      );
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
          Update About Section
        </h2>

        {/* Image Preview */}
        <div className="mb-6">
          {preview ? (
            <img
              src={preview}
              className="w-full h-48 object-cover rounded-xl border shadow"
            />
          ) : (
            <div className="w-full h-48 flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-xl border text-gray-500">
              <ImageOff size={32} />
              <p>No image uploaded</p>
            </div>
          )}
        </div>

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

          {/* Caption */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Caption
            </label>
            <textarea
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full p-3 rounded-xl border bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 transition resize-none"
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
              className="w-full p-3 rounded-xl border bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Side Description */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Side Description
            </label>
            <textarea
              rows={3}
              value={sideDescription}
              onChange={(e) => setSideDescription(e.target.value)}
              className="w-full p-3 rounded-xl border bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 transition resize-none"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Upload New Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
            />
          </div>

          {/* Buttons */}
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

export default AboutUpdate;
