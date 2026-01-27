import type { Property } from '@/app/shared/types/property.types';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

type Props = {
  property: Property;
};

const markerIcon = L.icon({
  iconUrl:
    'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:
    'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function PropertyMapDetails({ property }: Props) {
  console.log(property);

  console.log(property.latitude);
  console.log(property.longitude);

  if (!property.latitude || !property.longitude) {
    return (
      <div className="w-full h-[300px] bg-gray-100 rounded-xl flex items-center justify-center border">
        <p className="text-gray-500">Няма налични координати за картата</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[450px] rounded-xl border border-gray-300 overflow-hidden shadow-sm relative z-0">
      <MapContainer
        center={[property.latitude, property.longitude]}
        zoom={15}
        className="w-full h-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={[property.latitude, property.longitude]}
          icon={markerIcon}
        >
          <Popup offset={[0, -20]}>
            <span className="font-semibold">{property.address}</span>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
