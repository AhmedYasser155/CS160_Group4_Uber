import React from 'react'
import { useEffect, useState } from 'react'
import tw from "tailwind-styled-components"
import mapboxgl from '!mapbox-gl'
import { MAPBOX_ACCESS_TOKEN } from "../config/config.json"

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
// locationCoordinates (2D array) is the longitude and latitude of the addresses passed from confirm.js
const Map = ({locationCoordinates}) => {
  // coordinates (2D array) stores the longitude and latitude of all the roads to connect the addresses
  const [coordinates, setCoordinates] = useState([])

  useEffect( () => {
    const map = new mapboxgl.Map({
      container: "map",
      style: 'mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph',
      center: [-99.29011, 39.39172],
      zoom: 3,
    })
  
    map.addControl(new mapboxgl.NavigationControl())

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
        })
    );

    if (locationCoordinates) {
      const locationURL = "";
        locationCoordinates.map( (location) => {
          addToMap(map, location)
          locationURL = locationURL + location[0] + "," + location[1] + ";"
        })
        locationURL = locationURL.slice(0, -1)
        console.log("Map URL", locationURL)

        if (locationURL != "") {
          fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${locationURL}?geometries=geojson&steps=true&access_token=pk.eyJ1IjoiaGFuZy1obyIsImEiOiJjbDA2M3F6bm4xcW05M2RvZHhpeDFsZTVvIn0.Ot8ZrqGcvLYWRLzyXtkUdA`)
          .then(res=>res.json())
          .then(data=>{
            // this return 2D array of all the road coordinates
            setCoordinates(data.routes[0].geometry.coordinates)
            // console.log("Map.js coordinates useState",coordinates)
          })

      
        map.fitBounds([
          locationCoordinates[0],
          locationCoordinates[locationCoordinates.length-1]
        ], {padding: 60})

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
      
    }
  }, [locationCoordinates])

  const addToMap = (map, coordinates) => {
    const marker = new mapboxgl.Marker()
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