import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ModelViewer from "./buoyLightsControl";

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
}

export default function MapsWithHazard({
  buoy,
  onDistanceChange,
  currentLat,
  currentLng,
}: MapsWithHazardProps) {
  useEffect(() => {
    const mapElement = document.getElementById("map");
    if (!mapElement || !buoy) return;

    // Initial buoy location
    const initialLocation: L.LatLngTuple = [buoy.latitude, buoy.longitude];

    // Validate current GPS from Firebase
    const isCurrentValid =
      currentLat !== null &&
      currentLng !== null &&
      currentLat !== 0 &&
      currentLng !== 0 &&
      (currentLat !== buoy.latitude || currentLng !== buoy.longitude);

    const currentLocation: L.LatLngTuple | null = isCurrentValid
      ? [currentLat!, currentLng!]
      : null;

    // Create map
    const map = L.map("map").setView(initialLocation, 12);

    // Tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    let distanceKm = "0.00";

    if (currentLocation) {
      // Distance calculation
      const distanceMeters = map.distance(initialLocation, currentLocation);
      distanceKm = (distanceMeters / 1000).toFixed(2);

      onDistanceChange?.(distanceKm);

      // Movement line
      L.polyline([initialLocation, currentLocation], {
        color: "#2563eb",
        weight: 4,
        dashArray: "8,6",
        opacity: 0.9,
      }).addTo(map);

      // Current location marker
      L.marker(currentLocation)
        .addTo(map)
        .bindTooltip("CURRENT LOCATION", {
          permanent: true,
          direction: "top",
          offset: [0, -10],
        });
    }

    // Initial location marker
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

    // Fit bounds
    const bounds = currentLocation
      ? [initialLocation, currentLocation]
      : [initialLocation];

    map.fitBounds(bounds, { padding: [50, 50] });

    // Resize handling
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(mapElement);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      map.remove();
    };
  }, [buoy, currentLat, currentLng, onDistanceChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
      {/* Map Section */}
      <div className="col-span-1 lg:col-span-2 flex flex-col gap-4 w-full">
        <div className="border-2 border-[#D9D9D9] dark:border-gray-700 rounded-xl h-64 sm:h-80 lg:h-[605px] w-full shadow-lg dark:bg-gray-800 overflow-hidden">
          <div id="map" className="w-full h-full rounded-xl z-0" />
        </div>
      </div>

      {/* Model Viewer Section */}
      <div className="col-span-1 flex flex-col items-center w-full">
        <ModelViewer />
      </div>
    </div>
  );
}
