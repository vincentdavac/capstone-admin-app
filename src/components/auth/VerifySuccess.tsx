import { Link } from "react-router-dom";

export default function VerifySuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="p-6 bg-white shadow-md rounded-lg text-center">
        <h1 className="text-2xl font-bold text-green-600">
          ✅ Email Verified!
        </h1>
        <p className="mt-2 text-gray-600">
          Your email has been successfully verified. You can now log in.
        </p>
        <Link
          to="/signin"
          className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
