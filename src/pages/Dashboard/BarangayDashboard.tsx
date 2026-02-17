import React, { useContext, useEffect, useState } from "react";
import WaterDepthChart from "../../components/Barangay Dashboard/WaterDepthChart";
import { AppContext } from "../../context/AppContext";
import { useAlertMonitor } from "../../api_hooks/alertMonitoringHooks";
import AlertModal from "../Barangay/AlertManagement/alertModal";
import DashboardCards from "../../components/dashboard_content/BarangayCards/cards";
import DangerLevel from "../../components/dashboard_content/BarangayDangerLevel/danger_level";
import { AlertsContainerRef } from "../../components/Alert/AlertsContainer";
import { insertingAlerts } from "../../api_hooks/dashboardHooks";
import API_BASE_URL from "../../config/coreApi";

interface Props {
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

interface DepthData {
  id: number;
  buoy_id: number;
  depth_ft: number;
  recorded_at: string;
}

const fetchDepthFtLast24Hours = async (buoyId: number, token: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/ms5837-data/depth-ft-last-24-hours?buoy_id=${buoyId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching depth data:", error);
    throw error;
  }
};

const BarangayDashboardContent = ({ alertsRef }: Props) => {
  const { user, token } = useContext(AppContext)!;

  const buoyCode = user?.barangay?.buoys?.[0]?.buoyCode;
  const buoyId = user?.barangay?.buoys?.[0]?.id;

  const [depthData, setDepthData] = useState<DepthData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Dashboard | X-Stream";
  }, []);

  useEffect(() => {
    if (!buoyId || !token) return;

    const loadDepthData = async () => {
      try {
        setLoading(true);
        const response = await fetchDepthFtLast24Hours(buoyId, token);

        if (response.status === "success") {
          setDepthData(response.data);
        }
      } catch (error) {
        console.error("Failed to load depth data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDepthData();

    // Optional: auto refresh every 30 seconds
    const interval = setInterval(loadDepthData, 30000);
    return () => clearInterval(interval);
  }, [buoyId, token]);

  const { showAlert, currentAlert, handleClose } = useAlertMonitor(
    buoyCode?.toString() ?? "",
    50000,
    buoyId?.toString() ?? "",
  );

  insertingAlerts();

  return (
    <div>
      <DashboardCards />

      <div className="w-full flex flex-col lg:flex-row items-start justify-start pl-1 mt-5 gap-3">
        <div className="w-full lg:w-2/3">
          <WaterDepthChart data={depthData} loading={loading} />
        </div>
        <div className="w-full lg:w-1/3">
          <DangerLevel alertsRef={alertsRef} />
        </div>
      </div>

      <AlertModal
        isOpen={showAlert}
        alert={currentAlert}
        onClose={handleClose}
      />
    </div>
  );
};

export default BarangayDashboardContent;
