import React from 'react'
import { useEffect, useState } from 'react'
import tw from "tailwind-styled-components"
import mapboxgl from '!mapbox-gl'
import { MAPBOX_ACCESS_TOKEN } from "../config/config.json"

mapboxgl.accessToken = "pk.eyJ1IjoiaGFuZy1obyIsImEiOiJjbDA2M3F6bm4xcW05M2RvZHhpeDFsZTVvIn0.Ot8ZrqGcvLYWRLzyXtkUdA";


const Map = (props) => {

  const [coordinates, setCoordinates] = useState()

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: 'mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph',
      center: [-99.29011, 39.39172],
      zoom: 3,
    })

    const nav = new mapboxgl.NavigationControl()
    map.addControl(nav)

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true
    })
    map.addControl(geolocate);

    
    if (window.location.href == 'http://localhost:3000/home') {
      map.on('load', () => {
        geolocate.trigger();
      });
    }

    if (props.pickupCoordinates) {
      addToMap(map, props.pickupCoordinates)
    }
    if (props.dropoffCoordinates) {
      addToMap(map, props.dropoffCoordinates)
    }
    if (props.pickupCoordinates && props.dropoffCoordinates) {
      map.fitBounds([
        props.pickupCoordinates,
        props.dropoffCoordinates
      ], { padding: 60 })

      fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${props.pickupCoordinates[0]},${props.pickupCoordinates[1]};${props.dropoffCoordinates[0]},${props.dropoffCoordinates[1]}?geometries=geojson&steps=true&access_token=pk.eyJ1IjoiaGFuZy1obyIsImEiOiJjbDA2M3F6bm4xcW05M2RvZHhpeDFsZTVvIn0.Ot8ZrqGcvLYWRLzyXtkUdA`)
        .then(res => res.json())
        .then(data => {
          setCoordinates(data.routes[0].geometry.coordinates)
          console.log(coordinates)

          map.on('load', () => {
            map.addSource('route', {
              'type': 'geojson',
              'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                  'type': 'LineString',
                  'coordinates': coordinates
                }
              }
            });
            map.addLayer({
              'id': 'route',
              'type': 'line',
              'source': 'route',
              'layout': {
                'line-join': 'round',
                'line-cap': 'round'
              },
              'paint': {
                'line-color': '#313631',
                'line-width': 8
              }
            });
          });
        }).catch((e) => console.log(e))
    }
  }, [props.pickupCoordinates, props.dropoffCoordinates])

  const addToMap = (map, coordinates) => {
    const marker1 = new mapboxgl.Marker()
      .setLngLat(coordinates)
      .addTo(map)
  }

  return (
    <Wrapper id="map"></Wrapper>
  )
}

export default Map

const Wrapper = tw.div`
    flex-1 h-1/2
`