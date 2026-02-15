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

const TeamAdd = ({ show, onClose, token, alertsRef, onAdded }: Props) => {
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [image, setImage] = useState<File | null>(null);

  if (!show) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName || !role || !image) {
      alertsRef.current?.addAlert(
        "error",
        "Please fill all required fields including image."
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append("user_name", userName);
      formData.append("role", role);
      formData.append("image", image);
      formData.append("facebook_link", facebook);
      formData.append("twitter_link", twitter);
      formData.append("linkedin_link", linkedin);
      formData.append("instagram_link", instagram);

      const res = await fetch(`${API_BASE_URL}/teams`, {
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
          "Team member added successfully!"
        );
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
          alertsRef.current?.addAlert("error", "Failed to add team member.");
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
          Add Team Member
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* User Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter member name"
              className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-800"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-semibold mb-2">Role *</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Leader, Developer, UI/UX, etc."
              className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-800"
            />
          </div>

          {/* Social Links */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Facebook Link
            </label>
            <input
              type="text"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              placeholder="https://facebook.com/username"
              className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Twitter Link
            </label>
            <input
              type="text"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              placeholder="https://twitter.com/username"
              className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              LinkedIn Link
            </label>
            <input
              type="text"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="https://linkedin.com/in/username"
              className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Instagram Link
            </label>
            <input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="https://instagram.com/username"
              className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-800"
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
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl shadow-md"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamAdd;
