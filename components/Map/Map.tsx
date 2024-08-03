import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import {Places} from "@/models/interfaces";
import Link from "next/link";

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});


interface MapProps {
    places: Places[];
}

const Map: React.FC<MapProps> = ({ places }) => {

    return (
        <MapContainer center={[28.524169, 77.574015]} zoom={17} className={'w-full h-full'}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {places.map((place) => (
                <Marker key={place.name} position={[place.lat, place.long]}>
                    <Popup>
                        <strong>{place.name}</strong><br />
                        <Link href={place.link}>Navigate</Link>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
