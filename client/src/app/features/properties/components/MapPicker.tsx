import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
  useMap,
} from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import { getAddressFromCoordinates } from '../utils/geocoding';

type Props = {
  value: {
    lat: number;
    lng: number;
    address?: string;
  };
  onChange: (coords: {
    lat: number;
    lng: number;
    address?: string;
    district?: string;
  }) => void;
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

function ClickHandler({ onChange }: { onChange: Props['onChange'] }) {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      const { address, district } = await getAddressFromCoordinates(lat, lng);
      onChange({ lat, lng, address, district });
    },
  });
  return null;
}

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center[0], center[1], map]);
  return null;
}

export function MapPicker({ value, onChange }: Props) {
  const [displayAddress, setDisplayAddress] = useState('');

  useEffect(() => {
    setDisplayAddress(value.address || 'Кликни за адрес');
  }, [value.address]);

  return (
    <div className="w-full h-[450px] rounded-xl border border-gray-300 overflow-hidden shadow-sm relative z-0">
      <MapContainer
        center={[value.lat, value.lng]}
        zoom={15}
        className="w-full h-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[value.lat, value.lng]} icon={markerIcon}>
          <Popup offset={[0, -20]}>
            <span className="font-semibold">{displayAddress}</span>
          </Popup>
        </Marker>

        <ClickHandler onChange={onChange} />
        <MapUpdater center={[value.lat, value.lng]} />
      </MapContainer>
    </div>
  );
}
