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

    const initialLocation: L.LatLngTuple = [
      14.642250839841605, 120.93873906253934,
    ];
    const currentLocation: L.LatLngTuple = [14.65, 120.95];

    const distanceMeters = map.distance(initialLocation, currentLocation);
    const distanceKm = (distanceMeters / 1000).toFixed(2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const popupContent = `
    <div style="font-size:14px; line-height:1.4;">
      <h3 style="margin:0; padding:0;">BUOY-2025-8553</h3>
      <p><b>Status:</b> Active</p>
      <p><b>Location:</b> Navotas City</p>
      <p><b>Battery:</b> 87%</p>
      <p><b>Last Update:</b> 2025-11-25 03:12 PM</p>
      <p><b>Distance from Initial:</b> ${distanceKm} km</p>
    </div>
  `;

    L.marker(initialLocation)
      .addTo(map)
      .bindTooltip(
        `<h3 style="margin:0; padding:0; font-size:14px;">BUOY-2025-8553</h3>`,
        {
          permanent: true,
          direction: "top",
          offset: [0, -10],
          opacity: 0.9,
        }
      )
      .bindPopup(popupContent);

    L.marker(currentLocation)
      .addTo(map)
      .bindTooltip("Current Location", { permanent: true, offset: [0, -10] });

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(mapElement);

    // ⭐ Auto-adjust map to include both points
    map.fitBounds([initialLocation, currentLocation], {
      padding: [50, 50],
    });

    return () => {
      map.remove();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
      {/* Map Section */}
      <div className="col-span-1 lg:col-span-2 flex flex-col gap-4 w-full">
        <div className="border-2 border-[#D9D9D9] dark:border-gray-700 rounded-xl h-64 sm:h-80 lg:h-[605px] w-full shadow-lg dark:bg-gray-800 overflow-hidden">
          <div id="map" className="w-full h-full rounded-xl z-0" />
        </div>
      </div>

      {/* Model Viewer Section */}
      <div className="col-span-1 lg:col-span-1 flex flex-col items-center w-full">
        <div className="w-full lg:w-full">
          <ModelViewer />
        </div>
      </div>
    </div>
  );
}
