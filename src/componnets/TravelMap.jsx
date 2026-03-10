import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

function TravelMap({ trips }) {
    if (!trips?.length) return <h6>No trips</h6>
    const DefaultIcon = L.icon({
        iconUrl: markerIcon,
        shadowUrl: markerShadow
    })
    L.Marker.prototype.options.icon = DefaultIcon
    const cities = trips.flatMap(trip => trip.cities)
    const center = trips.length === 1 ? [cities[0].latitude, cities[0].longitude] : [20, 0]
    const zoom = trips.length === 1 ? 7.5 : 3.25
    return (
        <MapContainer center={center} zoom={zoom} style={{ height: "400px", width: "100%", borderRadius: "12px" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {cities.map((city) => {
                return (
                    <Marker key={city._id} position={[city.latitude, city.longitude]} />
                )
            })}
        </MapContainer>
    )
}

export default TravelMap