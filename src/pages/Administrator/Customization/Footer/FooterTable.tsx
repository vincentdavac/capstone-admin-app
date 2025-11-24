/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { Plus, Upload } from "lucide-react";
import API_BASE_URL from "../../../../config/coreApi";
import { AppContext } from "../../../../context/AppContext";
import { AlertsContainerRef } from "../../../../components/Alert/AlertsContainer";
import AddSlider from "./FooterAdd";
import UpdateSlider from "./FooterUpdate";

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
  alertsRef: React.RefObject<AlertsContainerRef | null>;
  onRefresh?: () => void;
}

const FooterTable = ({ alertsRef, onRefresh }: Props) => {
  const { token } = useContext(AppContext)!;

  const [footer, setFooter] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const fetchFooter = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/footers`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const result = await res.json();
      if (res.ok && result.data && result.data.length > 0) {
        setFooter(result.data[0]); // only one footer allowed
      } else {
        setFooter(null);
      }
    } catch (error) {
      console.error("Error fetching footer:", error);
      setFooter(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchFooter();
  }, [token]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-auto text-gray-900 dark:text-white mb-5">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        {/* Header: Add & Update Buttons */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200">
            Homepage Footer
          </h2>
          <div className="flex gap-2">
            {!footer && (
              <button
                onClick={() => setShowAdd(true)}
                className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg transition"
                title="Add Footer"
              >
                <Plus className="w-5 h-5" />
              </button>
            )}
            {footer && (
              <button
                onClick={() => setShowUpdate(true)}
                className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg transition"
                title="Update Footer"
              >
                <Upload className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Footer Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center gap-2 text-gray-500 py-10">
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#453EFE]" />
              Loading Footer...
            </div>
          ) : !footer ? (
            <div className="text-gray-500 py-10 text-center">
              No footer found.
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {footer.attributes.image && (
                  <img
                    src={footer.attributes.image}
                    alt="Homepage Footer"
                    className="w-32 h-32 object-cover rounded-md shadow-sm"
                  />
                )}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {footer.attributes.caption}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {footer.attributes.footerSubtitle}
                  </p>
                </div>
              </div>

              {/* Links & Contact */}
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md space-y-1">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Email: {footer.attributes.emailAddress}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Documentation: {footer.attributes.documentationLink}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Research Paper: {footer.attributes.researchPaperLink}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Facebook: {footer.attributes.facebookLink}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Youtube: {footer.attributes.youtubeLink}
                </p>
              </div>

              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>
                  Created: {footer.attributes.createdDate}{" "}
                  {footer.attributes.createdTime}
                </span>
                <span>
                  Updated: {footer.attributes.updatedDate}{" "}
                  {footer.attributes.updatedTime}
                </span>
                <span>
                  Status: {footer.attributes.isArchived ? "Archived" : "Active"}
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
            fetchFooter();
            onRefresh?.();
          }}
        />
      )}
      {showUpdate && footer && (
        <UpdateSlider
          show={showUpdate}
          onClose={() => setShowUpdate(false)}
          data={footer}
          token={token ?? ""}
          alertsRef={alertsRef}
          onUpdated={() => {
            fetchFooter();
            onRefresh?.();
          }}
        />
      )}
    </div>
  );
};

export default FooterTable;
