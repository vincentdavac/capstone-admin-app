import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapDashboard = () => {
  useEffect(() => {
    const map = L.map("map").setView(
      [14.653700482338781, 120.99474052545784],
      12
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([14.653700482338781, 120.99474052545784])
      .addTo(map)
      .bindPopup("<b>Caloocan</b><br />Philippines")
      .openPopup();

    map.invalidateSize();

    return () => {
      map.remove();
    };
  }, []);

  return (
    // <div className="w-full lg:max-w-[965px] h-[400px] lg:h-[700px] overflow-hidden bg-white dark:bg-gray-800 shadow rounded-2xl p-2 sm:p-4 border border-[#D9D9D9] dark:border-gray-700">
    //   <div id="map" className="w-full h-full rounded-xl" />
    // </div>
    <div className="lg:col-span-2 flex flex-col gap-4 w-full lg:max-w-[965px]  lg:sticky lg:top-4 ">
      <div className="border-1 border-[#D9D9D9] dark:border-gray-700 rounded-xl h-64 sm:h-80 lg:h-[700px] w-full shadow-lg dark:bg-gray-800 overflow-hidden">
        <div id="map" className="w-full h-full rounded-xl overflow-hidden" />
      </div>
    </div>
  );
};

export default MapDashboard;
