import React, { useContext, useEffect, useState } from "react";
import WaterDepthChart from "../../components/Barangay Dashboard/WaterDepthChart";
import DashboardCards from "../../components/dashboard_content/BarangayCards/cards";
import DangerLevel from "../../components/dashboard_content/BarangayDangerLevel/danger_level";
import { AlertsContainerRef } from "../../components/Alert/AlertsContainer";
import { insertingAlerts } from "../../api_hooks/dashboardHooks";
import API_BASE_URL from "../../config/coreApi";
import DisasterFlowChart from "./DisasterFlowChart";
import AlertModal from "../Barangay/AlertManagement/alertModal";
import { useAlertMonitor } from "../../api_hooks/alertMonitoringHooks";
import { AppContext } from "../../context/AppContext";
import { ShieldAlert, Activity } from "lucide-react";

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
    return await response.json();
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
  const [selected, setSelected] = useState<"WHITE" | "BLUE" | "RED">("WHITE");

  useEffect(() => {
    document.title = "Dashboard | X-Stream";
  }, []);

  useEffect(() => {
    if (!buoyId || !token) return;
    const loadDepthData = async () => {
      try {
        setLoading(true);
        const response = await fetchDepthFtLast24Hours(buoyId, token);
        if (response.status === "success") setDepthData(response.data);
      } catch (error) {
        console.error("Failed to load depth data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadDepthData();
    const interval = setInterval(loadDepthData, 30000);
    return () => clearInterval(interval);
  }, [buoyId, token]);

  insertingAlerts();

  const alertStatus = {
    WHITE:
      "Normal operations. Continuous monitoring and systematic reporting are active to ensure timely issue resolution.",
    BLUE: "Early stage emergency. 50% of DRRMD personnel on standby. Coordination and reporting frequency increased.",
    RED: "Imminent emergency. 100% of DRRMD personnel on duty. Immediate deployment and highest level monitoring active.",
  };

  const getAlertButtonClass = (color: "WHITE" | "BLUE" | "RED") => {
    const isActive = selected === color;
    const base =
      "flex-1 py-2 rounded-xl text-[11px] font-black transition-all duration-300 uppercase tracking-tighter shadow-sm";

    if (color === "WHITE")
      return isActive
        ? `${base} bg-slate-100 text-slate-700 ring-2 ring-slate-200`
        : `${base} bg-transparent text-slate-400 hover:text-slate-600`;
    if (color === "BLUE")
      return isActive
        ? `${base} bg-blue-500 text-white shadow-blue-200 ring-2 ring-blue-100`
        : `${base} bg-transparent text-blue-400 hover:text-blue-600`;
    return isActive
      ? `${base} bg-red-500 text-white shadow-red-200 ring-2 ring-red-100`
      : `${base} bg-transparent text-red-400 hover:text-red-600`;
  };

  const buoyCode = user?.barangay?.buoys?.[0]?.buoyCode;
  const { showAlert, currentAlert, handleClose } = useAlertMonitor(
    buoyCode?.toString() ?? "",
    5000,
    buoyId?.toString() ?? "",
  );

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 p-4 lg:p-6 space-y-8">
      {/* 2. Top Stats Section */}
      <DashboardCards />

      {/* 3. Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column: Flow & Charts (8/12) */}
        <div className="xl:col-span-8 space-y-6">
          <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-2 shadow-sm border border-slate-200 dark:border-slate-800">
            <DisasterFlowChart />
          </section>

          <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="text-emerald-500" size={20} />
              <h2 className="font-bold text-slate-800 dark:text-white">
                Water Depth Analytics (24h)
              </h2>
            </div>
            <WaterDepthChart data={depthData} loading={loading} />
          </section>
        </div>

        {/* Right Column: Alerts & Levels (4/12) */}
        <div className="xl:col-span-4 space-y-6">
          {/* Disaster Alert Level Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-rose-50 dark:bg-rose-900/20 rounded-xl">
                  <ShieldAlert className="text-rose-500" size={20} />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-white">
                  Live Alert Status
                </h3>
              </div>

              <div className="flex bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded-2xl gap-1 mb-6">
                {(["WHITE", "BLUE", "RED"] as const).map((color) => (
                  <button
                    key={color}
                    className={getAlertButtonClass(color)}
                    onClick={() => setSelected(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>

              <div className="relative p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 transition-all duration-500">
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 italic">
                  "{alertStatus[selected]}"
                </p>
              </div>
            </div>
          </div>

          {/* Hotlines Section */}
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
