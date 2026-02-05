import { useEffect } from "react";
import L from "leaflet";

const BuoyLocationMap = () => {
  useEffect(() => {
    const mapElement = document.getElementById("map");
    if (!mapElement) return;

    // Static coordinates
    const initialLocation: L.LatLngTuple = [14.651348, 120.9724002];
    const currentLocation: L.LatLngTuple = [14.7123898, 121.0190647];

    // Create map (static)
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
        Lat: 14.651348<br/>
        Lng: 120.9724002
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
        Lat: 14.7123898<br/>
        Lng: 121.0190647<br/>
        <b>Distance:</b> ${distanceKm} km
      `);

    // Fit both points
    map.fitBounds([initialLocation, currentLocation], {
      padding: [50, 50],
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="w-full">
      <div className="border-2 border-gray-300 rounded-xl h-64 sm:h-80 lg:h-[605px] w-full shadow-lg overflow-hidden">
        <div id="map" className="w-full h-full rounded-xl z-1" />
      </div>
    </div>
  );
};

export default BuoyLocationMap;
