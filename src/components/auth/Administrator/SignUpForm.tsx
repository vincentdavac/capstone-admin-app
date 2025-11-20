/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeCloseIcon, EyeIcon } from "../../../icons";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import Checkbox from "../../form/input/Checkbox";
import ReCAPTCHA from "react-google-recaptcha";
import API_BASE_URL from "../../../config/coreApi";
import { AlertsContainerRef } from "../../Alert/AlertsContainer";

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
  const [id_document, setIdDocument] = useState<File | null>(null);

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
    if (id_document) formData.append("id_document", id_document);

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
          const errorMessage =
            typeof data.message === "string"
              ? data.message
              : typeof data.data === "string"
              ? data.data
              : "Registration failed";

          alertsRef.current?.addAlert("error", errorMessage);
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
                  autoComplete="username"
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
                    autoComplete="current-password"
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
                    autoComplete="new-password"
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
                <Label>Identification Photo</Label>
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

              <div>
                <Label>Government-Issued ID</Label>
                <input
                  type="file"
                  name="id_document"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setIdDocument(e.target.files[0]);
                    }
                  }}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-500 file:text-white hover:file:bg-brand-600"
                />
                {id_document && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Selected file: {id_document.name}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  className="w-5 h-5"
                  checked={isChecked}
                  disabled={!termsAcknowledged}
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

      {/* Terms and Conditions Modal */}
      {isTermsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="group relative w-full max-w-4xl mx-4 max-h-[90vh]">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm shadow-lg p-6 max-h-[80vh] flex flex-col">
              <h2 className="mb-4 text-xl font-bold text-white text-center">
                Terms and Conditions
              </h2>
              <div className="mb-6 space-y-4 text-sm text-white/90 overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div>
                  <h3 className="font-semibold">1. Acceptance of Terms</h3>
                  <p>By accessing, browsing, or using the X-STREAM website or application, you agree to these Terms and Conditions and all applicable laws and regulations. If you do not agree with any part of these terms, you are not permitted to use the platform.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">2. Purpose of the Platform</h3>
                  <p>X-STREAM is a research-based river monitoring and alert system designed to provide real-time data and support disaster preparedness. The website serves as an information and monitoring platform where authorized users can:</p>
                  <ul className="ml-4 list-disc">
                    <li>View live river condition data collected by X-STREAM sensors and buoys.</li>
                    <li>Access alerts and updates provided by disaster responders or administrators.</li>
                    <li>Communicate and manage data related to river monitoring activities.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold">3. Authorized Use</h3>
                  <p>Users agree to:</p>
                  <ul className="ml-4 list-disc">
                    <li>Use the platform only for lawful and intended purposes.</li>
                    <li>Respect all applicable data privacy and security regulations.</li>
                    <li>Avoid actions that could disrupt the operation of the system, such as unauthorized access, tampering, or misuse of data.</li>
                  </ul>
                  <p>Unauthorized attempts to modify, damage, or interfere with the system's operations may result in restricted access and possible legal action.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">4. Data Accuracy and Limitations</h3>
                  <p>While X-STREAM strives to provide accurate and real-time data, it does not guarantee that all sensor readings or transmitted information are free from error. Environmental conditions, connectivity issues, or hardware limitations may affect data accuracy and availability. X-STREAM is a Capstone Project and should not be used as the sole basis for critical emergency decisions.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">5. User Accounts and Responsibilities</h3>
                  <p>Authorized users (such as administrators and responders) may be provided with login credentials. You are responsible for maintaining the confidentiality of your account information and for all actions performed under your account. You agree to immediately notify the X-STREAM team of any unauthorized access or suspicious activity.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">6. Intellectual Property</h3>
                  <p>All content on the X-STREAM website, including the system design, layout, text, images, logos, and software, is the intellectual property of the X-STREAM project team. No part of the platform may be reproduced, distributed, or used for commercial purposes without prior written permission.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">7. Limitation of Liability</h3>
                  <p>X-STREAM and its developers are not liable for any:</p>
                  <ul className="ml-4 list-disc">
                    <li>Damages or losses arising from system downtime, data inaccuracy, or technical issues.</li>
                    <li>Consequences resulting from delayed alerts or incomplete information.</li>
                  </ul>
                  <p>The system is intended for educational and research purposes and not as a replacement for official government disaster monitoring systems.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">8. Privacy Policy</h3>
                  <p>We respect your privacy. Any data collected or stored by the system (such as sensor data, user information, or communication logs) will be handled in accordance with our Privacy Policy, which explains how information is used and protected.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">9. Modifications to the Terms</h3>
                  <p>X-STREAM reserves the right to modify or update these Terms and Conditions at any time. Users will be informed of any significant changes, and continued use of the website after updates means acceptance of the revised terms.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">10. Contact Information</h3>
                  <p>For questions, feedback, or concerns regarding these Terms and Conditions, you may contact the X-STREAM Project Team at:</p>
                  <p>Email: xstream.2k25@gmail.com<br />
                  Phone Number: 0995-331-3742</p>
                </div>
                
                <div className="p-3 mt-4 bg-white/20 rounded-lg">
                  <h4 className="font-semibold">Disclaimer:</h4>
                  <p>This system is part of an academic project under the University of Caloocan City. It is intended for research, educational, and prototype demonstration purposes only.</p>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 mt-auto border-t border-white/20">
                <button
                  onClick={() => setIsTermsOpen(false)}
                  className="px-4 py-2 text-sm text-white/90 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg hover:bg-white/30 transition-all duration-300"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setTermsAcknowledged(true);
                    setIsChecked(true);
                    setIsTermsOpen(false);
                  }}
                  className="px-4 py-2 text-sm text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-all duration-300"
                >
                  Accept Terms
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {isPrivacyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="group relative w-full max-w-4xl mx-4 max-h-[90vh]">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm shadow-lg p-6 max-h-[80vh] flex flex-col">
              <h2 className="mb-4 text-xl font-bold text-white text-center">
                Privacy Policy
              </h2>
              <div className="mb-6 space-y-4 text-sm text-white/90 overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div>
                  <h3 className="font-semibold">1. Information We Collect</h3>
                  <p>X-STREAM may collect the following types of data:</p>
                  <p className="ml-4"><strong>a. Personal Information</strong><br />
                  When authorized users (e.g., administrators, responders, or project members) access the system, we may collect:</p>
                  <ul className="ml-8 list-disc">
                    <li>Name and contact details</li>
                    <li>Login credentials or account information</li>
                    <li>Communication or activity logs</li>
                  </ul>
                  
                  <p className="ml-4 mt-2"><strong>b. Environmental and System Data</strong></p>
                  <ul className="ml-8 list-disc">
                    <li>Real-time river and environmental readings from sensors and devices</li>
                    <li>Location and status of monitoring stations</li>
                    <li>Alerts and system notifications</li>
                  </ul>
                  
                  <p className="ml-4 mt-2"><strong>c. Technical Data</strong></p>
                  <ul className="ml-8 list-disc">
                    <li>Device type, browser, and access time</li>
                    <li>IP address and session activity</li>
                  </ul>
                  <p>These are collected to improve platform performance and security.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">2. How We Use Collected Information</h3>
                  <p>We use the collected information to:</p>
                  <ul className="ml-4 list-disc">
                    <li>Provide real-time monitoring and alert services</li>
                    <li>Maintain system accuracy and reliability</li>
                    <li>Manage and secure user accounts</li>
                    <li>Conduct research and analysis for environmental studies</li>
                    <li>Improve system functionality and user experience</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold">3. Data Sharing and Disclosure</h3>
                  <p>We do not sell, rent, or trade your personal information. Data may only be shared under the following conditions:</p>
                  <ul className="ml-4 list-disc">
                    <li>With authorized project members for research and analysis</li>
                    <li>When required by law or official government requests</li>
                    <li>To ensure public safety in case of environmental or emergency alerts</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold">4. Data Security</h3>
                  <p>We use appropriate technical and organizational measures to protect your information from unauthorized access, alteration, or disclosure. However, no system is entirely secure. Users are encouraged to:</p>
                  <ul className="ml-4 list-disc">
                    <li>Keep their account credentials private</li>
                    <li>Log out after using the system</li>
                    <li>Report any suspicious activity to the X-STREAM team</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold">5. Data Retention</h3>
                  <p>Data collected through the X-STREAM system will be retained only for as long as necessary to fulfill its research and monitoring purposes. After project completion, data may be anonymized or deleted following institutional research guidelines.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">6. Cookies and Analytics</h3>
                  <p>Our website may use cookies or analytics tools to monitor website performance and user engagement. You may disable cookies through your browser settings, but some features of the platform may not function properly as a result.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">7. Third-Party Links</h3>
                  <p>The X-STREAM website may contain links to external sites (e.g., partner institutions or government agencies). We are not responsible for the privacy practices or content of these external websites.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">8. User Rights</h3>
                  <p>Depending on your role and level of access, you have the right to:</p>
                  <ul className="ml-4 list-disc">
                    <li>Request access to or correction of your personal data</li>
                    <li>Request deletion of your account or stored data (if applicable)</li>
                    <li>Withdraw consent for certain data uses</li>
                  </ul>
                  <p>Requests can be sent to our project email below.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">9. Updates to This Policy</h3>
                  <p>We may update this Privacy Policy from time to time to reflect new features, technologies, or legal requirements. All updates will be posted on this page, and continued use of the platform constitutes acceptance of the revised policy.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold">10. Contact Us</h3>
                  <p>For questions, feedback, or privacy-related concerns, you may contact the X-STREAM Project Team at:</p>
                  <p>Email: xstream.2k25@gmail.com<br />
                  Phone Number: 0995-331-3742</p>
                </div>
                
                <div className="p-3 mt-4 bg-white/20 rounded-lg">
                  <h4 className="font-semibold">Disclaimer:</h4>
                  <p>This system is part of an academic project under the University of Caloocan City. It is intended for research, educational, and prototype demonstration purposes only.</p>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 mt-auto border-t border-white/20">
                <button
                  onClick={() => setIsPrivacyOpen(false)}
                  className="px-4 py-2 text-sm text-white/90 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg hover:bg-white/30 transition-all duration-300"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setTermsAcknowledged(true);
                    setIsChecked(true);
                    setIsPrivacyOpen(false);
                  }}
                  className="px-4 py-2 text-sm text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-all duration-300"
                >
                  Accept Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}