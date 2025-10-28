import SearchBuoyDashboard from "../../components/dashboard_content/search";
import DashboardCards from "../../components/dashboard_content/cards";
import DangerLevel from "../../components/dashboard_content/danger_level";
import MapDashboard from "../../components/dashboard_content/map";
import ForecastCard from "../../components/dashboard_content/forecast";
import { useEffect } from 'react';
import  setAlert from "../../core_api_fetching/insertingAlert";

export default function Dashboard() {
  useEffect(() => {
    const sendAlert = async () => {
      try {
        await setAlert.post(); 
      } catch (error) {
        console.error('Failed to insert data:', error);
      }
    };

    sendAlert();
  }, []);
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
