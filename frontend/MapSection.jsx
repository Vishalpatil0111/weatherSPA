import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => onMapClick(e.latlng),
  });
  return null;
};

const MapSection = ({ selectedLocation, savedLocations, onMapClick, onMarkerClick }) => {
  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler onMapClick={onMapClick} />

      {selectedLocation && (
        <Marker position={[selectedLocation.lat, selectedLocation.lon]}>
          <Popup>Selected: {selectedLocation.lat}, {selectedLocation.lon}</Popup>
        </Marker>
      )}

      {savedLocations.map((loc) => (
        <Marker
          key={loc.id}
          position={[loc.lat, loc.lon]}
          eventHandlers={{ click: () => onMarkerClick(loc) }}
        >
          <Popup><strong>{loc.name}</strong><br />Lat: {loc.lat}, Lon: {loc.lon}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapSection;
