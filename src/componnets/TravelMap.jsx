import { MapContainer, Marker, TileLayer, Polyline } from 'react-leaflet'
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Routing from './Routing';

function TravelMap({ trips, screenMode }) {
    if (!trips?.length) return <h6>No trips</h6>
    const DefaultIcon = L.icon({
        iconUrl: markerIcon,
        shadowUrl: markerShadow
    })
    L.Marker.prototype.options.icon = DefaultIcon
    const isScreenForTrips = screenMode === "Trips"
    const cities = trips.flatMap(trip => trip.cities)
    const center = isScreenForTrips ? [20, 0] : cities.length > 0 ? [cities[0].latitude, cities[0].longitude] : [20, 0]
    const zoom = isScreenForTrips ? 3 : cities.length > 0 ? 5 : 3
    const height = isScreenForTrips ? "850px" : "400px"
    return (
        <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} style={{ height: height, width: "100%", borderRadius: "12px" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {cities.map((city) => {
                return (
                    <Marker key={city._id} position={[city.latitude, city.longitude]} />
                )
            })}
            {!isScreenForTrips && (<Routing cities={cities} />)}
        </MapContainer>
    )
}

export default TravelMap