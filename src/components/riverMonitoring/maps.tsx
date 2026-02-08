import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface BuoyAttributes {
  buoyCode: string;
  riverName: string;
  wallHeight: number;
  riverHectare: number;
  latitude: number;
  longitude: number;
  attachment: string | null;
  status: string;
  maintenanceAt: string | null;
  createdDate: string;
  createdTime: string;
  updatedDate: string;
  updatedTime: string;
}

interface MapsWithHazardProps {
  buoy?: BuoyAttributes;
  loading?: boolean;
  onDistanceChange?: (distanceKm: string) => void;
  currentLat?: number | null;
  currentLng?: number | null;
  hectare?: number | null;
  WaterLevel?: number | null;
}

export default function Maps({
  buoy,
  onDistanceChange,
  currentLat,
  currentLng,
  hectare,
  WaterLevel,
}: MapsWithHazardProps) {
  useEffect(() => {
    const mapElement = document.getElementById("map");
    if (!mapElement || !buoy) return;
    const initialLocation: L.LatLngTuple = [buoy.latitude, buoy.longitude];
    const isCurrentValid =
      currentLat !== null &&
      currentLng !== null &&
      currentLat !== 0 &&
      currentLng !== 0 &&
      (currentLat !== buoy.latitude || currentLng !== buoy.longitude);

    const currentLocation: L.LatLngTuple | null = isCurrentValid
      ? [currentLat!, currentLng!]
      : null;
    const map = L.map("map").setView(initialLocation, 12);

    //layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    let distanceKm = "0.00";

    if (hectare && currentLocation && WaterLevel) {
      var blue = "#3b82f6";
      var red = "#dc2626";
      var grey = "#e5e7eb";
      var finalColor = "";
      var whiteAlert = 10;
      var blueAlert = 13;
      var redAlert = 14;
      if (WaterLevel < whiteAlert) {
        finalColor = grey;
      } else if (WaterLevel <= blueAlert) {
        finalColor = blue;
      } else if(WaterLevel >= blueAlert) {
         finalColor = red;
      }

      const distanceMeters = map.distance(initialLocation, currentLocation);
      distanceKm = (distanceMeters / 1000).toFixed(2);

      onDistanceChange?.(distanceKm);
      L.polyline([initialLocation, currentLocation], {
        color: "#2563eb",
        weight: 4,
        dashArray: "8,6",
        opacity: 0.9,
      }).addTo(map);

      L.marker(currentLocation)
        .addTo(map)
        .bindTooltip("CURRENT LOCATION", {
          permanent: true,
          direction: "top",
          offset: [0, -10],
        });
      const circleMarker = L.circle(currentLocation, {
        radius: hectare,
        color: finalColor,
        fillColor: finalColor,
        fillOpacity: 0.3,
        weight: 2,
      });
      circleMarker.addTo(map);
    }

    const popupContent = `
      <div style="font-size:14px; line-height:1.4;">
        <h3 style="margin:0;">${buoy.buoyCode}</h3>
        <p><b>Status:</b> ${buoy.status}</p>
        <p><b>River:</b> ${buoy.riverName}</p>
        <p><b>Wall Height:</b> ${buoy.wallHeight} feet</p>
        <p><b>River Hectare:</b> ${buoy.riverHectare} ha</p>
        <p><b>Last Update:</b> ${buoy.updatedDate} ${buoy.updatedTime}</p>
        <p><b>Distance from Initial:</b> ${distanceKm} km</p>
      </div>
    `;

    L.marker(initialLocation)
      .addTo(map)
      .bindTooltip("INITIAL LOCATION", {
        permanent: true,
        direction: "top",
        offset: [0, -10],
      })
      .bindPopup(popupContent);

    const bounds = currentLocation
      ? [initialLocation, currentLocation]
      : [initialLocation];

    map.fitBounds(bounds, { padding: [50, 50] });
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(mapElement);
    return () => {
      resizeObserver.disconnect();
      map.remove();
    };
  }, [buoy, currentLat, currentLng, onDistanceChange,WaterLevel]);

  return (
    <div className="grid grid-cols-1 gap-4 w-full">
      <div className="flex items-center justify-between w-full">
        <span className="text-gray-600 text-xl sm:text-2xl font-medium text-center flex-1 ml-60">
          Current water level status
        </span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded border border-gray-500"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              White Alert
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-500 rounded border border-gray-300"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Blue Alert
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-500 rounded border border-gray-300"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Red Alert
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="border-2 border-[#D9D9D9] dark:border-gray-700 rounded-xl h-64 sm:h-80 lg:h-[605px] w-full shadow-lg dark:bg-gray-800 overflow-hidden">
          <div id="map" className="w-full h-full rounded-xl z-0" />
        </div>
      </div>
    </div>
  );
}
