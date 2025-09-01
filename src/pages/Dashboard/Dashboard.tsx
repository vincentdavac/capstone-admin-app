import SearchBuoyDashboard from "../../components/dashboard_content/search";
import DashboardCards from "../../components/dashboard_content/cards";
import DangerLevel from "../../components/dashboard_content/danger_level";
import MapDashboard from "../../components/dashboard_content/map";
export default function Dashboard() {
  return (
  <div>
    <DashboardCards />
    <div className="mt-[3px]">
      <SearchBuoyDashboard />
    </div>

    <div className="flex gap-10">
      <MapDashboard />
      <DangerLevel />
    </div>
  </div>
);
}
