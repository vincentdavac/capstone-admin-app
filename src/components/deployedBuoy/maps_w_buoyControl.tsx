import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ModelViewer from "./buoyLightsControl";

// Import Leaflet marker images for production
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Create a default icon instance for all markers
const defaultIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

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

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    let distanceKm = "0.00";

    if (currentLocation) {
      const distanceMeters = map.distance(initialLocation, currentLocation);
      distanceKm = (distanceMeters / 1000).toFixed(2);

      onDistanceChange?.(distanceKm);

      L.polyline([initialLocation, currentLocation], {
        color: "#2563eb",
        weight: 4,
        dashArray: "8,6",
        opacity: 0.9,
      }).addTo(map);

      L.marker(currentLocation, { icon: defaultIcon })
        .addTo(map)
        .bindTooltip("CURRENT LOCATION", {
          permanent: true,
          direction: "top",
          offset: [0, -10],
        });
    }

    const isActive = buoy.status?.toLowerCase() === "active";

    const statusStyle = isActive
      ? "color:#16a34a; font-weight:600;"
      : "color:#dc2626; font-weight:600;";

    const popupContent = `
      <div style="font-size:14px; line-height:1.4;">
        <h1 style="margin:0;">${buoy.buoyCode}</h1>
        <p>
          <b>Status:</b> 
          <span style="${statusStyle}">
            ${buoy.status}
          </span>
        </p>
        <p><b>River:</b> ${buoy.riverName}</p>
        <p><b>Wall Height:</b> ${buoy.wallHeight} feet</p>
        <p><b>River Hectare:</b> ${buoy.riverHectare} ha</p>
        <p><b>Deployment Date:</b> ${buoy.createdDate} ${buoy.createdTime}</p>
        <p><b>Distance from Current Location:</b> ${distanceKm} km</p>
      </div>
    `;

    L.marker(initialLocation, { icon: defaultIcon })
      .addTo(map)
      .bindTooltip("DEPLOYMENT LOCATION", {
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
  }, [buoy, currentLat, currentLng, onDistanceChange]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
      <div className="col-span-1 lg:col-span-2 flex flex-col gap-4 w-full">
        <div className="border-2 border-[#D9D9D9] dark:border-gray-700 rounded-xl h-64 sm:h-80 lg:h-[605px] w-full shadow-lg dark:bg-gray-800 overflow-hidden">
          <div id="map" className="w-full h-full rounded-xl z-0" />
        </div>
      </div>
      <div className="col-span-1 flex flex-col items-center w-full">
        <ModelViewer />
      </div>
    </div>
  );
}
