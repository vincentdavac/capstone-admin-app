import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import API_BASE_URL from "../../config/coreApi";
import { AlertsContainerRef } from "../../components/Alert/AlertsContainer";
import { AppContext } from "../../context/AppContext";
import CryptoJS from "crypto-js";

interface Props {
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

export default function SignInForm({ alertsRef }: Props) {
  const SECRET_KEY = "my-secret-key";

  const { setEncryptedToken } = useContext(AppContext)!;

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [retryAfter, setRetryAfter] = useState<number | null>(null);

  // ⏳ Countdown handler (no alerts)
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    if (retryAfter && retryAfter > 0) {
      timer = setInterval(() => {
        setRetryAfter((prev) => {
          if (!prev) return null;
          return prev > 1 ? prev - 1 : null;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [retryAfter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (!res.ok) {
      // 🕓 Handle too many attempts (rate limiting)
      if (res.status === 429) {
        const waitTime = data.retry_after ?? 60;
        setRetryAfter(waitTime);

        alertsRef.current?.addAlert(
          "error",
          `Please wait ${waitTime} seconds before trying again.`
        );
        return;
      }

      // ⚠️ Handle validation errors from Laravel
      if (data.errors) {
        Object.values(data.errors).forEach((messages) => {
          (messages as string[]).forEach((msg) => {
            alertsRef.current?.addAlert("error", msg);
          });
        });
      } else {
        // 🔹 Generic error message (fallback)
        alertsRef.current?.addAlert("error", data.message || "Login failed");
      }

      console.log("Error Response:", data);
      return;
    }

    if (data.errors) {
      // Loop through errors and display each one
      Object.values(data.data.errors).forEach((messages) => {
        (messages as string[]).forEach((msg) => {
          alertsRef.current?.addAlert("error", msg);
        });
      });
      console.log(data.data.errors);
    } else {
      console.log(data);

      // get token from data.data.token
      const newToken = data.data.token;

      const encryptedToken = CryptoJS.AES.encrypt(
        newToken,
        SECRET_KEY
      ).toString();

      localStorage.setItem("token", encryptedToken);
      console.log("Encrypted Token:", encryptedToken);

      // ✅ FIX: Set the ENCRYPTED token, not the decrypted one
      setEncryptedToken(encryptedToken);

      // ✅ Show success message first
      alertsRef.current?.addAlert("success", "Login successful!");

      // ✅ Wait a bit for context to update before navigating
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 300);

      console.log({ newToken });
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Email */}
              <div>
                <Label>
                  Email <span className="text-error-500">*</span>
                </Label>
                <Input
                  placeholder="info@gmail.com"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              {/* Password */}
              <div>
                <Label>
                  Password <span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      })
                    }
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

              {/* Remember me + Forgot password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox checked={isChecked} onChange={setIsChecked} />
                  <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                    Keep me logged in
                  </span>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit button */}
              <div>
                <button
                  type="submit"
                  disabled={retryAfter !== null && retryAfter > 0}
                  className={`w-full rounded-lg py-3 text-white ${
                    retryAfter
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-brand-500 hover:bg-brand-600"
                  }`}
                >
                  {retryAfter ? `Try again in ${retryAfter}s` : "Sign in"}
                </button>
              </div>
            </div>
          </form>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Don&apos;t have an account?{" "}
              <Link
                to="/admin/signup"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
