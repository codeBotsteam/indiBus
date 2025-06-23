import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import stops from '../data/stops.json';


const BusMap: React.FC = () => {
  return (
    <MapContainer center={[28.61, 77.23]} zoom={11} style={{paddingTop:"140px", height: "40vh", width: "110%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stops.map((stop) => (
        <Marker
          key={stop.stop_id}
          position={[parseFloat(stop.stop_lat), parseFloat(stop.stop_lon)]}
        >
          <Popup>{stop.stop_name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default BusMap;
