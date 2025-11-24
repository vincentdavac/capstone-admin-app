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

const FooterAdd = ({ show, onClose, token, alertsRef, onAdded }: Props) => {
  const [caption, setCaption] = useState<string>("");
  const [documentationLink, setDocumentationLink] = useState<string>("");
  const [researchPaperLink, setResearchPaperLink] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [facebookLink, setFacebookLink] = useState<string>("");
  const [youtubeLink, setYoutubeLink] = useState<string>("");
  const [footerSubtitle, setFooterSubtitle] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  if (!show) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !caption ||
      !documentationLink ||
      !researchPaperLink ||
      !emailAddress ||
      !facebookLink ||
      !youtubeLink ||
      !footerSubtitle ||
      !image
    ) {
      alertsRef.current?.addAlert(
        "error",
        "Please fill in all fields and select an image."
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("documentation_link", documentationLink);
      formData.append("research_paper_link", researchPaperLink);
      formData.append("email_address", emailAddress);
      formData.append("facebook_link", facebookLink);
      formData.append("youtube_link", youtubeLink);
      formData.append("footer_subtitle", footerSubtitle);
      formData.append("image", image);

      const res = await fetch(`${API_BASE_URL}/footers`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const result = await res.json();

      // Handle API status
      if (result.status === "success") {
        alertsRef.current?.addAlert(
          "success",
          "Homepage Footer added successfully!"
        );
        onAdded();
        onClose();
      } else if (result.status === "error") {
        alertsRef.current?.addAlert(
          "error",
          result.message || "Failed to add Footer."
        );
      } else {
        // Fallback for unknown structure
        alertsRef.current?.addAlert(
          "error",
          "Unexpected response from server."
        );
        console.error("Unexpected response:", result);
      }
    } catch (err: any) {
      console.error("Error:", err);
      alertsRef.current?.addAlert("error", "Error adding Footer.");
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
          Add Homepage Footer
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Caption */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Caption
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Footer Caption"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Documentation Link */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Documentation Link
            </label>
            <input
              type="text"
              value={documentationLink}
              onChange={(e) => setDocumentationLink(e.target.value)}
              placeholder="Documentation URL"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Research Paper Link */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Research Paper Link
            </label>
            <input
              type="text"
              value={researchPaperLink}
              onChange={(e) => setResearchPaperLink(e.target.value)}
              placeholder="Research Paper URL"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              placeholder="Email Address"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Facebook Link */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Facebook Link
            </label>
            <input
              type="text"
              value={facebookLink}
              onChange={(e) => setFacebookLink(e.target.value)}
              placeholder="Facebook URL"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* YouTube Link */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              YouTube Link
            </label>
            <input
              type="text"
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              placeholder="YouTube URL"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Footer Subtitle */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Footer Subtitle
            </label>
            <input
              type="text"
              value={footerSubtitle}
              onChange={(e) => setFooterSubtitle(e.target.value)}
              placeholder="Footer Subtitle"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
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
              Add Footer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FooterAdd;
