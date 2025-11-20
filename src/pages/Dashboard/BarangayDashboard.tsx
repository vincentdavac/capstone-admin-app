import React from "react";
import { User, MessageSquare, AlertTriangle, Droplets } from "lucide-react";
import { ThemeProvider } from "../../components/Barangay Dashboard/ThemeContext";
import { StatCard } from "../../components/Barangay Dashboard/StatCard";
import { WaterDepthChart } from "../../components/Barangay Dashboard/WaterDepthChart";
const BarangayDashboardContent: React.FC = () => {


  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Verified Users"
          value="10"
          trend="11.01%"
          icon={<User />}
        />
        <StatCard
          title="Current Water Level"
          value="3.2m"
          icon={<Droplets />}
          status="Normal"
        />
        <StatCard
          title="Pending Chats"
          value="10"
          trend="11.01%"
          icon={<MessageSquare />}
        />
        <StatCard
          title="Active Alerts"
          value="05"
          trend="11.01%"
          icon={<AlertTriangle />}
        />
      </div>

      {/* Main Chart Card - WaterDepthChart */}
      <WaterDepthChart />
    </div>
  );
};
const BarangayDashboard: React.FC = () => (
  <ThemeProvider>
    <BarangayDashboardContent />
  </ThemeProvider>
);

export default BarangayDashboard;
