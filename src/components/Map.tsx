import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
    
interface MapProps {
  center: [number, number];
  zoom: number;
  className?: string;
  marker?: [number, number];
}

export default function Map({ center, zoom, className, marker }: MapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={className}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {marker && (
        <Marker position={marker}>
          <Popup>
            Selected Location
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
} 