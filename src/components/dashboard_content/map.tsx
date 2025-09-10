import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapDashboard = () => {
  useEffect(() => { 
    // Initialize map
    //14.653700482338781, 120.99474052545784
    const map = L.map("map").setView([14.653700482338781,120.99474052545784], 12);

    // Add OpenStreetMap tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add a marker in Manila
    L.marker([14.653700482338781, 120.99474052545784])
      .addTo(map)
      .bindPopup("<b>Caloocan</b><br />Philippines")
      .openPopup();

    // Cleanup on unmount
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="w-[965px] h-[606px] shrink-0 bg-white shadow rounded-2xl p-4 border border-[#D9D9D9]">
      <div id="map" className="w-full h-full rounded-xl" />
    </div>
  );
};

export default MapDashboard;
