import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import API_BASE_URL from "../../../config/coreApi";
import { AlertsContainerRef } from "../../../components/Alert/AlertsContainer";

interface BarangayData {
  id: number;
  name: string;
}

interface UserAttributes {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  houseNo: string;
  street: string;
  barangay: BarangayData | null;
  municipality: string | null;
  isAdmin: boolean;
  isActive: boolean;
  image: string | null;
}

interface Props {
  show: boolean;
  onClose: () => void;
  token: string;
  userId: number | null;
  userData?: UserAttributes;
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
  const [formData, setFormData] = useState<UserAttributes | null>(null);

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
        // ✅ Only send is_active
        body: JSON.stringify({
          is_active: formData.isActive ? 1 : 0,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("User updated successfully:", data);

        // ✅ Trigger alert
        alertsRef.current?.addAlert(
          "success",
          `User has been ${
            formData.isActive ? "activated" : "deactivated"
          } successfully!`
        );

        onUpdated?.();
        onClose();
      } else {
        const errorData = await res.json();
        console.error("Failed to update user:", errorData);

        alertsRef.current?.addAlert(
          "error",
          "Failed to update user status. Please try again."
        );
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alertsRef.current?.addAlert(
        "error",
        "An error occurred while updating user."
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="relative bg-white/90 dark:bg-gray-900/90 border border-white/20 rounded-2xl shadow-2xl w-full max-w-lg p-8 z-[10000] overflow-y-auto max-h-[90vh]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
        >
          <X size={22} />
        </button>

        {/* User Image */}
        {formData.image && (
          <div className="flex justify-center mb-5">
            <img
              src={formData.image}
              alt="User"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
            />
          </div>
        )}

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-5 text-gray-900 dark:text-white text-center">
          User Information
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                First Name
              </label>
              <input
                name="firstName"
                value={formData.firstName}
                disabled
                placeholder="First Name"
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 cursor-not-allowed"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Last Name
              </label>
              <input
                name="lastName"
                value={formData.lastName}
                disabled
                placeholder="Last Name"
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              name="email"
              value={formData.email}
              disabled
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Contact Number
            </label>
            <input
              name="contactNumber"
              value={formData.contactNumber}
              disabled
              placeholder="Contact Number"
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              House No.
            </label>
            <input
              name="houseNo"
              value={formData.houseNo}
              disabled
              placeholder="House No."
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Street
            </label>
            <input
              name="street"
              value={formData.street}
              disabled
              placeholder="Street"
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Barangay and Municipality */}
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Role
              </label>
              <input
                readOnly
                disabled
                value={formData.isAdmin ? "Admin" : "User"}
                placeholder="Barangay"
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Municipality
              </label>
              <input
                readOnly
                disabled
                value={formData.municipality || ""}
                placeholder="Municipality"
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600"
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Barangay
            </label>
            <input
              readOnly
              disabled
              value={formData.barangay?.name || ""}
              placeholder="Role"
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserModal;
