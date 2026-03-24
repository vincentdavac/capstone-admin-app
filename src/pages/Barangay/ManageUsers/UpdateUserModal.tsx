/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Fullscreen, User, X } from "lucide-react";
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
          } successfully!`,
        );
        onUpdated?.();
        onClose();
      } else {
        console.error("Failed to update user:", data);
        alertsRef.current?.addAlert(
          "error",
          data.message || "Failed to update user status.",
        );
      }
    } catch (error: any) {
      console.error("Error updating user:", error);
      alertsRef.current?.addAlert(
        "error",
        error.message || "An error occurred while updating user.",
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[9999] p-4">
      <div className="relative bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[95vh] animate-in fade-in zoom-in duration-300">
        {/* Header Bar */}
        <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl">
              <User size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Resident Profile
              </h2>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">
                Verification & Records
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* LEFT COLUMN: Profile & Status (4/12) */}
            <div className="lg:col-span-4 space-y-8">
              {/* Profile Card */}
              <div className="bg-slate-50 dark:bg-slate-800/40 rounded-[2rem] p-6 text-center border border-slate-100 dark:border-slate-800">
                <div className="relative inline-block mb-4">
                  <img
                    src={formData.image || "/api/placeholder/128/128"}
                    className="size-32 rounded-[2.5rem] object-cover ring-4 ring-white dark:ring-slate-900 shadow-xl"
                    alt="Profile"
                  />
                  <div
                    className={`absolute -bottom-2 -right-2 size-8 rounded-full border-4 border-white dark:border-slate-900 shadow-sm ${formData.registrationStatus ? "bg-emerald-500" : "bg-rose-500"}`}
                  />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                  {formData.firstName} {formData.lastName}
                </h3>
                <p className="text-sm text-slate-500 mb-6">{formData.email}</p>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block text-left px-2">
                    Update Account Status
                  </label>
                  <select
                    className="w-full h-12 px-4 rounded-2xl bg-white dark:bg-slate-900 border-none ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-indigo-500 font-bold text-sm cursor-pointer transition-all"
                    value={formData.registrationStatus ? 1 : 0}
                    onChange={(e) =>
                      setFormData((prev) =>
                        prev
                          ? {
                              ...prev,
                              registrationStatus: Number(e.target.value) === 1,
                            }
                          : prev,
                      )
                    }
                  >
                    <option value={1}> Approved</option>
                    <option value={0}> Disapproved</option>
                  </select>
                  <button
                    onClick={handleSubmit}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95"
                  >
                    Save Changes
                  </button>
                </div>
              </div>

              {/* Verification Document */}
              {formData.idDocument && (
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
                    Identification Document
                  </label>
                  <div
                    className="group relative rounded-[2rem] overflow-hidden border-2 border-dashed border-slate-200 dark:border-slate-700 cursor-pointer transition-all hover:border-indigo-400"
                    onClick={() => setShowImageModal(true)}
                  >
                    <img
                      src={formData.idDocument}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      alt="ID"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Fullscreen className="text-white" size={32} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Details (8/12) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Personal Details Section */}
              <section>
                <h4 className="flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-6">
                  <div className="size-1.5 rounded-full bg-indigo-500" />{" "}
                  General Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                  {[
                    { label: "Contact Number", value: formData.contactNumber },
                    {
                      label: "User Role",
                      value:
                        formData.userType === "admin"
                          ? "Admin"
                          : formData.userType === "barangay"
                            ? "Barangay Official"
                            : "Resident",
                    },
                    { label: "Municipality", value: formData.municipality },
                    {
                      label: "Date Registered",
                      value: formData.createdDate
                        ? `${formData.createdDate} @ ${formData.createdTime}`
                        : "N/A",
                    },
                    {
                      label: "Email Verification",
                      value: formData.emailVerifiedAt || "Pending",
                    },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
                        {item.label}
                      </label>
                      <div className="h-11 flex items-center px-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 text-sm font-semibold border border-slate-100 dark:border-slate-800">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Address Section */}
              <section>
                <h4 className="flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-6">
                  <div className="size-1.5 rounded-full bg-emerald-500" />{" "}
                  Location & Residence
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
                      Barangay
                    </label>
                    <div className="h-11 flex items-center px-4 rounded-xl bg-emerald-50/30 dark:bg-emerald-500/5 text-emerald-700 dark:text-emerald-400 text-sm font-bold border border-emerald-100 dark:border-emerald-900/30">
                      {formData.barangay?.name || "Unassigned"}
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
                      Full Address
                    </label>
                    <div className="h-11 flex items-center px-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 text-sm font-semibold border border-slate-100 dark:border-slate-800">
                      {formData.houseNo} {formData.street}
                    </div>
                  </div>
                </div>
              </section>

              {/* Technical Assets Section */}
              <section className="bg-slate-50 dark:bg-slate-800/20 rounded-[2rem] p-6 border border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                  Assigned Monitoring Buoys
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.barangay?.buoys &&
                  formData.barangay.buoys.length > 0 ? (
                    formData.barangay.buoys.map((b) => (
                      <div
                        key={b.id}
                        className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-black text-indigo-600 uppercase">
                            {b.buoyCode}
                          </span>
                          <span
                            className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${b.status?.toLowerCase() === "active" ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-500"}`}
                          >
                            {b.status}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                          {b.riverName}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-4 text-slate-400 text-sm italic">
                      No assets assigned to this sector.
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {showImageModal && (
        <div
          className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl flex justify-center items-center z-[100000] p-8"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative max-w-5xl w-full flex flex-col items-center">
            <button className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase text-xs tracking-widest">
              <X size={24} /> Close Preview
            </button>
            <img
              src={formData.idDocument || ""}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl shadow-black/50"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateUserModal;
