import React from 'react'
import { useEffect, useState } from 'react'
import tw from "tailwind-styled-components"
import mapboxgl from '!mapbox-gl'
import { MAPBOX_ACCESS_TOKEN } from "../config/config.json"

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;


const Map = ({locationCoordinates}) => {

  const [coordinates, setCoordinates] = useState()

  const showLocation = () => {
    const map = new mapboxgl.Map({
      container: "map",
      style: 'mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph',
      center: [-99.29011, 39.39172],
      zoom: 3,
    })
    map.addControl(new mapboxgl.NavigationControl())
  
    if (locationCoordinates != undefined) {
      testF(map)
      map.fitBounds([
        locationCoordinates[0],
        locationCoordinates[locationCoordinates.length-1]
      ], {padding:60})
    }
  }


// do if statement in here
  useEffect( () => {
      showLocation()
  }, locationCoordinates)

  const addToMap = (map, coordinates) => {
    const marker = new mapboxgl.Marker()
      .setLngLat(coordinates)
      .addTo(map)
  }
// put this in useEffect
  const testF = async (map) => {
    let locationURL = ""
    locationCoordinates.map( (location) => {
      console.log("Map.js ",location)
      addToMap(map, location)
      locationURL = locationURL + location[0] + "," + location[1] + ";"
    })
    locationURL = locationURL.slice(0, -1)
    console.log("Map URL", locationURL)

    const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${locationURL}?geometries=geojson&steps=true&access_token=pk.eyJ1IjoiaGFuZy1obyIsImEiOiJjbDA2M3F6bm4xcW05M2RvZHhpeDFsZTVvIn0.Ot8ZrqGcvLYWRLzyXtkUdA`)
    const data = await response.json()

    setCoordinates(data.routes[0].geometry.coordinates)
    console.log("Map.js response data",data.routes[0].geometry.coordinates)
    console.log("Map.js coordinates useState",coordinates)

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
  }

  return (
    <Wrapper id="map"></Wrapper>
  )
}

export default Map

const Wrapper = tw.div`
    flex-1 h-1/2
`