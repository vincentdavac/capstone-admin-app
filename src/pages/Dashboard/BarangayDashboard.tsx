import React, { useContext, useEffect, useState } from "react";
import WaterDepthChart from "../../components/Barangay Dashboard/WaterDepthChart";
import { AppContext } from "../../context/AppContext";
import DashboardCards from "../../components/dashboard_content/BarangayCards/cards";
import DangerLevel from "../../components/dashboard_content/BarangayDangerLevel/danger_level";
import { AlertsContainerRef } from "../../components/Alert/AlertsContainer";
import { insertingAlerts } from "../../api_hooks/dashboardHooks";
import API_BASE_URL from "../../config/coreApi";
import DisasterFlowChart from "../../components/DisasterFlowChart";
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
  insertingAlerts();
  const [selected, setSelected] = useState<"WHITE" | "BLUE" | "RED">("WHITE");

  const alertStatus = {
    WHITE:
      "Normal operations are maintained with continuous monitoring, coordinated efforts among teams, and systematic reporting to ensure smooth processes and timely issue resolution.",
    BLUE: "Early stage of emergency: heightened monitoring, coordination, & reporting. 50% of the DRRMD personnel shall remain on duty and on standby for possible deployment.",
    RED: "Imminent emergency: highest level monitoring, coordination, and Reporting. 100% of the DRRMD personnel shall remain on duty and on standby for immediate deployment.",
  };

  const getButtonClass = (color: "WHITE" | "BLUE" | "RED") => {
    const base =
      "flex items-center justify-center w-full h-[35px] rounded-full px-3 cursor-pointer border transition-colors";

    switch (color) {
      case "WHITE":
        return `${base} ${
          selected === "WHITE"
            ? "bg-gray-100 border-gray-400 dark:bg-gray-700 dark:border-gray-500 text-gray-900 dark:text-white"
            : "bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600"
        }`;
      case "BLUE":
        return `${base} ${
          selected === "BLUE"
            ? "bg-blue-500 text-white border-blue-600"
            : "border-blue-400 text-blue-600 dark:text-blue-400"
        }`;
      case "RED":
        return `${base} ${
          selected === "RED"
            ? "bg-red-500 text-white border-red-600"
            : "border-red-500 text-red-600 dark:text-red-400"
        }`;
    }
  };
  return (
    <div>
      <DashboardCards />
      <div className="w-full flex flex-col lg:flex-row items-start justify-start pl-1 mt-5 gap-3">
        <div className="w-full lg:w-2/3 flex flex-col gap-3">
          <div className="w-full">
            <DisasterFlowChart />
          </div>
          <WaterDepthChart data={depthData} loading={loading} />
        </div>
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="w-full lg:w-[488px] bg-white dark:bg-gray-800 shadow rounded-2xl border border-[#D9D9D9] dark:border-gray-700 flex flex-col">
            <div className="w-full px-4 pt-4 text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Disaster Alert Level
              </h3>
            </div>
            <hr className="my-3 border-gray-300 dark:border-gray-600" />
            <div className="grid grid-cols-3 gap-3 px-4">
              {(["WHITE", "BLUE", "RED"] as const).map((color) => (
                <button
                  key={color}
                  className={getButtonClass(color)}
                  onClick={() => setSelected(color)}
                >
                  {color}
                </button>
              ))}
            </div>
            <p className="px-4 py-4 text-sm text-center text-gray-700 dark:text-gray-400">
              {alertStatus[selected]}
            </p>
          </div>
          <DangerLevel alertsRef={alertsRef} />
        </div>
      </div>
    </div>
  );
};

export default BarangayDashboardContent;
