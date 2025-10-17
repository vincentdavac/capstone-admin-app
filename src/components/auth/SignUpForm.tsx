import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import { useAlert } from "../../context/AlertContext";
import ReCAPTCHA from "react-google-recaptcha"; // ✅ Added

const SITE_KEY = ""; // ✅ Your site key

export default function SignUpForm() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  // 🚀 Modal states
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // ✅ reCAPTCHA state
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleCaptcha = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🔹 Validation same as before
   const newErrors: { [key: string]: string } = {};
if (!fname.trim()) newErrors.fname = "First name is required.";
if (!lname.trim()) newErrors.lname = "Last name is required.";
if (!email.trim()) newErrors.email = "Email is required.";
else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format.";
if (!password.trim()) newErrors.password = "Password is required.";
else if (password.length < 8)
  newErrors.password = "Password must be at least 8 characters.";

// ✅ Add this block for retype password
if (!confirmPassword.trim())
  newErrors.confirmPassword = "Please retype your password.";
else if (confirmPassword !== password)
  newErrors.confirmPassword = "Passwords do not match.";

if (!isChecked)
  newErrors.terms =
    "You must agree to the Terms and Conditions and Privacy Policy.";
if (!captchaToken) newErrors.recaptcha = "Please complete the reCAPTCHA.";

if (Object.keys(newErrors).length > 0) {
  Object.values(newErrors).forEach((msg) =>
    showAlert("error", "Validation Error", msg)
  );
  return;
}


    try {
      const res = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
body: JSON.stringify({
  first_name: fname,
  last_name: lname,
  email,
  password,
  password_confirmation: password,
  image: null, // ✅ no default image
  image_url: null, // ✅ no default image URL
  contact_number: contactNumber || "0000000000",
  is_admin: 1, // ✅ admin registration
  "g-recaptcha-response": captchaToken,
}),

      });

      const data = await res.json();

      if (!res.ok) {
        if (data?.errors) {
          Object.keys(data.errors).forEach((key) => {
            showAlert("error", "Signup Failed", data.errors[key][0]);
          });
        } else if (data?.message) {
          showAlert("error", "Signup Failed", data.message);
        } else {
          showAlert("error", "Signup Failed", "Please try again.");
        }
        return;
      }

      // ✅ Success (do NOT store token yet)
      showAlert(
        "success",
        "Account Created",
        "We sent a verification link to your email. Please verify your account before logging in."
      );

      navigate("/signin"); // redirect to login page
    } catch (err) {
      showAlert(
        "error",
        "Error",
        "Unable to connect to the server. Please try again later."
      );
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link>
      </div>
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

          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <Label>
                    First Name<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    placeholder="Enter your first name"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                  />
                </div>
                <div>
                  <Label>
                    Last Name<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    placeholder="Enter your last name"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
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
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
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
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  className="w-5 h-5"
                  checked={isChecked}
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
                to="/signin"
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
                  setIsChecked(true);
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
              <p>
                1. We collect only necessary data to provide our services.
              </p>
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
                  setIsChecked(true);
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
