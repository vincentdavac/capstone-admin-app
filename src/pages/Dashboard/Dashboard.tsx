import DashboardCards from "../../components/dashboard_content/cards";
import DangerLevel from "../../components/dashboard_content/danger_level";
// import MapDashboard from "../../components/dashboard_content/map";
import DisasterFlowChart from "./DisasterFlowChart";

import { useEffect } from "react";
export default function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard | X-Stream ";
  }, []);

  return (
    <div>
      <DashboardCards />

      <div className="w-full flex flex-col lg:flex-row items-start justify-start pl-1 mt-5 gap-3">
        <DisasterFlowChart />
        <DangerLevel />
      </div>
    </div>
  );
}
