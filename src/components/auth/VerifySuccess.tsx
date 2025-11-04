import { Link } from "react-router-dom";

export default function VerifySuccess() {
  return (
    <div className="flex flex-col flex-1 justify-center w-full max-w-md mx-auto px-6 lg:px-0">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
          Email Verified 
        </h1>

        <p className="mt-2 mb-6 text-gray-600 dark:text-gray-300">
          Your email has been successfully verified. You may now log in to your account.
        </p>

        <Link
          to="/admin/signin"
          className="block w-full text-center bg-indigo-600 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-700 transition"
        >
          Go to Login
        </Link>

        {/* <p className="mt-4 text-sm text-gray-500 text-center dark:text-gray-400">
          Didn’t request this?
          <Link
            to="/admin/signin"
            className="text-indigo-600 hover:underline ml-1"
          >
            Sign In Page
          </Link>
        </p> */}
      </div>
    </div>
  );
}
