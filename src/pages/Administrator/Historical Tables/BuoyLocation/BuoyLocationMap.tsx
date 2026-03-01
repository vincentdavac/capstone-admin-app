import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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

// GPS Reading Interfaces
export interface BuoyAttributes {
  buoyCode: string;
  riverName: string;
  wallHeight: number;
  riverHectare: number;
  latitude: number;
  longitude: number;
  attachment: string;
  status: string;
  maintenanceAt: string | null;
  createdDate: string;
  createdTime: string;
  updatedDate: string;
  updatedTime: string;
}

export interface GpsReadingAttributes {
  buoyId: number;
  latitude: number;
  longitude: number;
  recordedAt: string;
  recordedDate: string;
  recordedTime: string;
  createdDate: string;
  createdTime: string;
  updatedDate: string;
  updatedTime: string;
  buoy: {
    id: number;
    attributes: BuoyAttributes;
  };
}

export interface GpsReading {
  id: number;
  attributes: GpsReadingAttributes;
}

interface Props {
  gpsReadings: GpsReading[];
}

const BuoyLocationMap = ({ gpsReadings }: Props) => {
  useEffect(() => {
    const mapElement = document.getElementById("map");
    if (!mapElement || gpsReadings.length === 0) return;

    const initialLocation: L.LatLngTuple = [
      gpsReadings[0].attributes.buoy.attributes.latitude,
      gpsReadings[0].attributes.buoy.attributes.longitude,
    ];

    const lastReading = gpsReadings[gpsReadings.length - 1];
    const currentLocation: L.LatLngTuple = [
      lastReading.attributes.latitude,
      lastReading.attributes.longitude,
    ];

    const map = L.map("map", {
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      touchZoom: false,
    }).setView(initialLocation, 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    }).addTo(map);

    const distanceMeters = map.distance(initialLocation, currentLocation);
    const distanceKm = (distanceMeters / 1000).toFixed(2);

    L.polyline([initialLocation, currentLocation], {
      color: "#2563eb",
      weight: 4,
      dashArray: "8,6",
    }).addTo(map);

    // Initial marker
    L.marker(initialLocation, { icon: defaultIcon })
      .addTo(map)
      .bindTooltip("DEPLOYMENT LOCATION", {
        permanent: true,
        direction: "top",
        offset: [0, -10],
      })
      .bindPopup(`
        <b>Deployment Location</b><br/>
        Lat: ${initialLocation[0]}<br/>
        Lng: ${initialLocation[1]}
      `);

    // Current marker
    L.marker(currentLocation, { icon: defaultIcon })
      .addTo(map)
      .bindTooltip("CURRENT LOCATION", {
        permanent: true,
        direction: "top",
        offset: [0, -10],
      })
      .bindPopup(`
        <b>Current Location</b><br/>
        Lat: ${currentLocation[0]}<br/>
        Lng: ${currentLocation[1]}<br/>
        <b>Distance:</b> ${distanceKm} km
      `);

    map.fitBounds([initialLocation, currentLocation], { padding: [50, 50] });

    // ✅ Proper cleanup function
    return () => {
      if (map) map.remove();
    };
  }, [gpsReadings]);

  if (!gpsReadings || gpsReadings.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 sm:h-80 lg:h-[605px] border-2 border-gray-300 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
        No GPS records found for selected date range.
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="border-2 border-gray-300 rounded-xl h-64 sm:h-80 lg:h-[605px] w-full shadow-lg overflow-hidden">
        <div id="map" className="w-full h-full rounded-xl z-1" />
      </div>
    </div>
  );
};

export default BuoyLocationMap;