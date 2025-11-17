/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import ReCAPTCHA from "react-google-recaptcha";
import API_BASE_URL from "../../config/coreApi";
import { AlertsContainerRef } from "../../components/Alert/AlertsContainer";

interface Barangay {
  id: number;
  attributes: {
    barangayCode: string;
    name: string;
  };
}

interface Props {
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

export default function SignUpForm({ alertsRef }: Props) {
  const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [termsAcknowledged, setTermsAcknowledged] = useState(false);

  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setConfirmationPassword] = useState("");
  const [email, setEmail] = useState("");
  const [contact_number, setContactNumber] = useState("");
  const [image, SetImage] = useState<File | null>(null);
  const [house_no, setHouseNumber] = useState("");
  const [street, setStreet] = useState("");
  const [barangay, setBarangay] = useState<string>("");
  const [barangays, setBarangays] = useState<Barangay[]>([]);
  const [loadingBarangays, setLoadingBarangays] = useState<boolean>(true);
  const [municipality] = useState("Caloocan City");

  const handleCaptcha = (token: string | null) => {
    setCaptchaToken(token);
  };

  useEffect(() => {
    const fetchBarangays = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/barangays`, {
          method: "GET",
          headers: { Accept: "application/json" },
        });

        const data = await res.json();

        if (!res.ok) {
          alertsRef.current?.addAlert(
            "error",
            data.message || "Failed to load barangays"
          );
          setLoadingBarangays(false);
          return;
        }

        setBarangays(data.data);
        if (data.data.length > 0) {
          // default to first barangay
          setBarangay(String(data.data[0].id));
        }
      } catch (error: any) {
        alertsRef.current?.addAlert(
          "error",
          error.message || "Unable to fetch barangays."
        );
      } finally {
        setLoadingBarangays(false);
      }
    };

    fetchBarangays();
  }, [alertsRef]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isChecked) {
      alertsRef.current?.addAlert(
        "error",
        "You must agree to the Terms and Conditions and Privacy Policy."
      );
      return;
    }

    if (!captchaToken) {
      alertsRef.current?.addAlert("error", "Please complete the reCAPTCHA.");
      return;
    }

    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("password", password);
    formData.append("password_confirmation", password_confirmation);
    formData.append("email", email);
    formData.append("contact_number", contact_number);
    formData.append("house_no", house_no);
    formData.append("street", street);
    formData.append("barangay_id", barangay);
    formData.append("municipality", municipality);
    formData.append("g-recaptcha-response", String(captchaToken));
    formData.append("is_admin", "1");

    if (image) formData.append("image", image);

    try {
      const res = await fetch(`${API_BASE_URL}/admin/register`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          Object.values(data.errors).forEach((messages) => {
            (messages as string[]).forEach((msg) => {
              alertsRef.current?.addAlert("error", msg);
            });
          });
        } else {
          alertsRef.current?.addAlert(
            "error",
            data.message || "Registration failed"
          );
        }
        console.log("Error Response:", data);
        return;
      }

      alertsRef.current?.addAlert(
        "success",
        "We sent a verification link to your email. Please verify your account before logging in."
      );

      navigate("/admin/signin");
    } catch (err: any) {
      alertsRef.current?.addAlert(
        "error",
        err.message || "An unexpected error occurred."
      );
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your details to sign up!
            </p>
          </div>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="max-h-[80vh] overflow-y-auto px-2 space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <Label>
                    First Name<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    placeholder="Enter your first name"
                    value={first_name}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </div>
                <div>
                  <Label>
                    Last Name<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    placeholder="Enter your last name"
                    value={last_name}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label>
                  Email<span className="text-error-500">*</span>
                </Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <Label>
                  Password<span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    )}
                  </span>
                </div>
              </div>
              <div>
                <Label>
                  Retype Password<span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    placeholder="Retype your password"
                    type={showPassword ? "text" : "password"}
                    value={password_confirmation}
                    onChange={(e) => setConfirmationPassword(e.target.value)}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    )}
                  </span>
                </div>
              </div>

              <div>
                <Label>Contact Number</Label>
                <Input
                  type="text"
                  placeholder="Enter your contact number"
                  value={contact_number}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <Label>House No.</Label>
                  <Input
                    type="text"
                    placeholder="Enter your house number"
                    value={house_no}
                    onChange={(e) => setHouseNumber(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Street</Label>
                  <Input
                    type="text"
                    placeholder="Enter your street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <Label>Barangay</Label>
                  <select
                    value={barangay}
                    onChange={(e) => setBarangay(e.target.value)}
                    className="w-full px-3 py-2 text-sm border rounded-md border-gray-300 dark:bg-gray-800 dark:text-gray-200"
                    disabled={loadingBarangays}
                  >
                    {loadingBarangays ? (
                      <option>Loading barangays...</option>
                    ) : barangays.length === 0 ? (
                      <option>No barangays available</option>
                    ) : (
                      barangays.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.attributes.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                <div>
                  <Label>Municipality</Label>
                  <Input
                    type="text"
                    value={municipality}
                    disabled
                    className="bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <Label>Profile Image</Label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      SetImage(e.target.files[0]);
                    }
                  }}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-500 file:text-white hover:file:bg-brand-600"
                />
                {image && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Selected file: {image.name}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  className="w-5 h-5"
                  checked={isChecked}
                  disabled={!termsAcknowledged} // ✅ disable until terms seen
                  onChange={setIsChecked}
                />
                <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                  By creating an account means you agree to the{" "}
                  <button
                    type="button"
                    onClick={() => setIsTermsOpen(true)}
                    className="text-gray-800 underline dark:text-white/90"
                  >
                    Terms and Conditions
                  </button>
                  , and our{" "}
                  <button
                    type="button"
                    onClick={() => setIsPrivacyOpen(true)}
                    className="text-gray-800 underline dark:text-white/90"
                  >
                    Privacy Policy
                  </button>
                </p>
              </div>
              {/* ✅ Show message until Terms/Privacy read */}
              {!termsAcknowledged && (
                <span className="text-xs text-red-500 mt-1 block"></span>
              )}
              {/* ✅ Added reCAPTCHA */}
              <div className="flex justify-center">
                <ReCAPTCHA sitekey={SITE_KEY} onChange={handleCaptcha} />
              </div>

              <div>
                <button
                  type="submit"
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Already have an account?{" "}
              <Link
                to="/admin/signin"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* 🚀 Terms Modal */}
      {isTermsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
              Terms and Conditions
            </h2>
            <div className="mb-6 space-y-2 text-sm text-gray-600 dark:text-gray-300 max-h-60 overflow-y-auto">
              <p>1. You must provide accurate information when registering.</p>
              <p>2. Do not share your account credentials with others.</p>
              <p>3. Respect other users and avoid abusive behavior.</p>
              <p>4. We may suspend accounts that violate our policies.</p>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsTermsOpen(false)}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setTermsAcknowledged(true);
                  setIsChecked(true); // ✅ auto-check checkbox
                  setIsTermsOpen(false);
                }}
                className="px-4 py-2 text-sm text-white rounded-lg bg-brand-500 hover:bg-brand-600"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🚀 Privacy Policy Modal */}
      {isPrivacyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
              Privacy Policy
            </h2>
            <div className="mb-6 space-y-2 text-sm text-gray-600 dark:text-gray-300 max-h-60 overflow-y-auto">
              <p>
                We value your privacy. This policy explains how we collect, use,
                and protect your personal information.
              </p>
              <p>1. We collect only necessary data to provide our services.</p>
              <p>
                2. We will not sell your personal information to third parties.
              </p>
              <p>
                3. Your data is stored securely and used only as outlined here.
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsPrivacyOpen(false)}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setTermsAcknowledged(true);
                  setIsChecked(true); // ✅ auto-check checkbox
                  setIsPrivacyOpen(false);
                }}
                className="px-4 py-2 text-sm text-white rounded-lg bg-brand-500 hover:bg-brand-600"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
