/* eslint-disable @typescript-eslint/no-explicit-any */
import { X, ImageOff } from "lucide-react";
import React from "react";

interface Attributes {
  buoyCode: string;
  riverName: string;
  wallHeight: string;
  riverHectare: string;
  latitude: string;
  longitude: string;
  barangayId: string;
  attachment: string;
  status: string;
  maintenanceAt: string;
  createdDate: string;
  createdTime: string;
  updatedDate: string;
  updatedTime: string;
}

interface Barangay {
  id: number;
  barangayCode: string;
  name: string;
  number: number;
  riverWallHeight: string;
  squareMeter: string;
  hectare: string;
  whiteLevelAlert: string;
  blueLevelAlert: string;
  redLevelAlert: string;
  description: string;
  attachment: string;
}

interface BuoyData {
  id: number;
  attributes: Attributes;
  barangay: Barangay;
}

interface Props {
  show: boolean;
  onClose: () => void;
  data?: BuoyData;
}

const ViewBuoyModal: React.FC<Props> = ({ show, onClose, data }) => {
  if (!show || !data) return null;

  const attr = data.attributes;
  const brgy = data.barangay;

  const formattedDate = attr.maintenanceAt
    ? new Date(attr.maintenanceAt).toLocaleDateString()
    : "N/A";

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-700";
      case "inactive":
        return "bg-red-100 text-red-700";
      case "maintenance":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
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
          Buoy Information
        </h2>

        {/* Image Section */}
        <div className="w-full mb-6">
          {attr.attachment ? (
            <img
              src={attr.attachment}
              alt="Buoy Attachment"
              className="w-full h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-700 shadow-md"
            />
          ) : (
            <div className="w-full h-48 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400">
              <ImageOff size={32} className="mb-2" />
              <span>No Image Available</span>
            </div>
          )}
        </div>

        {/* Buoy Details */}
        <div className="space-y-3 text-sm text-gray-800 dark:text-gray-200">
          <div className="flex justify-between">
            <strong>Buoy Code:</strong>
            <span>{attr.buoyCode}</span>
          </div>
          <div className="flex justify-between">
            <strong>River Name:</strong>
            <span>{attr.riverName}</span>
          </div>
          <div className="flex justify-between">
            <strong>Wall Height:</strong>
            <span>{attr.wallHeight} m</span>
          </div>
          <div className="flex justify-between">
            <strong>River Hectare:</strong>
            <span>{attr.riverHectare}</span>
          </div>
          <div className="flex justify-between">
            <strong>Coordinates:</strong>
            <span>
              {attr.latitude}, {attr.longitude}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <strong>Status:</strong>
            <span
              className={`px-3 py-0.5 inline-flex text-xs font-medium rounded-full ${getStatusColor(
                attr.status
              )}`}
            >
              {attr.status}
            </span>
          </div>
          <div className="flex justify-between">
            <strong>Maintenance At:</strong>
            <span>{formattedDate}</span>
          </div>
        </div>

        <hr className="my-4 border-gray-300 dark:border-gray-700" />

        {/* Barangay Details */}
        <div className="space-y-2 text-sm text-gray-800 dark:text-gray-200">
          <h3 className="text-lg font-semibold mb-2">Barangay Information</h3>
          <div className="flex justify-between">
            <strong>Name:</strong>
            <span>{brgy?.name ?? "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <strong>Code:</strong>
            <span>{brgy?.barangayCode ?? "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <strong>River Wall Height:</strong>
            <span>{brgy?.riverWallHeight ?? "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <strong>Description:</strong>
            <span>{brgy?.description ?? "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBuoyModal;
