import GridShape from "../../components/common/GridShape";
import { useLocation, useNavigate } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

export default function NotFound() {
  const { user, token } = useContext(AppContext)!;
  const location = useLocation();
  const navigate = useNavigate();

  const lastType = user?.userType;
  const currentPath = location.pathname;

  const handleBack = () => {
    // -----------------------------
    // CASE 1: NO TOKEN
    // -----------------------------
    if (!token) {
      if (currentPath.startsWith("/admin")) {
        navigate("/admin/signin", { replace: true });
        return;
      }

      if (currentPath.startsWith("/barangay")) {
        navigate("/barangay/signin", { replace: true });
        return;
      }

      navigate("/", { replace: true });
      return;
    }

    // -----------------------------
    // CASE 2: HAS TOKEN — redirect by userType
    // -----------------------------
    if (lastType === "admin") {
      navigate("/admin/dashboard", { replace: true });
      return;
    }

    if (lastType === "barangay") {
      navigate("/barangay/dashboard", { replace: true });
      return;
    }

    // fallback
    navigate("/", { replace: true });
  };

  return (
    <>
      <PageMeta title="404 Not Found" description="This is 404 Not Found" />

      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900">
        <GridShape />

        <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 text-center -mt-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white/95 sm:text-4xl">
              Page Not Found
            </h1>
          </div>

          <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] mb-8">
            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 blur-xl" />
            <img
              src="/images/error/404.svg"
              alt="404"
              className="mx-auto block w-full dark:hidden"
            />
            <img
              src="/images/error/404-dark.svg"
              alt="404"
              className="mx-auto hidden w-full dark:block"
            />
          </div>

          <div className="mb-8 max-w-md">
            <p className="text-base text-gray-600 dark:text-gray-400 sm:text-lg">
              We can't seem to find the page you are looking for!
            </p>
          </div>

          <button
            onClick={handleBack}
            className="bg-white text-gray-800 px-8 py-3.5 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center text-sm font-semibold shadow-lg hover:shadow-xl border-2 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 group"
          >
            <svg
              className="mr-3 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </button>
        </div>

        <div className="pointer-events-none fixed bottom-0 left-0 z-10 w-full overflow-hidden">
          <div className="relative">
            <img
              src="/images/error/404notfound-forwhitebg.svg"
              alt="Wave"
              className="block w-full h-auto max-w-none select-none transform translate-y-2"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900 via-transparent to-transparent h-32" />
          </div>
        </div>
      </div>
    </>
  );
}
