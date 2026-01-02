import DashboardCards from "../../components/dashboard_content/cards";
import DangerLevel from "../../components/dashboard_content/danger_level";
import DisasterFlowChart from "./DisasterFlowChart";
import { useEffect } from "react";
import { AlertsContainerRef } from "../../components/Alert/AlertsContainer";

interface Props {
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

export default function Dashboard({ alertsRef }: Props) {
  useEffect(() => {
    document.title = "Dashboard | X-Stream ";
  }, []);

  return (
    <div>
      <DashboardCards />

      <div className="w-full flex flex-col lg:flex-row items-start justify-start pl-1 mt-5 gap-3">
        {/* Left: Water Depth Chart */}
        <div className="w-full lg:w-2/3">
          <DisasterFlowChart />
        </div>

        {/* Right: Danger Level */}
        <div className="w-full lg:w-1/3">
          <DangerLevel alertsRef={alertsRef} />
        </div>
      </div>
    </div>
  );
}
