import React from 'react'
import { useEffect, useState } from 'react'
import tw from "tailwind-styled-components"
import Link from 'next/Link'
import { BackButton } from '../components/BackButton'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
mapboxgl.accessToken = "pk.eyJ1IjoiaGFuZy1obyIsImEiOiJjbDA2M3F6bm4xcW05M2RvZHhpeDFsZTVvIn0.Ot8ZrqGcvLYWRLzyXtkUdA";

const picklocation = ({ locationsList }) => {
    const [location, setLocation] = useState()
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: "map",
            style: 'mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph',
            center: [-99.29011, 39.39172],
            zoom: 9,
        })
        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            placeholder: 'Search for a location',
            mapboxgl: mapboxgl,
            getItemValue: (e) => {
                seletctLocation(e)
                }

        })
        document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
        const nav = new mapboxgl.NavigationControl()
        map.addControl(nav)
        geocoder.on('result', (event) => {
            setLocation(event.result.place_name)
        })

    }, [  ])
    const seletctLocation = (e) => {
    setLocation(e.place_name)
    }
    return (
        <Wrapper >
            <InputContainer>
                <BackButton prevPage={"/search"} />
                <div id="geocoder" className=' h-1/2 w-screen ' ></div>
            </InputContainer>
            <InputContainer2 id="map"></InputContainer2>

        </Wrapper>
    )

}
export default picklocation;

const Wrapper = tw.div`
    flex flex-col h-screen bg-white-200 p-4
`
const InputContainer = tw.div`
    bg-white  items-center px-4 mb-2 h-1/6
`
const InputContainer2 = tw.div`
    bg-white flex-auto h-screen
`



