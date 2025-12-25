// ProtectedRoute.tsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { AlertsContainerRef } from "../components/Alert/AlertsContainer";

interface ProtectedRouteProps {
  children: React.ReactNode;
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

const BarangayProtectedRoutes = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useContext(AppContext)!; // Read loading state

  // Show loading indicator while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Only redirect after loading is complete
  if (!user) {
    return <Navigate to="/barangay/signin" replace />;
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

  return <>{children}</>;
};

export default BarangayProtectedRoutes;
