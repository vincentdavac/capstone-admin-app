import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ModelViewer from "./buoyLightsControl";

export default function MapsWithHazard() {
  useEffect(() => {
    //  14.642250839841605, 120.93873906253934
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
    return () => {
      map.remove();
    };
  }, []);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
      <div className="lg:col-span-2 flex flex-col gap-2">
        <div className="border-2 border-[#D9D9D9] rounded-[15px] h-64 sm:h-80 lg:h-[605px] w-full lg:w-[946px]">
          <div id="map" className="w-full h-full rounded-xl" />
        </div>
      </div>
      <div className="relative size-32">
        <div className="absolute inset-y-0 right-0 w-30">
          <ModelViewer/>
        </div>
      </div>
    </div>
  );
}
