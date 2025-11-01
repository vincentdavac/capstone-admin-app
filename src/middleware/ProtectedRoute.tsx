// ProtectedRoute.tsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { AlertsContainerRef } from "../components/Alert/AlertsContainer";

interface ProtectedRouteProps {
  children: React.ReactNode;
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useContext(AppContext)!; // ✅ Read loading state

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
    return <Navigate to="/admin/signin" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
