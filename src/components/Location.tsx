import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useLocationStore } from "../lib/stores/useMediaStore";
// Fix marker icon issue in Leaflet
delete (L.Icon.Default.prototype as unknown as { _getIconUrl: unknown })
  ._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
export const Location = () => {
  const setLocation = useLocationStore((s) => s.setLocation);
  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        console.error("Geo error", err);
      },
    );
  };
  return (
    <>
      {/**/}
      <div onClick={handleLocation}>location</div>
    </>
  );
};

export const Map = ({ loc }: { loc: { lat: number; lng: number } }) => {
  return (
    <MapContainer
      center={[loc.lat, loc.lng]}
      zoom={13}
      className="h-64 w-full rounded"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={[loc.lat, loc.lng]}>
        <Popup>Your Location</Popup>
      </Marker>
    </MapContainer>
  );
};
