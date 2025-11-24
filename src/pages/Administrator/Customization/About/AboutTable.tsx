/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { Plus, Upload } from "lucide-react";
import API_BASE_URL from "../../../../config/coreApi";
import { AppContext } from "../../../../context/AppContext";
import { AlertsContainerRef } from "../../../../components/Alert/AlertsContainer";
import AddSlider from "./AboutAdd";
import UpdateSlider from "./AboutUpdate";

// 🧩 Interfaces
export interface AboutData {
  id: number;
  attributes: {
    title: string;
    caption: string;
    sideTitle: string;
    sideDescription: string;
    image: string;
    videoLink: string;
    isArchived: boolean;
    createdDate: string;
    createdTime: string;
    updatedDate: string;
    updatedTime: string;
  };
}

interface Props {
  alertsRef: React.RefObject<AlertsContainerRef | null>;
  onRefresh?: () => void; // notify parent to refresh About preview
}

const AboutTable = ({ alertsRef, onRefresh }: Props) => {
  const { token } = useContext(AppContext)!;

  const [about, setAbout] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const fetchAbout = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/abouts`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const result = await res.json();
      if (res.ok && result.data) {
        setAbout(result.data);
      } else {
        console.error("Failed to fetch latest About:", result);
        setAbout(null);
      }
    } catch (error) {
      console.error("Error fetching latest About:", error);
      setAbout(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchAbout();
  }, [token]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-auto text-gray-900 dark:text-white mb-5">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        {/* Header: Add & Update Buttons */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200">
            Latest About Section
          </h2>
          <div className="flex gap-2">
            {!about && (
              <button
                onClick={() => setShowAdd(true)}
                className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg transition"
                title="Add About"
              >
                <Plus className="w-5 h-5" />
              </button>
            )}
            {about && (
              <button
                onClick={() => setShowUpdate(true)}
                className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg transition"
                title="Update About"
              >
                <Upload className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* About Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center gap-2 text-gray-500 py-10">
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#453EFE]" />
              Loading About section...
            </div>
          ) : !about ? (
            <div className="text-gray-500 py-10 text-center">
              No About section found.
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {about.attributes.image && (
                  <img
                    src={about.attributes.image}
                    alt={about.attributes.title}
                    className="w-32 h-32 object-cover rounded-md shadow-sm"
                  />
                )}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {about.attributes.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {about.attributes.caption}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                <h4 className="text-md font-medium text-gray-700 dark:text-gray-200">
                  Side Title
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {about.attributes.sideTitle}
                </p>
              </div>

              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                <h4 className="text-md font-medium text-gray-700 dark:text-gray-200">
                  Side Description
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {about.attributes.sideDescription}
                </p>
              </div>

              {/* Video Link */}
              {about.attributes.videoLink && (
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                  <h4 className="text-md font-medium text-gray-700 dark:text-gray-200">
                    Video Link
                  </h4>
                  <a
                    href={about.attributes.videoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm"
                  >
                    Watch Video
                  </a>
                </div>
              )}

              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <span>
                  Created: {about.attributes.createdDate}{" "}
                  {about.attributes.createdTime}
                </span>
                <span>
                  Updated: {about.attributes.updatedDate}{" "}
                  {about.attributes.updatedTime}
                </span>
                <span>
                  Status: {about.attributes.isArchived ? "Archived" : "Active"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add / Update Modals */}
      {showAdd && (
        <AddSlider
          show={showAdd}
          onClose={() => setShowAdd(false)}
          token={token ?? ""}
          alertsRef={alertsRef}
          onAdded={() => {
            fetchAbout();
            onRefresh?.();
          }}
        />
      )}

      {showUpdate && about && (
        <UpdateSlider
          show={showUpdate}
          onClose={() => setShowUpdate(false)}
          data={about}
          token={token ?? ""}
          alertsRef={alertsRef}
          onUpdated={() => {
            fetchAbout();
            onRefresh?.();
          }}
        />
      )}
    </div>
  );
};

export default AboutTable;
