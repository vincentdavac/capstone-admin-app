import SearchBuoyDashboard from "../../components/dashboard_content/search";
import DashboardCards from "../../components/dashboard_content/cards";
import DangerLevel from "../../components/dashboard_content/danger_level";
import MapDashboard from "../../components/dashboard_content/map";
// import ForecastCard from "../../components/dashboard_content/forecast";
// import setAlert from "../../core_api_fetching/insertingAlert";
// import setSurroundingAlert from "../../core_api_fetching/setSurroundingTemp";
// import setHumidityAlert from "../../core_api_fetching/humidityAlert";
// import setAtmosphericAlert from "../../core_api_fetching/setAtmosphericAlert";
// import setWindAlert from "../../core_api_fetching/setWindAlert";
// import setRainAlert from "../../core_api_fetching/setRainAlert";
// import setWaterPressureAlert from "../../core_api_fetching/setWaterPressureAlert";
// import insertHistorical from "../../core_api_fetching/setHistorical";
import {insertingAlerts } from "../../api_hooks/dashboardHooks";

export default function Dashboard() {
  insertingAlerts();
  // useEffect(() => {
  //   const sendAlert = async () => {
  //     try {
  //       await setAlert.post();
  //     } catch (error) {
  //       console.error("Failed to send alert:", error);
  //     }
  //   };
  //   const setRain = async () => {
  //     try {
  //       await setRainAlert.post();
  //     } catch (error) {
  //       console.error("Failed to send alert:", error);
  //     }
  //   };
  //   const setWaterPressure = async () => {
  //     try {
  //       await setWaterPressureAlert.post();
  //     } catch (error) {
  //       console.error("Failed to send alert:", error);
  //     }
  //   };

  //   const setSurrounding = async () => {
  //     try {
  //       await setSurroundingAlert.post();
  //     } catch (error) {
  //       console.error("Failed to send alert:", error);
  //     }
  //   };
  //   const setHumidity = async () => {
  //     try {
  //       await setHumidityAlert.post();
  //     } catch (error) {
  //       console.error("Failed to send alert:", error);
  //     }
  //   };
  //   const setAtmospheric = async () => {
  //     try {
  //       await setAtmosphericAlert.post();
  //     } catch (error) {
  //       console.error("Failed to send alert:", error);
  //     }
  //   };
  //   const setWind = async () => {
  //     try {
  //       await setWindAlert.post();
  //     } catch (error) {
  //       console.error("Failed to send alert:", error);
  //     }
  //   };

  //   const sendHistorical = async () => {
  //     try {
  //       await insertHistorical.post();
  //     } catch (error) {
  //       console.error("Failed to set historical data:", error);
  //     }
  //   };
  //   setWaterPressure();
  //   setRain();
  //   setWind();
  //   setAtmospheric();
  //   setHumidity();
  //   setSurrounding();
  //   sendAlert();
  //   sendHistorical();
  //   const interval = setInterval(() => {
  //     setWaterPressure();
  //     setRain();
  //     setWind();
  //     setAtmospheric();
  //     setHumidity();
  //     setSurrounding();
  //     sendAlert();
  //     sendHistorical();
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);
  return (
    <div>
      <DashboardCards />
      <div className="mt-[10px] ml-[3px]">
        <SearchBuoyDashboard />
      </div>
      <div className="flex flex-col lg:flex-row gap-10">
        <MapDashboard />
        <DangerLevel />
      </div>
      {/* <div className="mt-5 ">
        <ForecastCard />
      </div> */}
    </div>
  );
}
