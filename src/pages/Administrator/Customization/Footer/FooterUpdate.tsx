/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { X, ImageOff } from "lucide-react";
import { AlertsContainerRef } from "../../../../components/Alert/AlertsContainer";
import API_BASE_URL from "../../../../config/coreApi";

// 🧩 Interfaces
export interface FooterData {
  id: number;
  attributes: {
    image: string;
    caption: string;
    documentationLink: string;
    researchPaperLink: string;
    emailAddress: string;
    facebookLink: string;
    youtubeLink: string;
    footerSubtitle: string;
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
  data: FooterData;
  token: string;
  onUpdated: () => void;
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

const FooterUpdate = ({
  show,
  onClose,
  data,
  token,
  alertsRef,
  onUpdated,
}: Props) => {
  const [caption, setCaption] = useState("");
  const [documentationLink, setDocumentationLink] = useState("");
  const [researchPaperLink, setResearchPaperLink] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [footerSubtitle, setFooterSubtitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  if (!show || !data) return null;

  useEffect(() => {
    if (data) {
      setCaption(data.attributes.caption);
      setDocumentationLink(data.attributes.documentationLink);
      setResearchPaperLink(data.attributes.researchPaperLink);
      setEmailAddress(data.attributes.emailAddress);
      setFacebookLink(data.attributes.facebookLink);
      setYoutubeLink(data.attributes.youtubeLink);
      setFooterSubtitle(data.attributes.footerSubtitle);
      setPreview(data.attributes.image);
    }
  }, [data]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !caption ||
      !documentationLink ||
      !researchPaperLink ||
      !emailAddress ||
      !facebookLink ||
      !youtubeLink ||
      !footerSubtitle
    ) {
      alertsRef?.current?.addAlert?.("error", "Please fill in all fields.");
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
      formData.append("_method", "PATCH");

      if (image) formData.append("image", image);

      const res = await fetch(`${API_BASE_URL}/footers/${data.id}`, {
        method: "POST", // Laravel expects POST with _method=PATCH
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const result = await res.json();

      if (result?.status === "success") {
        alertsRef?.current?.addAlert?.(
          "success",
          "Homepage Footer updated successfully!"
        );
        onUpdated();
        onClose();
      } else if (result?.status === "error") {
        alertsRef?.current?.addAlert?.(
          "error",
          result.message || "Failed to update Footer."
        );
      } else {
        alertsRef?.current?.addAlert?.(
          "error",
          "Unexpected response from server."
        );
        console.error("Unexpected response:", result);
      }
    } catch (err: any) {
      console.error("Error:", err);
      alertsRef?.current?.addAlert?.("error", "Error updating Footer.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-[9999] p-4">
      <div className="relative bg-gradient-to-br from-white/95 to-gray-100/95 dark:from-gray-900/95 dark:to-gray-800/95 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 z-[10000]">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white text-center">
          Update Homepage Footer
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
          {[
            {
              label: "Caption",
              value: caption,
              setter: setCaption,
              placeholder: "Footer Caption",
            },
            {
              label: "Documentation Link",
              value: documentationLink,
              setter: setDocumentationLink,
              placeholder: "Documentation URL",
            },
            {
              label: "Research Paper Link",
              value: researchPaperLink,
              setter: setResearchPaperLink,
              placeholder: "Research Paper URL",
            },
            {
              label: "Email Address",
              value: emailAddress,
              setter: setEmailAddress,
              placeholder: "Email Address",
              type: "email",
            },
            {
              label: "Facebook Link",
              value: facebookLink,
              setter: setFacebookLink,
              placeholder: "Facebook URL",
            },
            {
              label: "YouTube Link",
              value: youtubeLink,
              setter: setYoutubeLink,
              placeholder: "YouTube URL",
            },
            {
              label: "Footer Subtitle",
              value: footerSubtitle,
              setter: setFooterSubtitle,
              placeholder: "Footer Subtitle",
            },
          ].map((field, idx) => (
            <div key={idx}>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                {field.label}
              </label>
              <input
                type={field.type || "text"}
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                placeholder={field.placeholder}
                className="w-full p-3 rounded-xl border bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
          ))}

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

export default FooterUpdate;
