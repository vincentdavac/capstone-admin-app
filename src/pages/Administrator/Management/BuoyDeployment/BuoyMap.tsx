import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface Attributes {
  buoyCode: string;
  riverName: string;
  latitude: string;
  longitude: string;
  status: string;
}

interface BuoyData {
  id: number;
  attributes: Attributes;
}

interface Props {
  buoys: BuoyData[];
}

const BuoyMap = ({ buoys }: Props) => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);

  // 🗺 Create map ONLY ONCE
  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map("buoy-map").setView([14.6669, 120.9814], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    }).addTo(map);

    mapRef.current = map;
    markersRef.current = L.layerGroup().addTo(map);
  }, []);

  // 🔄 Update markers when buoys change
  useEffect(() => {
    if (!mapRef.current || !markersRef.current) return;

    const map = mapRef.current;
    const layerGroup = markersRef.current;

    // Clear previous markers
    layerGroup.clearLayers();

    const bounds: L.LatLngTuple[] = [];

    buoys.forEach((b) => {
      const lat = Number(b.attributes.latitude);
      const lng = Number(b.attributes.longitude);

      if (!lat || !lng) return;

      const position: L.LatLngTuple = [lat, lng];
      bounds.push(position);

      L.marker(position, { icon: defaultIcon }).addTo(layerGroup).bindPopup(`
          <b>${b.attributes.buoyCode}</b><br/>
          River: ${b.attributes.riverName}<br/>
          Status: ${b.attributes.status}
        `);
    });

    // Smart zoom
    if (bounds.length === 1) {
      map.setView(bounds[0] as L.LatLngTuple, 16);
    } else if (bounds.length > 1) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [buoys]);

  return (
    <div className="mb-6">
      <div className="border-2 border-gray-300 rounded-xl h-[500px] w-full shadow-lg overflow-hidden">
        <div id="buoy-map" className="w-full h-full rounded-xl z-1" />
      </div>
    </div>
  );
};

export default BuoyMap;
