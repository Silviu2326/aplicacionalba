// src/features/pgina-de-bsqueda/components/ResultsMapView.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default icon issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Sample professionals data structure
interface Professional {
  id: string;
  name: string;
  specialty: string;
  location: {
    lat: number;
    lng: number;
  };
  // Add other properties as needed
}

interface ResultsMapViewProps {
  professionals: Professional[];
}

const ResultsMapView: React.FC<ResultsMapViewProps> = ({ professionals }) => {
  // Default center for the map if no professionals are available
  const defaultCenter: [number, number] = [40.416775, -3.703790]; // Centered on Madrid

  return (
    <MapContainer center={defaultCenter} zoom={6} style={{ height: '600px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {professionals.map(prof => (
        <Marker key={prof.id} position={[prof.location.lat, prof.location.lng]}>
          <Popup>
            <b>{prof.name}</b><br />
            {prof.specialty} <br />
            <a href={`/professional/${prof.id}`}>Ver perfil</a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ResultsMapView;
