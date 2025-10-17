import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import { useAlert } from "../../context/AlertContext";

export default function SignInForm() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🚀 Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin-dashboard", { replace: true });
    }
  }, [navigate]);

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

  try {
    const res = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    let data: any = {};
    try {
      data = await res.json(); // catch kung hindi valid JSON
    } catch {
      data = {};
    }

if (!res.ok) {
  // 🚀 Handle rate limit separately
  if (res.status === 429) {
    const waitTime = data.retry_after ?? 60; // default 15s kung walang ibalik backend
    setRetryAfter(waitTime);
    showAlert(
      "error",
      "Too Many Attempts",
      `Please wait ${waitTime} seconds before trying again.`
    );
    return;
  }

  showAlert("error", "Login Failed", data.message || "Invalid email or password.");
  return;
}


    // ✅ Success
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    showAlert("success", "Login Successful", "Welcome back!");
    navigate("/admin-dashboard");
  } catch (err) {
    // ❌ Network/connection error
    showAlert("error", "Error", "Server error. Please try again later.");
  }
};

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
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
                <Label>Email <span className="text-error-500">*</span></Label>
                <Input
                  placeholder="info@gmail.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div>
                <Label>Password <span className="text-error-500">*</span></Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
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
    retryAfter ? "bg-gray-400 cursor-not-allowed" : "bg-brand-500 hover:bg-brand-600"
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
                to="/signup"
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
