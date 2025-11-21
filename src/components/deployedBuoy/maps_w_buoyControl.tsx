import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ModelViewer from "./buoyLightsControl";

export default function MapsWithHazard() {
  useEffect(() => {

    const mapElement = document.getElementById("map");
    if (!mapElement) return;

    const map = L.map("map").setView(
      [14.642250839841605, 120.93873906253934],
      12
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([14.642250839841605, 120.93873906253934])
      .addTo(map)
      .bindPopup("<b>Coastal</b>")
      .openPopup();

    const resizeObserver = new ResizeObserver(() => {
        map.invalidateSize();
    });
    resizeObserver.observe(mapElement);


    return () => {
      map.remove();
      resizeObserver.disconnect();
    };
  }, []);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full"> 
      <div className="lg:col-span-2 flex flex-col gap-4 w-full lg:sticky lg:top-4"> 
        <div className="border-2 border-[#D9D9D9] dark:border-gray-700 rounded-xl h-64 sm:h-80 lg:h-[605px] w-full shadow-lg dark:bg-gray-800 overflow-hidden">
          <div id="map" className="w-full h-full rounded-xl" />
        </div>
      </div>
      <div className="lg:col-span-1 flex flex-col items-center w-full lg:sticky lg:top-4">
        <ModelViewer/>
      </div>
    </div>
  );
}