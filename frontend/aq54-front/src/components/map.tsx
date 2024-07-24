// src/MapComponent.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const position1: [number, number] = [5.369345664978027, 0.05000000074505806];
const position2: [number, number] = [5.365275859832764, 3.9576849937438965];

const MapComponent: React.FC = () => {
  return (
    <div className="w-full max-w-md mx-auto" style={{ height: '400px', aspectRatio: '16/9' }}>
      <MapContainer center={position1} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position1} icon={customIcon}>
          <Popup>
           SMART188
          </Popup>
        </Marker>
        <Marker position={position2} icon={customIcon}>
          <Popup>
            SMART189
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
