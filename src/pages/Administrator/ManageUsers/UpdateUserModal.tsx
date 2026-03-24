/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  X,
  User,
  MapPin,
  Anchor,
  ShieldCheck,
  Mail,
  Phone,
  Calendar,
  Landmark,
} from "lucide-react";
import API_BASE_URL from "../../../config/coreApi";
import { AlertsContainerRef } from "../../../components/Alert/AlertsContainer";

// ... (Interfaces remain unchanged as per your request)
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
        alertsRef.current?.addAlert(
          "success",
          `User has been ${formData.registrationStatus ? "approved" : "disapproved"} successfully!`,
        );
        onUpdated?.();
        onClose();
      } else {
        alertsRef.current?.addAlert(
          "error",
          data.message || "Failed to update user status.",
        );
      }
    } catch (error: any) {
      alertsRef.current?.addAlert(
        "error",
        error.message || "An error occurred while updating user.",
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[9999] p-4">
      <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Header Section */}
        <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200 dark:shadow-none">
              <User size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                User Verification
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Review and update registration credentials
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* LEFT COLUMN: Profile & Info */}
            <div className="lg:col-span-4 space-y-6">
              <div className="text-center lg:text-left">
                <div className="relative inline-block">
                  <img
                    src={formData.image || "https://via.placeholder.com/150"}
                    className="w-32 h-32 rounded-3xl object-cover ring-4 ring-white dark:ring-slate-800 shadow-xl mx-auto lg:mx-0"
                    alt="Profile"
                  />
                  <div
                    className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${formData.isActive ? "bg-emerald-500 text-white" : "bg-slate-400 text-white"}`}
                  >
                    {formData.isActive ? "Active" : "Offline"}
                  </div>
                </div>
                <h3 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
                  {formData.firstName} {formData.lastName}
                </h3>
                <span className="inline-block px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mt-1">
                  {formData.userType === "barangay"
                    ? "Barangay Official"
                    : formData.userType.toUpperCase()}
                </span>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <Mail size={18} className="text-slate-400" />
                  <span className="text-sm truncate">{formData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <Phone size={18} className="text-slate-400" />
                  <span className="text-sm">{formData.contactNumber}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <Calendar size={18} className="text-slate-400" />
                  <span className="text-sm">Joined {formData.createdDate}</span>
                </div>
              </div>

              {/* ID DOCUMENT PREVIEW CARD */}
              {formData.idDocument && (
                <div
                  className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer"
                  onClick={() => setShowImageModal(true)}
                >
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium text-sm">
                    View Document
                  </div>
                  <img
                    src={formData.idDocument}
                    className="w-full h-40 object-cover"
                    alt="ID Document"
                  />
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <ShieldCheck size={14} /> ID Document Attached
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Details & Action */}
            <div className="lg:col-span-8 space-y-8">
              {/* Address Section */}
              <section>
                <h4 className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                  <MapPin size={16} /> Location Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">
                      Residency
                    </p>
                    <p className="text-slate-700 dark:text-slate-200 text-sm font-medium mt-1">
                      #{formData.houseNo} {formData.street},{" "}
                      {formData.barangay?.name}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">
                      Municipality
                    </p>
                    <p className="text-slate-700 dark:text-slate-200 text-sm font-medium mt-1">
                      {formData.municipality || "N/A"}
                    </p>
                  </div>
                </div>
              </section>

              {/* Buoy Section */}
              <section>
                <h4 className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                  <Anchor size={16} /> Buoy Assignments
                </h4>
                <div className="space-y-3">
                  {formData.barangay?.buoys &&
                  formData.barangay.buoys.length > 0 ? (
                    formData.barangay.buoys.map((b) => (
                      <div
                        key={b.id}
                        className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 shadow-sm"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400">
                            <Landmark size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                              {b.buoyCode}
                            </p>
                            <p className="text-xs text-slate-500">
                              {b.riverName}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${b.status === "Active" ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"}`}
                        >
                          {b.status}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-slate-400 text-sm italic">
                      No Buoys currently assigned to this area.
                    </div>
                  )}
                </div>
              </section>

              {/* Verification Section */}
              <section className="pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex flex-col md:flex-row items-end gap-4">
                  <div className="flex-1 w-full">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1">
                      Update Status
                    </label>
                    <div className="relative">
                      <select
                        className="w-full h-12 pl-4 pr-10 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-indigo-500 text-sm font-semibold appearance-none cursor-pointer"
                        value={formData.registrationStatus ? 1 : 0}
                        onChange={(e) =>
                          setFormData((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  registrationStatus:
                                    Number(e.target.value) === 1,
                                }
                              : prev,
                          )
                        }
                      >
                        <option value={1}>Approved / Verified</option>
                        <option value={0}> Pending / Disapproved</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <ShieldCheck size={18} />
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none transition-all flex items-center gap-2 whitespace-nowrap w-full md:w-auto"
                  >
                    Save Changes
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* IMAGE MODAL (Full Screen) */}
      {showImageModal && (
        <div
          className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm flex justify-center items-center z-[100000] p-4"
          onClick={() => setShowImageModal(false)}
        >
          <button className="absolute top-6 right-6 text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
            <X size={32} />
          </button>
          <img
            src={formData.idDocument!}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl shadow-black/50"
            alt="Full ID"
          />
        </div>
      )}
    </div>
  );
};

export default UpdateUserModal;
