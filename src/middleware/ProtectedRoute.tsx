// ProtectedRoute.tsx
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { AlertsContainerRef } from "../components/Alert/AlertsContainer";

interface ProtectedRouteProps {
  children: React.ReactNode;
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useContext(AppContext)!;
  const location = useLocation();

  // ⏳ Wait for auth to resolve
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  //  Not logged in → go to signin
  if (!user) {
    return <Navigate to="/admin/signin" replace />;
  }

  //  Role-based access enforcement
  if (user.userType === "admin" && !location.pathname.startsWith("/admin")) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (
    user.userType === "barangay" &&
    !location.pathname.startsWith("/barangay")
  ) {
    return <Navigate to="/barangay/dashboard" replace />;
  }

  //  Authorized
  return <>{children}</>;
};

export default ProtectedRoute;
