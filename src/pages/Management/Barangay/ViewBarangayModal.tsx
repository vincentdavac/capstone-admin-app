/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ImageOff, X } from "lucide-react";

interface Props {
  show: boolean;
  onClose: () => void;
  data: any;
}

const ViewBarangayModal: React.FC<Props> = ({ show, onClose, data }) => {
  if (!show) return null;

  const a = data.attributes;

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
          Barangay Information
        </h2>

        {/* Image Section */}
        <div className="w-full mb-6">
          {a.attachment ? (
            <img
              src={a.attachment}
              alt="Barangay Attachment"
              className="w-full h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-700 shadow-md"
            />
          ) : (
            <div className="w-full h-48 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400">
              <ImageOff size={32} className="mb-2" />
              <span>No Image Available</span>
            </div>
          )}
        </div>

        {/* Barangay Details */}
        <div className="space-y-3 text-sm text-gray-800 dark:text-gray-200">
          <div className="flex justify-between">
            <strong>Barangay Code:</strong>
            <span>{a.barangayCode || "-"}</span>
          </div>
          <div className="flex justify-between">
            <strong>Name:</strong>
            <span>{a.name || "-"}</span>
          </div>
          <div className="flex justify-between">
            <strong>Number:</strong>
            <span>{a.number || "-"}</span>
          </div>
          <div className="flex justify-between">
            <strong>River Wall Height:</strong>
            <span>{a.riverWallHeight || "-"}</span>
          </div>
          <div className="flex justify-between">
            <strong>Square Meter:</strong>
            <span>{a.squareMeter || "-"}</span>
          </div>
          <div className="flex justify-between">
            <strong>Hectare:</strong>
            <span>{a.hectare || "-"}</span>
          </div>
          <div className="flex justify-between">
            <strong>Alert Levels:</strong>
            <span>
              White: {a.whiteLevelAlert || 0} | Blue: {a.blueLevelAlert || 0} |
              Red: {a.redLevelAlert || 0}
            </span>
          </div>
          <div className="flex justify-between">
            <strong>Description:</strong>
            <span className="text-right max-w-[60%]">
              {a.description || "-"}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewBarangayModal;
