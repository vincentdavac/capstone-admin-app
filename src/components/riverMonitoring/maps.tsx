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
}

export default function Maps({
  buoy,
  onDistanceChange,
  currentLat,
  currentLng,
  hectare,
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

    if (hectare &&currentLocation) {
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
      const circleMarker= L.circle(currentLocation, {
        radius: hectare, 
        color: "#dc2626",
        fillColor: "#dc2626",
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
  }, [buoy, currentLat, currentLng, onDistanceChange]);

  return (
    <div className="grid grid-cols-1 gap-4 w-full">
      <div className="flex items-center justify-center w-full">
        <span className="text-gray-600 text-xl sm:text-2xl font-medium text-center">
          MAP OVERVIEW {hectare}
        </span>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="border-2 border-[#D9D9D9] dark:border-gray-700 rounded-xl h-64 sm:h-80 lg:h-[605px] w-full shadow-lg dark:bg-gray-800 overflow-hidden">
          <div id="map" className="w-full h-full rounded-xl z-0" />
        </div>
      </div>
    </div>
  );
}
