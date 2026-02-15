import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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
    if (!mapElement) return;

    if (gpsReadings.length === 0) return;

    // Initial location from the buoy attributes
    const initialLocation: L.LatLngTuple = [
      gpsReadings[0].attributes.buoy.attributes.latitude,
      gpsReadings[0].attributes.buoy.attributes.longitude,
    ];

    // Current location from the latest GPS reading
    const lastReading = gpsReadings[gpsReadings.length - 1];
    const currentLocation: L.LatLngTuple = [
      lastReading.attributes.latitude,
      lastReading.attributes.longitude,
    ];

    // Create map
    const map = L.map("map", {
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      touchZoom: false,
    }).setView(initialLocation, 12);

    // Tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    }).addTo(map);

    // Distance calculation
    const distanceMeters = map.distance(initialLocation, currentLocation);
    const distanceKm = (distanceMeters / 1000).toFixed(2);

    // Line between points
    L.polyline([initialLocation, currentLocation], {
      color: "#2563eb",
      weight: 4,
      dashArray: "8,6",
    }).addTo(map);

    // Initial marker
    L.marker(initialLocation)
      .addTo(map)
      .bindTooltip("INITIAL LOCATION", {
        permanent: true,
        direction: "top",
        offset: [0, -10],
      }).bindPopup(`
        <b>Initial Location</b><br/>
        Lat: ${initialLocation[0]}<br/>
        Lng: ${initialLocation[1]}
      `);

    // Current marker
    L.marker(currentLocation)
      .addTo(map)
      .bindTooltip("CURRENT LOCATION", {
        permanent: true,
        direction: "top",
        offset: [0, -10],
      }).bindPopup(`
        <b>Current Location</b><br/>
        Lat: ${currentLocation[0]}<br/>
        Lng: ${currentLocation[1]}<br/>
        <b>Distance:</b> ${distanceKm} km
      `);

    // Fit both points
    map.fitBounds([initialLocation, currentLocation], {
      padding: [50, 50],
    });

    return () => {
      map.remove();
    };
  }, [gpsReadings]);

  // Render fallback if no GPS data
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
