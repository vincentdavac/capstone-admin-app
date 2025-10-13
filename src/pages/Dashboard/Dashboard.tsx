import SearchBuoyDashboard from "../../components/dashboard_content/search";
import DashboardCards from "../../components/dashboard_content/cards";
import DangerLevel from "../../components/dashboard_content/danger_level";
import MapDashboard from "../../components/dashboard_content/map";
import ForecastCard from "../../components/dashboard_content/forecast";
export default function Dashboard() {
  return (
    <div>
      <DashboardCards />
      <div className="mt-[10px] ml-[3px]">
        <SearchBuoyDashboard />
      </div>
      <div className="flex gap-10">
        <MapDashboard />
        <DangerLevel />
      </div>
      <div className="mt-5 ">
        <ForecastCard />
      </div>
    </div>
  );
}
