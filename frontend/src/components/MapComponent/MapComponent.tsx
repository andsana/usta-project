import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import MyLink from '../MyLink/MyLink.tsx';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';

interface GlacierData {
  name: string;
  lat: number;
  lng: number;
  data: string;
  id: string;
}

const glaciers: GlacierData[] = [
  {
    name: 'Glacier 1',
    lat: 41.365334,
    lng: 71.043201,
    data: '110.28%',
    id: '1',
  },
  { name: 'Glacier 2', lat: 41.375, lng: 71.053, data: '99.2%', id: '2' },
  { name: 'Glacier 3', lat: 41.355, lng: 71.033, data: '94.6%', id: '3' },
  { name: 'Glacier 4', lat: 41.37, lng: 71.02, data: '75.9%', id: '4' },
  { name: 'Glacier 5', lat: 41.36, lng: 71.06, data: '69.5%', id: '5' },
];

const MapComponent = () => {
  // Настройка кастомной иконки
  const markerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', // Стандартная иконка Leaflet (или используйте свою)
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  return (
    <MapContainer
      center={[41.365334, 71.043201]}
      zoom={11}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {glaciers.map((glacier) => (
        <Marker
          key={glacier.id}
          position={[glacier.lat, glacier.lng]}
          icon={markerIcon}
        >
          <Popup>
            <MyLink
              className="mapComponent__marker"
              to={`/glacier-details/${glacier.id}`}
            >
              {glacier.name}: {glacier.data}
            </MyLink>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
