/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import API_BASE_URL from "../../../config/coreApi";
import { AlertsContainerRef } from "../../../components/Alert/AlertsContainer";

interface BuoyData {
  id: number;
  buoyCode: string;
  riverName: string;
  status: string;
}

interface BarangayData {
  id: number;
  name: string;
  number?: number | null;
  buoys?: BuoyData[];
}

interface VerifierData {
  id: number;
  name: string;
}

export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  houseNo: string;
  street: string;
  barangay: BarangayData | null;
  municipality: string | null;
  userType: "admin" | "barangay" | "user";
  isActive: boolean;
  registrationStatus: boolean;
  image: string | null;
  idDocument: string | null;
  dateVerified: string | null;
  emailVerifiedAt?: string | null;
  verifiedBy?: number | null;
  verifier?: VerifierData | null;
  createdDate?: string | null;
  createdTime?: string | null;
  updatedDate?: string | null;
  updatedTime?: string | null;
}
interface Props {
  show: boolean;
  onClose: () => void;
  token: string;
  userId: number | null;
  userData?: UserData;
  onUpdated?: () => void;
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

const UpdateUserModal: React.FC<Props> = ({
  show,
  onClose,
  token,
  userId,
  userData,
  onUpdated,
  alertsRef,
}) => {
  const [formData, setFormData] = useState<UserData | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    if (userData) setFormData(userData);
  }, [userData]);

  if (!show || !formData) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/update-user/${userId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          registration_status: formData.registrationStatus ? 1 : 0,
        }),
      });

      const data = await res.json();

      if (res.ok && data.status !== "error") {
        console.log("User updated successfully:", data);
        alertsRef.current?.addAlert(
          "success",
          `User has been ${
            formData.registrationStatus ? "approved" : "disapproved"
          } successfully!`
        );
        onUpdated?.();
        onClose();
      } else {
        console.error("Failed to update user:", data);
        alertsRef.current?.addAlert(
          "error",
          data.message || "Failed to update user status."
        );
      }
    } catch (error: any) {
      console.error("Error updating user:", error);
      alertsRef.current?.addAlert(
        "error",
        error.message || "An error occurred while updating user."
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="relative bg-white/90 dark:bg-gray-900/90 border border-white/20 rounded-2xl shadow-2xl w-full max-w-4xl p-8 z-[10000] overflow-y-auto max-h-[90vh]">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
        >
          <X size={22} />
        </button>

        {/* Profile Image */}
        {formData.image && (
          <div className="flex justify-center mb-4">
            <img
              src={formData.image}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
            />
          </div>
        )}

        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900 dark:text-white">
          User Information
        </h2>

        {/* GRID: LEFT & RIGHT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT — PERSONAL INFORMATION */}
          <div className="space-y-4">
            {/* First + Last Name */}
            <div>
              <label className="label">First Name</label>
              <input disabled value={formData.firstName} className="field" />
            </div>

            <div>
              <label className="label">Last Name</label>
              <input disabled value={formData.lastName} className="field" />
            </div>

            {/* Email */}
            <div>
              <label className="label">Email</label>
              <input disabled value={formData.email} className="field" />
            </div>

            {/* Contact Number */}
            <div>
              <label className="label">Contact Number</label>
              <input
                disabled
                value={formData.contactNumber}
                className="field"
              />
            </div>

            {/* House No */}
            <div>
              <label className="label">House No.</label>
              <input disabled value={formData.houseNo} className="field" />
            </div>

            {/* Street */}
            <div>
              <label className="label">Street</label>
              <input disabled value={formData.street} className="field" />
            </div>

            {/* User Type */}
            <div>
              <label className="label">User Type</label>
              <input
                disabled
                value={
                  formData.userType === "admin"
                    ? "Admin"
                    : formData.userType === "barangay"
                    ? "Barangay Official"
                    : "User"
                }
                className="field"
              />
            </div>

            {/* Municipality */}
            <div>
              <label className="label">Municipality</label>
              <input
                disabled
                value={formData.municipality || ""}
                className="field"
              />
            </div>

            {/* Created Date */}
            <div>
              <label className="label">Date Created</label>
              <input
                disabled
                value={
                  formData.createdDate
                    ? `${formData.createdDate} ${formData.createdTime}`
                    : ""
                }
                className="field"
              />
            </div>

            {/* Email Verified At */}
            <div>
              <label className="label">Email Verified At</label>
              <input
                disabled
                value={formData.emailVerifiedAt || ""}
                className="field"
              />
            </div>
          </div>

          {/* RIGHT — BARANGAY • BUOY • VERIFIER */}
          <div className="space-y-4">
            {/* Barangay */}
            <div>
              <label className="label">Barangay</label>
              <input
                disabled
                value={formData.barangay?.name || ""}
                className="field"
              />
            </div>

            {/* Buoys */}
            <div>
              <label className="label">Assigned Buoy</label>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-sm text-gray-700 dark:text-gray-300">
                {formData.barangay?.buoys &&
                formData.barangay.buoys.length > 0 ? (
                  formData.barangay.buoys.map((b) => (
                    <div
                      key={b.id}
                      className="border-b border-gray-300 dark:border-gray-700 py-1"
                    >
                      <p>
                        <strong>Code:</strong> {b.buoyCode}
                      </p>
                      <p>
                        <strong>River:</strong> {b.riverName}
                      </p>
                      <p>
                        <strong>Status:</strong> {b.status}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="italic text-gray-500">No Buoys Assigned</p>
                )}
              </div>
            </div>

            {/* Verifier */}
            <div>
              <label className="label">Verified By</label>
              <input
                disabled
                value={formData.verifier?.name || "Not Verified"}
                className="field"
              />
            </div>

            {/* ID Document with modal */}
            {formData.idDocument && (
              <div>
                <label className="label">ID Document</label>

                {/* Preview Image */}
                <img
                  src={formData.idDocument}
                  className="w-full rounded-md shadow border border-gray-300 dark:border-gray-700 cursor-pointer hover:opacity-80"
                  alt="ID Document"
                  onClick={() => setShowImageModal(true)}
                />

                {/* IMAGE MODAL */}
                {showImageModal && (
                  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[99999]">
                    <div className="relative max-w-3xl w-full">
                      <button
                        onClick={() => setShowImageModal(false)}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                      >
                        <X size={20} />
                      </button>

                      <img
                        src={formData.idDocument}
                        className="w-full max-h-[90vh] object-contain rounded-lg shadow-xl"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Registration Status Dropdown */}
            <div>
              <label className="label">Registration Status</label>
              <select
                className="field cursor-pointer"
                value={formData.registrationStatus ? 1 : 0}
                onChange={(e) =>
                  setFormData((prev) =>
                    prev
                      ? {
                          ...prev,
                          registrationStatus: Number(e.target.value) === 1,
                        }
                      : prev
                  )
                }
              >
                <option value={1}>Approve</option>
                <option value={0}>Disapprove</option>
              </select>
            </div>

            {/* Update Button */}
            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Update Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserModal;
