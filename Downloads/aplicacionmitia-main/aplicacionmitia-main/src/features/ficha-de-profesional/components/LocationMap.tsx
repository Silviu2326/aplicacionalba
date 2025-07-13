
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

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface LocationMapProps {
  location: Location;
}

const LocationMap = ({ location }: LocationMapProps) => {
  const position: [number, number] = [location.lat, location.lng];

  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-card">
      <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            {location.address}
          </Popup>
        </Marker>
      </MapContainer>
      <div className="p-4 bg-surface">
        <p className="text-textSecondary">{location.address}</p>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 px-4 py-2 text-white bg-primary hover:bg-primaryHover rounded-md transition-colors"
        >
          Cómo llegar
        </a>
      </div>
    </div>
  );
};

export default LocationMap;
