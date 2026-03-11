import "leaflet-routing-machine"
import L from "leaflet"
import { useEffect } from "react"
import { useMap } from "react-leaflet"

function Routing({ cities }) {

  const map = useMap()

  useEffect(() => {
    if (!cities || cities.length < 2) return
    const waypoints = cities.map(city =>
      L.latLng(city.latitude, city.longitude)
    )
    const routing = L.Routing.control({
      waypoints,
      routeWhileDragging: false,
      show: false,
      addWaypoints: false,
      draggableWaypoints: false,
      createMarker: () => null
    }).addTo(map)
    return () => map.removeControl(routing)
  }, [cities])

  return null

}

export default Routing